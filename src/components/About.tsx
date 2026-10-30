import { profile, skills } from '../data/profile'
import { Section } from './Section'

export function About() {
  return (
    <Section id="sobre" title="Sobre">
      <div className="prose">
        {profile.about.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </div>

      <dl className="skills">
        {skills.map((s) => (
          <div key={s.group} className="skills-row">
            <dt>{s.group}</dt>
            <dd>{s.items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
