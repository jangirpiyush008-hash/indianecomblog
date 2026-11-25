import type { Desk, Lang, SectionKey } from "./countries";

type Dict = {
  sections: Record<SectionKey, string>;
  deskTagline: Record<Desk, string>;
  home: { eyebrow: string; h1: (country: string) => string; intro: (country: string) => string };
  trending: { h1: (country: string) => string; intro: (country: string) => string; searchesTitle: string; headlinesTitle: string; how: string };
  ui: {
    latest: string; inTheNews: string; moreHeadlines: string; allDesks: string; source: string; headlinesUnavailable: string;
    trendingSearches: string; noStoriesYet: string; fromOurDesks: string; newsletterTitle: string; newsletterText: string;
    keyTakeaways: string; inThisArticle: string; faq: string; sources: string; published: string; updated: string; minRead: string;
    aboutAuthor: string; moreBy: string; share: string; keepReading: string; affiliateNote: string; howWeMakeMoney: string;
    viewOn: (m: string) => string; priceChecked: (d: string) => string; mrp: string;
    shoppingH1: (c: string) => string; shoppingIntro: string; dealsH1: (c: string) => string; dealsSoon: string;
    guidesH1: string; searchH1: string; searchPlaceholder: string; results: (n: number) => string; noResults: (q: string) => string;
    edition: string; changeEdition: string; topics: string; trendingNow: string; seeAll: string; readStory: string;
    explainers: string; deskEmpty: (desk: string) => string; corrections: string;
  };
};

const en: Dict = {
  sections: {
    trending: "Trending", technology: "Technology", "ai-tools": "AI Tools", shopping: "Shopping", deals: "Deals",
    money: "Money", lifestyle: "Lifestyle", entertainment: "Entertainment", travel: "Travel", guides: "Buying Guides", search: "Search",
  },
  deskTagline: {
    technology: "Phones, laptops, gadgets and the services behind them",
    "ai-tools": "AI tools, prices and offers — explained",
    shopping: "Buying guides with prices checked on the store",
    money: "Everyday personal finance, from the official source",
    lifestyle: "Beauty, grooming, fashion and wellness",
    entertainment: "What's new to stream and watch",
    travel: "Practical guides for travellers",
  },
  home: {
    eyebrow: "Today's edition",
    h1: (c) => `What's trending in ${c} right now`,
    intro: (c) => `Live headlines from across ${c}, explainers with sources, and buying guides with prices we check on the store.`,
  },
  trending: {
    h1: (c) => `Trending in ${c} today`,
    intro: (c) => `The latest headlines across our desks, pulled from Google News ${c} and refreshed every 30 minutes. Every item links to the original publisher.`,
    searchesTitle: "Trending searches",
    headlinesTitle: "Latest headlines",
    how: "Headlines come from Google News and trending searches from Google Trends for this country. We list them with their source; we don't rewrite or score them here.",
  },
  ui: {
    latest: "Latest", inTheNews: "In the news", moreHeadlines: "More headlines", allDesks: "All desks", source: "Source",
    headlinesUnavailable: "Live headlines are temporarily unavailable.", trendingSearches: "Trending searches",
    noStoriesYet: "Our first stories for this edition are being written.", fromOurDesks: "From our desks",
    newsletterTitle: "New stories, in your inbox", newsletterText: "Free. Unsubscribe any time.",
    keyTakeaways: "Key takeaways", inThisArticle: "In this article", faq: "Frequently asked questions",
    sources: "Sources & how this was researched", published: "Published", updated: "Updated", minRead: "min read",
    aboutAuthor: "About the author", moreBy: "More by", share: "Share", keepReading: "Keep reading",
    affiliateNote: "This article contains affiliate links. If you buy through them we may earn a commission, at no extra cost to you.",
    howWeMakeMoney: "How we make money", viewOn: (m) => `View on ${m}`, priceChecked: (d) => `Price checked ${d} · may change`, mrp: "List price",
    shoppingH1: (c) => `Shopping guides for ${c}`,
    shoppingIntro: "We compare products on what the brand publishes and the price on the store, and show the date we checked.",
    dealsH1: (c) => `Deals in ${c}`,
    dealsSoon: "We're setting up partnerships with local retailers for this edition. Price-checked deals will appear here once those links are approved and tested — we don't show placeholder prices.",
    guidesH1: "Buying guides", searchH1: "Search", searchPlaceholder: "Search this edition…",
    results: (n) => `${n} result${n === 1 ? "" : "s"}`, noResults: (q) => `No results for “${q}”`,
    edition: "Edition", changeEdition: "Change edition", topics: "Topics", trendingNow: "Trending now", seeAll: "See all",
    readStory: "Read the story", explainers: "Explainers", deskEmpty: (d) => `No ${d.toLowerCase()} stories in this edition yet — here's what's in the news.`,
    corrections: "Found an error? See our corrections policy.",
  },
};

