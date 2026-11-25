import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/commerce/ProductCard";
import { allProducts, productCategories } from "@/lib/content";
import { itemListSchema, jsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Deals — Earbuds, Headphones & Smartwatches Below MRP",
  description:
    "Current prices on boAt and Noise earbuds, headphones and smartwatches, checked on the brands' own stores, with the discount from MRP and the date we checked.",
  alternates: { canonical: "/deals" },
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

export default async function DealsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const cats = productCategories();
  const active = cats.find((c) => c.toLowerCase().replace(/\s+/g, "-") === type);
  const products = [...allProducts]
    .filter((p) => !active || p.category === active)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
  const lastChecked = allProducts.map((p) => p.verifiedAt).sort().at(-1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(itemListSchema("Deals", products.map((p) => ({ name: p.name, url: p.sourceUrl }))))}
      />
      <section className="pt-16 pb-12 border-b border-line">
        <Container size="xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Deals</span>
          <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mt-4 mb-5 max-w-3xl">
            Below-MRP prices, checked on the brand&apos;s store
          </h1>
          <p className="text-lg text-ink-60 max-w-2xl">
            Sorted by discount from MRP. Prices were last checked on {lastChecked ? fmt(lastChecked) : "—"} and can change at any time — the price at checkout is the one that counts.
          </p>
        </Container>
      </section>

      <nav aria-label="Filter by product type" className="border-b border-line">
        <Container size="xl">
          <div className="flex gap-2 py-4 overflow-x-auto">
            <Link href="/deals" className={`px-4 py-2 text-sm whitespace-nowrap ${!active ? "bg-ink text-cream" : "border border-line hover:border-ink"}`}>
              All ({allProducts.length})
            </Link>
            {cats.map((c) => (
              <Link
                key={c}
                href={`/deals?type=${c.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-4 py-2 text-sm whitespace-nowrap ${active === c ? "bg-ink text-cream" : "border border-line hover:border-ink"}`}
              >
                {c} ({allProducts.filter((p) => p.category === c).length})
              </Link>
            ))}
          </div>
        </Container>
      </nav>

      <section className="py-14">
        <Container size="xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} placement="deals" />
            ))}
          </div>
          <p className="mt-10 text-sm text-ink-60 max-w-2xl">
            These are affiliate links through EarnKaro: if you buy, we may earn a commission at no extra cost to you. It doesn&apos;t change which products we list.{" "}
            <Link href="/affiliate-disclosure" className="underline hover:text-accent">Affiliate disclosure</Link>
          </p>
        </Container>
      </section>
    </>
  );
}
