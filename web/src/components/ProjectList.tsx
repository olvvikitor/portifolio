import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import type { Project } from '../data/profile'
import { profile } from '../data/profile'
import { readHash } from '../lib/hash'
import { ArrowUpRight, ChevronLeft, ChevronRight } from './icons'
import { ProjectPanel } from './ProjectPanel'
import { Section } from './Section'
import './ProjectList.css'

// Um projeto por vez, para a página não ficar enorme: o índice no alto vira abas (o selecionado ganha fundo) e as
// setas passam para o anterior/próximo. Os outros ficam no DOM com `hidden`, então o link direto
// (#projetos/<slug>) continua achando o projeto: ao abrir ou trocar o hash, ele vira o selecionado.
export function ProjectList({ projects }: { projects: Project[] }) {
  const github = profile.links.find((l) => l.label === 'GitHub')
  const rows = Math.ceil(projects.length / 2) // o índice preenche coluna por coluna
  const fromHash = () => projects.findIndex((p) => readHash() === `projetos/${p.slug}`)
  const [current, setCurrent] = useState(() => Math.max(0, fromHash()))
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const onHash = () => {
      const i = fromHash()
      if (i !== -1) setCurrent(i)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  })

  const select = (i: number, focusTab = false) => {
    const next = (i + projects.length) % projects.length
    setCurrent(next)
    // Atualiza o link direto sem rolar a página nem criar entrada no histórico.
    window.history.replaceState(null, '', `#projetos/${projects[next].slug}`)
    if (focusTab) tabs.current[next]?.focus()
  }
  // Teclado nas abas (padrão ARIA): setas passam, Home/End vão às pontas.
  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowDown: current + 1,
      ArrowLeft: current - 1,
      ArrowUp: current - 1,
      Home: 0,
      End: projects.length - 1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    select(keys[e.key], true)
  }

  return (
    <Section id="projetos" label="Projetos" title="Uma seleção do que *construí* no trabalho e por conta própria.">
      <nav aria-label="Índice de projetos" className="index">
        <div role="tablist" aria-label="Projetos" className="index-list" style={{ '--rows': rows } as CSSProperties} onKeyDown={onKey}>
          {projects.map((p, i) => (
            <button
              key={p.slug}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`aba-${p.slug}`}
              aria-selected={i === current}
              aria-controls={`projetos/${p.slug}`}
              tabIndex={i === current ? 0 : -1}
              onClick={() => select(i)}
            >
              <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="index-name">{p.name}</span>
              <span className="index-tag">{p.tag}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="projects">
        <div className="project-nav">
          <button type="button" className="btn-icon" aria-label="Projeto anterior" onClick={() => select(current - 1)}>
            <ChevronLeft />
          </button>
          <span className="project-count" aria-live="polite">
            {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <button type="button" className="btn-icon" aria-label="Próximo projeto" onClick={() => select(current + 1)}>
            <ChevronRight />
          </button>
        </div>
        {projects.map((p, i) => (
          <ProjectPanel key={p.slug} project={p} number={i + 1} hidden={i !== current} />
        ))}
      </div>

      {github && (
        <a className="link more" href={`${github.href}?tab=repositories`} target="_blank" rel="noreferrer">
          Todos os repositórios no GitHub
          <ArrowUpRight />
        </a>
      )}
    </Section>
  )
}
