import { act, render } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import App from './App'

it('imagem do hero tem dimensões, para o link direto não parar antes de Projetos', () => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia
  const { container } = render(<App />)
  const img = container.querySelector('.hero img')
  expect(img).toHaveAttribute('width')
  expect(img).toHaveAttribute('height')
})

it('hash #projetos/<slug> trocado sem recarregar rola até o projeto', () => {
  const scrolled: string[] = []
  Element.prototype.scrollIntoView = vi.fn(function (this: Element) {
    scrolled.push(this.id)
  })
  window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia
  render(<App />)
  act(() => {
    window.history.replaceState(null, '', '/#projetos/motionfy')
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })
  expect(scrolled).toContain('projetos/motionfy')
})
