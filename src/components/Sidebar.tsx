import { profile } from '../data/profile'
import { useTheme } from '../hooks/useTheme'
import { ArrowUpRight, Moon, Sun } from './icons'

type Props = {
  sections: { id: string; label: string }[]
  active: string
}

export function Sidebar({ sections, active }: Props) {
  const { theme, toggle } = useTheme()

  return (
    <header className="sidebar">
      <div className="sidebar-top">
        <p className="eyebrow">{profile.role}</p>
        <h1 className="name">{profile.shortName}</h1>
        <p className="pitch">{profile.pitch}</p>
        <p className="location">{profile.location}</p>
      </div>

      <nav className="nav" aria-label="Seções">
        <ol>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={active === s.id ? 'is-active' : undefined}
                aria-current={active === s.id ? 'true' : undefined}
              >
                <span className="nav-index">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-links">
          {profile.links.map((l) => (
            <a key={l.label} className="link" href={l.href} target="_blank" rel="noreferrer">
              {l.label}
              <ArrowUpRight />
            </a>
          ))}
        </div>
        <button
          type="button"
          className="btn-icon"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'}
          title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  )
}
