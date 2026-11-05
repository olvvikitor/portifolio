import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { projects } from '../data/profile'
import { ProjectList } from './ProjectList'

const tabs = () => within(screen.getByRole('tablist', { name: 'Projetos' })).getAllByRole('tab')
const shown = () => screen.getAllByRole('tabpanel').map((p) => p.id)

afterEach(() => window.history.replaceState(null, '', '/'))

describe('ProjectList', () => {
  it('índice numerado com uma aba por projeto; a primeira começa selecionada', () => {
    render(<ProjectList projects={projects} />)
    expect(tabs()).toHaveLength(projects.length)
    expect(tabs()[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs()[0]).toHaveTextContent('01')
    expect(tabs()[0]).toHaveAttribute('aria-controls', `projetos/${projects[0].slug}`)
  })

  it('mostra um projeto por vez; os outros ficam escondidos, com o id do link direto', () => {
    const { container } = render(<ProjectList projects={projects} />)
    expect(shown()).toEqual([`projetos/${projects[0].slug}`])
    for (const p of projects) expect(container.querySelector(`[id="projetos/${p.slug}"]`)).not.toBeNull()
  })

  it('clicar numa aba mostra aquele projeto e atualiza o link direto', () => {
    render(<ProjectList projects={projects} />)
    fireEvent.click(tabs()[2])
    expect(tabs()[2]).toHaveAttribute('aria-selected', 'true')
    expect(tabs()[0]).toHaveAttribute('aria-selected', 'false')
    expect(shown()).toEqual([`projetos/${projects[2].slug}`])
    expect(window.location.hash).toBe(`#projetos/${projects[2].slug}`)
  })

  it('as setas passam para o próximo e o anterior, dando a volta nas pontas', () => {
    render(<ProjectList projects={projects} />)
    const n = projects.length
    expect(screen.getByText(`01 / ${String(n).padStart(2, '0')}`)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Próximo projeto' }))
    expect(shown()).toEqual([`projetos/${projects[1].slug}`])
    fireEvent.click(screen.getByRole('button', { name: 'Projeto anterior' }))
    fireEvent.click(screen.getByRole('button', { name: 'Projeto anterior' }))
    expect(shown()).toEqual([`projetos/${projects[n - 1].slug}`])
  })

  it('teclado nas abas: setas passam e o foco acompanha', () => {
    render(<ProjectList projects={projects} />)
    tabs()[0].focus()
    fireEvent.keyDown(tabs()[0], { key: 'ArrowRight' })
    expect(tabs()[1]).toHaveFocus()
    expect(shown()).toEqual([`projetos/${projects[1].slug}`])
  })

  it('abrindo com #projetos/<slug>, já começa naquele projeto', () => {
    window.history.replaceState(null, '', `/#projetos/${projects[3].slug}`)
    render(<ProjectList projects={projects} />)
    expect(shown()).toEqual([`projetos/${projects[3].slug}`])
  })

  it('projeto com imagem e sem site ainda mostra a imagem', () => {
    render(<ProjectList projects={projects} />)
    fireEvent.click(screen.getByRole('tab', { name: /Estampa/ }))
    expect(screen.getByRole('img', { name: /Tela do Estampa/ })).toBeInTheDocument()
  })

  it('projeto sem repositório: nenhum link de código e nenhum aviso sobrando', () => {
    render(<ProjectList projects={projects} />)
    fireEvent.click(screen.getByRole('tab', { name: /Leitura de medidor/ }))
    const medidor = screen.getByRole('tabpanel', { name: 'Leitura de medidor' })
    expect(within(medidor).queryByRole('link', { name: /Ver código/ })).toBeNull()
    expect(within(medidor).queryByText(/Código privado|não publicado/)).toBeNull()
  })

  it('sem rótulos desnecessários de trabalho/pessoal ou "no ar"', () => {
    const { container } = render(<ProjectList projects={projects} />)
    expect(container.textContent).not.toMatch(/Pessoal|no ar|Trabalho ·|em validação/)
  })

  it('índice mostra o rótulo específico de cada projeto', () => {
    render(<ProjectList projects={projects} />)
    projects.forEach((p, i) => {
      expect(tabs()[i]).toHaveTextContent(p.name)
      expect(tabs()[i]).toHaveTextContent(p.tag)
    })
  })

  it('cada projeto tem um rótulo diferente', () => {
    expect(new Set(projects.map((p) => p.tag)).size).toBe(projects.length)
  })

  it('avisa que é uma seleção, sem falar em sigilo nem em projetos internos', () => {
    const { container } = render(<ProjectList projects={projects} />)
    expect(container).not.toHaveTextContent(/sigilo|internos/i)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/seleção/i)
  })
})
