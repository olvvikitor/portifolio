import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = { id: string; title: string; children: ReactNode }

export function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <Reveal>
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
        {children}
      </Reveal>
    </section>
  )
}

export function Stack({ items }: { items: string[] }) {
  return (
    <ul className="stack" aria-label="Tecnologias">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}
