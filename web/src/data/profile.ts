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

export type Challenge = { issue: string; fix: string }

export type Project = {
  slug: string
  tag: string // o que o projeto faz, em 1–3 palavras e único na lista (ex.: "Visão computacional")
  name: string
  context?: string // para quem/onde, curto (ex.: "Setor elétrico"). Vazio = não aparece.
  summary: string
  role?: string // o que você fez: "backend sozinho", "liderei a API, time de 3"
  outcome?: string // impacto medido: usuários, tempo poupado, volume. Vazio = não aparece.
  problem: string // a dor, antes do projeto (ou a ideia, em projeto que não nasce de um problema; ver `labels`)
  solution: string // o que o projeto faz para resolver, e com quê
  labels?: { problem?: string; solution?: string } // padrão: "O problema" / "A solução"
  challenges: Challenge[] // o que travou no caminho e como resolvi
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
    'Desenvolvo software para processos que hoje dependem de esforço manual, retrabalho ou conhecimento concentrado em poucas pessoas. Atuo no sistema como um todo, da modelagem e integração dos dados ao backend e à interface usada no dia a dia, com foco em arquitetura que sustenta crescimento e mudança.',
  email: 'victoroloveira.3002@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/olvvikitor' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jo%C3%A3o-victor-oliveira-969a15210' },
  ],
}

// "O que sei fazer" (seção própria antes de Projetos): o valor que a área traz + como faço e com quê. Sem citar projeto, empresa
// ou trajetória (isso fica nas outras seções). Só cite ferramenta que aparece nos projetos.
export type Capability = { title: string; text: string; tools: string[] } // text: ==trecho== vira marca-texto; tools: nomes do ToolIcon, na ordem em que entram

