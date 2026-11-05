import { useRef } from 'react'
import type { Project } from '../data/profile'
import { useFloating } from '../hooks/useFloating'
import { FlowDiagram } from './FlowDiagram'
import { ArrowUpRight } from './icons'
import { Stack } from './Section'

// Um projeto da lista: texto à esquerda, imagem/fluxo numa moldura à direita.
// O id "projetos/<slug>" é o link direto (ex.: /#projetos/motionfy).
export function ProjectPanel({ project: p, number }: { project: Project; number?: number }) {
  const titleId = `titulo-${p.slug}`
  const articleRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const floating = useFloating(frameRef, articleRef)
  const img = p.image && (
    <img src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" />
  )

  return (
    <article ref={articleRef} id={`projetos/${p.slug}`} className="project" aria-labelledby={titleId}>
      <div className="project-text">
        <p className="meta project-meta">
          {number !== undefined && <span className="project-num">{String(number).padStart(2, '0')}</span>}
          <span className="project-tag">{p.tag}</span>
          {p.context && (
            <>
              <span aria-hidden="true">·</span>
              {p.context}
            </>
          )}
        </p>
        <h3 id={titleId} className="project-title">
          {p.name}
        </h3>
        <p className="project-summary">{p.summary}</p>
        {(p.role || p.outcome) && (
          <dl className="project-facts">
            {p.role && (
              <div>
                <dt>Meu papel</dt>
                <dd>{p.role}</dd>
              </div>
            )}
            {p.outcome && (
              <div>
                <dt>Resultado</dt>
                <dd>{p.outcome}</dd>
              </div>
            )}
          </dl>
        )}
        <ul className="project-highlights">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <Stack items={p.stack} />
        <div className="project-links">
          {p.site && (
            <a className="btn-secondary" href={p.site} target="_blank" rel="noreferrer">
              Abrir site
              <ArrowUpRight />
            </a>
          )}
          {p.repo && (
            <a className="btn-secondary" href={p.repo} target="_blank" rel="noreferrer">
              Ver código
              <ArrowUpRight />
            </a>
          )}
        </div>
      </div>

      <div ref={frameRef} className={['frame', !img && 'frame-flow', floating && 'is-floating'].filter(Boolean).join(' ')}>
        {img &&
          (p.site ? (
            <a className="shot" href={p.site} target="_blank" rel="noreferrer" tabIndex={-1}>
              {img}
            </a>
          ) : (
            <div className="shot">{img}</div>
          ))}
        <FlowDiagram steps={p.flow} core={p.flowCore} />
      </div>
    </article>
  )
}
