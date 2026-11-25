import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ProductCard, ProductCardHorizontal } from "@/components/commerce/ProductCard";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { sampleProducts, articlesByCategory } from "@/lib/sample-content";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shopping in India — Deals, Buying Guides & Product Reviews",
  description:
    "Every product personally tested, every deal verified in the last 24 hours. The only Indian shopping guide that works.",
};

const priceBuckets = [
  { range: "Under ₹1,000", slug: "under-1000", items: 47 },
  { range: "₹1,000 – ₹5,000", slug: "1000-5000", items: 112 },
  { range: "₹5,000 – ₹15,000", slug: "5000-15000", items: 86 },
  { range: "₹15,000 – ₹30,000", slug: "15000-30000", items: 64 },
  { range: "₹30,000 – ₹60,000", slug: "30000-60000", items: 52 },
  { range: "₹60,000 – ₹1,00,000", slug: "60000-100000", items: 28 },
  { range: "₹1,00,000+", slug: "premium", items: 19 },
];

const buyingGuides = [
  { title: "Best phones under ₹30,000", slug: "phones-under-30000", category: "Technology" },
  { title: "Best laptops under ₹50,000", slug: "laptops-under-50000", category: "Technology" },
  { title: "Best wireless earbuds under ₹3,000", slug: "earbuds-under-3000", category: "Audio" },
  { title: "Best credit cards for Amazon shoppers", slug: "credit-cards-amazon", category: "Money" },
  { title: "Best running shoes for Indian roads", slug: "running-shoes", category: "Fashion" },
  { title: "Best air fryers under ₹10,000", slug: "air-fryers", category: "Kitchen" },
];

export default function ShoppingPage() {
  const dealOfDay = sampleProducts[2]; // HP Pavilion
  const shoppingArticles = articlesByCategory("shopping", 3);

  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-16 border-b border-line bg-cream-100">
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              The Shopping Desk
            </span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            Products worth your rupees.
          </h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            We spend six weeks with every product before we recommend it. We verify every price. We disclose every affiliate link. No sponsored "reviews" — ever.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/deals"
              className="px-6 py-3 bg-ink text-cream font-medium hover:bg-accent transition"
            >
              Today's deals →
            </Link>
            <Link
              href="/buying-guides"
              className="px-6 py-3 border border-ink text-ink font-medium hover:bg-ink hover:text-cream transition"
            >
              Buying guides
            </Link>
            <Link
              href="/product-comparisons"
              className="px-6 py-3 border border-ink text-ink font-medium hover:bg-ink hover:text-cream transition"
            >
              Compare products
            </Link>
          </div>
        </Container>
      </section>

      {/* Deal of the day */}
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
                  Deal of the Day
                </span>
              </div>
              <h2 className="font-editorial text-4xl md:text-5xl font-semibold leading-tight mb-6">
                The only laptop we'd personally buy under ₹50,000 right now.
              </h2>
              <p className="text-ink-60 leading-relaxed mb-6">
                We tested 14 laptops under ₹50k over six weeks. One stood out — and it just hit its lowest price of the year. Deal ends at midnight.
              </p>
              <div className="flex items-center gap-4 pb-6 border-b border-line">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 mb-1">
                    Ends in
                  </div>
                  <div className="font-editorial text-3xl font-semibold">14h 23m</div>
                </div>
                <div className="h-12 w-px bg-line" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 mb-1">
                    You save
                  </div>
                  <div className="font-editorial text-3xl font-semibold text-accent">
                    {formatINR(15000)}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ProductCard product={dealOfDay} />
            </div>
          </div>
        </Container>
      </section>

      {/* Price buckets */}
      <section className="py-16 border-b border-line bg-cream-100">
        <Container size="xl">
          <SectionHeading
            eyebrow="Shop by Budget"
            title="Pick your price. See what we'd buy."
            description="Every bucket has a tested winner, a budget pick, and the one to skip."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {priceBuckets.slice(0, 4).map((b) => (
              <Link
                key={b.slug}
                href={`/shopping/budget/${b.slug}`}
                className="group block bg-paper border border-line p-7 hover:border-ink transition"
              >
                <div className="font-editorial text-2xl font-semibold text-ink mb-2 group-hover:text-accent transition">
                  {b.range}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-40">
                  {b.items} tested picks →
                </div>
              </Link>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            {priceBuckets.slice(4).map((b) => (
              <Link
                key={b.slug}
                href={`/shopping/budget/${b.slug}`}
                className="group block bg-paper border border-line p-7 hover:border-ink transition"
              >
                <div className="font-editorial text-2xl font-semibold text-ink mb-2 group-hover:text-accent transition">
                  {b.range}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-40">
                  {b.items} tested picks →
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Trending products */}
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading
            eyebrow="Trending Now"
            title="What India is buying this week"
            seeMoreHref="/trending-products"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.slice(0, 6).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Buying guides */}
      <section className="py-16 border-b border-line bg-ink text-cream">
        <Container size="xl">
          <div className="flex items-end justify-between border-b border-cream/20 pb-5 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-accent" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
                  Buying Guides
                </span>
              </div>
              <h2 className="font-editorial text-4xl md:text-5xl font-semibold text-cream">
                Tested over months. Recommended for years.
              </h2>
            </div>
            <Link
              href="/buying-guides"
              className="hidden md:inline-flex items-center gap-2 text-sm text-cream/80 hover:text-accent"
            >
              All guides →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {buyingGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/buying-guides/${g.slug}`}
                className="group p-6 border border-cream/20 hover:border-accent transition bg-cream/5"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-3">
                  {g.category}
                </div>
                <h3 className="font-editorial text-xl font-semibold text-cream mb-4 group-hover:text-accent transition">
                  {g.title}
                </h3>
                <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-cream/50">
                  Read guide →
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Editor's picks articles */}
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading
            eyebrow="From the Shopping Desk"
            title="Our editors on what to buy"
          />
          <div className="grid md:grid-cols-3 gap-10">
            {shoppingArticles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
