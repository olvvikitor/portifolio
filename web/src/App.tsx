import { useEffect } from 'react'
import { capabilities, projects } from './data/profile'
import { readHash } from './lib/hash'
import { useActiveSection } from './hooks/useActiveSection'
import { useReveal } from './hooks/useReveal'
import { TopBar } from './components/TopBar'
import { Hero } from './components/Hero'
import { Capabilities } from './components/Capabilities'
import { ProjectList } from './components/ProjectList'
import { Experience } from './components/Experience'
import { About } from './components/About'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { BackToTop } from './components/BackToTop'

const sectionIds = ['inicio', 'o-que-faco', 'projetos', 'experiencia', 'sobre', 'formacao', 'contato']

// Blocos que entram aos poucos durante a rolagem. O topo (hero) fica fora: é o que se vê ao abrir.
const revealBlocks = [
  '.section-label',
  '.section-title',
  '.projects', // o carrossel inteiro: os slides fora da tela nunca cruzariam a tela para entrar
  '.chapter',
  '.prose',
  '.principles-title',
  '.principles li',
  '.courses li',
  '.contact-mail',
  '.contact-links',
].join(', ')

export default function App() {
  const active = useActiveSection(sectionIds)

  // Links diretos (ex.: /#projetos/motionfy): rolamos até o projeto ao carregar (o conteúdo entra depois do
  // primeiro paint) e quando um hash com projeto chega sem recarregar a página.
  useEffect(() => {
    const scrollToHash = (projectOnly: boolean) => {
      const hash = readHash()
      if (!hash || (projectOnly && !hash.includes('/'))) return
      // Projeto ("projetos/<slug>"): o carrossel já vai até o do hash, então rolamos até a seção.
      const target = document.getElementById(hash.split('/')[0])
      // Ao abrir: salto instantâneo (sem a rolagem suave do CSS), para o useReveal medir já no lugar certo.
      target?.scrollIntoView(projectOnly ? undefined : { behavior: 'instant' })
    }
    const onHash = () => scrollToHash(true)
    scrollToHash(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Depois da rolagem do link direto: o salto dispara um scroll, então o projeto aberto pelo link já aparece.
  useReveal(revealBlocks)

  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <TopBar active={active} />
      <main id="conteudo" className="page">
        <Hero />
        <Capabilities items={capabilities} />
        <ProjectList projects={projects} />
        <Experience />
        <About />
        <Education />
        <Contact />
      </main>
      <BackToTop />
    </>
  )
}
