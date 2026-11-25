import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Buying Guides — Tested, Verified, Recommended",
  description:
    "Every product personally tested for six weeks. Our full library of Indian buying guides.",
};

const categories = [
  { name: "Technology", slug: "technology", color: "#2563EB", count: 32 },
  { name: "Audio", slug: "audio", color: "#9333EA", count: 14 },
  { name: "Home", slug: "home", color: "#059669", count: 21 },
  { name: "Kitchen", slug: "kitchen", color: "#EA580C", count: 18 },
  { name: "Beauty", slug: "beauty", color: "#DB2777", count: 27 },
  { name: "Fashion", slug: "fashion", color: "#0891B2", count: 19 },
];

const guides = [
  {
    title: "Best phones under ₹30,000 in India",
    slug: "phones-under-30000",
    category: "Technology",
    categoryColor: "#2563EB",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    picks: 12,
    tested: "6 weeks",
    verdict: "Nothing Phone 3a is the surprise winner.",
  },
  {
    title: "Best laptops under ₹50,000",
    slug: "laptops-under-50000",
    category: "Technology",
    categoryColor: "#2563EB",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=800&q=80",
    picks: 14,
    tested: "8 weeks",
    verdict: "HP Pavilion 14 with Ryzen 7 is the one to buy.",
  },
  {
    title: "Best wireless earbuds under ₹3,000",
    slug: "earbuds-under-3000",
    category: "Audio",
    categoryColor: "#9333EA",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
    picks: 9,
    tested: "4 weeks",
    verdict: "boAt Airdopes 500 beats Realme at this price.",
  },
  {
    title: "Best air fryers under ₹10,000",
    slug: "air-fryers",
    category: "Kitchen",
    categoryColor: "#EA580C",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
    picks: 8,
    tested: "6 weeks",
    verdict: "Mi Smart Air Fryer takes the crown.",
  },
  {
    title: "Best skincare routine for oily, Indian skin",
    slug: "skincare-oily-skin",
    category: "Beauty",
    categoryColor: "#DB2777",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    picks: 7,
    tested: "12 weeks",
    verdict: "₹1,200 routine that outperforms ₹9,000 shelves.",
  },
  {
    title: "Best perfume for men under ₹3,000",
    slug: "perfume-men-under-3000",
    category: "Beauty",
    categoryColor: "#DB2777",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    picks: 5,
    tested: "8 weeks",
    verdict: "Five fragrances that actually last Indian summer.",
  },
  {
    title: "Best smartwatches under ₹20,000",
    slug: "smartwatches-under-20000",
    category: "Technology",
    categoryColor: "#2563EB",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    picks: 11,
    tested: "6 weeks",
    verdict: "Fossil Gen 7 is the best WearOS pick.",
  },
  {
    title: "Best running shoes for Indian roads",
    slug: "running-shoes",
    category: "Fashion",
    categoryColor: "#0891B2",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    picks: 9,
    tested: "10 weeks",
    verdict: "Asics Nimbus 26 for most. Nike Pegasus for daily.",
  },
  {
    title: "Best credit cards for Amazon shoppers",
    slug: "credit-cards-amazon",
    category: "Money",
    categoryColor: "#DC2626",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    picks: 4,
    tested: "3 months",
    verdict: "HDFC Infinia wins. ICICI Amazon Pay for budget.",
  },
];

export default function BuyingGuidesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-16 border-b border-line">
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              Buying Guides
            </span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            Every product. Tested. Verified. Ranked.
          </h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            We spend four to twelve weeks with every product on this page. No sponsored reviews. No AI-generated listicles. Just picks we'd send our own family.
          </p>
        </Container>
      </section>

      {/* Category chips */}
      <section className="py-10 border-b border-line bg-cream-100">
        <Container size="xl">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mr-3">
              Browse by
            </span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/buying-guides/${c.slug}`}
                className="group px-4 py-2 border border-line bg-paper hover:border-ink transition flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
                <span className="text-sm font-medium">{c.name}</span>
                <span className="font-mono text-[10px] text-ink-40">{c.count}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Guides grid */}
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {guides.map((g) => (
              <Link key={g.slug} href={`/buying-guides/${g.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-200 mb-5">
                  <Image
                    src={g.image}
                    alt={g.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: g.categoryColor }} />
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold"
                    style={{ color: g.categoryColor }}
                  >
                    {g.category}
                  </span>
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-ink mb-3 group-hover:text-accent-dark transition leading-tight">
                  {g.title}
                </h3>
                <p className="text-sm italic text-ink-60 mb-4">"{g.verdict}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-line font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">
                  <span>{g.picks} picks</span>
                  <span>·</span>
                  <span>Tested {g.tested}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
