/**
 * Central country configuration — the single source of truth for every
 * edition. Add or edit a country here; pages, routing, SEO, trends and
 * affiliate logic all read from this file.
 */

export const COUNTRY_CODES = ["in", "us", "gb", "ca", "au", "ae", "sa", "de", "fr", "br"] as const;
export type CountryCode = (typeof COUNTRY_CODES)[number];

export type Lang = "en" | "de" | "fr" | "pt" | "ja";

/** Stable internal keys for sections; each country maps them to a localized URL slug. */
export const DESKS = ["technology", "ai-tools", "shopping", "money", "lifestyle", "entertainment", "travel"] as const;
export type Desk = (typeof DESKS)[number];
export type SectionKey = Desk | "trending" | "deals" | "guides" | "search";

export interface Country {
  code: CountryCode;
  /** ISO 3166-1 alpha-2, as sent by Cloudflare's CF-IPCountry header. */
  iso: string;
  name: string;
  nativeName: string;
  flag: string;
  lang: Lang;
  /** BCP-47 locale for formatting and hreflang, e.g. en-IN. */
  locale: string;
  currency: string;
  timeZone: string;
  /** Google News RSS edition parameters. */
  news: { hl: string; gl: string; ceid: string };
  /**
   * Optional query scope added to every news search. Used where Google News has no
   * local-language edition we publish in (UAE, Saudi Arabia): restricts results to
   * local English-language outlets so headlines are genuinely local.
   */
  newsScope?: string;
  /** How the country reads inside a sentence, e.g. "the US", "Dubai & the UAE". */
  phrase: string;
  /** City to feature (e.g. Dubai for UAE). */
  focusCity?: string;
  /** Desk order on the homepage — editorial priority for this market. */
  deskPriority: Desk[];
  /** Merchants we plan to feature here (for copy and admin; not links). */
  keyMerchants: string[];
}

const SLUGS: Record<Lang, Record<SectionKey, string>> = {
  en: {
    trending: "trending", technology: "technology", "ai-tools": "ai-tools", shopping: "shopping", deals: "deals",
    money: "money", lifestyle: "lifestyle", entertainment: "entertainment", travel: "travel", guides: "buying-guides", search: "search",
  },
  de: {
    trending: "trends", technology: "technologie", "ai-tools": "ki-tools", shopping: "shopping", deals: "angebote",
    money: "finanzen", lifestyle: "lifestyle", entertainment: "unterhaltung", travel: "reisen", guides: "kaufberatung", search: "suche",
  },
  fr: {
    trending: "tendances", technology: "technologie", "ai-tools": "outils-ia", shopping: "shopping", deals: "bons-plans",
    money: "argent", lifestyle: "lifestyle", entertainment: "divertissement", travel: "voyage", guides: "guides-achat", search: "recherche",
  },
  pt: {
    trending: "tendencias", technology: "tecnologia", "ai-tools": "ferramentas-ia", shopping: "compras", deals: "ofertas",
    money: "dinheiro", lifestyle: "estilo-de-vida", entertainment: "entretenimento", travel: "viagem", guides: "guias-de-compra", search: "busca",
  },
  ja: {
    trending: "trending", technology: "technology", "ai-tools": "ai-tools", shopping: "shopping", deals: "deals",
    money: "money", lifestyle: "lifestyle", entertainment: "entertainment", travel: "travel", guides: "buying-guides", search: "search",
  },
};

