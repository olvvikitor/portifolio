import { profile } from '../data/profile'
import { Emph } from './Emph'
import { ArrowUpRight } from './icons'
import './Hero.css'

export function Hero() {
  const github = profile.links.find((l) => l.label === 'GitHub')

  return (
    <section id="inicio" className="hero" aria-labelledby="inicio-title">
      <div className="hero-main">
        <div className="hero-text">
          <p className="hero-name">{profile.name}</p>
          <h1 id="inicio-title" className="hero-title">
            <Emph text={profile.headline} />
          </h1>
          <p className="hero-sub">{profile.specialties}</p>
          <div className="hero-actions">
            <a className="btn-primary" href="#projetos">
              Ver projetos
            </a>
            {github && (
              <a className="btn-secondary" href={github.href} target="_blank" rel="noreferrer">
                GitHub
                <ArrowUpRight />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
