import { useEffect, useRef, useState, type ReactNode } from 'react'

// Entrada suave, uma vez. Sem IntersectionObserver, mostra direto.
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
      { threshold: 0.15 },
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
