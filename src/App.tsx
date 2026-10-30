import { useEffect } from 'react'
import { projects } from './data/profile'
import { readHash } from './lib/hash'
import { useActiveSection } from './hooks/useActiveSection'
import { TopBar } from './components/TopBar'
import { Hero } from './components/Hero'
import { ProjectTabs } from './components/ProjectTabs'
import { Experience } from './components/Experience'
import { About } from './components/About'
import { Education } from './components/Education'
import { Contact } from './components/Contact'

const sectionIds = ['inicio', 'projetos', 'experiencia', 'sobre', 'formacao', 'contato']

export default function App() {
  const active = useActiveSection(sectionIds)

  // Links diretos (ex.: /#projetos/rag): o navegador não acha o id "projetos/rag", então rolamos até a
  // seção ao carregar e quando um hash com aba chega sem recarregar a página.
  useEffect(() => {
    const scrollToHash = (tabOnly: boolean) => {
      const hash = readHash()
      if (!hash || (tabOnly && !hash.includes('/'))) return
      document.getElementById(hash.split('/')[0])?.scrollIntoView()
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
        <ProjectTabs projects={projects} />
        <Experience />
        <About />
        <Education />
        <Contact />
      </main>
    </>
  )
}
