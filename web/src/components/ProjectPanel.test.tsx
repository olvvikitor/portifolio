import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Project } from '../data/profile'
import { ProjectPanel } from './ProjectPanel'

const base: Project = {
  slug: 'x',
  tag: 'Teste',
  name: 'Projeto X',
  summary: 'Resumo.',
  highlights: ['Um destaque.'],
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

  it('esconde papel e resultado quando vazios', () => {
    render(<ProjectPanel project={base} />)
    expect(screen.queryByText('Meu papel')).not.toBeInTheDocument()
    expect(screen.queryByText('Resultado')).not.toBeInTheDocument()
  })
})
