import { createClient } from "@supabase/supabase-js";
import { COUNTRIES, DESKS, type CountryCode, type Desk, type Lang } from "@/config/countries";
import { DICTIONARIES } from "@/config/dictionaries";
import type { Trend } from "@/types/content";

/**
 * Real, per-country trend data. Nothing is shared between editions:
 *  - Headlines: Google News for that country's edition (or, for UAE/Saudi, local
 *    English outlets) with desk queries in the edition's language.
 *  - Trending searches: Google Trends daily RSS for that country.
 * If sources fail, pages show an empty state — never another country's data.
 */

const DESK_QUERIES: Record<Lang, Record<Desk, string>> = {
  en: {
    technology: "smartphone OR laptop OR gadget OR tech launch",
    "ai-tools": "AI tool OR ChatGPT OR Gemini OR OpenAI",
    shopping: "sale OR discount OR deals OR retail",
    money: "interest rates OR tax OR banking OR personal finance",
    lifestyle: "fashion OR beauty OR wellness OR food",
    entertainment: "streaming OR Netflix OR box office OR series",
    travel: "travel OR airline OR airport OR tourism",
  },
  de: {
    technology: "Smartphone OR Laptop OR Technik OR Gadget",
    "ai-tools": "KI OR ChatGPT OR künstliche Intelligenz",
    shopping: "Angebote OR Rabatt OR Händler OR Black Friday",
    money: "Zinsen OR Steuern OR Rente OR Bank",
    lifestyle: "Mode OR Beauty OR Gesundheit OR Ernährung",
    entertainment: "Streaming OR Netflix OR Kino OR Serie",
    travel: "Reisen OR Urlaub OR Bahn OR Flughafen",
  },
  fr: {
    technology: "smartphone OR ordinateur OR high-tech",
    "ai-tools": "IA OR ChatGPT OR intelligence artificielle",
    shopping: "soldes OR promo OR bons plans OR Black Friday",
    money: "impôts OR épargne OR banque OR retraite",
    lifestyle: "mode OR beauté OR bien-être OR gastronomie",
    entertainment: "streaming OR Netflix OR cinéma OR série",
    travel: "voyage OR vacances OR SNCF OR aéroport",
  },
  pt: {
    technology: "celular OR smartphone OR notebook OR tecnologia",
    "ai-tools": "IA OR ChatGPT OR inteligência artificial",
    shopping: "ofertas OR promoção OR Black Friday OR varejo",
    money: "Pix OR juros OR imposto de renda OR banco",
    lifestyle: "moda OR beleza OR saúde OR bem-estar",
    entertainment: "streaming OR Netflix OR novela OR cinema",
    travel: "viagem OR turismo OR passagem aérea OR aeroporto",
  },
  ja: {
    technology: "スマホ OR パソコン OR ガジェット",
    "ai-tools": "生成AI OR ChatGPT",
    shopping: "セール OR 値下げ OR 通販",
    money: "金利 OR 税金 OR 新NISA",
    lifestyle: "ファッション OR 美容 OR 健康",
    entertainment: "配信 OR 映画 OR ドラマ",
    travel: "旅行 OR 観光 OR 航空",
  },
};

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

/**
 * Drops headlines that clearly belong to another edition. Google's country editions
 * sometimes include foreign stories (e.g. Indian box-office news in the US edition);
 * those must not appear as local trends.
 */
const FOREIGN: Partial<Record<CountryCode, RegExp>> = {};
const NOT_INDIA = /₹|\bcrores?\b|\blakhs?\b/i;
for (const code of Object.keys(COUNTRIES) as CountryCode[]) {
  const parts: string[] = [];
  if (code !== "in") parts.push(NOT_INDIA.source);
  if (["us", "gb", "ca", "au"].includes(code)) parts.push("\\bIndia(n)?\\b|\\bBollywood\\b");
  if (code !== "gb") parts.push("£");
  if (code !== "br") parts.push("R\\$");
  if (code !== "ae" && code !== "sa") parts.push("\\bAED\\b|\\bSAR\\b");
  FOREIGN[code] = new RegExp(parts.join("|"), "i");
}
export const isForeignToEdition = (country: CountryCode, text: string) => FOREIGN[country]?.test(text) ?? false;

const tag = (item: string, name: string) => decode(item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? "");

