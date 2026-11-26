import { getCountry, sectionFromSlug, type Country } from "@/config/countries";

/**
 * Single source of truth for analytics page metadata. Country always comes from the
 * EDITION in the URL (the content being read), never from the visitor's IP — an Indian
 * visitor reading /us/... is reported under the US edition.
 */
export type PageType =
  | "edition_picker"
  | "homepage"
  | "trending"
  | "category"
  | "deals"
  | "buying_guides"
  | "search"
  | "article"
  | "tag"
  | "author"
  | "information"
  | "not_found";

export type PageContext = {
  country_code: string; // ISO 3166-1 alpha-2 of the edition, e.g. "GB"; "GLOBAL" for global pages
  country_name: string;
  locale: string;
  currency: string;
  edition_path: string; // "/gb", or "/" for global pages
  page_type: PageType;
  page_category: string; // desk key such as "technology", or the page type
};

const GLOBAL: Omit<PageContext, "page_type" | "page_category"> = {
  country_code: "GLOBAL",
  country_name: "Global",
  locale: "en",
  currency: "",
  edition_path: "/",
};

const base = (c: Country) => ({
  country_code: c.iso.toUpperCase(),
  country_name: c.name,
  locale: c.locale,
  currency: c.currency,
  edition_path: `/${c.code}`,
});

export function pageContextFromPath(pathname: string): PageContext {
  const seg = pathname.split("/").filter(Boolean);
  const country = seg[0] ? getCountry(seg[0]) : undefined;

  if (!country) {
    if (seg.length === 0) return { ...GLOBAL, page_type: "edition_picker", page_category: "edition_picker" };
    if (seg[0] === "authors") return { ...GLOBAL, page_type: "author", page_category: "author" };
    return { ...GLOBAL, page_type: "information", page_category: seg[0] };
  }

  const b = base(country);
  if (seg.length === 1) return { ...b, page_type: "homepage", page_category: "homepage" };
  if (seg[1] === "tag") return { ...b, page_type: "tag", page_category: "tag" };

  const section = sectionFromSlug(country.code, seg[1]);
  if (!section) return { ...b, page_type: "not_found", page_category: "not_found" };

  if (seg.length >= 3) return { ...b, page_type: "article", page_category: section };

  const typeFor: Record<string, PageType> = { trending: "trending", deals: "deals", guides: "buying_guides", search: "search" };
  return { ...b, page_type: typeFor[section] ?? "category", page_category: section };
}