const de: Dict = {
  sections: {
    trending: "Trends", technology: "Technologie", "ai-tools": "KI-Tools", shopping: "Shopping", deals: "Angebote",
    money: "Finanzen", lifestyle: "Lifestyle", entertainment: "Unterhaltung", travel: "Reisen", guides: "Kaufberatung", search: "Suche",
  },
  deskTagline: {
    technology: "Smartphones, Laptops, Gadgets und die Dienste dahinter",
    "ai-tools": "KI-Tools, Preise und Angebote – verständlich erklärt",
    shopping: "Kaufberatung mit im Shop geprüften Preisen",
    money: "Alltagsfinanzen, direkt aus offiziellen Quellen",
    lifestyle: "Beauty, Pflege, Mode und Wohlbefinden",
    entertainment: "Neu bei Streaming und im Kino",
    travel: "Praktische Ratgeber für Reisende",
  },
  home: {
    eyebrow: "Heutige Ausgabe",
    h1: () => "Was in Deutschland gerade im Trend liegt",
    intro: () => "Aktuelle Schlagzeilen aus ganz Deutschland, Erklärstücke mit Quellen und Kaufberatung mit im Shop geprüften Preisen.",
  },
  trending: {
    h1: () => "Heute in Deutschland im Trend",
    intro: () => "Die neuesten Schlagzeilen aus unseren Ressorts, aus Google News Deutschland, alle 30 Minuten aktualisiert. Jeder Eintrag verlinkt auf das Originalmedium.",
    searchesTitle: "Beliebte Suchanfragen",
    headlinesTitle: "Neueste Schlagzeilen",
    how: "Die Schlagzeilen stammen aus Google News, die Suchtrends aus Google Trends für Deutschland. Wir zeigen sie mit Quelle an und schreiben sie nicht um.",
  },
  ui: {
    latest: "Neu", inTheNews: "In den Nachrichten", moreHeadlines: "Weitere Schlagzeilen", allDesks: "Alle Ressorts", source: "Quelle",
    headlinesUnavailable: "Aktuelle Schlagzeilen sind vorübergehend nicht verfügbar.", trendingSearches: "Beliebte Suchanfragen",
    noStoriesYet: "Die ersten Artikel für diese Ausgabe entstehen gerade.", fromOurDesks: "Aus unseren Ressorts",
    newsletterTitle: "Neue Artikel per E-Mail", newsletterText: "Kostenlos. Jederzeit abbestellbar.",
    keyTakeaways: "Das Wichtigste in Kürze", inThisArticle: "In diesem Artikel", faq: "Häufige Fragen",
    sources: "Quellen & Recherche", published: "Veröffentlicht", updated: "Aktualisiert", minRead: "Min. Lesezeit",
    aboutAuthor: "Über den Autor", moreBy: "Mehr von", share: "Teilen", keepReading: "Weiterlesen",
    affiliateNote: "Dieser Artikel enthält Affiliate-Links. Kaufen Sie darüber, erhalten wir eventuell eine Provision – für Sie ohne Mehrkosten.",
    howWeMakeMoney: "So finanzieren wir uns", viewOn: (m) => `Bei ${m} ansehen`, priceChecked: (d) => `Preis geprüft am ${d} · kann sich ändern`, mrp: "UVP",
    shoppingH1: () => "Kaufberatung für Deutschland",
    shoppingIntro: "Wir vergleichen Produkte anhand der Herstellerangaben und des Shop-Preises – mit Prüfdatum.",
    dealsH1: () => "Angebote in Deutschland",
    dealsSoon: "Wir richten gerade Partnerschaften mit deutschen Händlern ein. Geprüfte Angebote erscheinen hier, sobald die Links genehmigt und getestet sind – Platzhalterpreise zeigen wir nicht.",
    guidesH1: "Kaufberatung", searchH1: "Suche", searchPlaceholder: "Diese Ausgabe durchsuchen…",
    results: (n) => `${n} Ergebnis${n === 1 ? "" : "se"}`, noResults: (q) => `Keine Ergebnisse für „${q}“`,
    edition: "Ausgabe", changeEdition: "Ausgabe wechseln", topics: "Themen", trendingNow: "Gerade im Trend", seeAll: "Alle anzeigen",
    readStory: "Artikel lesen", explainers: "Erklärt", deskEmpty: (d) => `Noch keine Artikel im Ressort ${d} – das steht gerade in den Nachrichten.`,
    corrections: "Fehler gefunden? Siehe unsere Korrekturrichtlinie.",
  },
};

