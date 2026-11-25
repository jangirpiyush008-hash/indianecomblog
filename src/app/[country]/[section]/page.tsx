import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRY_CODES, DESKS, sectionFromSlug, sectionSlug, type Desk, type SectionKey } from "@/config/countries";
import { edition } from "@/lib/edition";
import { sectionMetadata } from "@/lib/seo/meta";
import { getLiveTrends, getTrendingSearches } from "@/lib/trends/live";
import { DealsView, DeskView, GuidesView, SearchView, ShoppingView, TrendingView } from "@/components/edition/Views";

export const dynamicParams = false;
export const revalidate = 1800;

const KEYS: SectionKey[] = ["trending", ...DESKS, "deals", "guides", "search"];

export function generateStaticParams() {
  return COUNTRY_CODES.flatMap((country) => KEYS.map((k) => ({ country, section: sectionSlug(country, k) })));
}

const isDesk = (k: string): k is Desk => (DESKS as readonly string[]).includes(k);

export async function generateMetadata({ params }: { params: Promise<{ country: string; section: string }> }): Promise<Metadata> {
  const { country, section } = await params;
  const e = edition(country);
  const key = sectionFromSlug(e.code, section);
  if (!key) return {};
  const d = e.dict;
  const n = e.country.phrase;
  const copy: Record<SectionKey, [string, string]> = {
    trending: [d.trending.h1(n), d.trending.intro(n)],
    deals: [d.ui.dealsH1(n), d.ui.shoppingIntro],
    guides: [`${d.ui.guidesH1} — ${n}`, d.ui.shoppingIntro],
    search: [d.ui.searchH1, d.ui.searchPlaceholder],
    shopping: [d.ui.shoppingH1(n), d.ui.shoppingIntro],
    technology: [`${d.sections.technology} — ${n}`, d.deskTagline.technology],
    "ai-tools": [`${d.sections["ai-tools"]} — ${n}`, d.deskTagline["ai-tools"]],
    money: [`${d.sections.money} — ${n}`, d.deskTagline.money],
    lifestyle: [`${d.sections.lifestyle} — ${n}`, d.deskTagline.lifestyle],
    entertainment: [`${d.sections.entertainment} — ${n}`, d.deskTagline.entertainment],
    travel: [`${d.sections.travel} — ${n}`, d.deskTagline.travel],
  };
  const [title, description] = copy[key];
  return sectionMetadata(e.code, key, title, description);
}

export default async function SectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ country: string; section: string }>;
  searchParams: Promise<{ q?: string; desk?: string; type?: string }>;
}) {
  const { country, section } = await params;
  const e = edition(country);
  const key = sectionFromSlug(e.code, section);
  if (!key) notFound();

  if (key === "trending") {
    const { desk } = await searchParams;
    const [trends, searches] = await Promise.all([getLiveTrends(e.code, 48), getTrendingSearches(e.code, 20)]);
    return <TrendingView e={e} trends={trends} searches={searches} active={desk && isDesk(desk) ? desk : undefined} />;
  }
  if (key === "shopping") return <ShoppingView e={e} />;
  if (key === "deals") {
    const { type } = await searchParams;
    return <DealsView e={e} type={type} />;
  }
  if (key === "guides") return <GuidesView e={e} />;
  if (key === "search") {
    const { q = "" } = await searchParams;
    return <SearchView e={e} q={q.slice(0, 120)} />;
  }
  if (isDesk(key)) {
    const trends = await getLiveTrends(e.code, 48);
    return <DeskView e={e} desk={key} headlines={trends.filter((t) => t.category === key).slice(0, 5)} />;
  }
  notFound();
}
