import type { CSSProperties } from 'react'
import type { Project } from '../data/profile'
import { profile } from '../data/profile'
import { ArrowUpRight } from './icons'
import { ProjectPanel } from './ProjectPanel'
import { Section } from './Section'
import './ProjectList.css'

export function ProjectList({ projects }: { projects: Project[] }) {
  const github = profile.links.find((l) => l.label === 'GitHub')
  // +1 linha para "outros projetos internos"; o índice preenche coluna por coluna.
  const rows = Math.ceil((projects.length + 1) / 2)

  return (
    <Section id="projetos" label="Projetos" title="Uma seleção do que *construí* no trabalho e por conta própria.">
      <nav aria-label="Índice de projetos" className="index">
        <ol className="index-list" style={{ '--rows': rows } as CSSProperties}>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <a href={`#projetos/${p.slug}`}>
                <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="index-name">{p.name}</span>
                <span className="index-tag">{p.tag}</span>
              </a>
            </li>
          ))}
          <li className="index-more">
            <span className="index-num">+</span>
            <span className="index-name">Outros projetos internos, sob sigilo</span>
          </li>
        </ol>
      </nav>

      <div className="projects">
        {projects.map((p, i) => (
          <ProjectPanel key={p.slug} project={p} number={i + 1} />
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