const fr: Dict = {
  sections: {
    trending: "Tendances", technology: "Technologie", "ai-tools": "Outils IA", shopping: "Shopping", deals: "Bons plans",
    money: "Argent", lifestyle: "Lifestyle", entertainment: "Divertissement", travel: "Voyage", guides: "Guides d'achat", search: "Recherche",
  },
  deskTagline: {
    technology: "Smartphones, ordinateurs, objets connectés et services",
    "ai-tools": "Outils d'IA, prix et offres, expliqués",
    shopping: "Guides d'achat avec des prix vérifiés en boutique",
    money: "Finances du quotidien, à partir des sources officielles",
    lifestyle: "Beauté, soin, mode et bien-être",
    entertainment: "Les nouveautés en streaming et au cinéma",
    travel: "Guides pratiques pour voyager",
  },
  home: {
    eyebrow: "L'édition du jour",
    h1: () => "Ce qui fait tendance en France en ce moment",
    intro: () => "L'actualité en direct partout en France, des explications sourcées et des guides d'achat avec des prix vérifiés en boutique.",
  },
  trending: {
    h1: () => "Les tendances en France aujourd'hui",
    intro: () => "Les derniers titres de nos rubriques, issus de Google Actualités France et mis à jour toutes les 30 minutes. Chaque titre renvoie vers le média d'origine.",
    searchesTitle: "Recherches tendance",
    headlinesTitle: "Derniers titres",
    how: "Les titres proviennent de Google Actualités et les recherches tendance de Google Trends pour la France. Nous les citons avec leur source, sans les réécrire.",
  },
  ui: {
    latest: "À la une", inTheNews: "Dans l'actualité", moreHeadlines: "Plus de titres", allDesks: "Toutes les rubriques", source: "Source",
    headlinesUnavailable: "L'actualité en direct est momentanément indisponible.", trendingSearches: "Recherches tendance",
    noStoriesYet: "Les premiers articles de cette édition sont en cours de rédaction.", fromOurDesks: "Nos rubriques",
    newsletterTitle: "Nos nouveaux articles par e-mail", newsletterText: "Gratuit. Désinscription à tout moment.",
    keyTakeaways: "L'essentiel", inThisArticle: "Dans cet article", faq: "Questions fréquentes",
    sources: "Sources et méthode", published: "Publié le", updated: "Mis à jour le", minRead: "min de lecture",
    aboutAuthor: "À propos de l'auteur", moreBy: "Plus de", share: "Partager", keepReading: "À lire aussi",
    affiliateNote: "Cet article contient des liens d'affiliation. Si vous achetez via ces liens, nous pouvons toucher une commission, sans surcoût pour vous.",
    howWeMakeMoney: "Comment nous nous finançons", viewOn: (m) => `Voir chez ${m}`, priceChecked: (d) => `Prix vérifié le ${d} · susceptible de changer`, mrp: "Prix conseillé",
    shoppingH1: () => "Guides d'achat pour la France",
    shoppingIntro: "Nous comparons les produits à partir des données du fabricant et du prix en boutique, avec la date de vérification.",
    dealsH1: () => "Bons plans en France",
    dealsSoon: "Nous mettons en place des partenariats avec des enseignes françaises. Les bons plans vérifiés apparaîtront ici dès que les liens seront validés et testés — nous n'affichons pas de prix fictifs.",
    guidesH1: "Guides d'achat", searchH1: "Recherche", searchPlaceholder: "Rechercher dans cette édition…",
    results: (n) => `${n} résultat${n > 1 ? "s" : ""}`, noResults: (q) => `Aucun résultat pour « ${q} »`,
    edition: "Édition", changeEdition: "Changer d'édition", topics: "Sujets", trendingNow: "En ce moment", seeAll: "Tout voir",
    readStory: "Lire l'article", explainers: "Explications", deskEmpty: (d) => `Pas encore d'article dans la rubrique ${d} — voici l'actualité.`,
    corrections: "Une erreur ? Consultez notre politique de correction.",
  },
};

