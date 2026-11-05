# Redesign do portfólio — plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar a sidebar por topo + hero com Motionfy em destaque e transformar os projetos em abas com
detalhes técnicos reais e diagrama de fluxo, com movimento discreto.

**Architecture:** SPA Vite + React. Todo o conteúdo em `src/data/profile.ts`; componentes pequenos por seção;
estado da aba de projetos sincronizado com a URL (`#projetos/<slug>`) por um hook. CSS próprio com tokens em
`index.css` e um arquivo `.css` por componente maior.

**Tech Stack:** Vite 6, React 19, TypeScript 5.8, CSS puro, Vitest 3 + Testing Library + jsdom.

**Spec:** `docs/superpowers/specs/2026-10-30-portfolio-redesign-design.md`

## Global Constraints

- Regras da skill `ui-sem-cara-de-ia`: botão primário neutro (fundo = `--text-primary`), sem gradiente, glow,
  sparkles, pílula neon, caixa alta com tracking, grade de cards idênticos, bounce.
- Cor de destaque (`--accent`) só em: ponto de status, indicador da aba, sublinhado em hover.
- Nenhuma animação em loop; `prefers-reduced-motion: reduce` desliga todas.
- Textos de projeto não afirmam nada além da tabela "Conteúdo dos projetos" do spec.
- Sem biblioteca de animação. Só português.
- Funciona em 375 px e 1440 px, temas claro e escuro.

**Decisão de implementação (desvio consciente do spec):** o `FlowDiagram` é uma `<ol>` estilizada em vez de
SVG gerado. Mesmo visual (caixas finas, setas, fonte mono), mas com quebra de linha e versão vertical em
< 560 px resolvidas por CSS, e lido naturalmente por leitores de tela. O teste "layout vertical" vira checagem
visual.

## Review Focus

1. Hash de outra seção (`#contato`) ou slug inválido (`#projetos/xyz`) → aba Motionfy, sem quebrar. (Task 2)
2. Abrir `/#projetos/rag` direto → página rola até Projetos e a aba RAG já está aberta. (Tasks 2 e 6)
3. Ambiente sem `IntersectionObserver` → conteúdo visível, nunca preso invisível. (Task 5)
4. Teclado nas abas: foco acompanha ←/→/Home/End e o painel muda junto. (Task 4)
5. Aba ativa fora da área visível no mobile → a faixa de abas rola até ela sem rolar a página. (Task 7, visual)

---

### Task 1: Git e ambiente de testes

**Files:**
- Modify: `package.json`, `vite.config.ts`
- Create: `src/test/setup.ts`, `src/test/smoke.test.ts`

- [ ] **Step 1: Git**

```bash
git init && git add -A && git commit -m "chore: portfólio inicial"
```

- [ ] **Step 2: Instalar dependências**

```bash
npm i -D vitest@3.2.4 jsdom@26.1.0 @testing-library/react@16.3.0 @testing-library/jest-dom@6.6.3 @testing-library/user-event@14.6.1
```

- [ ] **Step 3: Configurar** — `vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

`src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
  window.history.replaceState(null, '', '/')
})
```

`package.json` → scripts: `"test": "vitest run"`.

- [ ] **Step 4: Teste de fumaça** — `src/test/smoke.test.ts`:

```ts
import { expect, it } from 'vitest'
it('ambiente jsdom ativo', () => {
  expect(document.body).toBeInTheDocument()
})
```

Run: `npm test` → Expected: 1 passed. Depois apague o smoke test.

- [ ] **Step 5: Commit** — `git commit -am "chore: vitest + testing library"`

---

### Task 2: `useHashTab`

**Files:**
- Create: `src/hooks/useHashTab.ts`, `src/hooks/useHashTab.test.ts`

**Interfaces:**
- Produces: `useHashTab(section: string, slugs: string[]): readonly [active: string, select: (slug: string) => void]`
  — `slugs` precisa ser estável (memo ou constante).

- [ ] **Step 1: Teste**

```ts
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useHashTab } from './useHashTab'

