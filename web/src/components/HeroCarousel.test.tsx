import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import type { Project } from '../data/profile'
import { HeroCarousel } from './HeroCarousel'

const base = { summary: '', highlights: [], flow: [], stack: [] }
const image = { src: '/x.jpg', alt: 'Tela', width: 16, height: 9 }
const projects: Project[] = [
  { ...base, slug: 'a', name: 'Medidor', tag: 'Visão computacional' },
  { ...base, slug: 'b', name: 'Estampa', tag: 'Geração de imagens', image },
  { ...base, slug: 'c', name: 'Motionfy', tag: 'Recomendação musical', image, site: 'https://motionfy.fun' },
]
const slides = () => screen.getAllByRole('group')

it('mostra todos os projetos, primeiro quem tem site, depois quem tem imagem', () => {
  render(<HeroCarousel projects={projects} />)
  expect(slides().map((s) => s.getAttribute('aria-label'))).toEqual([
    '1 de 3: Motionfy',
    '2 de 3: Estampa',
    '3 de 3: Medidor',
  ])
})

it('projeto com site tem "Abrir site"; sem link, a legenda diz "Em breve"', () => {
  render(<HeroCarousel projects={projects} />)
  const [motionfy, estampa, medidor] = slides()
  expect(within(motionfy).getByRole('link', { name: /Abrir site/ })).toHaveAttribute('href', 'https://motionfy.fun')
  expect(within(estampa).getByText('Em breve')).toBeInTheDocument()
  expect(within(medidor).getByText('Em breve')).toBeInTheDocument()
  expect(within(medidor).queryByRole('img')).not.toBeInTheDocument() // sem imagem: nome na moldura
})

it('as setas passam de um em um e dão a volta; só o slide atual fica acessível', () => {
  render(<HeroCarousel projects={projects} />)
  expect(screen.getByText('1 / 3')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Próximo projeto' }))
  expect(screen.getByText('2 / 3')).toBeInTheDocument()
  expect(slides()[1]).not.toHaveAttribute('inert')
  expect(slides()[0]).toHaveAttribute('inert')
  fireEvent.click(screen.getByRole('button', { name: 'Projeto anterior' }))
  fireEvent.click(screen.getByRole('button', { name: 'Projeto anterior' }))
  expect(screen.getByText('3 / 3')).toBeInTheDocument()
})