const pt: Dict = {
  sections: {
    trending: "Tendências", technology: "Tecnologia", "ai-tools": "Ferramentas de IA", shopping: "Compras", deals: "Ofertas",
    money: "Dinheiro", lifestyle: "Estilo de vida", entertainment: "Entretenimento", travel: "Viagem", guides: "Guias de compra", search: "Busca",
  },
  deskTagline: {
    technology: "Celulares, notebooks, gadgets e os serviços por trás deles",
    "ai-tools": "Ferramentas de IA, preços e ofertas — explicados",
    shopping: "Guias de compra com preços conferidos na loja",
    money: "Finanças do dia a dia, direto da fonte oficial",
    lifestyle: "Beleza, cuidados, moda e bem-estar",
    entertainment: "O que há de novo no streaming e no cinema",
    travel: "Guias práticos para viajar",
  },
  home: {
    eyebrow: "Edição de hoje",
    h1: () => "O que está em alta no Brasil agora",
    intro: () => "Manchetes ao vivo de todo o Brasil, explicações com fontes e guias de compra com preços conferidos na loja.",
  },
  trending: {
    h1: () => "Em alta no Brasil hoje",
    intro: () => "As últimas manchetes das nossas editorias, do Google Notícias Brasil, atualizadas a cada 30 minutos. Cada item leva ao veículo original.",
    searchesTitle: "Buscas em alta",
    headlinesTitle: "Últimas manchetes",
    how: "As manchetes vêm do Google Notícias e as buscas em alta do Google Trends para o Brasil. Mostramos a fonte e não reescrevemos os títulos.",
  },
  ui: {
    latest: "Novidades", inTheNews: "No noticiário", moreHeadlines: "Mais manchetes", allDesks: "Todas as editorias", source: "Fonte",
    headlinesUnavailable: "As manchetes ao vivo estão temporariamente indisponíveis.", trendingSearches: "Buscas em alta",
    noStoriesYet: "As primeiras matérias desta edição estão sendo escritas.", fromOurDesks: "Das nossas editorias",
    newsletterTitle: "Novas matérias no seu e-mail", newsletterText: "Grátis. Cancele quando quiser.",
    keyTakeaways: "Resumo", inThisArticle: "Nesta matéria", faq: "Perguntas frequentes",
    sources: "Fontes e metodologia", published: "Publicado em", updated: "Atualizado em", minRead: "min de leitura",
    aboutAuthor: "Sobre o autor", moreBy: "Mais de", share: "Compartilhar", keepReading: "Leia também",
    affiliateNote: "Esta matéria contém links de afiliado. Se você comprar por eles, podemos receber uma comissão, sem custo extra para você.",
    howWeMakeMoney: "Como nos financiamos", viewOn: (m) => `Ver na ${m}`, priceChecked: (d) => `Preço conferido em ${d} · pode mudar`, mrp: "Preço de tabela",
    shoppingH1: () => "Guias de compra para o Brasil",
    shoppingIntro: "Comparamos produtos com base nas especificações do fabricante e no preço da loja, sempre com a data da conferência.",
    dealsH1: () => "Ofertas no Brasil",
    dealsSoon: "Estamos fechando parcerias com varejistas brasileiros. Ofertas conferidas aparecerão aqui quando os links forem aprovados e testados — não mostramos preços fictícios.",
    guidesH1: "Guias de compra", searchH1: "Busca", searchPlaceholder: "Buscar nesta edição…",
    results: (n) => `${n} resultado${n === 1 ? "" : "s"}`, noResults: (q) => `Nenhum resultado para “${q}”`,
    edition: "Edição", changeEdition: "Mudar edição", topics: "Assuntos", trendingNow: "Em alta agora", seeAll: "Ver tudo",
    readStory: "Ler matéria", explainers: "Explicações", deskEmpty: (d) => `Ainda não há matérias em ${d} nesta edição — veja o que está no noticiário.`,
    corrections: "Encontrou um erro? Veja nossa política de correções.",
  },
};

