import { act, render } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import App from './App'

it('topo só com texto, sem imagem', () => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia
  const { container } = render(<App />)
  expect(container.querySelector('.hero img')).toBeNull()
})

it('hash #projetos/<slug> trocado sem recarregar seleciona o projeto e rola até Projetos', () => {
  const scrolled: string[] = []
  Element.prototype.scrollIntoView = vi.fn(function (this: Element) {
    scrolled.push(this.id)
  })
  window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia
  render(<App />)
  act(() => {
    window.history.replaceState(null, '', '/#projetos/assistente-rag')
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })
  expect(scrolled).toContain('projetos')
  expect(document.getElementById('projetos/assistente-rag')).not.toHaveAttribute('inert')
})
