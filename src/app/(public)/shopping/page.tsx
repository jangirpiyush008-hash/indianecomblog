import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { allProducts, guideArticles, articlesByCategory, productCategories } from "@/lib/content";
import { breadcrumbSchema, jsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Shopping — Buying Guides, Comparisons & Deals for India",
  description:
    "Buying guides and comparisons for Indian shoppers, built on manufacturer specs and prices checked on the store. Every price shows the date we checked it.",
  alternates: { canonical: "/shopping" },
};

export default function ShoppingPage() {
  const guides = guideArticles();
  const shoppingStories = articlesByCategory("shopping", 6);
  const topDeals = [...allProducts].sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0)).slice(0, 4);
  const cats = productCategories();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Shopping", url: "/shopping" }]))}
      />
      <section className="pt-16 pb-14 border-b border-line bg-ink text-cream">
        <Container size="xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">The Shopping desk</span>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] mt-4 mb-6 max-w-4xl">
            Shopping guides for India, with the receipts
          </h1>
          <p className="text-lg md:text-xl text-cream/70 max-w-2xl">
            We compare products on what the brand actually publishes and the price on the store today — and tell you the date we checked.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/buying-guides" className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-medium">Buying guides</Link>
            <Link href="/product-comparisons" className="px-6 py-3 border border-cream/40 hover:bg-cream/5 font-medium">Comparisons</Link>
            <Link href="/deals" className="px-6 py-3 border border-cream/40 hover:bg-cream/5 font-medium">Deals</Link>
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading eyebrow="Guides" title="Start with a guide" seeMoreHref="/buying-guides" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {guides.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line bg-cream-100">
        <Container size="xl">
          <SectionHeading
            eyebrow="Biggest discounts"
            title="Furthest below MRP right now"
            description="Ranked by discount from the brand's listed MRP."
            seeMoreHref="/deals"
            seeMoreLabel="All deals"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDeals.map((p) => (
              <ProductCard key={p.id} product={p} placement="shopping-hub" />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading eyebrow="Browse" title="Shop by product type" />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cats.map((c) => {
              const n = allProducts.filter((p) => p.category === c).length;
              const from = Math.min(...allProducts.filter((p) => p.category === c).map((p) => p.price));
              return (
                <li key={c}>
                  <Link href={`/deals?type=${c.toLowerCase().replace(/\s+/g, "-")}`} className="block p-6 border border-line hover:border-ink bg-paper">
                    <span className="font-editorial text-2xl font-semibold">{c}</span>
                    <span className="block mt-2 text-sm text-ink-60">
                      {n} products · from ₹{from.toLocaleString("en-IN")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {shoppingStories.length > 0 && (
        <section className="py-16">
          <Container size="xl">
            <SectionHeading eyebrow="Latest" title="From the Shopping desk" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {shoppingStories.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
