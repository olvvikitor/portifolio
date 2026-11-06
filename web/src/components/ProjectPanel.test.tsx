import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Project } from '../data/profile'
import { ProjectPanel } from './ProjectPanel'

const base: Project = {
  slug: 'x',
  tag: 'Teste',
  name: 'Projeto X',
  summary: 'Resumo.',
  problem: 'A dor.',
  solution: 'O remédio.',
  challenges: [{ issue: 'Travou aqui.', fix: 'Resolvi assim.' }],
  flow: [{ step: 'A' }, { step: 'B' }],
  stack: ['TS'],
}

describe('ProjectPanel', () => {
  it('mostra papel e resultado quando preenchidos', () => {
    render(<ProjectPanel project={{ ...base, role: 'Backend sozinho', outcome: '40 operadores usam por dia' }} />)
    expect(screen.getByText('Meu papel')).toBeInTheDocument()
    expect(screen.getByText('Backend sozinho')).toBeInTheDocument()
    expect(screen.getByText('Resultado')).toBeInTheDocument()
    expect(screen.getByText('40 operadores usam por dia')).toBeInTheDocument()
  })

  it('mostra problema, solução e dificuldades com a solução de cada uma', () => {
    render(<ProjectPanel project={base} />)
    expect(screen.getByRole('heading', { name: 'O problema' })).toBeInTheDocument()
    expect(screen.getByText('A dor.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'A solução' })).toBeInTheDocument()
    expect(screen.getByText('O remédio.')).toBeInTheDocument()
    const list = screen.getByRole('list', { name: 'Dificuldades e como resolvi' })
    expect(list).toHaveTextContent('Travou aqui.')
    expect(list).toHaveTextContent('Resolvi assim.')
  })

  it('projeto que nasce de uma ideia troca os títulos', () => {
    render(<ProjectPanel project={{ ...base, labels: { problem: 'A ideia', solution: 'O que ele faz' } }} />)
    expect(screen.getByRole('heading', { name: 'A ideia' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'O que ele faz' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'O problema' })).toBeNull()
  })

  it('esconde papel e resultado quando vazios', () => {
    render(<ProjectPanel project={base} />)
    expect(screen.queryByText('Meu papel')).not.toBeInTheDocument()
    expect(screen.queryByText('Resultado')).not.toBeInTheDocument()
  })
})
