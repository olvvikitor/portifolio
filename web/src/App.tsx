import { useEffect } from 'react'
import { projects } from './data/profile'
import { readHash } from './lib/hash'
import { useActiveSection } from './hooks/useActiveSection'
import { TopBar } from './components/TopBar'
import { Hero } from './components/Hero'
import { ProjectList } from './components/ProjectList'
import { Experience } from './components/Experience'
import { About } from './components/About'
import { Education } from './components/Education'
import { Contact } from './components/Contact'

const sectionIds = ['inicio', 'projetos', 'experiencia', 'sobre', 'formacao', 'contato']

export default function App() {
  const active = useActiveSection(sectionIds)

  // Links diretos (ex.: /#projetos/motionfy): rolamos até o projeto ao carregar (o conteúdo entra depois do
  // primeiro paint) e quando um hash com projeto chega sem recarregar a página.
  useEffect(() => {
    const scrollToHash = (projectOnly: boolean) => {
      const hash = readHash()
      if (!hash || (projectOnly && !hash.includes('/'))) return
      // O projeto tem id "projetos/<slug>"; se não existir, cai na seção.
      const target = document.getElementById(hash) ?? document.getElementById(hash.split('/')[0])
      target?.scrollIntoView()
    }
    const onHash = () => scrollToHash(true)
    scrollToHash(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <TopBar active={active} />
      <main id="conteudo" className="page">
        <Hero />
        <ProjectList projects={projects} />
        <Experience />
        <About />
        <Education />
        <Contact />
      </main>
    </>
  )
}
