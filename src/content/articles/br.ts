import { buildArticles, type Draft } from "../build";

const drafts: Draft[] = [
  {
    id: "br-registrato",
    slug: "como-consultar-registrato-banco-central",
    title: "Registrato do Banco Central: como consultar de graça seus empréstimos e dívidas",
    seoTitle: "Como consultar o Registrato do Banco Central grátis (SCR) pelo gov.br — 2026",
    subtitle: "O Registrato mostra todos os seus empréstimos e financiamentos informados pelos bancos. É gratuito e basta uma conta gov.br prata ou ouro.",
    excerpt:
      "Com o Registrato, do Banco Central, você vê de graça o relatório SCR com seus empréstimos, financiamentos e dívidas em bancos. Passo a passo com a conta gov.br.",
    category: "money",
    tags: ["Registrato", "Banco Central", "SCR", "gov.br", "Crédito"],
    publishedAt: "2026-11-25T09:00:00-03:00",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Pagamento com celular em uma loja",
    featured: true,
    keyTakeaways: [
      "O Registrato é um serviço gratuito do Banco Central.",
      "É preciso ter conta gov.br nível prata ou ouro, com verificação em duas etapas ativada.",
      "O relatório “Empréstimos e Financiamentos (SCR)” mostra o que os bancos informaram sobre você.",
      "Os dados costumam estar atualizados até o dia 20 do mês seguinte.",
    ],
    body: [
      { type: "h2", id: "o-que-e", text: "O que é o Registrato" },
      {
        type: "p",
        text: "O Registrato é um sistema do Banco Central que reúne relatórios sobre a sua vida financeira. O mais usado é o do Sistema de Informações de Crédito (SCR), com os empréstimos, financiamentos e dívidas informados pelas instituições financeiras.",
      },
      { type: "h2", id: "passo-a-passo", text: "Passo a passo" },
      {
        type: "ol",
        items: [
          "Confira se sua conta gov.br é nível prata ou ouro e ative a verificação em duas etapas.",
          "Acesse o site do Banco Central e entre na área Meu BC / Registrato.",
          "Faça login com CPF e senha do gov.br.",
          "Escolha o relatório “Empréstimos e Financiamentos (SCR)”, aceite o termo e gere o documento.",
          "O relatório costuma ser baixado em PDF.",
        ],
      },
      {
        type: "callout",
        title: "Cuidado com intermediários",
        text: "O serviço é gratuito e oficial. Desconfie de sites que cobram para “consultar o Registrato” por você.",
      },
      { type: "h2", id: "o-que-conferir", text: "O que conferir" },
      {
        type: "ul",
        items: [
          "Empréstimos ou cartões que você não reconhece.",
          "Dívidas já quitadas que ainda aparecem como abertas.",
          "Valores em atraso que estejam incorretos.",
        ],
      },
      {
        type: "p",
        text: "Se encontrar um erro, procure primeiro a instituição que enviou a informação. Se não resolver, registre reclamação no Banco Central.",
      },
    ],
    faq: [
      {
        question: "O Registrato é pago?",
        answer: "Não. O acesso ao Registrato é gratuito para o cidadão.",
      },
      {
        question: "Que nível de conta gov.br eu preciso?",
        answer: "Prata ou ouro, com a verificação em duas etapas ativada.",
      },
    ],
    sources: [
      { name: "gov.br — Obter relatório do Sistema de Informações de Crédito (SCR)", url: "https://www.gov.br/pt-br/servicos/obter-relatorio-do-sistema-de-informacoes-de-credito-scr" },
      { name: "Correio da Manhã — Registrato supera 100 milhões de relatórios", url: "https://www.correiodamanha.com.br/economia/2026/02/262298-registrato-supera-100-milhoes-de-relatorios-de-dados-financeiros.html" },
      { name: "InvestNews — Registrato Bacen: o que é e como consultar", url: "https://investnews.com.br/guias/registrato-bacen-o-que-e-e-como-consultar/" },
    ],
    methodology: "Elaborado com base no gov.br e em reportagens sobre o Registrato, verificado em 25 de novembro de 2026.",
  },
  {
    id: "br-celular-seguro",
    slug: "celular-seguro-bloquear-celular-roubado",
    title: "Celular roubado? Como usar o Celular Seguro para bloquear tudo de uma vez",
    seoTitle: "Celular Seguro (gov.br): como cadastrar e bloquear celular roubado ou furtado",
    subtitle: "O programa do governo federal envia um alerta a bancos e operadoras parceiros com poucos toques. Veja como se preparar antes de precisar.",
    excerpt:
      "Com o Celular Seguro, você ou uma pessoa de confiança emite um alerta de roubo ou furto que pede o bloqueio do aparelho, da linha e de apps de bancos parceiros. Cadastre-se antes.",
    category: "technology",
    tags: ["Celular Seguro", "gov.br", "Roubo de Celular", "Segurança"],
    publishedAt: "2026-11-26T09:00:00-03:00",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Smartphone com ícones de aplicativos",
    keyTakeaways: [
      "O Celular Seguro é gratuito e usa sua conta gov.br.",
      "Cadastre o aparelho e indique pessoas de confiança — elas também precisam de conta gov.br.",
      "Em caso de roubo ou furto, você ou uma pessoa de confiança emite o alerta pelo app ou pelo site.",
      "Ligue também para a operadora e registre um boletim de ocorrência.",
    ],
    body: [
      { type: "h2", id: "antes", text: "Antes: faça o cadastro" },
      {
        type: "ol",
        items: [
          "Baixe o app Celular Seguro ou acesse o site e entre com sua conta gov.br.",
          "Cadastre seu aparelho e sua linha.",
          "Adicione pessoas de confiança, que poderão emitir o alerta por você.",
        ],
      },
      { type: "h2", id: "depois", text: "Depois do roubo ou furto" },
      {
        type: "ol",
        items: [
          "Emita o alerta no Celular Seguro (de outro aparelho, pelo site, ou peça a uma pessoa de confiança).",
          "Os bancos e empresas parceiros recebem o pedido de bloqueio.",
          "Ligue para a operadora para bloquear a linha e o IMEI, se necessário.",
          "Registre um boletim de ocorrência — em muitos estados é possível fazer pela internet.",
        ],
      },
      {
        type: "callout",
        title: "O alerta não substitui o boletim",
        text: "O Celular Seguro agiliza bloqueios, mas o boletim de ocorrência continua sendo importante para seguro e eventual recuperação do aparelho.",
      },
      { type: "h2", id: "desbloqueio", text: "Se recuperar o aparelho" },
      { type: "p", text: "Os desbloqueios precisam ser pedidos diretamente a cada banco, operadora e empresa onde o bloqueio foi feito." },
    ],
    faq: [
      { question: "O Celular Seguro é pago?", answer: "Não. É gratuito e usa a conta gov.br." },
      { question: "Quem pode emitir o alerta?", answer: "O próprio usuário ou uma pessoa de confiança cadastrada, que também precisa ter conta gov.br." },
    ],
    sources: [
      { name: "gov.br — Comunicar roubo ou furto pelo Celular Seguro", url: "https://www.gov.br/pt-br/servicos/comunicar-roubo-furto-de-aparelho-pelo-aplicativo-celular-seguro" },
    ],
    methodology: "Compilado a partir das páginas oficiais do gov.br, verificadas em 26 de novembro de 2026.",
  },
  {
    id: "br-passaporte-2026",
    slug: "como-tirar-passaporte",
    title: "Como tirar passaporte em 2026: taxa, agendamento e prazo de entrega",
    seoTitle: "Como tirar passaporte 2026: taxa R$ 257,25, agendamento na PF e prazo",
    subtitle: "O passo a passo da Polícia Federal, do formulário à retirada — e os erros que atrasam o processo.",
    excerpt:
      "A taxa do passaporte comum é R$ 257,25 (R$ 514,50 em caso de perda ou roubo do anterior). Pague a GRU, aguarde a compensação, agende na PF e retire em até 90 dias.",
    category: "travel",
    tags: ["Passaporte", "Polícia Federal", "Viagem Internacional"],
    publishedAt: "2026-11-26T08:00:00-03:00",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Asa de avião acima das nuvens",
    keyTakeaways: [
      "Taxa do passaporte comum: R$ 257,25.",
      "Se o passaporte anterior foi perdido, roubado ou danificado e ainda era válido, a taxa dobra: R$ 514,50.",
      "O agendamento só é liberado depois da compensação do pagamento, normalmente em cerca de um dia útil.",
      "Retire o passaporte em até 90 dias, ou ele será cancelado.",
    ],
    body: [
      { type: "h2", id: "passo-a-passo", text: "Passo a passo" },
      {
        type: "ol",
        items: [
          "Preencha o formulário de solicitação no site da Polícia Federal (gov.br).",
          "Emita e pague a GRU (Guia de Recolhimento da União).",
          "Aguarde a compensação do pagamento.",
          "Agende o atendimento em um posto da PF.",
          "Compareça com os documentos originais e o protocolo.",
          "Retire o passaporte no prazo.",
        ],
      },
      { type: "h2", id: "taxas", text: "Taxas" },
      {
        type: "table",
        head: ["Situação", "Taxa"],
        rows: [
          ["Passaporte comum", "R$ 257,25"],
          ["Anterior válido perdido, roubado ou danificado", "R$ 514,50"],
        ],
      },
      { type: "h2", id: "prazo", text: "Prazo de entrega" },
      {
        type: "p",
        text: "Depois do atendimento, a entrega costuma levar de 6 a 10 dias úteis, mas pode variar conforme o posto e a demanda. Não compre passagens contando com prazos curtos.",
      },
      {
        type: "callout",
        title: "Atenção ao prazo de retirada",
        text: "Se não retirar em até 90 dias, o passaporte é cancelado e você precisará pagar uma nova taxa.",
      },
    ],
    faq: [
      { question: "Quanto custa tirar passaporte em 2026?", answer: "R$ 257,25 para o passaporte comum; R$ 514,50 se o anterior válido foi perdido, roubado ou danificado." },
      { question: "Quanto tempo demora para o passaporte ficar pronto?", answer: "Em geral de 6 a 10 dias úteis após o atendimento, variando conforme o posto." },
    ],
    sources: [
      { name: "gov.br — Obter passaporte comum", url: "https://www.gov.br/pt-br/servicos/obter-passaporte-comum-para-brasileiro" },
      { name: "Polícia Federal — Passaporte", url: "https://www.gov.br/pf/pt-br/assuntos/passaporte" },
    ],
    methodology: "Compilado a partir das páginas oficiais da Polícia Federal e do gov.br, verificadas em 26 de novembro de 2026.",
  },
];

export const articles = buildArticles("br", drafts);
