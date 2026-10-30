import { useState } from 'react'
import { profile } from '../data/profile'
import { ArrowUpRight, Check, Copy } from './icons'
import { Section } from './Section'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard indisponível: o e-mail continua visível para copiar à mão */
    }
  }

  return (
    <Section id="contato" title="Contato">
      <p className="contact-lead">Aberto a vagas de backend e projetos com IA aplicada.</p>

      <div className="contact-mail">
        <span className="mail">{profile.email}</span>
        <div className="contact-actions">
          <button type="button" className="btn-secondary" onClick={copy}>
            {copied ? <Check /> : <Copy />}
            {copied ? 'Copiado' : 'Copiar e-mail'}
          </button>
          <a className="btn-primary" href={`mailto:${profile.email}`}>
            Enviar e-mail
          </a>
        </div>
      </div>

      <ul className="contact-links">
        {profile.links.map((l) => (
          <li key={l.label}>
            <a className="link" href={l.href} target="_blank" rel="noreferrer">
              {l.label}
              <ArrowUpRight />
            </a>
          </li>
        ))}
      </ul>

      <footer className="footer">
        <p>
          {profile.name} · {new Date().getFullYear()}
        </p>
      </footer>
    </Section>
  )
}
