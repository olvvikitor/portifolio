import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { FlowDiagram } from './FlowDiagram'

it('um nó por passo, n-1 setas, passo central marcado', () => {
  const { container } = render(<FlowDiagram steps={['a', 'b', 'c']} core={1} />)
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
  expect(container.querySelectorAll('.flow-arrow')).toHaveLength(2)
  expect(screen.getByText('b').closest('li')).toHaveClass('is-core')
})
