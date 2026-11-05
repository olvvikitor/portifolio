import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { FlowDiagram } from './FlowDiagram'

const steps = [{ step: 'Entrada', detail: 'O que chega' }, { step: 'Núcleo', detail: 'A parte difícil' }, { step: 'Saída' }]
const li = (name: string) => screen.getByText(name).closest('li')!

it('uma etapa numerada por passo, com o detalhe quando existe', () => {
  render(<FlowDiagram steps={steps} core={1} />)
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
  expect(screen.getByText('O que chega')).toBeInTheDocument()
  expect(screen.getByText('03')).toBeInTheDocument()
})

it('etapa principal fica destacada e anunciada', () => {
  render(<FlowDiagram steps={steps} core={1} />)
  expect(li('Núcleo')).toHaveClass('is-core')
  expect(li('Núcleo')).toHaveTextContent('Etapa principal')
})

it('destaque é fixo: passar o mouse não muda nada', () => {
  render(<FlowDiagram steps={steps} core={1} />)
  fireEvent.mouseEnter(li('Saída'))
  expect(li('Saída')).not.toHaveClass('is-core')
  expect(li('Núcleo')).toHaveClass('is-core')
})
