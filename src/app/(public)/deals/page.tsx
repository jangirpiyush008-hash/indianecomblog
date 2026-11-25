import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/commerce/ProductCard";
import { sampleProducts } from "@/lib/sample-content";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Today's Best Deals in India — Verified in 24 Hours",
  description:
    "Every deal price-verified in the last 24 hours. Amazon, Flipkart, Nykaa and Myntra — only the deals worth your time.",
};

const merchants = [
  { name: "All", slug: "all", count: 128 },
  { name: "Amazon", slug: "amazon", count: 54 },
  { name: "Flipkart", slug: "flipkart", count: 41 },
  { name: "Nykaa", slug: "nykaa", count: 18 },
  { name: "Myntra", slug: "myntra", count: 15 },
];

const discountTiers = [
  { label: "All", slug: "all" },
  { label: "50%+ off", slug: "50-plus" },
  { label: "30%+ off", slug: "30-plus" },
  { label: "20%+ off", slug: "20-plus" },
];

const categories = [
  "Smartphones",
  "Laptops",
  "Audio",
  "Wearables",
  "Kitchen",
  "Beauty",
  "Fashion",
  "Home",
];

export default function DealsPage() {
  const hotDeals = [...sampleProducts].sort((a, b) => (b.discount || 0) - (a.discount || 0));

  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-16 border-b border-line bg-accent text-white">
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold">
              Deals Desk · Live
            </span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            Today's best deals, verified in the last 24 hours.
          </h1>
          <p className="mt-6 text-xl text-white/80 max-w-2xl">
            No clickbait. No stale coupons. Every deal here was live at ₹{" "}
            {formatINR(999).replace("₹", "").trim()} off or more, verified by our editors in the last day.
          </p>

          <div className="mt-10 grid md:grid-cols-4 gap-6">
            {[
              { label: "Deals today", value: "128" },
              { label: "Avg. discount", value: "34%" },
              { label: "Avg. savings", value: formatINR(2847) },
              { label: "Last verified", value: "11 min ago" },
            ].map((s) => (
              <div key={s.label} className="border-t border-white/30 pt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">
                  {s.label}
                </div>
                <div className="font-editorial text-3xl font-semibold text-white">{s.value}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className="sticky top-[73px] z-30 bg-cream border-b border-line py-4">
        <Container size="xl">
          <div className="space-y-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 whitespace-nowrap mr-2">
                Merchant
              </span>
              {merchants.map((m, i) => (
                <button
                  key={m.slug}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                    i === 0
                      ? "bg-ink text-cream"
                      : "border border-line text-ink-60 hover:border-ink"
                  }`}
                >
                  {m.name} <span className="opacity-60">({m.count})</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 whitespace-nowrap mr-2">
                Discount
              </span>
              {discountTiers.map((d, i) => (
                <button
                  key={d.slug}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                    i === 0
                      ? "bg-ink text-cream"
                      : "border border-line text-ink-60 hover:border-ink"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 whitespace-nowrap mr-2">
                Category
              </span>
              {categories.map((c) => (
                <button
                  key={c}
                  className="px-3 py-1.5 text-xs font-medium whitespace-nowrap border border-line text-ink-60 hover:border-ink transition"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Deals grid */}
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...hotDeals, ...hotDeals].map((p, i) => (
              <ProductCard key={`${p.id}-${i}`} product={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <button className="px-8 py-4 border border-ink text-ink hover:bg-ink hover:text-cream transition font-medium">
              Load more deals →
            </button>
          </div>
        </Container>
      </section>

      {/* Sale calendar */}
      <section className="py-16 border-b border-line bg-cream-100">
        <Container size="xl">
          <SectionHeading
            eyebrow="Sale Calendar"
            title="India's upcoming sales, mapped"
            description="Plan your spending. We'll remind you when the real discounts drop."
          />
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { name: "Nykaa Blockbuster Beauty", date: "Dec 2 – 5", merchant: "Nykaa" },
              { name: "Amazon End of Year Sale", date: "Dec 14 – 20", merchant: "Amazon.in" },
              { name: "Flipkart Big Billion Days", date: "Jan 4 – 9", merchant: "Flipkart" },
              { name: "Myntra End of Reason Sale", date: "Jan 10 – 15", merchant: "Myntra" },
              { name: "Ajio Big Bold Sale", date: "Jan 18 – 22", merchant: "Ajio" },
              { name: "Croma Republic Day Sale", date: "Jan 22 – 27", merchant: "Croma" },
            ].map((s) => (
              <div key={s.name} className="bg-paper border border-line p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mb-2">
                  {s.merchant}
                </div>
                <h3 className="font-editorial text-lg font-semibold mb-3">{s.name}</h3>
                <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-60">
                  {s.date}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
