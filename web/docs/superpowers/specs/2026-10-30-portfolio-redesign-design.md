# Redesign do portfólio — design

Data: 2026-10-30 · Status: aguardando revisão

## Objetivo

Dar ao portfólio de João Victor (desenvolvedor backend) personalidade, impacto na primeira tela, uma
vitrine de projetos forte e movimento discreto, sem "cara de IA" (regras da skill `ui-sem-cara-de-ia`).

**Pedido explícito**
- Melhorar: personalidade, impacto inicial, vitrine de projetos, movimento.
- Frase principal direta ao que faz. Sem narrativa "comecei no atendimento".
- Projetos em abas com detalhes técnicos. Só o Motionfy tem imagem.

**Premissas (não ditas pelo usuário)**
- Público: recrutadores e tech leads de vagas backend.
- Só português.
- Stack mantida: Vite 6 + React 19 + TypeScript + CSS próprio. Sem lib de animação.

**Sucesso**
- Em ~5 s o visitante sabe: quem é, o que faz, e vê um projeto real no ar.
- Cada projeto mostra o que resolve e decisões técnicas reais (tiradas do código).
- Nenhum item da lista "Proibido" da skill aparece.
- Funciona em 375 px e 1440 px, temas claro e escuro, teclado e `prefers-reduced-motion`.

## Fora do escopo
- Versão em inglês, blog, CMS, formulário de contato, currículo em PDF.
- Projeto SAMU Hackathon (sai da vitrine; continua acessível pelo link "todos os repositórios").

## Estrutura da página

1. **TopBar** (fixa, enxuta): nome · links Experiência / Projetos / Contato · botão de tema.
   Substitui a sidebar. Link da seção atual em negrito + sublinhado fino. Respeita `safe-area`.
2. **Hero**
   - Linha mono: ponto de status (cor de destaque) + "Porto Alegre · remoto · disponível".
   - Nome (menor, acima) e título grande serifado: "Desenvolvedor backend".
   - Subtítulo: "APIs, RAG e visão computacional. NestJS, Python e PostgreSQL."
   - Botões: **Ver projetos** (primário, neutro) e **GitHub** (secundário).
   - À direita (abaixo no mobile): figura do Motionfy (imagem real, legenda "Motionfy", link "Abrir site ↗").
3. **Projetos em abas** — 5 abas visíveis: Motionfy, RAG do zero, DR Autoparts, Anjo Bom, Bet Scraper.
   Painel: ano/status (mono), nome, uma frase do que faz, 3–4 decisões técnicas, tecnologias, links
   (site se houver, código). Mídia do painel: imagem (Motionfy) e diagrama de fluxo (todos).
   Abaixo das abas: link "Todos os repositórios no GitHub".
4. **Experiência** — linha do tempo atual (Tel full stack, Tel dados, Atento).
5. **Sobre + tecnologias** — texto reduzido a um parágrafo + tabela de tecnologias atual.
6. **Contato** — como hoje (copiar e-mail, enviar e-mail, GitHub, LinkedIn).

## Conteúdo dos projetos (verificado no código)

| Projeto | Faz | Decisões técnicas | Fluxo |
|---|---|---|---|
| Motionfy (no ar, motionfy.fun/login) | Conecta ao Last.fm e traduz o que a pessoa escuta em humor, dia a dia; compara com amigos | Vetor emocional 10D por música, classificado por IA a partir de gênero (MusicBrainz), BPM (Deezer) e trecho da letra (LRCLIB) · centros de humor aprendidos das músicas já analisadas (mediana puxada para um perfil base) · playlist "jornada" entre dois humores no espaço 10D · MusicBrainz a 1 req/s com backoff exponencial · Last.fm, Spotify e YouTube Music atrás de uma interface | Last.fm → enriquecimento → IA (vetor 10D) → jornada → Spotify |
| RAG do zero | Pipeline de RAG sem framework, para estudo | BM25 implementado à mão (k1 = 1.5, b = 0.75) · embeddings locais com multilingual-e5-base · similaridade de cosseno · fusão dos rankings com RRF (k = 60) | documento → chunks → BM25 + embeddings → RRF → LLM |
| DR Autoparts | API de e-commerce de autopeças | Catálogo por modelo de veículo e fornecedor · carrinho · painel admin com JWT · imagens no S3 · Swagger | cliente → API Nest → Prisma/PostgreSQL · S3 |
| Anjo Bom | Plataforma de doações | Pagamento via Mercado Pago · código de verificação do doador por SMS (Twilio) · injeção de dependência (tsyringe) · Redis | doador → API → Mercado Pago · Twilio |
| Bet Scraper | Extrai apostas de um grupo do Telegram | Telethon lê mensagens marcadas · regex no texto + GPT Vision na imagem · saída em JSON/CSV | Telegram → regex + GPT Vision → JSON/CSV |

