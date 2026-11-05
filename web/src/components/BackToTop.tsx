import { useEffect, useState } from 'react'
import { ArrowUp } from './icons'

// Aparece só depois da primeira tela (no topo não tem para onde voltar). A rolagem suave vem do
// scroll-behavior do html, que já respeita "reduzir movimento".
export function BackToTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!shown) return null
  return (
    <button type="button" className="btn-icon back-to-top" aria-label="Voltar ao topo" title="Voltar ao topo" onClick={() => window.scrollTo({ top: 0 })}>
      <ArrowUp />
    </button>
  )
}
