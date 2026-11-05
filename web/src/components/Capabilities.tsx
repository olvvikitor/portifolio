import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Capability } from '../data/profile'
import { Section } from './Section'
import { ToolIcon } from './ToolIcon'

// "O que faço", seção própria entre o topo e Projetos: nome da área grande em cima, texto embaixo. Modo foco: só a área
// que cruza o meio da tela fica visível, as outras somem; ao rolar, uma sai e a próxima entra. Como as outras
// entradas da página, nada aparece antes da primeira rolagem. Sem IntersectionObserver, tudo fica visível.
export function Capabilities({ items }: { items: Capability[] }) {
  const refs = useRef<(HTMLLIElement | null)[]>([])
  const [focus, setFocus] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    let scrolled = false
    let centered: number | null = null
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = refs.current.indexOf(e.target as HTMLLIElement)
          if (e.isIntersecting) centered = i
          else if (centered === i) centered = null
        }
        if (scrolled) setActive(centered)
      },
      // Faixa fina no meio da tela: só um item cabe nela por vez.
      { rootMargin: '-45% 0px -45% 0px' },
    )
    const onScroll = () => {
      scrolled = true
      setActive(centered)
      window.removeEventListener('scroll', onScroll)
    }
    setFocus(true)
    refs.current.forEach((el) => el && io.observe(el))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <Section id="o-que-faco" label="O que faço" title="Onde meu trabalho *faz diferença*.">
      <ul className={focus ? 'capability-list is-focus' : 'capability-list'} aria-labelledby="o-que-faco-title">
        {items.map((c, i) => (
          <li
            key={c.title}
            ref={(el) => {
              refs.current[i] = el
            }}
            className={i === active ? 'capability is-active' : 'capability'}
          >
            <h4 className="capability-name">{c.title}</h4>
            <p className="capability-text">{c.text}</p>
            {c.tools.length > 0 && (
              <ul className="tools" aria-label={'Ferramentas de ' + c.title}>
                {c.tools.map((t, j) => (
                  <li key={t} className="tool" style={{ '--i': j } as CSSProperties}>
                    <ToolIcon name={t} />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
