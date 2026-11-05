import { useEffect, useRef, useState, type ReactNode } from 'react'

// Entrada suave, uma vez, assim que a seção encosta na tela. Sem IntersectionObserver, mostra direto.
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (visible || !el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      // Dispara quando a borda passa 40px da base da tela. Fração da altura (ex.: 0.15) não serve:
      // em seção alta como Projetos, 15% é quase uma tela inteira de vazio.
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  return (
    <div ref={ref} className={visible ? 'reveal is-visible' : 'reveal'}>
      {children}
    </div>
  )
}
