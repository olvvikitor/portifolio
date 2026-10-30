import { useEffect } from 'react'
import { projects } from './data/profile'
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

  // Links diretos (ex.: /#projetos/rag) chegam antes do React renderizar; rola até a seção depois.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1)).split('/')[0]
    if (id) document.getElementById(id)?.scrollIntoView()
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
