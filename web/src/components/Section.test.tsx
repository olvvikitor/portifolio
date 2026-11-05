import { render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { Section } from './Section'

afterEach(() => vi.unstubAllGlobals())

it('conteúdo da seção nasce visível, mesmo fora da tela (nada espera rolar para aparecer)', () => {
  // Observer que nunca dispara = seção abaixo da dobra.
  vi.stubGlobal('IntersectionObserver', class { observe() {} disconnect() {} })
  render(
    <Section id="projetos" label="Projetos" title="Título">
      <p>conteúdo</p>
    </Section>,
  )
  const hidden = screen.getByText('conteúdo').closest('.reveal:not(.is-visible)')
  expect(hidden).toBeNull()
  expect(screen.getByText('conteúdo').closest('.reveal')).toBeNull()
})
