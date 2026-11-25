import { siteConfig } from "@/config/site";
import { ALL_COUNTRIES, DESKS, urls, type CountryCode, type SectionKey } from "@/config/countries";
import { articlesFor, articlesByTag, slugify, tagsFor } from "@/lib/content";
import { isIndexable, sectionLanguages } from "./meta";

type Entry = { loc: string; lastmod?: string; alternates?: Record<string, string>; images?: string[] };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (p: string) => (p.startsWith("http") ? p : `${siteConfig.url}${p}`);

export function renderUrlset(entries: Entry[]) {
  const body = entries
    .map((e) => {
      const alts = Object.entries(e.alternates ?? {})
        .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${esc(lang)}" href="${esc(abs(href))}"/>`)
        .join("\n");
      const imgs = (e.images ?? []).map((i) => `    <image:image><image:loc>${esc(abs(i))}</image:loc></image:image>`).join("\n");
      return `  <url>\n    <loc>${esc(abs(e.loc))}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}${alts ? `\n${alts}` : ""}${imgs ? `\n${imgs}` : ""}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>`;
}

/** Every canonical, indexable URL of one edition. */
export function editionEntries(code: CountryCode): Entry[] {
  const articles = articlesFor(code);
  const newest = articles[0]?.updatedAt ?? articles[0]?.publishedAt;
  const keys: (SectionKey | "home")[] = ["home", "trending", ...DESKS, "deals", "guides"];
  const sections: Entry[] = keys
    .filter((k) => isIndexable(code, k))
    .map((k) => ({
      loc: k === "home" ? urls.home(code) : urls.section(code, k),
      lastmod: newest,
      alternates: sectionLanguages(k),
    }));
  const arts: Entry[] = articles.map((a) => ({ loc: a.url, lastmod: a.updatedAt ?? a.publishedAt, images: [a.heroImage] }));
  const tags: Entry[] = tagsFor(code)
    .map(slugify)
    .filter((t) => articlesByTag(code, t).length >= 2)
    .map((t) => ({ loc: urls.tag(code, t) }));
  return [...sections, ...arts, ...tags];
}

export function globalEntries(): Entry[] {
  return [
    { loc: "/", alternates: sectionLanguages("home") },
    ...["/about", "/authors", "/authors/piyush-jangir", "/contact", "/newsletter", "/advertise", "/editorial-policy", "/corrections-policy", "/affiliate-disclosure", "/privacy-policy", "/terms", "/sitemap"].map((loc) => ({ loc })),
  ];
}

export const sitemapFiles = ["global", ...ALL_COUNTRIES.map((c) => c.code)];
