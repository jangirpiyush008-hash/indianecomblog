import type { CountryCode, Lang } from "@/config/countries";

/**
 * Homepage hero per edition. Every edition gets its own local editorial photography
 * (never a product shot) and its own layout, so the ten front pages don't look like
 * copies of each other. Photos are from Unsplash (free licence); each was checked by eye
 * to show the place named in its alt text.
 */
export type HeroLayout = "split" | "split-reverse" | "cover" | "broadsheet" | "mosaic";

export type HeroPhoto = { src: string; alt: string };

export type EditionHero = {
  layout: HeroLayout;
  headline: string;
  intro: string;
  photos: [HeroPhoto, HeroPhoto, HeroPhoto];
};

const u = (id: string, w = 1800, h = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

export const HEROES: Record<CountryCode, EditionHero> = {
  in: {
    layout: "split",
    headline: "What's trending across India right now",
    intro:
      "The headlines India is reading today, explainers on the money and tech questions people are searching for, and gadget buying guides with prices we check on the store.",
    photos: [
      { src: u("1570168007204-dfb528c6958f"), alt: "Crowds at the Gateway of India in Mumbai at sunset" },
      { src: u("1566552881560-0be862a7c445"), alt: "Historic Victorian Gothic building on a rain-washed Mumbai street" },
      { src: u("1524492412937-b28074a5d7da"), alt: "The Taj Mahal in Agra reflected in its long garden pool" },
    ],
  },
  us: {
    layout: "cover",
    headline: "What's trending across America right now",
    intro:
      "What the US is talking about today, plus plain-English explainers on credit, travel rules and the tech changes that affect your wallet.",
    photos: [
      { src: u("1496442226666-8d4d0e62e6e9"), alt: "Billboards and crowds in Times Square, New York City" },
      { src: u("1501594907352-04cda38ebc29"), alt: "The Golden Gate Bridge in San Francisco above a blue bay" },
      { src: u("1485738422979-f5c462d49f74"), alt: "The Statue of Liberty against a blue sky" },
    ],
  },
  gb: {
    layout: "broadsheet",
    headline: "What's trending across Britain right now",
    intro:
      "Today's UK headlines in one place, with straightforward guides to the things Britons are looking up — from credit files to travelling in Europe.",
    photos: [
      { src: u("1513635269975-59663e0ac1ad", 2000, 900), alt: "Aerial view of the Thames winding through London past Tower Bridge" },
      { src: u("1529655683826-aba9b3e77383"), alt: "Big Ben and the Houses of Parliament at dusk" },
      { src: u("1486299267070-83823f5448dd"), alt: "Westminster Bridge and the Elizabeth Tower under clouds" },
    ],
  },
  ca: {
    layout: "mosaic",
    headline: "What's trending across Canada right now",
    intro:
      "Canada's headlines today, and practical explainers on the questions Canadians search for — flight compensation, spam calls, credit reports and more.",
    photos: [
      { src: u("1519832979-6fa011b87667"), alt: "Toronto waterfront towers and the CN Tower at dusk" },
      { src: u("1503614472-8c93d56e92ce"), alt: "Moraine Lake reflecting the Rocky Mountains in Banff National Park" },
      { src: u("1517090504586-fde19ea6066f"), alt: "People on a bench looking across the water at the Toronto skyline" },
    ],
  },
  au: {
    layout: "split-reverse",
    headline: "What's trending across Australia right now",
    intro:
      "The stories Australia is following today, with clear explainers on passports, scams, credit and the everyday admin that trips people up.",
    photos: [
      { src: u("1506973035872-a4ec16b8e8d9"), alt: "Ferries crossing Sydney Harbour with the Opera House and city skyline" },
      { src: u("1514395462725-fb4566210144"), alt: "A tram passing Flinders Street Station in Melbourne" },
      { src: u("1523482580672-f109ba8cb9be"), alt: "The Sydney Opera House lit up at night" },
    ],
  },
  ae: {
    layout: "cover",
    headline: "What's trending in Dubai & the UAE right now",
    intro:
      "Dubai and the UAE's headlines today, plus guides to the services residents use every day — from Nol cards to Emirates ID checks and credit scores.",
    photos: [
      { src: u("1512453979798-5ea266f8880c"), alt: "The Dubai skyline and Burj Khalifa at sunrise" },
      { src: u("1518684079-3c830dcef090"), alt: "Aerial view of the Burj Al Arab on the Dubai coast" },
      { src: u("1546412414-e1885259563a"), alt: "The sail-shaped Burj Al Arab hotel in Dubai" },
    ],
  },
  sa: {
    layout: "split-reverse",
    headline: "What's trending across Saudi Arabia right now",
    intro:
      "The Kingdom's headlines today, with practical guides for residents and visitors — Absher services, the tourist eVisa, SIMAH credit reports and more.",
    photos: [
      { src: u("1586724237569-f3d0c1dee8c6"), alt: "Aerial view of the Riyadh skyline" },
      { src: u("1578895101408-1a36b834405b"), alt: "A white mosque framed by palm trees under a blue sky" },
      { src: u("1565552645632-d725f8bfc19a"), alt: "The clock tower in Makkah seen from street level" },
    ],
  },
  de: {
    layout: "broadsheet",
    headline: "Was ist gerade in Deutschland im Trend?",
    intro:
      "Die Schlagzeilen des Tages aus ganz Deutschland – dazu verständliche Ratgeber zu Deutschlandticket, Verbraucherrechten, SCHUFA und mehr.",
    photos: [
      { src: u("1560969184-10fe8719e047", 2000, 900), alt: "Das Brandenburger Tor in Berlin unter Sommerwolken" },
      { src: u("1528728329032-2972f65dfb3f"), alt: "Berlin bei Nacht mit dem Fernsehturm" },
      { src: u("1467269204594-9661b134dd2b"), alt: "Fachwerkhäuser in einer historischen deutschen Altstadt" },
    ],
  },
  fr: {
    layout: "mosaic",
    headline: "Les tendances du moment en France",
    intro:
      "L'actualité qui fait parler aujourd'hui en France, et des guides clairs sur ce qui change pour vous : démarchage, Livret A, fichiers bancaires et plus encore.",
    photos: [
      { src: u("1499856871958-5b9627545d1a"), alt: "Le pont Alexandre-III à Paris au crépuscule" },
      { src: u("1502602898657-3e91760cbb34"), alt: "La tour Eiffel au-dessus de la Seine" },
      { src: u("1431274172761-fca41d930114"), alt: "La tour Eiffel sous un ciel bleu" },
    ],
  },
  br: {
    layout: "split",
    headline: "O que está em alta no Brasil agora?",
    intro:
      "As manchetes do dia em todo o Brasil e guias práticos sobre o que mais se pesquisa — passaporte, Celular Seguro, Registrato e muito mais.",
    photos: [
      { src: u("1483729558449-99ef09a8c325"), alt: "Vista aérea do Pão de Açúcar e da Baía de Guanabara, no Rio de Janeiro" },
      { src: u("1544989164-31dc3c645987"), alt: "Bondinho do Pão de Açúcar sobre o Rio de Janeiro" },
      { src: u("1516306580123-e6e52b1b7b5f"), alt: "O Cristo Redentor e o Rio de Janeiro vistos do alto" },
    ],
  },
};

/** Small UI strings used only on the edition homepage. */
export const HOME_COPY: Record<Lang, {
  leading: string;
  topStories: string;
  topStoriesText: string;
  shopping: string;
  shoppingText: string;
  guides: string;
  photo: string;
  viewAll: string;
  stories: (n: number) => string;
}> = {
  en: {
    leading: "Leading today",
    topStories: "Top stories",
    topStoriesText: "Our latest explainers and guides for this edition.",
    shopping: "Shopping & product discoveries",
    shoppingText: "Products our editors picked, with the price we last saw on the store.",
    guides: "Buying guides",
    photo: "Photo: Unsplash",
    viewAll: "View all",
    stories: (n) => `${n} ${n === 1 ? "story" : "stories"}`,
  },
  de: {
    leading: "Heute im Fokus",
    topStories: "Top-Themen",
    topStoriesText: "Unsere neuesten Erklärstücke und Ratgeber für Deutschland.",
    shopping: "Shopping & Produktentdeckungen",
    shoppingText: "Von der Redaktion ausgewählte Produkte mit dem zuletzt geprüften Preis.",
    guides: "Kaufberatung",
    photo: "Foto: Unsplash",
    viewAll: "Alle ansehen",
    stories: (n) => `${n} ${n === 1 ? "Artikel" : "Artikel"}`,
  },
  fr: {
    leading: "À la une aujourd'hui",
    topStories: "À la une",
    topStoriesText: "Nos derniers décryptages et guides pour la France.",
    shopping: "Shopping & découvertes produits",
    shoppingText: "Des produits choisis par la rédaction, avec le dernier prix vérifié en boutique.",
    guides: "Guides d'achat",
    photo: "Photo : Unsplash",
    viewAll: "Tout voir",
    stories: (n) => `${n} article${n > 1 ? "s" : ""}`,
  },
  pt: {
    leading: "Destaques de hoje",
    topStories: "Principais matérias",
    topStoriesText: "Nossas explicações e guias mais recentes para o Brasil.",
    shopping: "Compras & descobertas",
    shoppingText: "Produtos escolhidos pela redação, com o último preço conferido na loja.",
    guides: "Guias de compra",
    photo: "Foto: Unsplash",
    viewAll: "Ver tudo",
    stories: (n) => `${n} ${n === 1 ? "matéria" : "matérias"}`,
  },
  ja: {
    leading: "今日の注目",
    topStories: "トップ記事",
    topStoriesText: "このエディションの最新の解説とガイド。",
    shopping: "ショッピング",
    shoppingText: "編集部が選んだ商品と、最後に確認した店頭価格。",
    guides: "購入ガイド",
    photo: "写真: Unsplash",
    viewAll: "すべて見る",
    stories: (n) => `${n}件`,
  },
};
