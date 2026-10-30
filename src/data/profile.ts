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
  name: string
  repo: string
  site?: string
  description: string
  stack: string[]
  tag?: string
}

export type Course = { title: string; school: string; place: string; period: string }

export const profile = {
  name: 'João Victor Jesus de Oliveira',
  shortName: 'João Victor',
  role: 'Desenvolvedor backend',
  location: 'Porto Alegre, RS · remoto',
  pitch:
    'Construo APIs, integrações e sistemas com IA aplicada (RAG e visão computacional) que rodam em produção.',
  about: [
    'Sou desenvolvedor backend, com formação técnica em Desenvolvimento de Sistemas pelo SENAI e cursando Ciência da Computação na UNIFACS. Trabalho com sistemas web de ponta a ponta, com foco em APIs, modelagem e integração de bancos de dados.',
    'Hoje estou me aprofundando em arquitetura de software, infraestrutura e containerização, e em aplicações de IA. Gosto de transformar necessidades de negócio em soluções técnicas viáveis e fáceis de manter.',
  ],
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
    name: 'Motionfy',
    repo: 'https://github.com/olvvikitor/motionfy',
    site: 'https://motionfy.fun/login',
    description:
      'Backend de uma plataforma de música social: playlists, biblioteca, amizades e créditos pagos. Login com Google, filas para tarefas assíncronas e integração com OpenAI.',
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'BullMQ', 'Redis', 'Stripe', 'OpenAI'],
    tag: '2026',
  },
  {
    name: 'RAG do zero',
    repo: 'https://github.com/olvvikitor/estudo_rag',
    description:
      'Estudo que monta um pipeline de RAG sem framework: chunking, embeddings locais, banco vetorial, busca híbrida com BM25 e geração com LLM.',
    stack: ['TypeScript', 'Transformers.js', 'BM25'],
    tag: '2026',
  },
  {
    name: 'Bet Scraper',
    repo: 'https://github.com/olvvikitor/botbet',
    description:
      'Monitora um grupo do Telegram e extrai os dados das apostas marcadas a partir das imagens, usando GPT Vision e regex.',
    stack: ['Python', 'Telethon', 'GPT Vision'],
    tag: '2026',
  },
  {
    name: 'DR Autoparts',
    repo: 'https://github.com/olvvikitor/dr_autoparts_backend',
    description:
      'API de e-commerce de autopeças: catálogo por modelo e fornecedor, carrinho, painel administrativo, upload de imagens no S3 e avisos por SMS.',
    stack: ['NestJS', 'Prisma', 'AWS S3', 'Twilio', 'Swagger'],
    tag: '2025',
  },
  {
    name: 'Anjo Bom',
    repo: 'https://github.com/olvvikitor/anjo_bom_backside',
    description:
      'Plataforma de doações com doadores, pontos de coleta, eventos e pagamento via Mercado Pago. Injeção de dependência, cache com Redis e limite de requisições.',
    stack: ['Express', 'MongoDB', 'Redis', 'Mercado Pago', 'Swagger'],
    tag: '2024',
  },
  {
    name: 'SAMU · Hackathon',
    repo: 'https://github.com/olvvikitor/desafio_samu_hackathon',
    description:
      'Protótipo de atendimento de emergência por SMS com geolocalização, para reduzir trotes e acelerar a chegada das equipes.',
    stack: ['NestJS', 'TypeScript', 'SMS'],
    tag: '2024',
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
