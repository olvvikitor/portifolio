import { render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { About } from './About'

it('fala de como trabalho, em linguagem simples, sem repetir a formação', () => {
  const { container } = render(<About />)
  const list = screen.getByRole('list', { name: 'Como eu trabalho' })
  expect(within(list).getAllByRole('listitem').length).toBeGreaterThanOrEqual(3)
  const text = container.textContent ?? ''
  expect(text).not.toMatch(/SENAI|UNIFACS|Node\.js|PostgreSQL|YOLO|RAG/)
})
