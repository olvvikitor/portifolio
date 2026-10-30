import { useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import type { Project } from '../data/profile'
import { profile } from '../data/profile'
import { useHashTab } from '../hooks/useHashTab'
import { ArrowUpRight } from './icons'
import { ProjectPanel } from './ProjectPanel'
import { Section } from './Section'
import './ProjectTabs.css'

export function ProjectTabs({ projects }: { projects: Project[] }) {
  const slugs = useMemo(() => projects.map((p) => p.slug), [projects])
  const [active, select] = useHashTab('projetos', slugs)
  const index = Math.max(0, slugs.indexOf(active))
  const listRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [bar, setBar] = useState({ left: 0, width: 0 })
  const github = profile.links.find((l) => l.label === 'GitHub')

  // Posiciona o indicador e rola a faixa de abas (só na horizontal) até a aba ativa.
  useLayoutEffect(() => {
    const place = () => {
      const tab = tabRefs.current[index]
      const list = listRef.current
      if (!tab || !list) return
      setBar({ left: tab.offsetLeft, width: tab.offsetWidth })
      const start = tab.offsetLeft - list.scrollLeft
      if (start < 0 || start + tab.offsetWidth > list.clientWidth) list.scrollLeft = tab.offsetLeft - 16
    }
    place()
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => window.removeEventListener('resize', place)
  }, [index])

  const onKeyDown = (e: KeyboardEvent) => {
    const last = slugs.length - 1
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : -1
    if (next < 0) return
    e.preventDefault()
    select(slugs[next])
    tabRefs.current[next]?.focus()
  }

  const project = projects[index]

  return (
    <Section id="projetos" title="Projetos">
      <div className="tabs" ref={listRef} role="tablist" aria-label="Projetos" onKeyDown={onKeyDown}>
        {projects.map((p, i) => (
          <button
            key={p.slug}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            id={`aba-${p.slug}`}
            type="button"
            role="tab"
            className="tab"
            aria-selected={i === index}
            aria-controls={`painel-${p.slug}`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(p.slug)}
          >
            {p.name}
          </button>
        ))}
        <span
          className="tabs-bar"
          aria-hidden="true"
          style={{ transform: `translateX(${bar.left}px)`, width: bar.width }}
        />
      </div>

      <ProjectPanel key={project.slug} project={project} />

      {github && (
        <a className="link more" href={`${github.href}?tab=repositories`} target="_blank" rel="noreferrer">
          Todos os repositórios no GitHub
          <ArrowUpRight />
        </a>
      )}
    </Section>
  )
}
