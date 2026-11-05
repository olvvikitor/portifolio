import { useEffect, useState, type RefObject } from 'react'

type Box = { top: number; bottom: number }

// A moldura "flutua" quando está grudada no topo (sticky) e o projeto continua rolando por baixo dela.
// Parada no lugar original ou já apoiada no fim do projeto, não flutua.
export function isFloating(frame: Box, article: Box, top: number, pad: number): boolean {
  const stuck = Math.abs(frame.top - top) < 1 && article.top < top
  const resting = frame.bottom >= article.bottom - pad - 1
  return stuck && !resting
}

export function useFloating(frameRef: RefObject<HTMLElement | null>, articleRef: RefObject<HTMLElement | null>) {
  const [floating, setFloating] = useState(false)

  useEffect(() => {
    const frame = frameRef.current
    const article = articleRef.current
    if (!frame || !article) return
    let raf = 0
    const check = () => {
      raf = 0
      const style = getComputedStyle(frame)
      if (style.position !== 'sticky') return setFloating(false) // mobile: a moldura não gruda
      const pad = parseFloat(getComputedStyle(article).paddingBottom) || 0
      setFloating(isFloating(frame.getBoundingClientRect(), article.getBoundingClientRect(), parseFloat(style.top), pad))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [frameRef, articleRef])

  return floating
}
