import { act, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { Capabilities } from './Capabilities'

const items = [
  { title: 'Automações', text: 'Filas e tarefas agendadas.', tools: ['Python', 'Excel'] },
  { title: 'Desenvolvimento web', text: 'Aplicações completas.', tools: [] },
  { title: 'Dados', text: 'Painéis.', tools: [] },
]

let cb: IntersectionObserverCallback = () => {}
const io = {} as IntersectionObserver
const cross = (el: Element, isIntersecting: boolean) =>
  act(() => cb([{ target: el, isIntersecting } as unknown as IntersectionObserverEntry], io))
const scroll = () => act(() => window.dispatchEvent(new Event('scroll')))
const item = (name: string) => screen.getByRole('heading', { name }).closest('li')!

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(c: IntersectionObserverCallback) {
        cb = c
      }
      observe() {}
      disconnect() {}
    },
  )
})
afterEach(() => vi.unstubAllGlobals())

it('é uma seção própria, separada de Projetos, com cada área: título em cima e texto abaixo', () => {
  render(<Capabilities items={items} />)
  expect(screen.getByRole('region', { name: /faz diferença/ })).toHaveAttribute('id', 'o-que-faco')
  const li = [...screen.getByRole('list', { name: /faz diferença/ }).children] as HTMLElement[]
  expect(li).toHaveLength(3)
  expect(within(li[0]).getByRole('heading', { level: 4, name: 'Automações' })).toBeInTheDocument()
  expect(within(li[0]).getByText('Filas e tarefas agendadas.')).toBeInTheDocument()
})

it('ao abrir, nenhuma área aparece; depois de rolar, só a que está no meio da tela fica visível', () => {
  render(<Capabilities items={items} />)
  cross(item('Automações'), true)
  expect(item('Automações')).not.toHaveClass('is-active')

  scroll()
  expect(item('Automações')).toHaveClass('is-active')
  expect(item('Desenvolvimento web')).not.toHaveClass('is-active')

  cross(item('Automações'), false)
  cross(item('Desenvolvimento web'), true)
  expect(item('Desenvolvimento web')).toHaveClass('is-active')
  expect(item('Automações')).not.toHaveClass('is-active')
})

it('sem IntersectionObserver, tudo fica visível (o modo foco nem liga)', () => {
  vi.stubGlobal('IntersectionObserver', undefined)
  render(<Capabilities items={items} />)
  expect(screen.getByRole('list', { name: /faz diferença/ })).not.toHaveClass('is-focus')
})

it('mostra as ferramentas de cada área, com ícone e nome, em ordem para entrarem uma por uma', () => {
  render(<Capabilities items={items} />)
  const tools = within(screen.getByRole('list', { name: 'Ferramentas de Automações' })).getAllByRole('listitem')
  expect(tools.map((t) => t.textContent)).toEqual(['Python', 'Excel'])
  expect(tools[0].querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  expect(tools[1].style.getPropertyValue('--i')).toBe('1')
})
