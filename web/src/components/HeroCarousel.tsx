import { useRef, useState } from 'react'
import type { Project } from '../data/profile'
import { ArrowUpRight, ChevronLeft, ChevronRight } from './icons'

// Carrossel do topo: só projetos com imagem, um por vez, sem moldura (a captura direto). Quem tem site vem primeiro. Sem troca
// automática (o visitante decide quando passar). Trilho com scroll-snap: no celular, arrastar com o dedo já funciona;
// as setas só rolam o trilho. Sem site, a legenda diz "Em breve".
export function HeroCarousel({ projects }: { projects: Project[] }) {
  const slides = projects
    .filter((p): p is Project & { image: NonNullable<Project['image']> } => !!p.image)
    .sort((a, b) => Number(!a.site) - Number(!b.site))
  const track = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const go = (i: number) => {
    const next = (i + slides.length) % slides.length
    setCurrent(next)
    const el = track.current
    el?.scrollTo?.({ left: next * el.clientWidth, behavior: 'smooth' })
  }
  const onScroll = () => {
    const el = track.current
    if (el && el.clientWidth) setCurrent(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <section className="carousel" aria-roledescription="carrossel" aria-label="Projetos">
      <div ref={track} className="carousel-track" onScroll={onScroll}>
        {slides.map((p, i) => (
          <div
            key={p.slug}
            className="carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${slides.length}: ${p.name}`}
            inert={i !== current}
          >
            {p.site ? (
              <a className="shot carousel-shot" href={p.site} target="_blank" rel="noreferrer" tabIndex={-1}>
                <img src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} />
              </a>
            ) : (
              <div className="shot carousel-shot">
                <img src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} />
              </div>
            )}
            <div className="carousel-caption">
              <span>
                <strong>{p.name}</strong>
                <span className="carousel-tag">{p.tag}</span>
              </span>
              {p.site ? (
                <a className="link" href={p.site} target="_blank" rel="noreferrer">
                  Abrir site
                  <ArrowUpRight />
                </a>
              ) : (
                <span className="carousel-soon">Em breve</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button type="button" className="btn-icon" aria-label="Projeto anterior" onClick={() => go(current - 1)}>
          <ChevronLeft />
        </button>
        <span className="carousel-count" aria-live="polite">
          {current + 1} / {slides.length}
        </span>
        <button type="button" className="btn-icon" aria-label="Próximo projeto" onClick={() => go(current + 1)}>
          <ChevronRight />
        </button>
      </div>
    </section>
  )
}
