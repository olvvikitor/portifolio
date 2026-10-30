import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { projects } from '../data/profile'
import { ProjectTabs } from './ProjectTabs'

describe('ProjectTabs', () => {
  it('mostra a primeira aba e troca no clique', async () => {
    render(<ProjectTabs projects={projects} />)
    expect(screen.getByRole('tab', { name: 'Motionfy' })).toHaveAttribute('aria-selected', 'true')
    await userEvent.click(screen.getByRole('tab', { name: 'RAG do zero' }))
    expect(screen.getByRole('tab', { name: 'RAG do zero' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('RAG do zero')
    expect(window.location.hash).toBe('#projetos/rag')
  })

  it('teclado: setas, Home e End movem seleção e foco', async () => {
    render(<ProjectTabs projects={projects} />)
    await userEvent.click(screen.getByRole('tab', { name: 'Motionfy' }))
    await userEvent.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', { name: 'Bet Scraper' })).toHaveFocus()
    await userEvent.keyboard('{Home}')
    expect(screen.getByRole('tab', { name: 'Motionfy' })).toHaveAttribute('aria-selected', 'true')
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'RAG do zero' })).toHaveFocus()
    await userEvent.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Bet Scraper' })).toHaveAttribute('aria-selected', 'true')
  })

  it('só a aba ativa entra no Tab', () => {
    render(<ProjectTabs projects={projects} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs.filter((t) => t.tabIndex === 0)).toHaveLength(1)
  })

  it('abre a aba do hash', () => {
    window.history.replaceState(null, '', '/#projetos/anjo-bom')
    render(<ProjectTabs projects={projects} />)
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Anjo Bom')
  })
})
