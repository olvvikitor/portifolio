import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useHashTab } from './useHashTab'

const slugs = ['motionfy', 'rag', 'dr-autoparts']

describe('useHashTab', () => {
  it('sem hash abre a primeira aba', () => {
    const { result } = renderHook(() => useHashTab('projetos', slugs))
    expect(result.current[0]).toBe('motionfy')
  })

  it('lê a aba do hash', () => {
    window.history.replaceState(null, '', '/#projetos/rag')
    const { result } = renderHook(() => useHashTab('projetos', slugs))
    expect(result.current[0]).toBe('rag')
  })

  it('slug inválido ou hash de outra seção cai na primeira', () => {
    window.history.replaceState(null, '', '/#projetos/xyz')
    expect(renderHook(() => useHashTab('projetos', slugs)).result.current[0]).toBe('motionfy')
    window.history.replaceState(null, '', '/#contato')
    expect(renderHook(() => useHashTab('projetos', slugs)).result.current[0]).toBe('motionfy')
  })

  it('select atualiza estado e URL', () => {
    const { result } = renderHook(() => useHashTab('projetos', slugs))
    act(() => result.current[1]('dr-autoparts'))
    expect(result.current[0]).toBe('dr-autoparts')
    expect(window.location.hash).toBe('#projetos/dr-autoparts')
  })

  it('segue hashchange só da própria seção', () => {
    const { result } = renderHook(() => useHashTab('projetos', slugs))
    act(() => {
      window.history.replaceState(null, '', '/#projetos/rag')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(result.current[0]).toBe('rag')
    act(() => {
      window.history.replaceState(null, '', '/#contato')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(result.current[0]).toBe('rag')
  })
})
