import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { Project } from '../data/profile'
import { profile } from '../data/profile'
import { readHash } from '../lib/hash'
import { ArrowUpRight } from './icons'
import { ProjectPanel } from './ProjectPanel'
import { Section } from './Section'
import './ProjectList.css'

// Carrossel de projetos, sem índice e sem botões: um trilho com scroll-snap. No celular e no trackpad, arrastar já
// funciona; com mouse, arrastar também (feito à mão abaixo); com teclado, foco no trilho e setas. A ponta do próximo
// projeto aparece na borda, para mostrar que há mais. Os pontos embaixo só indicam a posição (não são clicáveis).
// Cada slide tem a própria altura (sem espaço vazio no menor); o trilho acompanha a altura do slide atual, com transição.
// Link direto (#projetos/<slug>): ao abrir ou trocar o hash, o trilho vai até aquele projeto.
export function ProjectList({ projects }: { projects: Project[] }) {
  const github = profile.links.find((l) => l.label === 'GitHub')
  const fromHash = () => projects.findIndex((p) => readHash() === `projetos/${p.slug}`)
  const [current, setCurrent] = useState(() => Math.max(0, fromHash()))
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null)

  // Distância entre o início de dois slides vizinhos (largura do slide + espaço).
  const step = () => {
    const el = track.current
    const slides = el?.children
    if (!el || !slides || slides.length < 2) return el?.clientWidth || 1
    return (slides[1] as HTMLElement).offsetLeft - (slides[0] as HTMLElement).offsetLeft || el.clientWidth || 1
  }
  const goTo = (i: number, behavior: ScrollBehavior = 'smooth') => {
    const next = Math.min(projects.length - 1, Math.max(0, i))
    track.current?.scrollTo?.({ left: next * step(), behavior })
    setCurrent(next)
  }

  // Abre no projeto do hash (sem animação) e acompanha trocas de hash sem recarregar.
  useEffect(() => {
    const start = fromHash()
    if (start > 0) goTo(start, 'instant')
    const onHash = () => {
      const i = fromHash()
      if (i !== -1) goTo(i)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só ao montar
  }, [])

  // Altura do trilho = altura do slide atual (e acompanha se ele mudar, ex.: ao redimensionar a janela).
  useLayoutEffect(() => {
    const el = track.current
    const slide = el?.children[current] as HTMLElement | undefined
    if (!el || !slide) return
    const fit = () => {
      el.style.height = `${slide.offsetHeight}px`
    }
    fit()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(fit)
    ro.observe(slide)
    return () => ro.disconnect()
  }, [current])

  // O slide atual é o mais perto da posição do trilho. Atualiza o link direto sem rolar a página nem criar histórico.
  const onScroll = () => {
    const el = track.current
    if (!el) return
    const i = Math.min(projects.length - 1, Math.max(0, Math.round(el.scrollLeft / step())))
    if (i === current) return
    setCurrent(i)
    window.history.replaceState(null, '', `#projetos/${projects[i].slug}`)
  }

  // Arrastar com o mouse (toque e trackpad já rolam sozinhos). Durante o arraste o snap fica desligado; ao soltar,
  // vai para o vizinho se passou de 15% do slide, senão volta.
  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !track.current) return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
  }
  const onPointerMove = (e: ReactPointerEvent) => {
    const d = drag.current
    const el = track.current
    if (!d || !el) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) < 6) return
    if (!d.moved) {
      d.moved = true
      el.setPointerCapture(e.pointerId)
      el.classList.add('is-dragging')
    }
    el.scrollLeft = d.left - dx
  }
  const onPointerUp = () => {
    const d = drag.current
    const el = track.current
    drag.current = null
    if (!d?.moved || !el) return
    el.classList.remove('is-dragging')
    const delta = (el.scrollLeft - d.left) / step()
    const from = Math.round(d.left / step())
    goTo(Math.abs(delta) > 0.15 ? from + Math.sign(delta) : from)
    // O clique que vem logo depois do arraste não deve abrir link nem a imagem.
    el.addEventListener('click', (ev) => ev.preventDefault(), { capture: true, once: true })
  }

  return (
    <Section id="projetos" label="Projetos" title="Uma seleção do que *construí* no trabalho e por conta própria.">
      <section className="projects" aria-roledescription="carrossel" aria-label="Projetos">
        <div
          ref={track}
          className="projects-track"
          tabIndex={0}
          aria-label="Projetos. Use as setas para passar."
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {projects.map((p, i) => (
            <ProjectPanel key={p.slug} project={p} number={i + 1} total={projects.length} off={i !== current} />
          ))}
        </div>
        <div className="projects-dots" aria-hidden="true">
          {projects.map((p, i) => (
            <span key={p.slug} className={i === current ? 'is-current' : undefined} />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Projeto {current + 1} de {projects.length}: {projects[current].name}
        </p>
      </section>

      {github && (
        <a className="link more" href={`${github.href}?tab=repositories`} target="_blank" rel="noreferrer">
          Todos os repositórios no GitHub
          <ArrowUpRight />
        </a>
      )}
    </Section>
  )
}
