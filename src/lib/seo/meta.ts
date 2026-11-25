import type { Metadata } from "next";
import { ALL_COUNTRIES, COUNTRIES, DESKS, urls, type CountryCode, type Desk, type SectionKey } from "@/config/countries";
import { articlesByDesk, guideArticles, productsFor } from "@/lib/content";

/**
 * Whether a section page in an edition has enough real content to be indexed.
 * Pages without content stay reachable (useful live headlines) but are noindex,
 * and are left out of hreflang and sitemaps.
 */
export function isIndexable(code: CountryCode, key: SectionKey | "home"): boolean {
  if (key === "home" || key === "trending") return true;
  if (key === "search") return false;
  if ((DESKS as readonly string[]).includes(key)) return articlesByDesk(code, key as Desk).length > 0;
  if (key === "deals") return productsFor(code).length > 0;
  if (key === "shopping" || key === "guides") return guideArticles(code).length > 0 || productsFor(code).length > 0;
  return false;
}

/** hreflang map for a section: only editions where the equivalent page is indexable. */
export function sectionLanguages(key: SectionKey | "home"): Record<string, string> {
  const out: Record<string, string> = {};
  for (const c of ALL_COUNTRIES) {
    if (isIndexable(c.code, key)) out[c.locale] = key === "home" ? urls.home(c.code) : urls.section(c.code, key);
  }
  if (key === "home") out["x-default"] = "/";
  return out;
}

export function sectionMetadata(
  code: CountryCode,
  key: SectionKey | "home",
  title: string,
  description: string
): Metadata {
  const path = key === "home" ? urls.home(code) : urls.section(code, key);
  const indexable = isIndexable(code, key);
  return {
    title: key === "home" ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: indexable ? sectionLanguages(key) : undefined },
    openGraph: { url: path, title, description, locale: COUNTRIES[code].locale.replace("-", "_"), type: "website" },
    robots: indexable ? undefined : { index: false, follow: true },
  };
}
