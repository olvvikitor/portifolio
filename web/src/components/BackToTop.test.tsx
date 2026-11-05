import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { BackToTop } from './BackToTop'

const scrollTo = (y: number) =>
  act(() => {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
    window.dispatchEvent(new Event('scroll'))
  })

afterEach(() => scrollTo(0))

it('não aparece no topo da página', () => {
  render(<BackToTop />)
  expect(screen.queryByRole('button', { name: 'Voltar ao topo' })).toBeNull()
})

it('aparece depois de rolar além da primeira tela e some ao voltar', () => {
  render(<BackToTop />)
  scrollTo(window.innerHeight + 10)
  expect(screen.getByRole('button', { name: 'Voltar ao topo' })).toBeInTheDocument()
  scrollTo(0)
  expect(screen.queryByRole('button', { name: 'Voltar ao topo' })).toBeNull()
})

it('ao clicar, volta ao topo', () => {
  const spy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  render(<BackToTop />)
  scrollTo(window.innerHeight + 10)
  fireEvent.click(screen.getByRole('button', { name: 'Voltar ao topo' }))
  expect(spy).toHaveBeenCalledWith({ top: 0 })
  spy.mockRestore()
})
