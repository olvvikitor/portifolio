import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { profile } from '../data/profile'
import { Contact } from './Contact'

describe('Contact', () => {
  const original = profile.resume
  afterEach(() => {
    profile.resume = original
  })

  it('mostra o link do currículo quando existe', () => {
    profile.resume = '/curriculo.pdf'
    render(<Contact />)
    const link = screen.getByRole('link', { name: /Baixar currículo/ })
    expect(link).toHaveAttribute('href', '/curriculo.pdf')
    expect(link).toHaveAttribute('download')
  })

  it('esconde o link do currículo quando não existe', () => {
    profile.resume = undefined
    render(<Contact />)
    expect(screen.queryByRole('link', { name: /Baixar currículo/ })).not.toBeInTheDocument()
  })
})