const slugs = ['motionfy', 'rag', 'dr-autoparts']

describe('useHashTab', () => {
  it('sem hash abre a primeira aba', () => {
    const { result } = renderHook(() => useHashTab('projetos', slugs))
    expect(result.current[0]).toBe('motionfy')
  })

  it('lê a aba do hash', () => {
    window.history.replaceState(null, '', '/#projetos/rag')
    const { result } = renderHook(() => useHashTab('projetos', slugs))
    expect(result.current[0]).toBe('rag')
  })

  it('slug inválido ou hash de outra seção cai na primeira', () => {
    window.history.replaceState(null, '', '/#projetos/xyz')
    expect(renderHook(() => useHashTab('projetos', slugs)).result.current[0]).toBe('motionfy')
    window.history.replaceState(null, '', '/#contato')
    expect(renderHook(() => useHashTab('projetos', slugs)).result.current[0]).toBe('motionfy')
  })

  it('select atualiza estado e URL', () => {
    const { result } = renderHook(() => useHashTab('projetos', slugs))
    act(() => result.current[1]('dr-autoparts'))
    expect(result.current[0]).toBe('dr-autoparts')
    expect(window.location.hash).toBe('#projetos/dr-autoparts')
  })

  it('segue hashchange só da própria seção', () => {
    const { result } = renderHook(() => useHashTab('projetos', slugs))
    act(() => {
      window.history.replaceState(null, '', '/#projetos/rag')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(result.current[0]).toBe('rag')
    act(() => {
      window.history.replaceState(null, '', '/#contato')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(result.current[0]).toBe('rag')
  })
})
```

- [ ] **Step 2:** `npm test` → FAIL (módulo não existe).

- [ ] **Step 3: Implementação**

```ts
import { useCallback, useEffect, useState } from 'react'

function parse(section: string): string | null {
  const [head, slug] = decodeURIComponent(window.location.hash.slice(1)).split('/')
  return head === section && slug ? slug : null
}

// Aba ativa de uma seção guardada na URL: #<section>/<slug>. `slugs` precisa ser estável.
export function useHashTab(section: string, slugs: string[]) {
  const pick = useCallback(
    (slug: string | null) => (slug && slugs.includes(slug) ? slug : slugs[0]),
    [slugs],
  )
  const [active, setActive] = useState(() => pick(parse(section)))

  useEffect(() => {
    const onHash = () => {
      const slug = parse(section)
      if (slug) setActive(pick(slug))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [section, pick])

  const select = useCallback(
    (slug: string) => {
      setActive(slug)
      window.history.replaceState(null, '', `#${section}/${slug}`)
    },
    [section],
  )

  return [active, select] as const
}
```

- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** `git add -A && git commit -m "feat: hook useHashTab"`

---

### Task 3: Dados dos projetos + `FlowDiagram`

**Files:**
- Modify: `src/data/profile.ts` (tipo `Project`, lista `projects`, `profile.headline/specialties/status`, `about` em 1 parágrafo)
- Create: `src/components/FlowDiagram.tsx`, `src/components/FlowDiagram.test.tsx`

**Interfaces:**
- Produces:

```ts
export type Project = {
  slug: string
  name: string
  status: string        // ex.: 'No ar · 2026'
  summary: string
  highlights: string[]
  flow: string[]
  flowCore?: number     // índice do passo central (preenchido)
  stack: string[]
  repo: string
  site?: string
  image?: { src: string; alt: string }
}
```

- `FlowDiagram({ steps: string[]; core?: number })` → `<figure class="flow">` com `<ol>`; um `<li>` por passo,
  `.flow-arrow` antes de cada passo exceto o primeiro, `.is-core` no passo `core`.

- [ ] **Step 1: Teste**

```tsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { FlowDiagram } from './FlowDiagram'

it('um nó por passo, n-1 setas, passo central marcado', () => {
  const { container } = render(<FlowDiagram steps={['a', 'b', 'c']} core={1} />)
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
  expect(container.querySelectorAll('.flow-arrow')).toHaveLength(2)
  expect(screen.getByText('b').closest('li')).toHaveClass('is-core')
})
```

- [ ] **Step 2:** `npm test` → FAIL.

- [ ] **Step 3: Implementação**

```tsx
type Props = { steps: string[]; core?: number }

export function FlowDiagram({ steps, core }: Props) {
  return (
    <figure className="flow">
      <figcaption className="meta">Fluxo</figcaption>
      <ol className="flow-steps">
        {steps.map((step, i) => (
          <li key={step} className={i === core ? 'flow-step is-core' : 'flow-step'}>
            {i > 0 && <span className="flow-arrow" aria-hidden="true" />}
            <span className="flow-node">{step}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
```

`projects` em `profile.ts` (conteúdo da tabela do spec):

```ts
export const projects: Project[] = [
  {
    slug: 'motionfy',
    name: 'Motionfy',
    status: 'No ar · 2026',
    summary: 'Conecta ao Last.fm e traduz o que você escuta em humor, dia após dia. Dá para comparar com amigos.',
    highlights: [
      'Cada música vira um vetor emocional de 10 dimensões, classificado por IA a partir de gênero (MusicBrainz), BPM (Deezer) e trecho da letra (LRCLIB).',
      'Os centros de cada humor são aprendidos das músicas já analisadas: mediana por dimensão, puxada para um perfil base quando há poucas.',
      'Playlist "jornada": traça um caminho entre dois humores no espaço 10D e escolhe uma música por parada.',
      'Last.fm, Spotify e YouTube Music atrás de uma mesma interface; MusicBrainz respeitando 1 req/s com backoff exponencial.',
    ],
    flow: ['Last.fm', 'Enriquecimento', 'IA · vetor 10D', 'Jornada', 'Spotify'],
    flowCore: 2,
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'BullMQ', 'Redis', 'OpenAI'],
    repo: 'https://github.com/olvvikitor/motionfy',
    site: 'https://motionfy.fun/login',
    image: { src: '/projects/motionfy.jpg', alt: 'Tela de entrada do Motionfy: "O que você escuta diz como você se sente."' },
  },
  {
    slug: 'rag',
    name: 'RAG do zero',
    status: 'Estudo · 2026',
    summary: 'Pipeline de RAG montado sem framework, para entender cada etapa da busca.',
    highlights: [
      'BM25 implementado à mão (k1 = 1,5; b = 0,75).',
      'Embeddings locais com multilingual-e5-base e similaridade de cosseno.',
      'Busca híbrida: os dois rankings são combinados com Reciprocal Rank Fusion (k = 60).',
    ],
    flow: ['Documento', 'Chunks', 'BM25 + embeddings', 'RRF', 'LLM'],
    flowCore: 3,
    stack: ['TypeScript', 'Transformers.js', 'BM25'],
    repo: 'https://github.com/olvvikitor/estudo_rag',
  },
  {
    slug: 'dr-autoparts',
    name: 'DR Autoparts',
    status: 'API · 2025',
    summary: 'API de e-commerce de autopeças.',
    highlights: [
      'Catálogo de peças por modelo de veículo e fornecedor.',
      'Carrinho e painel administrativo com autenticação JWT.',
      'Imagens dos produtos no S3; documentação em Swagger.',
    ],
    flow: ['Cliente', 'API Nest', 'Prisma', 'PostgreSQL · S3'],
    flowCore: 1,
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'AWS S3', 'Swagger'],
    repo: 'https://github.com/olvvikitor/dr_autoparts_backend',
  },
  {
    slug: 'anjo-bom',
    name: 'Anjo Bom',
    status: 'API · 2024',
    summary: 'Plataforma de doações com pontos de coleta e eventos.',
    highlights: [
      'Pagamento das doações via Mercado Pago.',
      'Código de verificação do doador enviado por SMS (Twilio).',
      'Injeção de dependência com tsyringe e Redis na infraestrutura.',
    ],
    flow: ['Doador', 'API', 'Mercado Pago · Twilio'],
    flowCore: 1,
    stack: ['Express', 'MongoDB', 'Redis', 'Mercado Pago', 'Twilio'],
    repo: 'https://github.com/olvvikitor/anjo_bom_backside',
  },
  {
    slug: 'bet-scraper',
    name: 'Bet Scraper',
    status: 'Automação · 2026',
    summary: 'Extrai os dados das apostas marcadas num grupo do Telegram.',
    highlights: [
      'Telethon lê as mensagens marcadas no grupo.',
      'Regex no texto + GPT Vision na imagem para tirar evento, mercado e odd.',
      'Saída em JSON e CSV.',
    ],
    flow: ['Telegram', 'Regex + GPT Vision', 'JSON / CSV'],
    flowCore: 1,
    stack: ['Python', 'Telethon', 'GPT Vision'],
    repo: 'https://github.com/olvvikitor/botbet',
  },
]
```

`profile` ganha:

```ts
  headline: 'Desenvolvedor backend',
  specialties: 'APIs, RAG e visão computacional. NestJS, Python e PostgreSQL.',
  status: 'Porto Alegre · remoto · disponível',
```

e `about` vira um parágrafo:
`'Formado técnico em Desenvolvimento de Sistemas pelo SENAI e cursando Ciência da Computação na UNIFACS. Trabalho com sistemas web de ponta a ponta, com foco em APIs, modelagem e integração de bancos de dados, e venho me aprofundando em arquitetura, infraestrutura e aplicações de IA.'`
(remove `pitch`).

- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** `git add -A && git commit -m "feat: dados dos projetos e FlowDiagram"`

---

### Task 4: `ProjectTabs` + `ProjectPanel`

**Files:**
- Create: `src/components/ProjectTabs.tsx`, `src/components/ProjectPanel.tsx`, `src/components/ProjectTabs.css`,
  `src/components/ProjectTabs.test.tsx`
- Delete: `src/components/Projects.tsx`

**Interfaces:**
- Consumes: `useHashTab` (Task 2), `Project`, `FlowDiagram` (Task 3), `Section`, `Stack`, `ArrowUpRight`.
- Produces: `<ProjectTabs projects={Project[]} />` (renderiza a seção `#projetos` inteira).

- [ ] **Step 1: Teste**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { projects } from '../data/profile'
import { ProjectTabs } from './ProjectTabs'

describe('ProjectTabs', () => {
  it('mostra a primeira aba e troca no clique', async () => {
    render(<ProjectTabs projects={projects} />)
    expect(screen.getByRole('tab', { name: 'Motionfy' })).toHaveAttribute('aria-selected', 'true')
    await userEvent.click(screen.getByRole('tab', { name: 'RAG do zero' }))
    expect(screen.getByRole('tab', { name: 'RAG do zero' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('RAG do zero')
    expect(window.location.hash).toBe('#projetos/rag')
  })

  it('teclado: setas, Home e End movem seleção e foco', async () => {
    render(<ProjectTabs projects={projects} />)
    await userEvent.click(screen.getByRole('tab', { name: 'Motionfy' }))
    await userEvent.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', { name: 'Bet Scraper' })).toHaveFocus()
    await userEvent.keyboard('{Home}')
    expect(screen.getByRole('tab', { name: 'Motionfy' })).toHaveAttribute('aria-selected', 'true')
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'RAG do zero' })).toHaveFocus()
    await userEvent.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Bet Scraper' })).toHaveAttribute('aria-selected', 'true')
  })

  it('só a aba ativa entra no Tab', () => {
    render(<ProjectTabs projects={projects} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs.filter((t) => t.tabIndex === 0)).toHaveLength(1)
  })

  it('abre a aba do hash', () => {
    window.history.replaceState(null, '', '/#projetos/anjo-bom')
    render(<ProjectTabs projects={projects} />)
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Anjo Bom')
  })
})
```

- [ ] **Step 2:** `npm test` → FAIL.

- [ ] **Step 3: Implementação** — `ProjectTabs.tsx`:

```tsx
import { useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import type { Project } from '../data/profile'
import { profile } from '../data/profile'
import { useHashTab } from '../hooks/useHashTab'
import { ArrowUpRight } from './icons'
import { ProjectPanel } from './ProjectPanel'
import { Section } from './Section'
import './ProjectTabs.css'

export function ProjectTabs({ projects }: { projects: Project[] }) {
  const slugs = useMemo(() => projects.map((p) => p.slug), [projects])
  const [active, select] = useHashTab('projetos', slugs)
  const index = Math.max(0, slugs.indexOf(active))
  const listRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [bar, setBar] = useState({ left: 0, width: 0 })
  const github = profile.links.find((l) => l.label === 'GitHub')

  // Posiciona o indicador e rola a faixa de abas (só na horizontal) até a aba ativa.
  useLayoutEffect(() => {
    const place = () => {
      const tab = tabRefs.current[index]
      const list = listRef.current
      if (!tab || !list) return
      setBar({ left: tab.offsetLeft, width: tab.offsetWidth })
      const start = tab.offsetLeft - list.scrollLeft
      if (start < 0 || start + tab.offsetWidth > list.clientWidth) list.scrollLeft = tab.offsetLeft - 16
    }
    place()
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => window.removeEventListener('resize', place)
  }, [index])

  const onKeyDown = (e: KeyboardEvent) => {
    const last = slugs.length - 1
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : -1
    if (next < 0) return
    e.preventDefault()
    select(slugs[next])
    tabRefs.current[next]?.focus()
  }

  const project = projects[index]

  return (
    <Section id="projetos" title="Projetos">
      <div className="tabs" ref={listRef} role="tablist" aria-label="Projetos" onKeyDown={onKeyDown}>
        {projects.map((p, i) => (
          <button
            key={p.slug}
            ref={(el) => { tabRefs.current[i] = el }}
            id={`aba-${p.slug}`}
            type="button"
            role="tab"
            className="tab"
            aria-selected={i === index}
            aria-controls={`painel-${p.slug}`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(p.slug)}
          >
            {p.name}
          </button>
        ))}
        <span className="tabs-bar" aria-hidden="true" style={{ transform: `translateX(${bar.left}px)`, width: bar.width }} />
      </div>

      <ProjectPanel key={project.slug} project={project} />

      {github && (
        <a className="link more" href={`${github.href}?tab=repositories`} target="_blank" rel="noreferrer">
          Todos os repositórios no GitHub
          <ArrowUpRight />
        </a>
      )}
    </Section>
  )
}
```

`ProjectPanel.tsx`:

```tsx
import type { Project } from '../data/profile'
import { FlowDiagram } from './FlowDiagram'
import { ArrowUpRight } from './icons'
import { Stack } from './Section'

export function ProjectPanel({ project: p }: { project: Project }) {
  return (
    <div role="tabpanel" id={`painel-${p.slug}`} aria-labelledby={`aba-${p.slug}`} tabIndex={0} className="panel">
      <div className="panel-text">
        <p className="meta">{p.status}</p>
        <h3 className="panel-title">{p.name}</h3>
        <p className="panel-summary">{p.summary}</p>
        <ul className="panel-highlights">
          {p.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <Stack items={p.stack} />
        <div className="panel-links">
          {p.site && (
            <a className="link" href={p.site} target="_blank" rel="noreferrer">Abrir site<ArrowUpRight /></a>
          )}
          <a className="link" href={p.repo} target="_blank" rel="noreferrer">Ver código<ArrowUpRight /></a>
        </div>
      </div>
      <div className="panel-media">
        {p.image && p.site && (
          <a className="shot" href={p.site} target="_blank" rel="noreferrer" tabIndex={-1}>
            <img src={p.image.src} alt={p.image.alt} loading="lazy" />
          </a>
        )}
        <FlowDiagram steps={p.flow} core={p.flowCore} />
      </div>
    </div>
  )
}
```

`ProjectTabs.css`:

```css
.tabs {
  position: relative;
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  scrollbar-width: none;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;
}
.tabs::-webkit-scrollbar { display: none; }

.tab {
  flex: none;
  min-height: 44px;
  padding: 0 0.875rem;
  border: 0;
  background: none;
  font: inherit;
  font-size: 0.9375rem;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  transition: color 0.15s ease, background-color 0.15s ease;
}
.tab:hover { color: var(--text-primary); background: var(--tint); }
.tab[aria-selected='true'] { color: var(--text-primary); font-weight: 600; }
.tab:focus-visible { outline-offset: -2px; }

.tabs-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  background: var(--accent);
  transition: transform 0.2s ease, width 0.2s ease;
}

.panel {
  display: grid;
  gap: 2rem;
  animation: panel-in 0.15s ease;
}
.panel:focus-visible { outline-offset: 8px; }
@media (min-width: 880px) {
  .panel { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 3rem; align-items: start; }
}
@keyframes panel-in { from { opacity: 0; } to { opacity: 1; } }

.panel-title {
  font-family: var(--font-serif);
  font-weight: 500;
  font-size: 2rem;
  line-height: 1.1;
  margin-top: 0.25rem;
}
.panel-summary { margin-top: 0.5rem; color: var(--text-secondary); font-size: 1.0625rem; }
.panel-highlights {
  margin-top: 1.25rem;
  display: grid;
  gap: 0.75rem;
  padding-left: 1.25rem;
  border-left: 1px solid var(--border-medium);
  color: var(--text-secondary);
}
.panel-links { margin-top: 1.25rem; display: flex; flex-wrap: wrap; gap: 1.5rem; }

.panel-media { display: grid; gap: 1.25rem; }
.shot {
  display: block;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
}
.shot img { display: block; width: 100%; height: auto; transition: transform 0.3s ease; }
.shot:hover img { transform: scale(1.02); }

.flow {
  margin: 0;
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-raised);
}
.flow figcaption { margin-bottom: 0.875rem; }
.flow-steps { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0; }
.flow-step { display: flex; align-items: center; }
.flow-arrow::before { content: '→'; padding-inline: 0.5rem; color: var(--text-muted); font-family: var(--font-mono); }
.flow-node {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  padding: 0.375rem 0.625rem;
  border: 1px solid var(--border-medium);
  border-radius: 6px;
  background: var(--bg-page);
}
.is-core .flow-node { background: var(--text-primary); color: var(--bg-page); border-color: var(--text-primary); }

@media (max-width: 559px) {
  .flow-steps { flex-direction: column; align-items: flex-start; }
  .flow-step { flex-direction: column; align-items: flex-start; }
  .flow-arrow::before { content: '↓'; display: block; padding: 0.25rem 0 0.25rem 0.75rem; }
}

.more { margin-top: 2rem; }
```

- [ ] **Step 4:** `npm test` → PASS. Apagar `src/components/Projects.tsx`.
- [ ] **Step 5:** `git add -A && git commit -m "feat: projetos em abas"`

---

### Task 5: `Reveal` e `Section`

**Files:**
- Create: `src/components/Reveal.tsx`, `src/components/Reveal.test.tsx`
- Modify: `src/components/Section.tsx`

**Interfaces:**
- Produces: `<Reveal>{children}</Reveal>` → `div.reveal` que ganha `.is-visible` ao entrar na tela (uma vez).
  `Section` passa a envolver o conteúdo (título incluído) em `Reveal`.

- [ ] **Step 1: Teste**

```tsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Reveal } from './Reveal'

it('sem IntersectionObserver o conteúdo já nasce visível', () => {
  render(<Reveal><p>oi</p></Reveal>)
  expect(screen.getByText('oi').parentElement).toHaveClass('is-visible')
})
```

(jsdom não tem `IntersectionObserver`, então o teste cobre exatamente o caso de fallback.)

- [ ] **Step 2:** `npm test` → FAIL.

- [ ] **Step 3: Implementação**

```tsx
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

  return <div ref={ref} className={visible ? 'reveal is-visible' : 'reveal'}>{children}</div>
}
```

`Section.tsx` — corpo vira:

```tsx
<section id={id} className="section" aria-labelledby={`${id}-title`}>
  <Reveal>
    <h2 id={`${id}-title`} className="section-title">{title}</h2>
    {children}
  </Reveal>
</section>
```

CSS (em `index.css`):

```css
.reveal { opacity: 0; transform: translateY(8px); transition: opacity 0.4s ease, transform 0.4s ease; }
.reveal.is-visible { opacity: 1; transform: none; }
```

e no bloco `prefers-reduced-motion` existente: `.reveal { opacity: 1; transform: none; }` e
`* { animation: none !important; }`.

- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** `git add -A && git commit -m "feat: entrada suave das seções"`

---

### Task 6: TopBar, Hero, App e CSS

**Files:**
- Create: `src/components/TopBar.tsx`, `src/components/TopBar.css`, `src/components/Hero.tsx`,
  `src/components/Hero.css`, `public/projects/motionfy.jpg`
- Modify: `src/App.tsx`, `src/index.css`, `src/components/About.tsx`, `src/components/Contact.tsx`
- Delete: `src/components/Sidebar.tsx`

**Interfaces:**
- Consumes: `useTheme`, `useActiveSection(ids)`, `profile.headline/specialties/status`, `projects[0]`, `ProjectTabs`.
- Produces: `<TopBar active={string} />`, `<Hero />`.

- [ ] **Step 1: Imagem** — capturar `https://motionfy.fun/login` em 1440×900 (navegador), salvar em
  `public/projects/motionfy.jpg`.

- [ ] **Step 2: TopBar.tsx**

```tsx
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
        <a className="brand" href="#inicio">{profile.shortName}</a>
        <nav aria-label="Seções" className="topnav">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : undefined}
               aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <button type="button" className="btn-icon" onClick={toggle}
                aria-label={theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  )
}
```

`TopBar.css`:

```css
.topbar {
  position: sticky;
  top: 0;
  z-index: 5;
  background: color-mix(in srgb, var(--bg-page) 88%, transparent);
  backdrop-filter: saturate(1.2) blur(8px);
  border-bottom: 1px solid var(--border);
  padding-top: env(safe-area-inset-top, 0px);
}
.topbar-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding-inline: clamp(1.25rem, 4vw, 3rem);
  height: 64px;
  display: flex;
  align-items: center;
  gap: 2rem;
}
.brand { margin-right: auto; font-family: var(--font-serif); font-weight: 600; font-size: 1.25rem; text-decoration: none; }
.topnav { display: flex; gap: 0.25rem; }
.topnav a {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.9375rem;
  text-underline-offset: 6px;
}
.topnav a:hover { color: var(--text-primary); background: var(--tint); }
.topnav a.is-active { color: var(--text-primary); font-weight: 600; text-decoration: underline; text-decoration-color: var(--accent); }
@media (max-width: 639px) { .topnav { display: none; } }
```

- [ ] **Step 3: Hero.tsx**

```tsx
import { profile, projects } from '../data/profile'
import { ArrowUpRight } from './icons'
import './Hero.css'

export function Hero() {
  const featured = projects.find((p) => p.image && p.site)
  const github = profile.links.find((l) => l.label === 'GitHub')
  return (
    <section id="inicio" className="hero" aria-labelledby="inicio-title">
      <div className="hero-text">
        <p className="hero-status meta"><span className="status-dot" aria-hidden="true" />{profile.status}</p>
        <p className="hero-name">{profile.name}</p>
        <h1 id="inicio-title" className="hero-title">{profile.headline}</h1>
        <p className="hero-sub">{profile.specialties}</p>
        <div className="hero-actions">
          <a className="btn-primary" href="#projetos">Ver projetos</a>
          {github && (
            <a className="btn-secondary" href={github.href} target="_blank" rel="noreferrer">GitHub<ArrowUpRight /></a>
          )}
        </div>
      </div>
      {featured?.image && featured.site && (
        <figure className="hero-figure">
          <a className="shot" href={featured.site} target="_blank" rel="noreferrer">
            <img src={featured.image.src} alt={featured.image.alt} />
          </a>
          <figcaption>
            <span><strong>{featured.name}</strong> <span className="meta">· {featured.status}</span></span>
            <a className="link" href={featured.site} target="_blank" rel="noreferrer">Abrir site<ArrowUpRight /></a>
          </figcaption>
        </figure>
      )}
    </section>
  )
}
```

`Hero.css`:

```css
.hero {
  display: grid;
  gap: 3rem;
  padding-block: clamp(3rem, 9vh, 6rem) 4rem;
  align-items: center;
}
@media (min-width: 960px) {
  .hero { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); min-height: calc(100vh - 64px); padding-block: 3rem; }
}
.hero-status { display: flex; align-items: center; gap: 0.5rem; }
.status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
.hero-name { margin-top: 1.75rem; font-size: 1.0625rem; color: var(--text-secondary); }
.hero-title {
  margin-top: 0.25rem;
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: clamp(2.75rem, 7vw, 5rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
}
.hero-sub { margin-top: 1.25rem; font-size: 1.1875rem; color: var(--text-secondary); max-width: 30ch; }
.hero-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 0.75rem; }
.hero-figure { margin: 0; }
.hero-figure figcaption {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem 1rem;
}
.hero-figure strong { font-weight: 600; }
```

- [ ] **Step 4: App.tsx**

```tsx
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
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
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
```

(Formação continua — o spec não a removeu; fica entre Sobre e Contato.)

- [ ] **Step 5: index.css** — remover blocos `.layout`, `.sidebar*`, `.name`, `.pitch`, `.location`, `.nav*`,
  `.eyebrow`, `.projects`, `.project*`, `.content`; adicionar:

```css
.page { max-width: 1160px; margin: 0 auto; padding-inline: clamp(1.25rem, 4vw, 3rem); }
html { scroll-padding-top: 80px; }
.section { padding-block: 4rem; border-top: 1px solid var(--border); }
.section-title { font-size: clamp(1.75rem, 3vw, 2.25rem); }
```

e as regras de `Reveal` (Task 5). `About` passa a mostrar só `profile.about` (string) + tabela de
tecnologias. `Section` não depende mais da sidebar.

- [ ] **Step 6:** `npm test && npm run build && npm run lint` → tudo verde.
- [ ] **Step 7:** `git add -A && git commit -m "feat: topo, hero e nova página"`

---

### Task 7: Verificação visual

- [ ] `npm run dev`, abrir no navegador em 1440×900 e 375×812, temas claro e escuro.
- [ ] Conferir: primeira tela mostra nome, título, botões e Motionfy sem rolar (desktop).
- [ ] `/#projetos/rag` abre rolado com a aba RAG ativa.
- [ ] No mobile, clicar na última aba rola a faixa de abas até ela e não move a página na vertical.
- [ ] Checklist da skill `ui-sem-cara-de-ia` (7 itens) — nenhum "Proibido".
- [ ] `git commit` de qualquer ajuste.
