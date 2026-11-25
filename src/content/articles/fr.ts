import { buildArticles, type Draft } from "../build";

const drafts: Draft[] = [
  {
    id: "fr-ficp-banque-de-france",
    slug: "savoir-si-on-est-fiche-banque-de-france-ficp",
    title: "Fiché à la Banque de France ? Comment consulter gratuitement le FICP",
    seoTitle: "Savoir si on est fiché FICP à la Banque de France : démarche gratuite (2026)",
    subtitle: "Un crédit refusé, un doute sur un incident de remboursement ? La consultation du FICP est gratuite et se fait uniquement auprès de la Banque de France.",
    excerpt:
      "Le FICP recense les incidents de remboursement de crédit. Voici comment savoir gratuitement si vous y êtes inscrit : en ligne, par courrier ou au guichet de la Banque de France.",
    category: "money",
    tags: ["FICP", "Banque de France", "Crédit", "Fichage bancaire"],
    publishedAt: "2026-11-25T09:00:00+01:00",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Écran d'ordinateur affichant des graphiques financiers",
    featured: true,
    keyTakeaways: [
      "La consultation du FICP est gratuite.",
      "Elle se fait uniquement auprès de la Banque de France, pas auprès de votre banque.",
      "Trois voies : votre espace personnel en ligne, un courrier signé avec copie de pièce d'identité, ou une antenne locale de la Banque de France.",
      "Être inscrit au FICP n'est pas une interdiction légale d'emprunter.",
    ],
    body: [
      { type: "h2", id: "ficp", text: "Qu'est-ce que le FICP ?" },
      {
        type: "p",
        text: "Le Fichier national des incidents de remboursement des crédits aux particuliers (FICP) est géré par la Banque de France. Il recense les incidents de paiement caractérisés sur des crédits et les mesures de surendettement. Les prêteurs le consultent avant d'accorder un crédit.",
      },
      { type: "h2", id: "consulter", text: "Comment le consulter gratuitement" },
      {
        type: "table",
        head: ["Moyen", "Démarche"],
        rows: [
          ["En ligne", "Depuis votre espace personnel sur le site de la Banque de France, rubrique de demande de consultation d'un fichier d'incidents."],
          ["Par courrier", "Courrier manuscrit et signé, avec la copie de votre pièce d'identité, à : Banque de France, TSA 50120, 75035 Paris Cedex 01 (selon la CNIL)."],
          ["Sur place", "Auprès d'une antenne locale de la Banque de France, avec une pièce d'identité."],
        ],
      },
      {
        type: "callout",
        title: "Et par téléphone ?",
        text: "Le 34 14 renseigne sur le fonctionnement des fichiers, mais aucune information personnelle n'est communiquée par téléphone.",
      },
      { type: "h2", id: "inscrit", text: "Si vous êtes inscrit" },
      {
        type: "ul",
        items: [
          "L'inscription n'interdit pas légalement d'obtenir un crédit : chaque prêteur décide.",
          "Une fois l'incident régularisé, l'établissement qui l'a déclaré doit demander la radiation.",
          "En cas d'erreur, contactez d'abord l'établissement déclarant, puis la Banque de France.",
        ],
      },
    ],
    faq: [
      {
        question: "La consultation du FICP est-elle payante ?",
        answer: "Non. Le droit d'accès aux fichiers d'incidents de la Banque de France est gratuit.",
      },
      {
        question: "Ma banque peut-elle me dire si je suis fiché ?",
        answer: "Le droit d'accès individuel s'exerce exclusivement auprès de la Banque de France.",
      },
    ],
    sources: [
      { name: "Banque de France — Accéder aux informations vous concernant dans les fichiers d'incidents", url: "https://www.banque-france.fr/fr/a-votre-service/particuliers/fichiers-incident-bancaire" },
      { name: "CNIL — FICP : fichier national des incidents de remboursement", url: "https://www.cnil.fr/fr/ficp-fichier-national-des-incidents-de-remboursement-des-credits-aux-particuliers" },
      { name: "Banque de France — Huit idées reçues sur les fichiers d'incidents", url: "https://www.banque-france.fr/fr/actualites/huit-idees-recues-sur-les-inscriptions-aux-fichiers-dincidents-de-paiement" },
    ],
    methodology: "Rédigé à partir des informations de la Banque de France et de la CNIL, vérifiées le 25 novembre 2026.",
  },
];

export const articles = buildArticles("fr", drafts);
