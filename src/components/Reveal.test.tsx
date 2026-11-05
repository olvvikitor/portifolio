import { render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { Reveal } from './Reveal'

afterEach(() => {
  vi.unstubAllGlobals()
})

it('sem IntersectionObserver o conteúdo já nasce visível', () => {
  render(
    <Reveal>
      <p>oi</p>
    </Reveal>,
  )
  expect(screen.getByText('oi').parentElement).toHaveClass('is-visible')
})

it('aparece assim que a borda entra na tela, sem esperar uma fração da altura', () => {
  // Uma fração (ex.: 15%) de uma seção alta como Projetos exige rolar quase uma tela inteira no vazio.
  let options: IntersectionObserverInit | undefined
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(_cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) {
        options = opts
      }
      observe() {}
      disconnect() {}
    },
  )
  render(
    <Reveal>
      <p>oi</p>
    </Reveal>,
  )
  expect(options?.threshold ?? 0).toBe(0)
})
