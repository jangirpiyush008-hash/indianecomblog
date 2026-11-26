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
  {
    id: "fr-fin-bloctel-demarchage",
    slug: "demarchage-telephonique-fin-bloctel-consentement",
    title: "Démarchage téléphonique : la fin de Bloctel et la règle du consentement préalable",
    seoTitle: "Démarchage téléphonique 2026 : fin de Bloctel au 11 août, consentement obligatoire",
    subtitle: "Depuis le 11 août 2026, un professionnel ne peut plus vous démarcher par téléphone sans votre accord préalable. Ce qui change pour vous.",
    excerpt:
      "Le démarchage téléphonique passe à un régime d'« opt-in » : sans consentement préalable, l'appel commercial est interdit. Bloctel disparaît. Durée du consentement, secteurs interdits et recours.",
    category: "technology",
    tags: ["Bloctel", "Démarchage téléphonique", "Consentement", "Arnaques"],
    publishedAt: "2026-11-26T09:00:00+01:00",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Smartphone affichant des icônes d'applications",
    keyTakeaways: [
      "Depuis le 11 août 2026, le démarchage téléphonique n'est autorisé qu'avec votre consentement préalable.",
      "La liste d'opposition Bloctel n'a plus lieu d'être : vous n'avez plus besoin de vous y inscrire.",
      "Le consentement est valable un an et vous pouvez le retirer à tout moment.",
      "Le démarchage reste interdit pour la rénovation énergétique, l'adaptation du logement et le CPF.",
    ],
    body: [
      { type: "h2", id: "ce-qui-change", text: "Ce qui change" },
      {
        type: "p",
        text: "Auparavant, il fallait s'inscrire sur Bloctel pour refuser les appels commerciaux. Désormais, c'est l'inverse : un professionnel doit obtenir votre accord avant de vous appeler pour vous vendre quelque chose. Les modalités sont précisées par le décret n° 2026-662 du 23 juillet 2026.",
      },
      { type: "h2", id: "consentement", text: "Votre consentement" },
      {
        type: "ul",
        items: [
          "Il doit être libre, spécifique, éclairé et sans ambiguïté — une case précochée ne suffit pas.",
          "Il est valable un an.",
          "Vous pouvez le retirer à tout moment, simplement.",
        ],
      },
      { type: "h2", id: "secteurs", text: "Secteurs toujours interdits" },
      {
        type: "p",
        text: "Même avec un consentement, le démarchage téléphonique reste interdit pour la rénovation énergétique, l'adaptation des logements à la perte d'autonomie et le compte personnel de formation (CPF).",
      },
      { type: "h2", id: "recours", text: "Vos recours" },
      {
        type: "callout",
        title: "Contrat conclu après un appel illégal",
        text: "Un contrat signé à la suite d'un démarchage illégal peut être frappé de nullité. Signalez les abus sur SignalConso et le 33700 pour les SMS indésirables.",
      },
    ],
    faq: [
      { question: "Faut-il encore s'inscrire sur Bloctel ?", answer: "Non. Depuis le 11 août 2026, c'est le consentement préalable qui s'applique." },
      { question: "Combien de temps dure mon consentement ?", answer: "Un an, et il peut être retiré à tout moment." },
    ],
    sources: [
      { name: "Service-Public.fr — Démarchage téléphonique : ce qui change au 11 août 2026", url: "https://www.service-public.gouv.fr/particuliers/actualites/A19003" },
      { name: "economie.gouv.fr — Démarchage téléphonique : ce qui change", url: "https://www.economie.gouv.fr/particuliers/proteger-vos-donnees-personnelles/demarchage-telephonique-les-nouvelles-regles" },
    ],
    methodology: "Synthèse des informations de Service-Public.fr et du ministère de l'Économie, vérifiées le 26 novembre 2026.",
  },
  {
    id: "fr-livret-a-taux",
    slug: "livret-a-taux-1-7-pourcent",
    title: "Livret A à 1,7 % : combien rapporte votre épargne réglementée",
    seoTitle: "Livret A 1,7 % depuis le 1er août 2026 : plafond, LDDS, LEP et intérêts",
    subtitle: "Le taux du Livret A est passé de 1,5 % à 1,7 % au 1er août 2026. Calcul des intérêts, plafonds et alternatives.",
    excerpt:
      "Depuis le 1er août 2026, le Livret A et le LDDS rapportent 1,7 % net, et le LEP 2,5 %. Un Livret A rempli au plafond de 22 950 € rapporte environ 390 € par an.",
    category: "money",
    tags: ["Livret A", "LDDS", "LEP", "Épargne"],
    publishedAt: "2026-11-26T08:00:00+01:00",
    heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Calculatrice et documents financiers",
    keyTakeaways: [
      "Livret A et LDDS : 1,7 % net depuis le 1er août 2026 (contre 1,5 % auparavant).",
      "Ce taux s'applique au moins jusqu'au 31 janvier 2027.",
      "Plafonds : 22 950 € pour le Livret A, 12 000 € pour le LDDS.",
      "LEP (sous conditions de revenus) : 2,5 %.",
    ],
    body: [
      { type: "h2", id: "taux", text: "Les taux en vigueur" },
      {
        type: "table",
        head: ["Livret", "Taux net", "Plafond"],
        rows: [
          ["Livret A", "1,7 %", "22 950 €"],
          ["LDDS", "1,7 %", "12 000 €"],
          ["LEP", "2,5 %", "10 000 €"],
        ],
      },
      { type: "h2", id: "calcul", text: "Combien ça rapporte" },
      {
        type: "p",
        text: "Les intérêts sont exonérés d'impôt et de prélèvements sociaux. Un Livret A rempli au plafond toute l'année rapporte environ 390 € (22 950 € × 1,7 %). Attention : les intérêts sont calculés par quinzaine — un dépôt n'en produit qu'à partir de la quinzaine suivante.",
      },
      { type: "h2", id: "alternatives", text: "Faut-il garder son Livret A ?" },
      {
        type: "ul",
        items: [
          "Pour une épargne de précaution disponible à tout moment, il reste pertinent.",
          "Si vous êtes éligible au LEP, remplissez-le en priorité : il rapporte davantage.",
          "Pour l'épargne de long terme, d'autres placements peuvent être plus rentables, avec plus de risque.",
        ],
      },
      { type: "callout", title: "Révision du taux", text: "Le taux du Livret A est réexaminé deux fois par an, en février et en août." },
    ],
    faq: [
      { question: "Quel est le taux du Livret A en novembre 2026 ?", answer: "1,7 % net, depuis le 1er août 2026." },
      { question: "Quel est le plafond du Livret A ?", answer: "22 950 € pour un particulier, hors intérêts capitalisés." },
    ],
    sources: [
      { name: "Service-Public.fr — Livret A", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2365" },
      { name: "Service-Public.fr — Livret A : le taux passe à 1,7 %", url: "https://www.service-public.gouv.fr/particuliers/actualites/A15818" },
      { name: "Banque de France — Taux de l'épargne réglementée", url: "https://www.banque-france.fr/fr/statistiques/taux-et-cours/taux-de-lepargne-reglementee" },
    ],
    methodology: "Synthèse des informations de Service-Public.fr et de la Banque de France, vérifiées le 26 novembre 2026. Calcul d'intérêts simplifié.",
  },
];

export const articles = buildArticles("fr", drafts);
