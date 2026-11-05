import type { ReactNode } from 'react'
import { Emph } from './Emph'

// Rótulo curto e suave + título em frase (o título é o nome acessível da seção). *Trecho* = destaque.
// A entrada aos poucos é por bloco (useReveal no App), não pela seção inteira.
type Props = { id: string; label: string; title: string; children: ReactNode }

export function Section({ id, label, title, children }: Props) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <p className="section-label">{label}</p>
      <h2 id={`${id}-title`} className="section-title">
        <Emph text={title} />
      </h2>
      {children}
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
