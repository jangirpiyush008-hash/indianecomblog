import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Search } from "lucide-react";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { ProductCard } from "@/components/commerce/ProductCard";
import { sampleArticles, sampleProducts } from "@/lib/sample-content";

export const metadata: Metadata = {
  title: "Search Fable",
  description: "Search articles, products, deals and trends across Fable.",
};

const contentFilters = ["All", "Articles", "Products", "Deals", "Trends"];
const categoryFilters = ["All categories", "Technology", "AI Tools", "Shopping", "Money", "Lifestyle", "Entertainment", "Travel"];
const dateFilters = ["Any time", "Past week", "Past month", "Past year"];

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const resultsArticles = q ? sampleArticles.filter(a => a.title.toLowerCase().includes(q.toLowerCase()) || a.excerpt.toLowerCase().includes(q.toLowerCase())) : sampleArticles.slice(0, 6);
  const resultsProducts = q ? sampleProducts.filter(p => p.name.toLowerCase().includes(q.toLowerCase())) : sampleProducts.slice(0, 4);

  return (
    <>
      <section className="pt-16 pb-10 border-b border-line">
        <Container size="xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Search</span>
            </div>
            <form action="/search" className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-ink-60" />
              <input
                name="q"
                defaultValue={q}
                autoFocus
                placeholder="Search articles, products, deals..."
                className="w-full pl-10 pr-4 py-4 text-2xl md:text-3xl font-editorial border-b-2 border-ink bg-transparent focus:outline-none placeholder:text-ink-40"
              />
            </form>
            {q && (
              <p className="mt-6 text-ink-60">
                Showing results for <strong className="text-ink">"{q}"</strong>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 ml-4">
                  {resultsArticles.length + resultsProducts.length} results
                </span>
              </p>
            )}
          </div>
        </Container>
      </section>

      <section className="sticky top-[73px] z-30 bg-cream border-b border-line py-4">
        <Container size="xl">
          <div className="space-y-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 whitespace-nowrap mr-2">Type</span>
              {contentFilters.map((f, i) => (
                <button key={f} className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${i === 0 ? "bg-ink text-cream" : "border border-line text-ink-60 hover:border-ink"}`}>{f}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 whitespace-nowrap mr-2">Category</span>
              {categoryFilters.map((f, i) => (
                <button key={f} className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${i === 0 ? "bg-ink text-cream" : "border border-line text-ink-60 hover:border-ink"}`}>{f}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 whitespace-nowrap mr-2">Date</span>
              {dateFilters.map((f, i) => (
                <button key={f} className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${i === 0 ? "bg-ink text-cream" : "border border-line text-ink-60 hover:border-ink"}`}>{f}</button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {resultsArticles.length === 0 && resultsProducts.length === 0 ? (
        <section className="py-24 text-center">
          <Container size="md">
            <h2 className="font-editorial text-4xl font-semibold mb-4">No results for "{q}"</h2>
            <p className="text-ink-60 mb-8">Try a different search term, or browse these popular topics:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {["iPhone 16", "Best AI tools", "HDFC Infinia", "Best laptop", "Goa weekend", "Mutual funds"].map(s => (
                <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="px-4 py-2 border border-line hover:border-ink text-sm text-ink transition">{s}</Link>
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <>
          {resultsArticles.length > 0 && (
            <section className="py-16 border-b border-line">
              <Container size="xl">
                <h2 className="font-editorial text-2xl font-semibold mb-8 pb-4 border-b border-line">
                  Articles <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 ml-3">{resultsArticles.length}</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {resultsArticles.map(a => <ArticleCard key={a.id} article={a} />)}
                </div>
              </Container>
            </section>
          )}

          {resultsProducts.length > 0 && (
            <section className="py-16 border-b border-line bg-cream-100">
              <Container size="xl">
                <h2 className="font-editorial text-2xl font-semibold mb-8 pb-4 border-b border-line">
                  Products <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 ml-3">{resultsProducts.length}</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {resultsProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </Container>
            </section>
          )}
        </>
      )}
    </>
  );
}
