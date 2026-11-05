import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../data/profile'
import { Expand } from './icons'

type Props = { image: NonNullable<Project['image']>; label: string }

// Captura de tela na moldura: clicar abre em tamanho grande (a moldura é estreita e o texto do app fica pequeno).
// Fecha com Esc, clique fora ou no botão; o foco volta para a imagem.
export function ImageZoom({ image, label }: Props) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <button ref={triggerRef} type="button" className="shot shot-zoom" onClick={() => setOpen(true)} aria-label={`Ampliar imagem: ${label}`}>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
        <span className="shot-hint" aria-hidden="true">
          <Expand />
          Ampliar
        </span>
      </button>

      {open &&
        createPortal(
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={label} onClick={() => setOpen(false)}>
            <button ref={closeRef} type="button" className="lightbox-close" onClick={() => setOpen(false)}>
              Fechar
            </button>
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
  )
}
