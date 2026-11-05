// Todo o conteúdo do portfólio fica aqui. Edite este arquivo para atualizar o site.

export type Link = { label: string; href: string }


// Experiência contada como trajetória (portfólio, não currículo): sem datas, cargos formais ou modelo de trabalho.
export type Chapter = {
  label: string // momento, curto: "Hoje", "Antes", "Onde começou"
  title: string // frase sobre o que aprendeu/faz, não o cargo
  text: string
  points?: string[] // o que entrega, em frases curtas
}

export type FlowStep = { step: string; detail?: string }

export type Project = {
  slug: string
  tag: string // o que o projeto faz, em 1–3 palavras e único na lista (ex.: "Visão computacional")
  name: string
  context?: string // para quem/onde, curto (ex.: "Setor elétrico"). Vazio = não aparece.
  summary: string
  role?: string // o que você fez: "backend sozinho", "liderei a API, time de 3"
  outcome?: string // impacto medido: usuários, tempo poupado, volume. Vazio = não aparece.
  highlights: string[]
  flow: FlowStep[] // "Como funciona": etapas em ordem, cada uma com uma frase curta
  flowCore?: number // índice da etapa principal (onde está a parte difícil)
  stack: string[]
  repo?: string // ausente em projeto de trabalho (código privado)
  site?: string
  image?: { src: string; alt: string; width: number; height: number }
}

export type Course = { title: string; school: string; place: string; period: string }

export const profile: {
  name: string
  headline: string
  specialties: string
  available: boolean // mostra a pílula "Disponível" no topo
  about: string
  email: string
  resume?: string // ex.: '/curriculo.pdf' (arquivo em public/). Vazio = o link não aparece.
  links: Link[]
} = {
  name: 'João Victor Jesus de Oliveira',
  headline: 'Desenvolvedor *full stack*', // *trecho* = destaque condensado
  specialties: 'Crio sistemas web completos e uso inteligência artificial para resolver problemas reais.',
  available: true,
  about:
    'Gosto de pegar uma tarefa repetitiva ou confusa do dia a dia e transformar em algo que funciona sozinho. Penso no sistema inteiro, do dado que entra à tela que a pessoa usa, e hoje estudo arquitetura de sistemas para construir coisas que aguentem crescer.',
  email: 'victoroloveira.3002@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/olvvikitor' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jo%C3%A3o-victor-oliveira-969a15210' },
  ],
}

// "Como eu trabalho" (seção Sobre): forma de pensar, sem citar projeto específico. Linguagem simples.
export const principles: { title: string; text: string }[] = [
  {
    title: 'Melhor admitir que não sabe do que inventar',
    text: 'Sistema confiável avisa quando não tem certeza. Prefiro uma resposta honesta a uma resposta bonita e errada.',
  },
  {
    title: 'Medir antes de dizer que funciona',
    text: 'Impressão engana. Antes de chamar algo de pronto, testo com casos novos e olho os números, não só a demonstração.',
  },
  {
    title: 'Entender a rotina antes de programar',
    text: 'O pedido raramente é o problema inteiro. Escuto quem vai usar e acompanho o dia a dia antes de escrever a primeira linha.',
  },
]

export const journey: Chapter[] = [
  {
    label: 'Hoje',
    title: 'Construo sistemas com IA que viram rotina da operação.',
    text: 'Na Tel Contact Center, desenvolvo de ponta a ponta para vários clientes da empresa: da ideia à tela que a equipe usa todo dia.',
    points: [
      'Assistentes que respondem a equipe com base nos documentos internos, citando a fonte.',
      'Sistemas que leem e analisam fotos sozinhos.',
      'Conexões entre os sistemas da empresa e os serviços de IA.',
      'Automações que tiram etapas manuais do caminho.',
    ],
  },
  {
    label: 'Antes',
    title: 'Aprendi a decidir com dados.',
    text: 'Como analista de dados, buscava os números direto nas fontes, organizava tudo e montava painéis para as áreas acompanharem o negócio. Daí vem o hábito de medir antes de dizer que algo funciona.',
  },
  {
    label: 'Onde começou',
    title: 'Comecei do outro lado, atendendo clientes.',
    text: 'No atendimento da Atento, vi de perto o que trava quem depende de um sistema mal feito. É isso que tento evitar em tudo que construo.',
  },
]

