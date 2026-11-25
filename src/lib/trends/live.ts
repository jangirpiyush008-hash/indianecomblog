import { categories } from "@/config/brand";
import type { Category, Trend } from "@/types/content";
import { createClient } from "@supabase/supabase-js";

/**
 * Real trend data for public pages.
 *
 * 1. Prefer trends the Trend Radar cron has stored in Supabase (scored, de-duplicated).
 * 2. Otherwise read Google News India RSS directly — real headlines with their source.
 *
 * Nothing here is invented: if both sources fail, pages show an empty state.
 */

const QUERIES: Record<Exclude<Category, "trending">, string> = {
  technology: "smartphone OR laptop OR gadget launch India",
  "ai-tools": "AI tool OR ChatGPT OR Gemini India",
  shopping: "sale OR discount OR launch price India e-commerce",
  money: "RBI OR UPI OR income tax OR credit card India",
  lifestyle: "fashion OR beauty OR wellness India",
  entertainment: "OTT release OR box office India",
  travel: "travel OR airline OR tourism India",
};

const catName = (slug: Category) => categories.find((c) => c.slug === slug)?.name ?? slug;

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

async function fromGoogleNews(perCategory = 4): Promise<Trend[]> {
  const entries = Object.entries(QUERIES) as [Exclude<Category, "trending">, string][];
  const results = await Promise.allSettled(
    entries.map(async ([category, q]) => {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q + " when:2d")}&hl=en-IN&gl=IN&ceid=IN:en`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; DiscoveryBot/1.0)" },
        next: { revalidate: 1800 },
      });
      if (!res.ok) return [];
      const xml = await res.text();
      const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
      return items.slice(0, perCategory).map((item, i): Trend => {
        const rawTitle = decode(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
        const source = decode(item.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? "");
        const sourceUrl = item.match(/<source url="([^"]+)"/)?.[1];
        const link = decode(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "");
        const pub = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1];
        // Google News titles end with " - Publisher"; strip it.
        const topic = source && rawTitle.endsWith(` - ${source}`) ? rawTitle.slice(0, -(source.length + 3)) : rawTitle;
        return {
          id: `gn-${category}-${i}`,
          topic,
          category,
          categoryName: catName(category),
          discoveredAt: pub ? new Date(pub).toISOString() : new Date().toISOString(),
          sources: [{ name: source || "Google News", url: link || sourceUrl || "https://news.google.com" }],
        };
      });
    })
  );
  return results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((t) => t.topic)
    .sort((a, b) => +new Date(b.discoveredAt) - +new Date(a.discoveredAt));
}

async function fromSupabase(limit: number): Promise<Trend[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("your-project")) return [];
  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from("trends")
      .select("id, topic, summary, direction, interest_score, discovered_at, sources, categories(slug, name)")
      .eq("dismissed", false)
      .gte("discovered_at", new Date(Date.now() - 3 * 86400_000).toISOString())
      .order("interest_score", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data.map((r: any) => ({
      id: r.id,
      topic: r.topic,
      category: (r.categories?.slug ?? "trending") as Category,
      categoryName: r.categories?.name ?? "Trending",
      summary: r.summary ?? undefined,
      direction: r.direction ?? undefined,
      interestScore: r.interest_score ?? undefined,
      discoveredAt: r.discovered_at,
      sources: Array.isArray(r.sources) ? r.sources : undefined,
    }));
  } catch {
    return [];
  }
}

export async function getLiveTrends(limit = 24): Promise<Trend[]> {
  const stored = await fromSupabase(limit);
  if (stored.length >= 8) return stored;
  const news = await fromGoogleNews();
  // Interleave categories so one desk doesn't dominate the top of the list.
  const byCat = new Map<string, Trend[]>();
  for (const t of news) byCat.set(t.category, [...(byCat.get(t.category) ?? []), t]);
  const mixed: Trend[] = [];
  while (mixed.length < limit && [...byCat.values()].some((l) => l.length)) {
    for (const list of byCat.values()) {
      const t = list.shift();
      if (t) mixed.push(t);
    }
  }
  return [...stored, ...mixed].slice(0, limit);
}
