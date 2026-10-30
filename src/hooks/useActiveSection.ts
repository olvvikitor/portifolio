import { useEffect, useState } from 'react'

// `ids` precisa ser estável (definido fora do componente).
// Marca como ativa a última seção cujo topo já passou de ~35% da altura da janela.
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4
      setActive(atBottom ? ids[ids.length - 1] : current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
