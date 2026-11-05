# Portfólio (web)

React + Vite, CSS puro. Conteúdo todo em `src/data/profile.ts`.

## UI
- Siga a skill `ui-sem-cara-de-ia`.
- Tokens em `src/index.css` (`--bg-page`, `--bg-raised`, `--text-primary/secondary/muted`, `--tint`, `--tint-strong`,
  `--border`, `--border-medium`). Nunca cor fixa; o tema escuro troca os tokens via `data-theme="dark"`.
- Neutros quase sem matiz. Cor só em: `--ok` (ponto "disponível"), `--accent` (vermelho quente, só nos trechos `.emph` dos títulos; nunca em botão, fundo ou borda) e `--mark` (o accent diluído, só no marca-texto de "O que faço").
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
- "O que faço" (`capabilities` em profile.ts, componente `Capabilities`): seção própria (id `o-que-faco`) entre o topo e Projetos, não dentro de Projetos (o título de Projetos fala dos projetos). Pode citar ferramenta, como Projetos. Título grande (800, largura 75%) em cima, texto embaixo, cada área com ~70vh. Modo foco: só a área que contém o meio da tela (medida na rolagem, `centeredIndex`) fica visível, as outras somem; entre duas áreas (nada na faixa) a atual continua até a próxima entrar, só some ao sair da lista. O `<li>` é o medido e nunca anima; a animação fica no `.capability-body` (medir o que se mexe causava pisca-pisca ao subir); nada aparece antes da primeira rolagem. Não entra no `useReveal`. Texto técnico (o que faz, como e por quê), com frases-chave entre `==sinais==` que viram marca-texto (`.highlight`, faixa do `--mark` = `--accent` diluído, embaixo da linha); no modo foco cada faixa é passada da esquerda para a direita, uma depois da outra (`--m`). Uma a três por área.
- Ferramentas por área (`tools` em `capabilities`): ícone + nome, ícones do pacote `simple-icons` (CC0) em `ToolIcon.tsx`, numa cor só (`currentColor`), nunca colorido com a marca. Marca sem ícone lá (Excel, Power BI, SQL, DAX, OpenAI) usa desenho genérico de traço. No modo foco entram uma por uma depois do texto (`--i` × 0,12s).
- Topo: à direita, `HeroCarousel` só com os projetos que têm `image` (hoje Motionfy e Estampa; quem tem site vem primeiro), sem moldura `.frame`: a captura direto, 16:9. Sem troca automática; setas + contador "1 / 2", e arrastar no celular (trilho com scroll-snap). Legenda: nome + tag e "Abrir site" quando há `site`, senão "Em breve" (texto apagado, não é link). Slides fora da tela ficam `inert`.
