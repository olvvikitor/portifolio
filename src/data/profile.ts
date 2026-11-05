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
  kind: 'trabalho' | 'pessoal'
  name: string
  status: string
  summary: string
  highlights: string[]
  flow: string[]
  flowCore?: number
  stack: string[]
  repo?: string // ausente em projeto de trabalho (código privado)
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
    slug: 'medidor',
    kind: 'trabalho',
    name: 'Leitura de medidor',
    status: 'Trabalho · setor elétrico · em validação',
    summary: 'Lê um medidor de energia analógico a partir de uma foto e devolve os quatro dígitos com o grau de confiança.',
    highlights: [
      'Triagem antes de ler: um YOLOv8 identifica o tipo de medidor (ponteiro, digital ou ciclométrico) e recorta o visor.',
      'Recusa foto ilegível em vez de chutar: avalia nitidez, brilho, contraste e tamanho do medidor no enquadramento e diz o motivo.',
      'Um modelo de pose acha o ponteiro de cada mostrador; o ângulo vira dígito pela regra regulatória, tratando os mostradores que giram ao contrário.',
      'Acerto por etapa em teste independente: 99,5% ao localizar os mostradores, 95,8% ao achar o ponteiro e 96,6% ao reconhecer o tipo. A leitura completa ainda vai ser medida no piloto.',
    ],
    flow: ['Foto', 'Tipo · YOLOv8', 'Legibilidade', 'Ponteiro · pose', 'Regra', 'Leitura'],
    flowCore: 3,
    stack: ['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'FastAPI'],
  },
  {
    slug: 'assistente-rag',
    kind: 'trabalho',
    name: 'Assistente RAG',
    status: 'Trabalho · multi-cliente',
    summary: 'Assistente que tira dúvidas de procedimento respondendo só com base nos documentos indexados.',
    highlights: [
      'Toda afirmação cita a fonte: um número que abre o documento no trecho exato; em vídeo, a citação leva ao ponto do vídeo.',
      'Escopo fechado: pedido de código, redação ou tradução é bloqueado antes de chegar ao modelo.',
      'Indexa apresentações, textos e vídeos em filas (BullMQ); busca por similaridade no pgvector.',
      'Isolamento por cliente: login pelo LDAP da empresa, e documentos, conversas e usuários separados por cliente, inclusive na busca vetorial.',
    ],
    flow: ['Documentos', 'Fila de indexação', 'pgvector · por cliente', 'LLM', 'Resposta com fonte'],
    flowCore: 2,
    stack: ['NestJS', 'PostgreSQL', 'pgvector', 'BullMQ', 'Redis', 'MinIO', 'React'],
  },
  {
    slug: 'plataforma-dados',
    kind: 'trabalho',
    name: 'Plataforma de dados',
    status: 'Trabalho · setor elétrico',
    summary: 'ELT que junta dados de leitura vindos de SFTP e SAP e publica indicadores auditáveis para a operação.',
    highlights: [
      'Extração incremental e idempotente: arquivos e lotes já processados ficam registrados em DuckDB.',
      'Automação do SAP GUI e da VPN, com o segundo fator de autenticação confirmado pelo Telegram.',
      'Control plane com DAG, status e leases: o trabalho de banco roda numa VM e o de SAP num runner Windows.',
      'Quality gates antes de publicar os fatos no SQL Server, consumidos por um painel em React.',
    ],
    flow: ['SFTP · SAP', 'DuckDB', 'Quality gates', 'SQL Server', 'Painel'],
    flowCore: 2,
    stack: ['Python', 'FastAPI', 'DuckDB', 'SQL Server', 'pandas', 'React'],
  },
  {
    slug: 'distribuidor',
    kind: 'trabalho',
    name: 'Distribuidor de casos',
    status: 'Trabalho · call center',
    summary: 'Distribui casos para operadores por fila e acompanha o prazo de cada tratativa.',
    highlights: [
      'O operador puxa o próximo caso: primeiro retoma o que já estava em andamento, depois busca só na fila dele.',
      'Prazos por área: casos no prazo, atrasados e em verificação aparecem separados.',
      'Importação de bases por planilha e histórico de cada atribuição e tratativa.',
    ],
    flow: ['Planilha', 'Filas', 'Operador', 'Tratativa', 'Histórico'],
    flowCore: 1,
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'JWT', 'React'],
  },
  {
    slug: 'motionfy',
    kind: 'pessoal',
    name: 'Motionfy',
    status: 'Pessoal · no ar',
    summary: 'Conecta ao Last.fm e traduz o que você escuta em humor, dia após dia. Dá para comparar com amigos.',
    highlights: [
      'Cada música vira um vetor emocional de 10 dimensões, classificado por IA a partir de gênero (MusicBrainz), BPM (Deezer) e trecho da letra (LRCLIB).',
      'Os centros de cada humor são aprendidos das músicas já analisadas: mediana por dimensão, puxada para um perfil base quando há poucas.',
      'Playlist "jornada": traça um caminho entre dois humores no espaço 10D e escolhe uma música por parada.',
      'Last.fm, Spotify e YouTube Music atrás de uma mesma interface; MusicBrainz respeitando 1 req/s com backoff exponencial.',
    ],
    flow: ['Last.fm', 'Enriquecimento', 'IA · vetor 10D', 'Jornada', 'Spotify'],
    flowCore: 2,
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'BullMQ', 'Redis', 'OpenAI', 'Next.js'],
    repo: 'https://github.com/olvvikitor/motionfy',
    site: 'https://motionfy.fun/login',
    image: { src: '/projects/motionfy.jpg', alt: 'Tela de entrada do Motionfy: "O que você escuta diz como você se sente."' },
  },
  {
    slug: 'rag',
    kind: 'pessoal',
    name: 'RAG do zero',
    status: 'Pessoal · estudo',
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
    slug: 'estampa',
    kind: 'pessoal',
    name: 'Estampa',
    status: 'Pessoal',
    summary: 'Gera arte para camiseta, adesivo e pôster em estilos de traço definidos, como linha clara e xilogravura.',
    highlights: [
      'Cada estilo descreve o traço inteiro e o que evitar, e vira o prompt da OpenAI Images; aceita imagem de referência.',
      'Fundo transparente mesmo quando o modelo não entrega: gera sobre cor lisa e remove só a cor que encosta na borda.',
      'Sem banco: cada arte fica salva como PNG com um JSON ao lado.',
    ],
    flow: ['Pedido', 'Prompt por estilo', 'OpenAI Images', 'Recorte do fundo', 'PNG'],
    flowCore: 2,
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'sharp'],
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