const ja: Dict = {
  sections: {
    trending: "トレンド", technology: "テクノロジー", "ai-tools": "AIツール", shopping: "ショッピング", deals: "セール",
    money: "マネー", lifestyle: "ライフスタイル", entertainment: "エンタメ", travel: "トラベル", guides: "購入ガイド", search: "検索",
  },
  deskTagline: {
    technology: "スマホ、PC、ガジェットとそのサービス",
    "ai-tools": "AIツールの料金とキャンペーンをわかりやすく",
    shopping: "店頭価格を確認した購入ガイド",
    money: "公式情報にもとづく暮らしのお金",
    lifestyle: "美容、身だしなみ、ファッション、ウェルネス",
    entertainment: "配信と映画の新作情報",
    travel: "旅行に役立つ実用ガイド",
  },
  home: {
    eyebrow: "今日の注目",
    h1: () => "いま日本で話題のトピック",
    intro: () => "日本各地の最新ニュース、出典つきの解説、店頭価格を確認した購入ガイドをお届けします。",
  },
  trending: {
    h1: () => "今日の日本のトレンド",
    intro: () => "各カテゴリの最新ニュースを Google ニュース（日本）から30分ごとに更新しています。すべての見出しは元の媒体にリンクしています。",
    searchesTitle: "急上昇ワード",
    headlinesTitle: "最新ニュース",
    how: "見出しは Google ニュース、急上昇ワードは日本の Google トレンドから取得しています。出典を明記し、見出しの書き換えは行いません。",
  },
  ui: {
    latest: "新着", inTheNews: "ニュース", moreHeadlines: "ニュースをもっと見る", allDesks: "すべて", source: "出典",
    headlinesUnavailable: "最新ニュースを一時的に取得できません。", trendingSearches: "急上昇ワード",
    noStoriesYet: "この版の最初の記事を準備中です。", fromOurDesks: "各カテゴリから",
    newsletterTitle: "新着記事をメールで受け取る", newsletterText: "無料・いつでも配信停止できます。",
    keyTakeaways: "この記事のポイント", inThisArticle: "目次", faq: "よくある質問",
    sources: "出典と調査方法", published: "公開", updated: "更新", minRead: "分で読めます",
    aboutAuthor: "著者について", moreBy: "この著者の記事", share: "共有", keepReading: "あわせて読みたい",
    affiliateNote: "この記事にはアフィリエイトリンクが含まれます。リンク経由で購入された場合、当サイトが紹介料を受け取ることがありますが、お客様の負担は増えません。",
    howWeMakeMoney: "収益について", viewOn: (m) => `${m}で見る`, priceChecked: (d) => `${d} 時点の価格・変動あり`, mrp: "参考価格",
    shoppingH1: () => "日本向け購入ガイド",
    shoppingIntro: "メーカー公表のスペックと店頭価格をもとに比較し、確認日を明記しています。",
    dealsH1: () => "日本のセール情報",
    dealsSoon: "現在、日本の販売店との提携を準備中です。リンクの承認とテストが完了しだい、確認済みのセール情報を掲載します。仮の価格は表示しません。",
    guidesH1: "購入ガイド", searchH1: "検索", searchPlaceholder: "この版を検索…",
    results: (n) => `${n}件`, noResults: (q) => `「${q}」に一致する結果はありません`,
    edition: "版", changeEdition: "版を切り替える", topics: "トピック", trendingNow: "いま話題", seeAll: "すべて見る",
    readStory: "記事を読む", explainers: "解説", deskEmpty: (d) => `この版の${d}記事はまだありません。最新ニュースをご覧ください。`,
    corrections: "誤りを見つけた場合は、訂正ポリシーをご確認ください。",
  },
};

export const DICTIONARIES: Record<Lang, Dict> = { en, de, fr, pt, ja };
export type Dictionary = Dict;
