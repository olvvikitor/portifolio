import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { useReveal } from './useReveal'

function Page() {
  useReveal('.item')
  return (
    <>
      <p className="item">na tela ao abrir</p>
      <p className="item">abaixo da dobra</p>
    </>
  )
}

let cb: IntersectionObserverCallback = () => {}
const unobserve = vi.fn()
const io = {} as IntersectionObserver
const entry = (target: Element, isIntersecting: boolean) =>
  ({ target, isIntersecting }) as unknown as IntersectionObserverEntry

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(c: IntersectionObserverCallback) {
        cb = c
      }
      observe() {}
      unobserve = unobserve
      disconnect() {}
    },
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
  document.documentElement.classList.remove('reveal-on')
})

it('ao abrir, nada aparece sozinho: mesmo o que está na tela espera a primeira rolagem', () => {
  const { container } = render(<Page />)
  const [inView, below] = container.querySelectorAll('.item')
  cb([entry(inView, true), entry(below, false)], io) // relatório inicial do observer
  expect(document.documentElement).toHaveClass('reveal-on')
  expect(inView).not.toHaveClass('is-visible')

  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
  expect(inView).toHaveClass('is-visible')
  expect(below).not.toHaveClass('is-visible')
})

it('depois de rolar, cada bloco aparece quando entra na tela', () => {
  const { container } = render(<Page />)
  const [, below] = container.querySelectorAll('.item')
  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
  cb([entry(below, true)], io)
  expect(below).toHaveClass('is-visible')
  expect(unobserve).toHaveBeenCalledWith(below)
})

it('bloco que saiu da tela antes da rolagem não aparece ao rolar', () => {
  const { container } = render(<Page />)
  const [inView] = container.querySelectorAll('.item')
  cb([entry(inView, true)], io)
  cb([entry(inView, false)], io)
  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
  expect(inView).not.toHaveClass('is-visible')
})

it('sem IntersectionObserver nada fica escondido', () => {
  vi.stubGlobal('IntersectionObserver', undefined)
  render(<Page />)
  expect(document.documentElement).not.toHaveClass('reveal-on')
})
