import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/commerce/ProductCard";
import { allProducts, productCategories, guideArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products We're Tracking — Prices by Category",
  description:
    "Every product featured in our guides, grouped by category, with the current price from the brand's own store and the date it was checked.",
  alternates: { canonical: "/trending-products" },
};

export default function TrendingProductsPage() {
  const cats = productCategories();
  const guides = guideArticles();

  return (
    <>
      <section className="pt-16 pb-12 border-b border-line">
        <Container size="xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Products</span>
          <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mt-4 mb-5 max-w-3xl">Products we&apos;re tracking</h1>
          <p className="text-lg text-ink-60 max-w-2xl">
            Every product that appears in one of our guides, grouped by type. We list what we&apos;ve researched — not best-seller rankings we can&apos;t verify.
          </p>
        </Container>
      </section>

      {cats.map((c) => (
        <section key={c} className="py-14 border-b border-line">
          <Container size="xl">
            <SectionHeading eyebrow={`${allProducts.filter((p) => p.category === c).length} products`} title={c} size="sm" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts
                .filter((p) => p.category === c)
                .map((p) => (
                  <ProductCard key={p.id} product={p} placement="tracking" />
                ))}
            </div>
          </Container>
        </section>
      ))}

      {guides.length > 0 && (
        <section className="py-14 bg-cream-100">
          <Container size="xl">
            <h2 className="font-editorial text-3xl font-semibold mb-6">Read the guides</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {guides.map((g) => (
                <li key={g.id}>
                  <Link href={g.url} className="block p-6 bg-paper border border-line hover:border-ink">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{g.categoryName}</span>
                    <span className="block font-editorial text-xl font-semibold mt-2">{g.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
