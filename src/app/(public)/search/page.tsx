import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Search } from "lucide-react";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { ProductCard } from "@/components/commerce/ProductCard";
import { allArticles, allProducts, allTags, slugify } from "@/lib/content";
import { categories } from "@/config/brand";
import type { Article, Product } from "@/types/content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles and products.",
  // Search result pages are thin by nature; keep them out of the index but follow links.
  robots: { index: false, follow: true },
};

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}₹ ]/gu, " ");

function articleText(a: Article) {
  const body = (a.body ?? [])
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : "rows" in b ? b.rows.flat().join(" ") : ""))
    .join(" ");
  return norm([a.title, a.subtitle, a.excerpt, a.categoryName, ...(a.tags ?? []), ...(a.keyTakeaways ?? []), body].join(" "));
}

function score(text: string, title: string, terms: string[]) {
  let s = 0;
  for (const t of terms) {
    if (!text.includes(t)) return 0; // every term must match
    s += title.includes(t) ? 3 : 1;
  }
  return s;
}

const desks = categories.filter((c) => c.slug !== "trending");

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; cat?: string }>;
}) {
  const { q = "", type = "all", cat } = await searchParams;
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);

  let articles: Article[] = [];
  let products: Product[] = [];
  if (terms.length) {
    articles = allArticles
      .map((a) => ({ a, s: score(articleText(a), norm(a.title), terms) }))
      .filter((x) => x.s > 0 && (!cat || x.a.category === cat))
      .sort((x, y) => y.s - x.s)
      .map((x) => x.a);
    products = cat
      ? []
      : allProducts
          .map((p) => ({ p, s: score(norm([p.name, p.brand, p.category, ...(p.keyFeatures ?? [])].join(" ")), norm(p.name), terms) }))
          .filter((x) => x.s > 0)
          .sort((x, y) => y.s - x.s)
          .map((x) => x.p);
  }
  if (type === "articles") products = [];
  if (type === "products") articles = [];

  const href = (o: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { q, type, cat, ...o };
    for (const [k, v] of Object.entries(merged)) if (v && !(k === "type" && v === "all")) p.set(k, v);
    return `/search?${p}`;
  };
  const chip = (active: boolean) =>
    `px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${active ? "bg-ink text-cream" : "border border-line text-ink-60 hover:border-ink"}`;
  const suggestions = allTags().slice(0, 10);

  return (
    <>
      <section className="pt-16 pb-10 border-b border-line">
        <Container size="xl">
          <div className="max-w-3xl">
            <h1 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">
              {q ? `Search results for “${q}”` : "Search"}
            </h1>
            <form action="/search" role="search" className="relative">
              <label htmlFor="q" className="sr-only">Search</label>
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-ink-60" aria-hidden />
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={q}
                autoFocus={!q}
                placeholder="Search articles and products…"
                className="w-full pl-10 pr-4 py-4 text-2xl md:text-3xl font-editorial border-b-2 border-ink bg-transparent focus:outline-none placeholder:text-ink-40"
              />
              {type !== "all" && <input type="hidden" name="type" value={type} />}
              {cat && <input type="hidden" name="cat" value={cat} />}
            </form>
            {q && (
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40">
                {articles.length + products.length} results
              </p>
            )}
          </div>
        </Container>
      </section>

      {q && (
        <nav aria-label="Filter results" className="border-b border-line py-4">
          <Container size="xl">
            <div className="space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 whitespace-nowrap mr-2">Type</span>
                {[
                  ["all", "All"],
                  ["articles", "Articles"],
                  ["products", "Products"],
                ].map(([v, l]) => (
                  <Link key={v} href={href({ type: v })} className={chip(type === v)}>{l}</Link>
                ))}
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 whitespace-nowrap mr-2">Desk</span>
                <Link href={href({ cat: undefined })} className={chip(!cat)}>All</Link>
                {desks.map((c) => (
                  <Link key={c.slug} href={href({ cat: c.slug })} className={chip(cat === c.slug)}>{c.name}</Link>
                ))}
              </div>
            </div>
          </Container>
        </nav>
      )}

      {!q || (articles.length === 0 && products.length === 0) ? (
        <section className="py-20">
          <Container size="md">
            {q && <h2 className="font-editorial text-3xl font-semibold mb-4">No results for “{q}”</h2>}
            <p className="text-ink-60 mb-6">{q ? "Try fewer words, or browse a topic:" : "Popular topics:"}</p>
            <div className="flex flex-wrap gap-3">
              {suggestions.map((s) => (
                <Link key={s} href={`/tag/${slugify(s)}`} className="px-4 py-2 border border-line hover:border-ink text-sm">
                  {s}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <>
          {articles.length > 0 && (
            <section className="py-14 border-b border-line">
              <Container size="xl">
                <h2 className="font-editorial text-2xl font-semibold mb-8 pb-4 border-b border-line">
                  Articles <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 ml-3">{articles.length}</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {articles.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </Container>
            </section>
          )}
          {products.length > 0 && (
            <section className="py-14 bg-cream-100">
              <Container size="xl">
                <h2 className="font-editorial text-2xl font-semibold mb-8 pb-4 border-b border-line">
                  Products <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 ml-3">{products.length}</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} placement="search" />
                  ))}
                </div>
              </Container>
            </section>
          )}
        </>
      )}
    </>
  );
}
