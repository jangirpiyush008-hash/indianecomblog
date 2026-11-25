import type { Article } from "@/types/content";
import { COUNTRIES, DESKS, urls, type CountryCode, type Desk } from "@/config/countries";
import { DICTIONARIES } from "@/config/dictionaries";
import { piyush } from "./authors";

const ACCENTS: Record<Desk, string> = {
  technology: "#2563EB",
  "ai-tools": "#9333EA",
  shopping: "#059669",
  money: "#DC2626",
  lifestyle: "#DB2777",
  entertainment: "#EA580C",
  travel: "#0891B2",
};

export type Draft = Omit<
  Article,
  "readingTime" | "url" | "author" | "category" | "categoryName" | "categoryAccent" | "country" | "lang"
> & { category: Desk };

function wordCount(a: Draft) {
  const text = [
    ...(a.keyTakeaways ?? []),
    ...(a.body ?? []).flatMap((b) => {
      if (b.type === "p" || b.type === "h2" || b.type === "h3" || b.type === "callout") return [b.text];
      if (b.type === "ul" || b.type === "ol") return b.items;
      if (b.type === "table") return b.rows.flat();
      return [];
    }),
    ...(a.faq ?? []).flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  // Japanese has no spaces: count characters / 2 as a rough word equivalent.
  const spaced = text.split(/\s+/).filter(Boolean).length;
  const cjk = (text.match(/[぀-ヿ一-鿿]/g) ?? []).length;
  return spaced + Math.round(cjk / 2);
}

/** Turns drafts into published articles for one edition. Enforces country + desk validity. */
export function buildArticles(country: CountryCode, drafts: Draft[]): Article[] {
  const c = COUNTRIES[country];
  const dict = DICTIONARIES[c.lang];
  const seen = new Set<string>();
  return drafts
    .map((d) => {
      if (!(DESKS as readonly string[]).includes(d.category)) throw new Error(`Unknown desk ${d.category} in ${country}/${d.slug}`);
      const key = `${d.category}/${d.slug}`;
      if (seen.has(key)) throw new Error(`Duplicate slug ${key} in edition ${country}`);
      seen.add(key);
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(d.slug)) throw new Error(`Slug must be lowercase-hyphenated: ${d.slug}`);
      return {
        ...d,
        country,
        lang: c.locale,
        categoryName: dict.sections[d.category],
        categoryAccent: ACCENTS[d.category],
        author: piyush,
        url: urls.article(country, d.category, d.slug),
        readingTime: `${Math.max(2, Math.round(wordCount(d) / 220))} ${dict.ui.minRead}`,
      } as Article;
    })
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export const deskAccent = (d: Desk) => ACCENTS[d];
