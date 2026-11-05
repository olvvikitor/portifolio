import { useEffect } from 'react'

// Entrada aos poucos, só depois que a pessoa começa a rolar: ao abrir a página, os blocos (mesmo os que já
// estão na tela) ficam ocultos; na primeira rolagem aparecem os que estão à vista, e o resto conforme entra.
// Por bloco, não por seção: uma seção alta como Projetos inteira escondida deixava a página em branco.
// A classe "reveal-on" no <html> só entra quando o observer existe; sem ele, nada fica escondido.
export function useReveal(selector: string) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const root = document.documentElement
    const inView = new Set<Element>()
    let scrolled = false

    const show = (el: Element) => {
      el.classList.add('is-visible')
      inView.delete(el)
      io.unobserve(el)
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) inView.delete(e.target)
          else if (scrolled) show(e.target)
          else inView.add(e.target)
        }
      },
      { threshold: 0 }, // assim que encosta na tela
    )
    const onScroll = () => {
      scrolled = true
      inView.forEach(show)
      window.removeEventListener('scroll', onScroll)
    }

    root.classList.add('reveal-on')
    document.querySelectorAll(selector).forEach((el) => io.observe(el))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      root.classList.remove('reveal-on')
    }
  }, [selector])
}