export const capabilities: Capability[] = [
  {
    title: 'Arquitetura de sistemas',
    text: 'Desenho e evolução de backends com ==domínios bem delimitados==, contratos claros entre módulos e ==regras de negócio isoladas da camada de infraestrutura==. Operações pesadas ou demoradas são tratadas de forma assíncrona, com filas e cache, para ==não comprometer o tempo de resposta== de quem usa o sistema. A modelagem de dados é pensada desde o início para suportar crescimento de volume e de funcionalidades, com migrações versionadas e ambientes reproduzíveis em contêineres. O objetivo é um sistema que ==aceita mudanças com previsibilidade, sem depender de reescritas==.',
    tools: ['NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'],
  },
  {
    title: 'Desenvolvimento web',
    text: 'Aplicações completas em TypeScript, ==da modelagem do banco à interface==, com tipagem compartilhada entre as camadas para reduzir erros de integração. O desenho das telas ==parte do fluxo real de trabalho de quem vai usar==: a ordem das tarefas, as informações necessárias em cada etapa e os pontos onde o processo costuma travar. No backend, APIs organizadas por domínio, com validação de entrada, controle de acesso e tratamento consistente de erros. No frontend, renderização no servidor quando faz diferença para desempenho e ==componentes reaproveitáveis para manter a interface coerente== à medida que o sistema cresce.',
    tools: ['TypeScript', 'React', 'Next.js', 'NestJS'],
  },
  {
    title: 'IA aplicada',
    text: 'Sistemas de busca e resposta sobre bases documentais internas, em que o modelo de linguagem ==trabalha a partir de trechos recuperados dos próprios documentos da empresa==, e não apenas do seu conhecimento geral. ==Cada resposta é acompanhada das fontes utilizadas==, permitindo verificação, e o sistema é construído para ==sinalizar quando a informação disponível não é suficiente==. O trabalho inclui preparação e segmentação dos documentos, indexação para busca semântica, desenho dos prompts e avaliação da qualidade das respostas com casos reais, além da exposição do serviço por APIs integráveis aos sistemas existentes.',
    tools: ['Python', 'OpenAI', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'Visão computacional',
    text: 'Modelos de detecção e classificação para ==inspeção visual em escala==, aplicados a tarefas que hoje dependem de análise manual de imagens. O desenvolvimento começa pelo ==entendimento dos critérios usados por quem faz essa análise==, que orientam a anotação dos dados e a definição do que o modelo precisa reconhecer. O treinamento considera imagens de baixa qualidade e casos ambíguos, e o modelo opera com limiares de confiança que ==encaminham resultados incertos para revisão humana==. A avaliação é feita com métricas adequadas ao problema e a entrega inclui o pipeline de pré-processamento e inferência pronto para integração.',
    tools: ['Python', 'PyTorch', 'YOLOv8', 'OpenCV'],
  },
  {
    title: 'Automações',
    text: 'Automação de processos operacionais recorrentes, como consolidação de planilhas, extração de dados de sistemas web e geração de relatórios periódicos. Antes da implementação, o processo é mapeado em detalhe, incluindo ==regras, exceções e pontos de falha conhecidos==, já que são esses casos que ==determinam a robustez da automação==. As rotinas são construídas com registro de execução, tratamento de erros e possibilidade de reprocessamento, para que ==falhas sejam identificadas e corrigidas sem intervenção manual== no fluxo inteiro.',
    tools: ['Python', 'pandas', 'Selenium', 'Excel'],
  },
  {
    title: 'Dados',
    text: 'Integração de dados de múltiplas fontes, tratamento e modelagem para indicadores e painéis de acompanhamento. O ponto de partida é ==a pergunta de negócio que o painel precisa responder==, o que define quais dados buscar, em que granularidade e com qual frequência de atualização. A extração é feita diretamente nas bases de origem, com tratamento e padronização antes da camada de visualização, e a modelagem segue estruturas que ==mantêm os cálculos consistentes e o desempenho estável== conforme o volume cresce. Experiência com ==operações de atendimento em larga escala==, com indicadores acompanhados diariamente pela gestão.',
    tools: ['Power BI', 'SQL', 'DAX', 'pandas', 'Spark', 'PostgreSQL'],
  },
]

// "Como eu trabalho" (seção Sobre): forma de pensar, sem citar projeto específico. Linguagem simples.
export const principles: { title: string; text: string }[] = [
  {
    title: 'Incerteza explícita',
    text: 'Um sistema confiável deixa claro quando não tem informação suficiente para responder. Prefiro que ele sinalize a dúvida e encaminhe o caso a uma pessoa do que entregue um resultado convincente e incorreto.',
  },
  {
    title: 'Validação com dados',
    text: 'Uma demonstração bem-sucedida não prova que o sistema funciona. Antes de considerar algo pronto, testo com casos que não foram usados no desenvolvimento e avalio o resultado por métricas definidas desde o início.',
  },
  {
    title: 'Entendimento do processo antes do código',
    text: 'A solicitação inicial raramente descreve o problema inteiro. Antes de implementar, acompanho a rotina de quem vai usar o sistema para identificar regras implícitas, exceções e pontos de falha que não aparecem na especificação.',
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

// Top 3. Cada projeto conta o problema, a solução e as dificuldades (o que travou + como resolvi).
export const projects: Project[] = [
  {
    slug: 'motionfy',
    tag: 'Recomendação musical',
    name: 'Motionfy',
    summary: 'Um diário do seu humor feito a partir do que você escuta, com playlists que ganham capa própria desenhada por IA.',
    labels: { problem: 'A ideia', solution: 'O que ele faz' },
    problem:
      'A música que toca ao longo do dia diz muito sobre como a gente está. O Motionfy acompanha o que você escuta pelo Last.fm e transforma isso num registro dos seus sentimentos: como foi o seu dia, como o humor mudou na semana e como ele se compara com o dos amigos.',
    solution:
      'Cada música ouvida ganha um perfil emocional de 10 dimensões, classificado por IA a partir do gênero (MusicBrainz), do BPM (Deezer) e de um trecho da letra (LRCLIB). Daí saem o humor dia a dia, a comparação com amigos e a playlist "jornada": um caminho no espaço 10D entre dois humores, com uma música por parada. Cada playlist ganha uma capa ilustrada exclusiva, gerada por IA a partir do humor dela.',
    challenges: [
      {
        issue: 'O MusicBrainz aceita só 1 requisição por segundo, e cada conta nova chega com centenas de músicas para analisar.',
        fix: 'A coleta roda em filas (BullMQ) que respeitam esse ritmo, com backoff exponencial quando a API recusa. A análise acontece em segundo plano e o perfil vai se completando sem travar a tela.',
      },
      {
        issue: 'Com poucas músicas analisadas, o centro de cada humor ficava instável e mudava a cada faixa nova.',
        fix: 'O centro é aprendido das músicas já classificadas, pela mediana de cada dimensão, e puxado para um perfil base enquanto há poucas. Conforme a base cresce, os dados reais passam a mandar.',
      },
      {
        issue: 'Last.fm, Spotify e YouTube Music têm APIs, formatos e autenticação diferentes.',
        fix: 'Os três ficam atrás de uma mesma interface: o resto do sistema não sabe de onde veio a música, e um serviço novo entra sem mexer na análise.',
      },
    ],
    flow: [
      { step: 'Conecta sua conta', detail: 'Liga no Last.fm e acompanha o que você ouve, dia após dia.' },
      { step: 'Conhece cada música', detail: 'Junta gênero, ritmo e um trecho da letra de cada faixa.' },
      { step: 'Traduz em emoção', detail: 'A IA dá a cada música um perfil emocional com 10 dimensões.' },
      { step: 'Traça a jornada', detail: 'Escolha dois humores e ele monta o caminho de um ao outro, música por música.' },
      { step: 'Vira playlist', detail: 'A jornada pronta para tocar no Spotify, com capa desenhada pela IA.' },
    ],
    flowCore: 2,
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'BullMQ', 'Redis', 'OpenAI', 'Next.js'],
    site: 'https://motionfy.fun/login',
    image: { src: '/projects/motionfy.jpg', alt: 'Perfil no Motionfy: playlist "paz" com capa ilustrada gerada por IA e, abaixo, a música que está tocando agora com o humor detectado; à direita, estatísticas e o humor das últimas 24 horas.', width: 1628, height: 885 },
  },
  {
    slug: 'assistente-rag',
    tag: 'Assistente com IA',
    name: 'Assistente RAG',
    context: 'Multi-cliente',
    summary: 'Assistente que tira dúvidas de procedimento respondendo só com base nos documentos indexados.',
    problem:
      'Os procedimentos de atendimento ficam espalhados em apresentações, documentos e gravações de treinamento. Achar a regra certa no meio de um atendimento leva tempo, e a dúvida acaba indo para o supervisor.',
    solution:
      'Um assistente que responde só a partir dos documentos de cada cliente, com a fonte em cada afirmação. Apresentações, textos e vídeos são indexados em filas (BullMQ), os trechos são buscados por similaridade no pgvector e o login usa o LDAP da empresa.',
    challenges: [
      {
        issue: 'Um modelo de linguagem responde com segurança mesmo quando o documento não diz nada sobre o assunto.',
        fix: 'A resposta é montada só com os trechos recuperados, e cada afirmação traz um número que abre o documento no trecho exato; em vídeo, leva ao ponto do vídeo. Sem trecho que sustente, o assistente diz que não encontrou.',
      },
      {
        issue: 'Vários clientes usam o mesmo sistema, e um documento aparecendo para o cliente errado seria grave.',
        fix: 'Documentos, conversas e usuários são separados por cliente em todas as camadas, inclusive na busca vetorial, que já filtra pelo cliente antes de comparar os trechos.',
      },
      {
        issue: 'Usuários pediam código, redação e tradução, tarefas fora do propósito do assistente.',
        fix: 'Escopo fechado: esses pedidos são barrados antes de chegar ao modelo, o que mantém o foco e evita gasto à toa.',
      },
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
    slug: 'medidor',
    tag: 'Visão computacional',
    name: 'Leitura de medidor',
    context: 'Setor elétrico',
    summary: 'Lê um medidor de energia analógico a partir de uma foto e devolve os quatro dígitos com o grau de confiança.',
    problem:
      'A leitura de medidores analógicos depende de uma pessoa olhando foto por foto. É lenta, sujeita a erro de digitação, e muitas fotos chegam tremidas, escuras ou tiradas de longe.',
    solution:
      'O sistema recebe a foto, identifica o medidor, confere se a imagem dá para ler e devolve os quatro dígitos com o grau de confiança. Um modelo de pose acha o ponteiro de cada mostrador, e o ângulo vira dígito pela regra regulatória.',
    outcome:
      'Acerto por etapa em teste independente: 99,5% ao localizar os mostradores, 95,8% ao achar o ponteiro e 96,6% ao reconhecer o tipo. A leitura completa ainda vai ser medida no piloto.',
    challenges: [
      {
        issue: 'Existem três tipos de medidor (ponteiro, digital e ciclométrico), e cada um se lê de um jeito.',
        fix: 'Uma triagem antes da leitura: um YOLOv8 reconhece o tipo e recorta só o visor, e cada tipo segue para a leitura certa.',
      },
      {
        issue: 'Foto ruim gera uma leitura errada com cara de certa.',
        fix: 'Antes de ler, o sistema avalia nitidez, brilho, contraste e o tamanho do medidor no enquadramento. Se a foto não passa, ele recusa e diz o motivo, em vez de chutar um número.',
      },
      {
        issue: 'Mostradores vizinhos giram em sentidos opostos, e o ângulo sozinho não diz o dígito.',
        fix: 'A conversão considera o sentido de giro de cada mostrador e aplica a regra regulatória de leitura ao transformar o ângulo em dígito.',
      },
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