Os textos finais podem ser enxugados na implementação, mas não podem afirmar nada além desta tabela.

## Visual

- Tokens atuais mantidos (claro/escuro). Cor de destaque terracota só em detalhes: ponto de status,
  número/indicador de aba, sublinhado em hover. Botões neutros (primário = cor do texto).
- Tipografia: Newsreader (títulos), IBM Plex Sans (texto), metadados também em IBM Plex Sans (sem monoespaçada: não é código).
  Título do hero ~clamp(2.75rem, 7vw, 5rem).
- **FlowDiagram**: SVG gerado a partir de uma lista de passos; caixas com borda fina na cor do texto,
  setas finas, fonte mono, sem cor de destaque além do passo "IA"/núcleo (preenchido com a cor do texto).
  Horizontal no desktop; vertical em telas < 560 px.
- Imagem do Motionfy: `public/projects/motionfy.webp`, borda de 1 px, raio 10 px, `alt` descritivo.

## Movimento

- Entrada de seção: opacity 0→1 + translateY 8px→0, 400 ms, uma vez (IntersectionObserver, threshold 0.15).
- Troca de aba: fade do painel 150 ms; indicador da aba desliza (transform) 200 ms.
- Hover: imagem scale 1.02; setas dos links translate(2px, -2px).
- `prefers-reduced-motion: reduce` desliga tudo. Nenhuma animação em loop.

## Comportamento e acessibilidade

- Abas: `role="tablist"` / `tab` (`aria-selected`, `aria-controls`, roving `tabIndex`) / `tabpanel`.
  Teclado: ←/→ trocam, Home/End vão às pontas, ativação automática.
- URL: aba ativa em `#projetos/<slug>`; abrir essa URL rola até Projetos e seleciona a aba.
  Slug desconhecido → primeira aba.
- Mobile: tablist rola horizontalmente; a aba ativa é rolada para a vista.
- Link "pular para o conteúdo" mantido; foco visível em tudo que é clicável.

## Código

- `src/data/profile.ts`: `Project` ganha `slug`, `status`, `summary`, `highlights: string[]`,
  `flow: string[]`, `image?: { src; alt }`, `site?`. Remove projeto SAMU.
- Componentes: `TopBar`, `Hero`, `ProjectTabs` (estado + teclado + URL), `ProjectPanel`,
  `FlowDiagram`, `Experience`, `About`, `Contact`, `Reveal` (wrapper de entrada).
  `Sidebar` removido. Hooks: `useTheme` (mantido), `useActiveSection` (mantido, usado na TopBar),
  `useHashTab` (novo).
- CSS: `index.css` dividido por componente se passar de ~600 linhas (arquivos `.css` importados no componente).

## Testes

- Vitest + @testing-library/react + jsdom.
- `ProjectTabs`: clique seleciona; ←/→/Home/End; `aria-selected` correto; hash `#projetos/rag` abre a aba RAG;
  slug inválido cai na primeira.
- `FlowDiagram`: renderiza um nó por passo e n−1 setas; usa layout vertical quando `vertical`.
- Verificação final: `npm run build`, `npm run lint`, `npm test`, e checagem visual no navegador em 1440 px e
  375 px, temas claro e escuro.
