import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Reveal } from './Reveal'

it('sem IntersectionObserver o conteúdo já nasce visível', () => {
  render(
    <Reveal>
      <p>oi</p>
    </Reveal>,
  )
  expect(screen.getByText('oi').parentElement).toHaveClass('is-visible')
})