export const projects: Project[] = [
  {
    slug: 'medidor',
    tag: 'Visão computacional',
    name: 'Leitura de medidor',
    context: 'Setor elétrico',
    summary: 'Lê um medidor de energia analógico a partir de uma foto e devolve os quatro dígitos com o grau de confiança.',
    highlights: [
      'Triagem antes de ler: um YOLOv8 identifica o tipo de medidor (ponteiro, digital ou ciclométrico) e recorta o visor.',
      'Recusa foto ilegível em vez de chutar: avalia nitidez, brilho, contraste e tamanho do medidor no enquadramento e diz o motivo.',
      'Um modelo de pose acha o ponteiro de cada mostrador; o ângulo vira dígito pela regra regulatória, tratando os mostradores que giram ao contrário.',
      'Acerto por etapa em teste independente: 99,5% ao localizar os mostradores, 95,8% ao achar o ponteiro e 96,6% ao reconhecer o tipo. A leitura completa ainda vai ser medida no piloto.',
    ],
    flow: [
      { step: 'Tira a foto', detail: 'Basta uma foto do relógio de luz.' },
      { step: 'Reconhece o medidor', detail: 'Descobre sozinho que tipo de medidor é e foca só no visor.' },
      { step: 'Confere a foto', detail: 'Foto ruim não passa: o sistema diz o motivo em vez de chutar um número.' },
      { step: 'Lê os ponteiros', detail: 'Encontra o ponteiro de cada mostrador, um por um.' },
      { step: 'Aplica a norma', detail: 'Converte cada posição em número, até nos mostradores que giram ao contrário.' },
      { step: 'Entrega a leitura', detail: 'Os quatro dígitos prontos, junto com o quanto o sistema tem certeza.' },
    ],
    flowCore: 3,
    stack: ['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'FastAPI'],
  },
  {
    slug: 'assistente-rag',
    tag: 'Assistente com IA',
    name: 'Assistente RAG',
    context: 'Multi-cliente',
    summary: 'Assistente que tira dúvidas de procedimento respondendo só com base nos documentos indexados.',
    highlights: [
      'Toda afirmação cita a fonte: um número que abre o documento no trecho exato; em vídeo, a citação leva ao ponto do vídeo.',
      'Escopo fechado: pedido de código, redação ou tradução é bloqueado antes de chegar ao modelo.',
      'Indexa apresentações, textos e vídeos em filas (BullMQ); busca por similaridade no pgvector.',
      'Isolamento por cliente: login pelo LDAP da empresa, e documentos, conversas e usuários separados por cliente, inclusive na busca vetorial.',
    ],
    flow: [
      { step: 'Recebe o material', detail: 'Apresentações, textos e até vídeos: aprende com o que a empresa já tem.' },
      { step: 'Organiza tudo', detail: 'Cada arquivo é processado em segundo plano, sem travar ninguém.' },
      { step: 'Acha o trecho certo', detail: 'Encontra a parte exata que responde à pergunta, e cada cliente só vê o que é dele.' },
      { step: 'Responde', detail: 'Só com base nos documentos. Nada inventado, nada fora do assunto.' },
      { step: 'Mostra a fonte', detail: 'Cada resposta leva direto ao trecho do documento ou ao minuto do vídeo.' },
    ],
    flowCore: 2,
    stack: ['NestJS', 'PostgreSQL', 'pgvector', 'BullMQ', 'Redis', 'MinIO', 'React'],
  },
  {
    slug: 'distribuidor',
    tag: 'Gestão de atendimento',
    name: 'Distribuidor de casos',
    context: 'Call center',
    summary: 'Distribui casos para operadores por fila e acompanha o prazo de cada tratativa.',
    highlights: [
      'O operador puxa o próximo caso: primeiro retoma o que já estava em andamento, depois busca só na fila dele.',
      'Prazos por área: casos no prazo, atrasados e em verificação aparecem separados.',
      'Importação de bases por planilha e histórico de cada atribuição e tratativa.',
    ],
    flow: [
      { step: 'Importa os casos', detail: 'A base chega por planilha, sem digitação manual.' },
      { step: 'Monta as filas', detail: 'Cada operador recebe o caso certo: primeiro termina o que começou, depois pega da própria fila.' },
      { step: 'Operador pede', detail: 'Pediu o próximo caso, ele já está na tela.' },
      { step: 'Controla o prazo', detail: 'No prazo, atrasado ou em verificação: cada área vê na hora onde agir.' },
      { step: 'Guarda o histórico', detail: 'Quem atendeu, quando e o que foi feito fica registrado.' },
    ],
    flowCore: 1,
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'JWT', 'React'],
  },
  {
    slug: 'motionfy',
    tag: 'Recomendação musical',
    name: 'Motionfy',
    summary: 'Conecta ao Last.fm e traduz o que você escuta em humor, dia após dia. Dá para comparar com amigos.',
    highlights: [
      'Cada música vira um vetor emocional de 10 dimensões, classificado por IA a partir de gênero (MusicBrainz), BPM (Deezer) e trecho da letra (LRCLIB).',
      'Os centros de cada humor são aprendidos das músicas já analisadas: mediana por dimensão, puxada para um perfil base quando há poucas.',
      'Playlist "jornada": traça um caminho entre dois humores no espaço 10D e escolhe uma música por parada.',
      'Last.fm, Spotify e YouTube Music atrás de uma mesma interface; MusicBrainz respeitando 1 req/s com backoff exponencial.',
    ],
    flow: [
      { step: 'Conecta sua conta', detail: 'Liga no Last.fm e acompanha o que você ouve, dia após dia.' },
      { step: 'Conhece cada música', detail: 'Junta gênero, ritmo e um trecho da letra de cada faixa.' },
      { step: 'Traduz em emoção', detail: 'A IA dá a cada música um perfil emocional com 10 dimensões.' },
      { step: 'Traça a jornada', detail: 'Escolha dois humores e ele monta o caminho de um ao outro, música por música.' },
      { step: 'Vira playlist', detail: 'A jornada pronta para tocar no Spotify.' },
    ],
    flowCore: 2,
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'BullMQ', 'Redis', 'OpenAI', 'Next.js'],
    repo: 'https://github.com/olvvikitor/motionfy',
    site: 'https://motionfy.fun/login',
    image: { src: '/projects/motionfy.jpg', alt: 'Perfil no Motionfy: playlist "paz" com capa ilustrada, estatísticas de humores e músicas, e o humor das últimas 24 horas.', width: 1475, height: 568 },
  },
  {
    slug: 'estampa',
    tag: 'Geração de imagens',
    name: 'Estampa',
    summary: 'Gera arte para camiseta, adesivo e pôster em estilos de traço definidos, como linha clara e xilogravura.',
    highlights: [
      'Cada estilo descreve o traço inteiro e o que evitar, e vira o prompt da OpenAI Images; aceita imagem de referência.',
      'Fundo transparente mesmo quando o modelo não entrega: gera sobre cor lisa e remove só a cor que encosta na borda.',
      'Sem banco: cada arte fica salva como PNG com um JSON ao lado.',
    ],
    flow: [
      { step: 'Faz o pedido', detail: 'Diz o tema, escolhe o estilo e, se quiser, manda uma referência.' },
      { step: 'Define o traço', detail: 'Cada estilo tem suas regras, do que fazer ao que evitar.' },
      { step: 'Gera a arte', detail: 'A IA desenha sobre um fundo liso.' },
      { step: 'Tira o fundo', detail: 'Fundo transparente de verdade, mesmo quando a IA não entrega.' },
      { step: 'Pronta para usar', detail: 'Arte em PNG para camiseta, adesivo ou pôster.' },
    ],
    flowCore: 3,
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'sharp'],
    image: { src: '/projects/estampa.jpg', alt: 'Tela do Estampa: escolha de estilo à esquerda, arte gerada e galeria à direita.', width: 1232, height: 690 },
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
