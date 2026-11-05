import { journey } from '../data/profile'
import { Section } from './Section'

// Trajetória em capítulos, do mais recente ao começo. Portfólio, não currículo: sem datas nem cargos formais.
export function Experience() {
  return (
    <Section id="experiencia" label="Experiência" title="Do *atendimento* ao *desenvolvimento*, sempre perto de quem usa.">
      <ol className="journey">
        {journey.map((c) => (
          <li key={c.label} className="chapter">
            <p className="chapter-label">{c.label}</p>
            <div className="chapter-body">
              <h3>{c.title}</h3>
              <p className="chapter-text">{c.text}</p>
              {c.points && (
                <ul className="chapter-points">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
