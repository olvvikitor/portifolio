import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { ImageZoom } from './ImageZoom'

const image = { src: '/a.jpg', alt: 'Tela do app', width: 1200, height: 600 }

it('clicar na imagem abre a versão ampliada; Esc fecha e devolve o foco', () => {
  render(<ImageZoom image={image} label="Motionfy" />)
  const trigger = screen.getByRole('button', { name: 'Ampliar imagem: Motionfy' })
  expect(screen.queryByRole('dialog')).toBeNull()

  fireEvent.click(trigger)
  const dialog = screen.getByRole('dialog', { name: 'Motionfy' })
  expect(dialog).toHaveAttribute('aria-modal', 'true')
  expect(screen.getByRole('button', { name: 'Fechar' })).toHaveFocus()

  fireEvent.keyDown(document, { key: 'Escape' })
  expect(screen.queryByRole('dialog')).toBeNull()
  expect(trigger).toHaveFocus()
})

it('clicar fora da imagem fecha', () => {
  render(<ImageZoom image={image} label="Motionfy" />)
  fireEvent.click(screen.getByRole('button', { name: 'Ampliar imagem: Motionfy' }))
  fireEvent.click(screen.getByRole('dialog'))
  expect(screen.queryByRole('dialog')).toBeNull()
})
