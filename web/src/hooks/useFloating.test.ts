import { describe, expect, it } from 'vitest'
import { isFloating } from './useFloating'

// top = onde a moldura gruda (88px); pad = espaço interno do projeto embaixo (40px)
const box = (top: number, bottom: number) => ({ top, bottom })

describe('isFloating', () => {
  it('parada no lugar (projeto ainda não passou do topo): sem sombra', () => {
    expect(isFloating(box(300, 700), box(260, 1500), 88, 40)).toBe(false)
  })

  it('grudada no topo enquanto o texto rola: com sombra', () => {
    expect(isFloating(box(88, 488), box(-400, 1100), 88, 40)).toBe(true)
  })

  it('encostou no fim do projeto e sobe junto: sem sombra', () => {
    expect(isFloating(box(20, 420), box(-900, 460), 88, 40)).toBe(false)
  })
})
