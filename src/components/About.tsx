import { profile, skills } from '../data/profile'
import { Section } from './Section'

export function About() {
  return (
    <Section id="sobre" title="Sobre">
      <p className="prose">{profile.about}</p>

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
