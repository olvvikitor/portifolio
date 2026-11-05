import { profile, projects } from '../data/profile'
import { Emph } from './Emph'
import { ArrowUpRight } from './icons'
import './Hero.css'

export function Hero() {
  const featured = projects.find((p) => p.image && p.site)
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

        {featured?.image && featured.site && (
          <figure className="hero-figure">
            <div className="frame">
              <a className="shot" href={featured.site} target="_blank" rel="noreferrer" tabIndex={-1}>
                <img
                  src={featured.image.src}
                  alt={featured.image.alt}
                  width={featured.image.width}
                  height={featured.image.height}
                />
              </a>
            </div>
            <figcaption>
              <span>
                <strong>{featured.name}</strong>
              </span>
              <a className="link" href={featured.site} target="_blank" rel="noreferrer">
                Abrir site
                <ArrowUpRight />
              </a>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}
