import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Emph } from './Emph'

it('trechos entre *asteriscos* viram destaque; o resto fica como texto', () => {
  const { container } = render(<h2><Emph text="Do *atendimento* ao *código*." /></h2>)
  expect(container.textContent).toBe('Do atendimento ao código.')
  const marks = container.querySelectorAll('.emph')
  expect([...marks].map((m) => m.textContent)).toEqual(['atendimento', 'código'])
})

it('texto sem marcador sai igual', () => {
  const { container } = render(<Emph text="Sem destaque" />)
  expect(container.textContent).toBe('Sem destaque')
  expect(container.querySelector('.emph')).toBeNull()
})
