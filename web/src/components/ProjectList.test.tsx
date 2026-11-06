import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { projects } from '../data/profile'
import { ProjectList } from './ProjectList'

const slides = () => [...document.querySelectorAll('[aria-roledescription="slide"]')]
const shown = () => slides().filter((s) => !s.hasAttribute('inert')).map((s) => s.id)
const track = () => document.querySelector('.projects-track') as HTMLElement

afterEach(() => window.history.replaceState(null, '', '/'))

describe('ProjectList', () => {
  it('carrossel com um slide por projeto, sem índice e sem botões de navegação', () => {
    render(<ProjectList projects={projects} />)
    expect(screen.getByRole('region', { name: 'Projetos' })).toHaveAttribute('aria-roledescription', 'carrossel')
    expect(slides()).toHaveLength(projects.length)
    expect(screen.queryByRole('tablist')).toBeNull()
    expect(screen.queryByRole('button', { name: /Próximo|anterior/i })).toBeNull()
  })

  it('começa no primeiro; os outros ficam inertes', () => {
    render(<ProjectList projects={projects} />)
    expect(shown()).toEqual([`projetos/${projects[0].slug}`])
    expect(slides()[1]).toHaveClass('is-off')
    expect(slides()[1]).toHaveAttribute('aria-hidden', 'true')
  })

  it('arrastar o trilho troca o projeto e atualiza o link direto', () => {
    render(<ProjectList projects={projects} />)
    const el = track()
    el.scrollLeft = 2 // no jsdom não há layout: cada slide "mede" 1px
    fireEvent.scroll(el)
    expect(shown()).toEqual([`projetos/${projects[2].slug}`])
    expect(window.location.hash).toBe(`#projetos/${projects[2].slug}`)
    expect(screen.getByText(`Projeto 3 de ${projects.length}: ${projects[2].name}`)).toBeInTheDocument()
  })

  it('pontos indicam a posição, sem ser clicáveis', () => {
    const { container } = render(<ProjectList projects={projects} />)
    const dots = container.querySelector('.projects-dots')!
    expect(dots).toHaveAttribute('aria-hidden', 'true')
    expect(dots.children).toHaveLength(projects.length)
    expect(dots.children[0]).toHaveClass('is-current')
    expect(within(dots as HTMLElement).queryByRole('button')).toBeNull()
  })

  it('abrindo com #projetos/<slug>, já começa naquele projeto', () => {
    window.history.replaceState(null, '', `/#projetos/${projects[2].slug}`)
    render(<ProjectList projects={projects} />)
    expect(shown()).toEqual([`projetos/${projects[2].slug}`])
  })

  it('projeto sem repositório: nenhum link de código e nenhum aviso sobrando', () => {
    render(<ProjectList projects={projects} />)
    const medidor = document.getElementById('projetos/medidor')!
    expect(within(medidor).queryByRole('link', { name: /Ver código/, hidden: true })).toBeNull()
    expect(within(medidor).queryByText(/Código privado|não publicado/)).toBeNull()
  })

  it('sem rótulos desnecessários de trabalho/pessoal ou "no ar"', () => {
    const { container } = render(<ProjectList projects={projects} />)
    expect(container.textContent).not.toMatch(/Pessoal|no ar|Trabalho ·|em validação/)
  })

  it('cada projeto tem um rótulo diferente', () => {
    expect(new Set(projects.map((p) => p.tag)).size).toBe(projects.length)
  })

  it('avisa que é uma seleção, sem falar em sigilo nem em projetos internos', () => {
    const { container } = render(<ProjectList projects={projects} />)
    expect(container).not.toHaveTextContent(/sigilo|internos/i)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/seleção/i)
  })

  it('são os três projetos principais, nesta ordem', () => {
    expect(projects.map((p) => p.slug)).toEqual(['motionfy', 'assistente-rag', 'medidor'])
  })

  it('cada projeto conta problema, solução e pelo menos uma dificuldade com a solução', () => {
    for (const p of projects) {
      expect(p.problem).toBeTruthy()
      expect(p.solution).toBeTruthy()
      expect(p.challenges.length).toBeGreaterThan(0)
      for (const c of p.challenges) expect(c.issue && c.fix).toBeTruthy()
    }
  })
})
