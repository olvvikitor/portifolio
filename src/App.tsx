import { useEffect } from 'react'
import { useActiveSection } from './hooks/useActiveSection'
import { Sidebar } from './components/Sidebar'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Contact } from './components/Contact'

const sections = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'formacao', label: 'Formação' },
  { id: 'contato', label: 'Contato' },
]

const sectionIds = sections.map((s) => s.id)

export default function App() {
  const active = useActiveSection(sectionIds)

  // Links diretos (ex.: /#projetos) chegam antes do React renderizar; rola até a seção depois.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <div className="layout">
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Sidebar sections={sections} active={active} />
      <main id="conteudo" className="content">
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  )
}
