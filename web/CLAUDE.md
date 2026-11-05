# Portfólio (web)

React + Vite, CSS puro. Conteúdo todo em `src/data/profile.ts`.

## UI
- Siga a skill `ui-sem-cara-de-ia`.
- Tokens em `src/index.css` (`--bg-page`, `--bg-raised`, `--text-primary/secondary/muted`, `--tint`, `--tint-strong`,
  `--border`, `--border-medium`). Nunca cor fixa; o tema escuro troca os tokens via `data-theme="dark"`.
- Neutros quase sem matiz. Cor só em: `--ok` (ponto "disponível") e `--accent` (vermelho quente, só nos trechos `.emph` dos títulos; nunca em botão, fundo ou borda).
- Fonte: Bricolage Grotesque (família única, eixo óptico). Grotesca no estilo de blunar.cz, mas não a Space Grotesk dele: evita cópia e o "novo default". Sem monoespaçada: nada aqui é código.
- Botões: `.btn-primary` (fundo = cor do texto, inverte com o tema; um por seção), `.btn-secondary` (tint + borda),
  `.btn-icon` (44×44), `.link` (terciário, sublinhado).
- Projetos: cada um tem `tag` específica (o que faz, 1–3 palavras, única na lista; nada de "IA"/"Sistemas web" genérico). Índice numerado + lista em sequência (texto à esquerda, mídia na `.frame` cinza à direita). Link direto = id `projetos/<slug>`.
- Seções: `Section` recebe `label` (rótulo curto) e `title` (frase forte, é o h2).
- Linguagem técnica (nomes de ferramentas, siglas) só nas seções O que faço e Projetos. Topo, Sobre, Experiência e Contato em linguagem simples.
- Experiência é trajetória em capítulos (`journey` em profile.ts: momento + frase + texto), não currículo: sem datas, cargos formais ou modelo de trabalho.
- Títulos (hero e seções): `*trecho*` no texto vira `.emph` (Bricolage peso 800, largura 75%). Um ou dois trechos por título, em `--accent`.
- Favicon (`public/favicon.svg`): "jv" minúsculo desenhado em traços grossos (4,4 de 32), sem `<text>`, sobre quadrado escuro; o pingo do j é o verde do "Disponível" (`--ok` escuro). Não trocar por letra em fonte de sistema.
- Entrada aos poucos: `useReveal` no App, por bloco (rótulo e título das seções, índice, cada projeto, capítulo, item). Ao abrir, tudo fora do hero fica oculto, mesmo o que já está na tela; aparece na primeira rolagem, nunca a seção inteira (seção alta escondida = página em branco). Lista de blocos em `revealBlocks` (App.tsx) e no `:is(...)` do index.css: manter as duas iguais.
- Voltar ao topo: `BackToTop` (`.btn-icon.back-to-top`), fixo no canto inferior direito, só aparece depois de rolar mais que uma tela.
- "O que faço" (`capabilities` em profile.ts, componente `Capabilities`): seção própria (id `o-que-faco`) entre o topo e Projetos, não dentro de Projetos (o título de Projetos fala dos projetos). Pode citar ferramenta, como Projetos. Título grande (800, largura 75%) em cima, texto embaixo, cada área com ~70vh. Modo foco: só a área no meio da tela (faixa -45%/-45% do IntersectionObserver) fica visível, as outras somem; nada aparece antes da primeira rolagem. Não entra no `useReveal`. Texto = o valor que a área agrega; sem citar projeto, empresa ou trajetória. Só citar ferramenta que aparece nos projetos.
- Ferramentas por área (`tools` em `capabilities`): ícone + nome, ícones do pacote `simple-icons` (CC0) em `ToolIcon.tsx`, numa cor só (`currentColor`), nunca colorido com a marca. Marca sem ícone lá (Excel, Power BI, OpenAI) usa desenho genérico de traço. No modo foco entram uma por uma depois do texto (`--i` × 0,12s).
