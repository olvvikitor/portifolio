import { profile } from '../data/profile'
import { useTheme } from '../hooks/useTheme'
import { Moon, Sun } from './icons'
import './TopBar.css'

const links = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'contato', label: 'Contato' },
]

export function TopBar({ active }: { active: string }) {
  const { theme, toggle } = useTheme()
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href="#inicio">
          {profile.shortName}
        </a>
        <nav aria-label="Seções" className="topnav">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'is-active' : undefined}
              aria-current={active === l.id ? 'true' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="btn-icon"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  )
}
