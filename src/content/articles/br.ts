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
];

export const articles = buildArticles("br", drafts);
