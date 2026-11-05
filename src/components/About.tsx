import { principles, profile } from '../data/profile'
import { Section } from './Section'

// Quem sou e como trabalho. A formação fica na seção própria; as ferramentas, em Projetos.
export function About() {
  return (
    <Section id="sobre" label="Sobre" title="Transformo problema do dia a dia em *sistema que funciona sozinho*.">
      <p className="prose">{profile.about}</p>

      <h3 id="principios" className="principles-title">
        Como eu trabalho
      </h3>
      <ol className="principles" aria-labelledby="principios">
        {principles.map((p, i) => (
          <li key={p.title}>
            <span className="principle-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="principle-name">{p.title}</p>
            <p className="principle-text">{p.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