async function fromGoogleNews(country: CountryCode, perDesk = 4): Promise<Trend[]> {
  const c = COUNTRIES[country];
  const dict = DICTIONARIES[c.lang];
  const results = await Promise.allSettled(
    DESKS.map(async (desk) => {
      const base = DESK_QUERIES[c.lang][desk];
      const q = `(${base})${c.newsScope ? ` ${c.newsScope}` : ""} when:2d`;
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=${c.news.hl}&gl=${c.news.gl}&ceid=${c.news.ceid}`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; TrendNationsBot/1.0; +https://trendnations.com)" },
        next: { revalidate: 1800 },
      });
      if (!res.ok) return [];
      const xml = await res.text();
      return (xml.match(/<item>[\s\S]*?<\/item>/g) ?? []).slice(0, perDesk).map((item, i): Trend => {
        const rawTitle = tag(item, "title");
        const source = tag(item, "source");
        const link = tag(item, "link");
        const pub = tag(item, "pubDate");
        const topic = source && rawTitle.endsWith(` - ${source}`) ? rawTitle.slice(0, -(source.length + 3)) : rawTitle;
        return {
          id: `gn-${country}-${desk}-${i}`,
          country,
          topic,
          category: desk,
          categoryName: dict.sections[desk],
          discoveredAt: pub ? new Date(pub).toISOString() : new Date().toISOString(),
          sources: [{ name: source || "Google News", url: link || "https://news.google.com" }],
        };
      });
    })
  );
  return results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((t) => t.topic && !isForeignToEdition(country, t.topic))
    .sort((a, b) => +new Date(b.discoveredAt) - +new Date(a.discoveredAt));
}

async function fromSupabase(country: CountryCode, limit: number): Promise<Trend[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("your-project")) return [];
  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from("trends")
      .select("id, topic, summary, direction, interest_score, discovered_at, sources, desk")
      .eq("country_code", country)
      .eq("dismissed", false)
      .gte("discovered_at", new Date(Date.now() - 3 * 86400_000).toISOString())
      .order("interest_score", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    const dict = DICTIONARIES[COUNTRIES[country].lang];
    return data.map((r: Record<string, unknown>) => {
      const desk = (DESKS as readonly string[]).includes(String(r.desk)) ? (r.desk as Desk) : undefined;
      return {
        id: String(r.id),
        country,
        topic: String(r.topic),
        category: desk ?? "trending",
        categoryName: desk ? dict.sections[desk] : dict.sections.trending,
        summary: (r.summary as string) ?? undefined,
        direction: (r.direction as Trend["direction"]) ?? undefined,
        interestScore: (r.interest_score as number) ?? undefined,
        discoveredAt: String(r.discovered_at),
        sources: Array.isArray(r.sources) ? (r.sources as Trend["sources"]) : undefined,
      };
    });
  } catch {
    return [];
  }
}

/** Live headlines for one edition, interleaved across desks. */
export async function getLiveTrends(country: CountryCode, limit = 24): Promise<Trend[]> {
  const stored = await fromSupabase(country, limit);
  if (stored.length >= 8) return stored;
  const news = await fromGoogleNews(country);
  const byDesk = new Map<string, Trend[]>();
  for (const t of news) byDesk.set(t.category, [...(byDesk.get(t.category) ?? []), t]);
  const mixed: Trend[] = [];
  while (mixed.length < limit && [...byDesk.values()].some((l) => l.length)) {
    for (const desk of COUNTRIES[country].deskPriority) {
      const t = byDesk.get(desk)?.shift();
      if (t) mixed.push(t);
    }
  }
  // Defensive: never return another edition's items.
  return [...stored, ...mixed].filter((t) => t.country === country).slice(0, limit);
}

export interface TrendingSearch {
  term: string;
  traffic?: string;
  newsTitle?: string;
  newsUrl?: string;
  newsSource?: string;
}

/** Google Trends daily trending searches for the edition's country. */
export async function getTrendingSearches(country: CountryCode, limit = 12): Promise<TrendingSearch[]> {
  const iso = COUNTRIES[country].iso;
  try {
    const res = await fetch(`https://trends.google.com/trending/rss?geo=${iso}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TrendNationsBot/1.0; +https://trendnations.com)" },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return (xml.match(/<item>[\s\S]*?<\/item>/g) ?? []).slice(0, limit).map((item) => {
      const news = item.match(/<ht:news_item>[\s\S]*?<\/ht:news_item>/)?.[0] ?? "";
      return {
        term: tag(item, "title"),
        traffic: tag(item, "ht:approx_traffic") || undefined,
        newsTitle: tag(news, "ht:news_item_title") || undefined,
        newsUrl: tag(news, "ht:news_item_url") || undefined,
        newsSource: tag(news, "ht:news_item_source") || undefined,
      };
    }).filter((t) => t.term && !isForeignToEdition(country, `${t.term} ${t.newsTitle ?? ""}`));
  } catch {
    return [];
  }
}
