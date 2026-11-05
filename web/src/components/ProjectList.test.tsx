import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects } from '../data/profile'
import { ProjectList } from './ProjectList'

describe('ProjectList', () => {
  it('índice numerado com um link por projeto, apontando para o link direto', () => {
    render(<ProjectList projects={projects} />)
    const index = screen.getByRole('navigation', { name: 'Índice de projetos' })
    const links = within(index).getAllByRole('link')
    expect(links).toHaveLength(projects.length)
    expect(links[0]).toHaveAttribute('href', `#projetos/${projects[0].slug}`)
    expect(within(index).getByText('01')).toBeInTheDocument()
  })

  it('todos os projetos ficam visíveis, cada um com id do link direto', () => {
    const { container } = render(<ProjectList projects={projects} />)
    for (const p of projects) {
      expect(screen.getByRole('heading', { level: 3, name: p.name })).toBeInTheDocument()
      expect(container.querySelector(`[id="projetos/${p.slug}"]`)).not.toBeNull()
    }
  })

  it('projeto com imagem e sem site ainda mostra a imagem', () => {
    render(<ProjectList projects={projects} />)
    expect(screen.getByRole('img', { name: /Tela do Estampa/ })).toBeInTheDocument()
  })

  it('projeto sem repositório: nenhum link de código e nenhum aviso sobrando', () => {
    render(<ProjectList projects={projects} />)
    const medidor = screen.getByRole('article', { name: 'Leitura de medidor' })
    expect(within(medidor).queryByRole('link', { name: /Ver código/ })).toBeNull()
    expect(within(medidor).queryByText(/Código privado|não publicado/)).toBeNull()
  })

  it('sem rótulos desnecessários de trabalho/pessoal ou "no ar"', () => {
    const { container } = render(<ProjectList projects={projects} />)
    expect(container.textContent).not.toMatch(/Pessoal|no ar|Trabalho ·|em validação/)
  })

  it('índice mostra o rótulo específico de cada projeto', () => {
    render(<ProjectList projects={projects} />)
    const index = screen.getByRole('navigation', { name: 'Índice de projetos' })
    for (const p of projects) {
      expect(within(index).getByRole('link', { name: new RegExp(p.name) })).toHaveTextContent(p.tag)
    }
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
