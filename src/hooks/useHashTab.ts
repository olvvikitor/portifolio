import { useCallback, useEffect, useState } from 'react'
import { readHash } from '../lib/hash'

function parse(section: string): string | null {
  const [head, slug] = readHash().split('/')
  return head === section && slug ? slug : null
}

// Aba ativa de uma seção guardada na URL: #<section>/<slug>. `slugs` precisa ser estável.
export function useHashTab(section: string, slugs: string[]) {
  const pick = useCallback(
    (slug: string | null) => (slug && slugs.includes(slug) ? slug : slugs[0]),
    [slugs],
  )
  const [active, setActive] = useState(() => pick(parse(section)))

  useEffect(() => {
    const onHash = () => {
      const slug = parse(section)
      if (slug) setActive(pick(slug))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [section, pick])

  const select = useCallback(
    (slug: string) => {
      setActive(slug)
      window.history.replaceState(null, '', `#${section}/${slug}`)
    },
    [section],
  )

  return [active, select] as const
}