export const COUNTRIES: Record<CountryCode, Country> = {
  in: {
    phrase: "India",
    code: "in", iso: "IN", name: "India", nativeName: "India", flag: "🇮🇳", lang: "en", locale: "en-IN", currency: "INR",
    timeZone: "Asia/Kolkata", news: { hl: "en-IN", gl: "IN", ceid: "IN:en" },
    deskPriority: ["technology", "shopping", "ai-tools", "money", "entertainment", "lifestyle", "travel"],
    keyMerchants: ["boAt", "Noise", "Myntra", "Nykaa", "AJIO"],
  },
  us: {
    phrase: "the US",
    code: "us", iso: "US", name: "United States", nativeName: "United States", flag: "🇺🇸", lang: "en", locale: "en-US", currency: "USD",
    timeZone: "America/New_York", news: { hl: "en-US", gl: "US", ceid: "US:en" },
    deskPriority: ["technology", "ai-tools", "shopping", "money", "entertainment", "lifestyle", "travel"],
    keyMerchants: ["Amazon", "Best Buy", "Walmart", "Target"],
  },
  gb: {
    phrase: "the UK",
    code: "gb", iso: "GB", name: "United Kingdom", nativeName: "United Kingdom", flag: "🇬🇧", lang: "en", locale: "en-GB", currency: "GBP",
    timeZone: "Europe/London", news: { hl: "en-GB", gl: "GB", ceid: "GB:en" },
    deskPriority: ["technology", "shopping", "money", "entertainment", "ai-tools", "travel", "lifestyle"],
    keyMerchants: ["Amazon UK", "Currys", "Argos", "John Lewis"],
  },
  ca: {
    phrase: "Canada",
    code: "ca", iso: "CA", name: "Canada", nativeName: "Canada", flag: "🇨🇦", lang: "en", locale: "en-CA", currency: "CAD",
    timeZone: "America/Toronto", news: { hl: "en-CA", gl: "CA", ceid: "CA:en" },
    deskPriority: ["technology", "shopping", "money", "entertainment", "ai-tools", "travel", "lifestyle"],
    keyMerchants: ["Amazon.ca", "Best Buy Canada", "Canadian Tire"],
  },
  au: {
    phrase: "Australia",
    code: "au", iso: "AU", name: "Australia", nativeName: "Australia", flag: "🇦🇺", lang: "en", locale: "en-AU", currency: "AUD",
    timeZone: "Australia/Sydney", news: { hl: "en-AU", gl: "AU", ceid: "AU:en" },
    deskPriority: ["technology", "shopping", "money", "travel", "entertainment", "ai-tools", "lifestyle"],
    keyMerchants: ["Amazon AU", "JB Hi-Fi", "The Good Guys"],
  },
  ae: {
    phrase: "Dubai & the UAE",
    code: "ae", iso: "AE", name: "UAE", nativeName: "الإمارات", flag: "🇦🇪", lang: "en", locale: "en-AE", currency: "AED",
    timeZone: "Asia/Dubai", news: { hl: "en-US", gl: "US", ceid: "US:en" },
    newsScope: "(site:gulfnews.com OR site:khaleejtimes.com OR site:thenationalnews.com OR site:arabianbusiness.com)",
    focusCity: "Dubai",
    deskPriority: ["shopping", "technology", "ai-tools", "lifestyle", "travel", "entertainment", "money"],
    keyMerchants: ["Amazon.ae", "Noon", "Sharaf DG"],
  },
  sa: {
    phrase: "Saudi Arabia",
    code: "sa", iso: "SA", name: "Saudi Arabia", nativeName: "السعودية", flag: "🇸🇦", lang: "en", locale: "en-SA", currency: "SAR",
    timeZone: "Asia/Riyadh", news: { hl: "en-US", gl: "US", ceid: "US:en" },
    newsScope: "(site:arabnews.com OR site:saudigazette.com.sa OR site:argaam.com OR site:zawya.com)",
    focusCity: "Riyadh",
    deskPriority: ["shopping", "technology", "ai-tools", "money", "entertainment", "travel", "lifestyle"],
    keyMerchants: ["Amazon.sa", "Noon", "Jarir", "extra"],
  },
  de: {
    phrase: "Deutschland",
    code: "de", iso: "DE", name: "Germany", nativeName: "Deutschland", flag: "🇩🇪", lang: "de", locale: "de-DE", currency: "EUR",
    timeZone: "Europe/Berlin", news: { hl: "de", gl: "DE", ceid: "DE:de" },
    deskPriority: ["technology", "shopping", "money", "ai-tools", "entertainment", "travel", "lifestyle"],
    keyMerchants: ["Amazon.de", "MediaMarkt", "Otto"],
  },
  fr: {
    phrase: "France",
    code: "fr", iso: "FR", name: "France", nativeName: "France", flag: "🇫🇷", lang: "fr", locale: "fr-FR", currency: "EUR",
    timeZone: "Europe/Paris", news: { hl: "fr", gl: "FR", ceid: "FR:fr" },
    deskPriority: ["technology", "shopping", "lifestyle", "entertainment", "travel", "money", "ai-tools"],
    keyMerchants: ["Amazon.fr", "Fnac", "Darty", "Cdiscount"],
  },
  br: {
    phrase: "Brasil",
    code: "br", iso: "BR", name: "Brazil", nativeName: "Brasil", flag: "🇧🇷", lang: "pt", locale: "pt-BR", currency: "BRL",
    timeZone: "America/Sao_Paulo", news: { hl: "pt-BR", gl: "BR", ceid: "BR:pt-419" },
    deskPriority: ["technology", "shopping", "money", "ai-tools", "lifestyle", "entertainment", "travel"],
    keyMerchants: ["Amazon.com.br", "Mercado Livre", "Magalu"],
  },
};

