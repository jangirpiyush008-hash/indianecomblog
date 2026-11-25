import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCardHorizontal } from "@/components/commerce/ProductCard";
import { comparisonArticles, productsBySlugs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Product Comparisons — Side-by-Side Specs and Prices",
  description: "Side-by-side product comparisons for Indian buyers, built from manufacturer specs and current store prices.",
  alternates: { canonical: "/product-comparisons" },
};

export default function ProductComparisonsPage() {
  const comparisons = comparisonArticles();
  return (
    <>
      <section className="pt-16 pb-12 border-b border-line">
        <Container size="xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Comparisons</span>
          <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mt-4 mb-5 max-w-3xl">Product comparisons</h1>
          <p className="text-lg text-ink-60 max-w-2xl">
            Two products, one table, and a plain-English answer to &ldquo;which one should I buy?&rdquo;
          </p>
        </Container>
      </section>
      <section className="py-14">
        <Container size="lg">
          {comparisons.length === 0 && <p className="text-ink-60">No comparisons published yet.</p>}
          <div className="space-y-14">
            {comparisons.map((c) => (
              <article key={c.id} className="border-t-2 border-ink pt-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{c.categoryName}</span>
                <h2 className="font-editorial text-3xl font-semibold mt-2 mb-3">
                  <Link href={c.url} className="hover:text-accent">{c.title}</Link>
                </h2>
                <p className="text-ink-60 mb-6 max-w-2xl">{c.excerpt}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {productsBySlugs(c.productSlugs).map((p) => (
                    <ProductCardHorizontal key={p.id} product={p} articleId={c.slug} placement="comparisons" />
                  ))}
                </div>
                <Link href={c.url} className="inline-block mt-6 text-sm font-medium hover:text-accent">Read the full comparison →</Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
