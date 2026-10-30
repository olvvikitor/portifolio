import { education } from '../data/profile'
import { Section } from './Section'

export function Education() {
  return (
    <Section id="formacao" title="Formação">
      <ul className="courses">
        {education.map((c) => (
          <li key={c.title}>
            <h3>{c.title}</h3>
            <p className="meta">
              {c.school} · {c.place} · <time>{c.period}</time>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
