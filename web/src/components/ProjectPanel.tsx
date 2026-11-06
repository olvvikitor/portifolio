import type { Project } from '../data/profile'
import { FlowDiagram } from './FlowDiagram'
import { ArrowUpRight } from './icons'
import { ImageZoom } from './ImageZoom'
import { Stack } from './Section'

// Um projeto da lista, sem espaço vazio: em cima, texto à esquerda e imagem/fluxo à direita, na mesma altura (a moldura
// estica até o fim do texto e as ferramentas/links descem para o pé da coluna); embaixo, as dificuldades em 3 colunas.
// O id "projetos/<slug>" é o link direto (ex.: /#projetos/motionfy).
// É um slide do carrossel. `off`: fora da tela (só a ponta aparece); fica inerte, para o Tab não ir parar nele.
export function ProjectPanel({
  project: p,
  number,
  total,
  off,
}: {
  project: Project
  number?: number
  total?: number
  off?: boolean
}) {
  const titleId = `titulo-${p.slug}`

  return (
    <article
      id={`projetos/${p.slug}`}
      className={off ? 'project is-off' : 'project'}
      role="group"
      aria-roledescription="slide"
      aria-label={number && total ? `${number} de ${total}: ${p.name}` : p.name}
      inert={off}
      aria-hidden={off || undefined}
    >
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
        <h4 className="project-subhead">{p.labels?.problem ?? 'O problema'}</h4>
        <p className="project-body">{p.problem}</p>
        <h4 className="project-subhead">{p.labels?.solution ?? 'A solução'}</h4>
        <p className="project-body">{p.solution}</p>
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
        <div className="project-foot">
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
      </div>

      <div className={p.image ? 'frame' : 'frame frame-flow'}>
        {p.image && <ImageZoom image={p.image} label={p.name} />}
        <FlowDiagram steps={p.flow} core={p.flowCore} />
      </div>

      <div className="project-challenges-block">
        <h4 id={`dificuldades-${p.slug}`} className="project-subhead">
          Dificuldades e como resolvi
        </h4>
        <ol className="project-challenges" aria-labelledby={`dificuldades-${p.slug}`}>
          {p.challenges.map((c) => (
            <li key={c.issue}>
              <p className="challenge-issue">{c.issue}</p>
              <p className="challenge-fix">{c.fix}</p>
            </li>
          ))}
        </ol>
      </div>
    </article>
  )
}
