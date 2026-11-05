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
- Linguagem técnica (nomes de ferramentas, siglas) só na seção Projetos. Topo, Sobre, Experiência e Contato em linguagem simples.
- Experiência é trajetória em capítulos (`journey` em profile.ts: momento + frase + texto), não currículo: sem datas, cargos formais ou modelo de trabalho.
- Títulos (hero e seções): `*trecho*` no texto vira `.emph` (Bricolage peso 800, largura 75%). Um ou dois trechos por título, em `--accent`.
- Favicon (`public/favicon.svg`): "jv" minúsculo desenhado em traços grossos (4,4 de 32), sem `<text>`, sobre quadrado escuro; o pingo do j é o verde do "Disponível" (`--ok` escuro). Não trocar por letra em fonte de sistema.
