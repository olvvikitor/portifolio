// Todo o conteúdo do portfólio fica aqui. Edite este arquivo para atualizar o site.

export type Link = { label: string; href: string }

export type Highlight = { title: string; text: string; stack: string[] }

export type Job = {
  role: string
  company: string
  place: string
  period: string
  summary?: string
  highlights?: Highlight[]
}

export type Project = {
  slug: string
  name: string
  status: string
  summary: string
  highlights: string[]
  flow: string[]
  flowCore?: number
  stack: string[]
  repo: string
  site?: string
  image?: { src: string; alt: string }
}

export type Course = { title: string; school: string; place: string; period: string }

export const profile = {
  name: 'João Victor Jesus de Oliveira',
  shortName: 'João Victor',
  headline: 'Desenvolvedor backend',
  specialties: 'APIs, RAG e visão computacional. NestJS, Python e PostgreSQL.',
  status: 'Porto Alegre · remoto · disponível',
  about:
    'Formado técnico em Desenvolvimento de Sistemas pelo SENAI e cursando Ciência da Computação na UNIFACS. Trabalho com sistemas web de ponta a ponta, com foco em APIs, modelagem e integração de bancos de dados, e venho me aprofundando em arquitetura, infraestrutura e aplicações de IA.',
  email: 'victoroloveira.3002@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/olvvikitor' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jo%C3%A3o-victor-oliveira-969a15210' },
  ] satisfies Link[],
}

export const skills: { group: string; items: string[] }[] = [
  { group: 'Backend', items: ['Node.js', 'NestJS', 'TypeScript', 'Python', 'FastAPI', 'APIs REST', 'JWT'] },
  { group: 'Dados', items: ['PostgreSQL', 'Redis', 'Oracle', 'SQL', 'Prisma', 'PySpark', 'Power BI', 'DAX'] },
  { group: 'IA', items: ['RAG', 'LLMs / OpenAI', 'pgvector', 'YOLOv8', 'OpenCV', 'Whisper'] },
  { group: 'Infra', items: ['Docker', 'AWS', 'BullMQ', 'MinIO', 'Prefect', 'Git'] },
  { group: 'Frontend', items: ['React', 'TypeScript'] },
]

export const jobs: Job[] = [
  {
    role: 'Desenvolvedor full stack',
    company: 'Tel Contact Center',
    place: 'Porto Alegre (remoto)',
    period: 'dez/2025 – atual',
    summary:
      'Desenvolvo soluções para vários clientes, com foco em automação de processos, APIs, RAG e visão computacional.',
    highlights: [
      {
        title: 'Visão computacional',
        text: 'Modelos de leitura e análise automática de imagens, hoje em uso em produção.',
        stack: ['YOLOv8', 'Python', 'FastAPI', 'OpenCV'],
      },
      {
        title: 'RAG',
        text: 'Busca e resposta com IA generativa sobre bases de conhecimento internas.',
        stack: ['OpenAI', 'pgvector', 'PostgreSQL'],
      },
      {
        title: 'APIs',
        text: 'APIs que integram sistemas internos e serviços de IA.',
        stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'JWT'],
      },
      {
        title: 'Automação de processos',
        text: 'Pipelines que eliminam etapas manuais e aceleram a operação.',
        stack: ['Python', 'Prefect', 'PySpark', 'Jupyter'],
      },
    ],
  },
  {
    role: 'Analista de dados',
    company: 'Tel Contact Center',
    place: 'Porto Alegre',
    period: 'dez/2024 – dez/2025',
    summary:
      'Apoiei as áreas de negócio da extração e tratamento de dados até os dashboards usados nas decisões.',
    highlights: [
      {
        title: 'Extração e tratamento',
        text: 'Consultas otimizadas direto nas fontes e limpeza das bases antes da análise.',
        stack: ['SQL', 'Power Query', 'Python'],
      },
      {
        title: 'Dashboards e relatórios',
        text: 'Painéis interativos para acompanhar indicadores.',
        stack: ['Power BI', 'DAX', 'Excel'],
      },
    ],
  },
  {
    role: 'Atendimento ao cliente',
    company: 'Atento',
    place: 'Brasil',
    period: 'dez/2023 – jun/2024',
  },
]

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

export const education: Course[] = [
  {
    title: 'Bacharelado em Ciência da Computação',
    school: 'UNIFACS',
    place: 'Salvador',
    period: '2025 – 2028 (em andamento)',
  },
  {
    title: 'Técnico em Desenvolvimento de Sistemas',
    school: 'SENAI-FSA/BA',
    place: 'Feira de Santana',
    period: '2023 – 2024',
  },
]
