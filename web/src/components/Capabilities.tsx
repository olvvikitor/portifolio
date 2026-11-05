import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Capability } from '../data/profile'
import { Section } from './Section'
import { ToolIcon } from './ToolIcon'

// Qual área está no meio da tela. Mede o <li>, que nunca se mexe (a animação fica no .capability-body de dentro):
// medir o que anima fazia a área ativa sair da faixa ao subir e a vizinha voltar, num pisca-pisca sem fim.
// Entre duas áreas (nenhuma no meio) a atual continua; acima da primeira ou abaixo da última, nenhuma.
function centeredIndex(els: (HTMLElement | null)[], current: number | null): number | null {
  const mid = window.innerHeight / 2
  const rects = els.map((el) => el?.getBoundingClientRect())
  const first = rects[0]
  const last = rects[rects.length - 1]
  if (!first || !last || first.top > mid || last.bottom < mid) return null
  const i = rects.findIndex((r) => r && r.top <= mid && r.bottom > mid)
  return i === -1 ? current : i
}

// "O que faço", seção própria entre o topo e Projetos: nome da área grande em cima, texto embaixo. Modo foco: só a área
// no meio da tela fica visível, as outras somem; ao rolar, uma sai e a próxima entra. Como as outras entradas da
// página, nada aparece antes da primeira rolagem.
export function Capabilities({ items }: { items: Capability[] }) {
  const refs = useRef<(HTMLLIElement | null)[]>([])
  const [focus, setFocus] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    let current: number | null = null
    const update = () => {
      current = centeredIndex(refs.current, current)
      setActive(current)
    }
    setFocus(true)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <Section id="o-que-faco" label="O que faço" title="Onde meu trabalho *faz diferença*.">
      <ul className={focus ? 'capability-list is-focus' : 'capability-list'} aria-labelledby="o-que-faco-title">
        {items.map((c, i) => (
          <li
            key={c.title}
            ref={(el) => {
              refs.current[i] = el
            }}
            className={i === active ? 'capability is-active' : 'capability'}
          >
            <div className="capability-body">
              <h4 className="capability-name">{c.title}</h4>
              <p className="capability-text">
                <Highlight text={c.text} />
              </p>
              {c.tools.length > 0 && (
                <ul className="tools" aria-label={'Ferramentas de ' + c.title}>
                  {c.tools.map((t, j) => (
                    <li key={t} className="tool" style={{ '--i': j } as CSSProperties}>
                      <ToolIcon name={t} />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// Frases-chave do texto: o que vem entre ==sinais== sai com fundo de marca-texto, que no modo foco é "passado" da
// esquerda para a direita, uma frase depois da outra (--m), quando a área entra.
function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split('==').map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="highlight" style={{ '--m': (i - 1) / 2 } as CSSProperties}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}