export const ALL_COUNTRIES: Country[] = COUNTRY_CODES.map((c) => COUNTRIES[c]);

export function isCountryCode(v: string | undefined | null): v is CountryCode {
  return !!v && (COUNTRY_CODES as readonly string[]).includes(v);
}

export function getCountry(code: string): Country | undefined {
  return isCountryCode(code) ? COUNTRIES[code] : undefined;
}

/** Map an ISO country (e.g. from CF-IPCountry) to an edition, if we have one. */
export function countryFromIso(iso: string | null | undefined): CountryCode | undefined {
  if (!iso) return undefined;
  const hit = ALL_COUNTRIES.find((c) => c.iso === iso.toUpperCase());
  return hit?.code;
}

// ─────────────────────────────────────────────── URL utilities (use these, never hand-build URLs)

export function sectionSlug(country: CountryCode, key: SectionKey): string {
  return SLUGS[COUNTRIES[country].lang][key];
}

export function sectionFromSlug(country: CountryCode, slug: string): SectionKey | undefined {
  const map = SLUGS[COUNTRIES[country].lang];
  return (Object.keys(map) as SectionKey[]).find((k) => map[k] === slug);
}

export const urls = {
  home: (c: CountryCode) => `/${c}`,
  section: (c: CountryCode, key: SectionKey) => `/${c}/${sectionSlug(c, key)}`,
  article: (c: CountryCode, desk: Desk, slug: string) => `/${c}/${sectionSlug(c, desk)}/${slug}`,
  tag: (c: CountryCode, tagSlug: string) => `/${c}/tag/${tagSlug}`,
  search: (c: CountryCode, q?: string) => `/${c}/${sectionSlug(c, "search")}${q ? `?q=${encodeURIComponent(q)}` : ""}`,
};

/** Every section page across all countries — used for hreflang alternates and sitemaps. */
export function sectionAlternates(key: SectionKey | "home"): Record<string, string> {
  const out: Record<string, string> = {};
  for (const c of ALL_COUNTRIES) out[c.locale] = key === "home" ? urls.home(c.code) : urls.section(c.code, key);
  return out;
}

export function formatPrice(amount: number, country: CountryCode) {
  const c = COUNTRIES[country];
  return new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency: c.currency,
    maximumFractionDigits: c.currency === "JPY" ? 0 : 0,
  }).format(amount);
}

export function formatDateFor(iso: string, country: CountryCode, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  const c = COUNTRIES[country];
  return new Date(iso).toLocaleDateString(c.locale, { ...opts, timeZone: c.timeZone });
}

export const COUNTRY_COOKIE = "tn_country";
