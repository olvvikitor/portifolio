import { act, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Capabilities } from './Capabilities'

const items = [
  { title: 'Automações', text: 'Filas e tarefas agendadas.', tools: ['Python', 'Excel'] },
  { title: 'Desenvolvimento web', text: 'Aplicações completas.', tools: [] },
  { title: 'Dados', text: 'Painéis.', tools: [] },
]

const item = (name: string) => screen.getByRole('heading', { name }).closest('li')!
// Tela de 768px (meio em 384). Cada área tem 500px e há 40px entre elas; `y` = onde começa a primeira, depois rola.
const scrollTo = (y: number) =>
  act(() => {
    items.forEach((c, i) => {
      const top = y + i * 540
      item(c.title).getBoundingClientRect = () => ({ top, bottom: top + 500 }) as DOMRect
    })
    window.dispatchEvent(new Event('scroll'))
  })
const active = () => items.filter((c) => item(c.title).classList.contains('is-active')).map((c) => c.title)

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
  expect(active()).toEqual([])
  scrollTo(0)
  expect(active()).toEqual(['Automações'])
  scrollTo(-300)
  expect(active()).toEqual(['Desenvolvimento web'])
})

it('no espaço entre duas áreas, a atual continua visível (a seção nunca fica vazia)', () => {
  render(<Capabilities items={items} />)
  scrollTo(-100)
  scrollTo(-130) // meio da tela entre a primeira (até 370) e a segunda (de 410)
  expect(active()).toEqual(['Automações'])
})

it('voltando para cima, troca uma vez só para a área anterior, sem piscar entre as duas', () => {
  render(<Capabilities items={items} />)
  scrollTo(-600)
  expect(active()).toEqual(['Desenvolvimento web'])
  // -150: o meio cai no espaço entre as duas, a de baixo continua
  for (const y of [-500, -400, -300, -200, -150]) {
    scrollTo(y)
    expect(active()).toEqual(['Desenvolvimento web'])
  }
  scrollTo(-100)
  expect(active()).toEqual(['Automações'])
})

it('acima da primeira ou abaixo da última área, nenhuma fica visível', () => {
  render(<Capabilities items={items} />)
  scrollTo(0)
  scrollTo(500) // voltou para o topo
  expect(active()).toEqual([])
  scrollTo(-1000)
  expect(active()).toEqual(['Dados'])
  scrollTo(-1300) // passou da última
  expect(active()).toEqual([])
})

it('a animação fica num bloco de dentro: o item medido não se move', () => {
  render(<Capabilities items={items} />)
  expect(item('Automações').firstElementChild).toHaveClass('capability-body')
})

it('mostra as ferramentas de cada área, com ícone e nome, em ordem para entrarem uma por uma', () => {
  render(<Capabilities items={items} />)
  const tools = within(screen.getByRole('list', { name: 'Ferramentas de Automações' })).getAllByRole('listitem')
  expect(tools.map((t) => t.textContent)).toEqual(['Python', 'Excel'])
  expect(tools[0].querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  expect(tools[1].style.getPropertyValue('--i')).toBe('1')
})

it('frases entre ==sinais== viram marca-texto, numeradas na ordem em que são passadas', () => {
  render(<Capabilities items={[{ title: 'Dados', text: 'Parte do ==negócio== e ==mede tudo==.', tools: [] }]} />)
  const marks = [...item('Dados').querySelectorAll('mark')]
  expect(marks.map((m) => m.textContent)).toEqual(['negócio', 'mede tudo'])
  expect(marks[1].style.getPropertyValue('--m')).toBe('1')
  expect(item('Dados')).toHaveTextContent('Parte do negócio e mede tudo.')
})
