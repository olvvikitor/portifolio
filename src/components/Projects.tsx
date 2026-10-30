import { profile, projects } from '../data/profile'
import { ArrowUpRight } from './icons'
import { Section, Stack } from './Section'

export function Projects() {
  const github = profile.links.find((l) => l.label === 'GitHub')

  return (
    <Section id="projetos" title="Projetos">
      <ul className="projects">
        {projects.map((p) => (
          <li key={p.name} className="project">
            <div className="project-head">
              <h3>
                {/* O link principal cobre a linha inteira (site, se houver; senão, o código). */}
                <a className="project-main" href={p.site ?? p.repo} target="_blank" rel="noreferrer">
                  {p.name}
                </a>
              </h3>
              {p.tag && <span className="meta">{p.tag}</span>}
              <span className="project-ctas">
                {p.site && (
                  <a className="project-cta" href={p.site} target="_blank" rel="noreferrer" tabIndex={-1}>
                    Ver site
                    <ArrowUpRight />
                  </a>
                )}
                <a className="project-cta" href={p.repo} target="_blank" rel="noreferrer">
                  Ver código
                  <ArrowUpRight />
                </a>
              </span>
            </div>
            <p>{p.description}</p>
            <Stack items={p.stack} />
          </li>
        ))}
      </ul>

      {github && (
        <a className="link more" href={`${github.href}?tab=repositories`} target="_blank" rel="noreferrer">
          Todos os repositórios no GitHub
          <ArrowUpRight />
        </a>
      )}
    </Section>
  )
}
