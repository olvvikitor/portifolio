import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Experience } from './Experience'

it('conta a trajetória sem cara de currículo: sem datas nem modelo de trabalho', () => {
  const { container } = render(<Experience />)
  const text = container.textContent ?? ''
  expect(text).not.toMatch(/\b(19|20)\d{2}\b/)
  expect(text).not.toMatch(/\b(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\//i)
  expect(text).not.toMatch(/remoto|presencial|híbrido|atual/i)
  expect(container.querySelector('time')).toBeNull()
  expect(screen.getAllByRole('heading', { level: 3 }).length).toBeGreaterThan(1)
})
