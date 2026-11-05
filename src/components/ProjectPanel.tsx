import type { Project } from '../data/profile'
import { FlowDiagram } from './FlowDiagram'
import { ArrowUpRight } from './icons'
import { Stack } from './Section'

export function ProjectPanel({ project: p }: { project: Project }) {
  return (
    <div role="tabpanel" id={`painel-${p.slug}`} aria-labelledby={`aba-${p.slug}`} tabIndex={0} className="panel">
      <div className="panel-text">
        <p className="meta">{p.status}</p>
        <h3 className="panel-title">{p.name}</h3>
        <p className="panel-summary">{p.summary}</p>
        <ul className="panel-highlights">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <Stack items={p.stack} />
        <div className="panel-links">
          {p.site && (
            <a className="link" href={p.site} target="_blank" rel="noreferrer">
              Abrir site
              <ArrowUpRight />
            </a>
          )}
          {p.repo ? (
            <a className="link" href={p.repo} target="_blank" rel="noreferrer">
              Ver código
              <ArrowUpRight />
            </a>
          ) : (
            <p className="meta">
              {p.kind === 'trabalho' ? 'Código privado · projeto de trabalho' : 'Código ainda não publicado'}
            </p>
          )}
        </div>
      </div>
      <div className="panel-media">
        {p.image && p.site && (
          <a className="shot" href={p.site} target="_blank" rel="noreferrer" tabIndex={-1}>
            <img src={p.image.src} alt={p.image.alt} width={1523} height={784} loading="lazy" />
          </a>
        )}
        <FlowDiagram steps={p.flow} core={p.flowCore} />
      </div>
    </div>
  )
}
