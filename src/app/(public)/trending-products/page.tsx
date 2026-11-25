import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/commerce/ProductCard";
import { sampleProducts } from "@/lib/sample-content";
import { formatINR, formatCompact } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Trending Products in India — The Weekly Ranking",
  description:
    "The 20 products India is buying most this week. Ranked by sales velocity, verified by our editors.",
};

export default function TrendingProductsPage() {
  const ranked = [...sampleProducts, ...sampleProducts, ...sampleProducts].slice(0, 20);

  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-16 border-b border-line">
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              Trending Products · Updated weekly
            </span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            The 20 products India can't stop buying.
          </h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            Ranked by sales velocity across Amazon, Flipkart, Nykaa and Myntra. Verified by our Shopping Desk. Updated every Sunday.
          </p>
        </Container>
      </section>

      {/* Top 5 ranked list */}
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading eyebrow="This Week's Top 5" title="The leaders, ranked" />
          <div className="space-y-6">
            {ranked.slice(0, 5).map((p, i) => (
              <Link
                key={`${p.id}-${i}`}
                href={p.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="group grid md:grid-cols-12 gap-6 items-center p-6 bg-paper border border-line hover:border-ink transition"
              >
                <div className="md:col-span-1">
                  <span className="font-editorial text-6xl font-semibold text-accent leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-2 relative aspect-square bg-cream-100">
                  <Image src={p.image} alt={p.name} fill sizes="200px" className="object-cover p-4" />
                </div>
                <div className="md:col-span-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 mb-2">
                    {p.brand} · {p.category}
                  </div>
                  <h3 className="font-editorial text-2xl font-semibold text-ink mb-2 group-hover:text-accent-dark transition">
                    {p.name}
                  </h3>
                  {p.verdict && (
                    <p className="text-sm italic text-ink-60">"{p.verdict}"</p>
                  )}
                </div>
                <div className="md:col-span-2 text-right">
                  <div className="text-2xl font-semibold">{formatINR(p.price)}</div>
                  {p.originalPrice && (
                    <div className="text-sm text-ink-40 line-through">
                      {formatINR(p.originalPrice)}
                    </div>
                  )}
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    ▲ Rising fast
                  </div>
                </div>
                <div className="md:col-span-2">
                  <span className="inline-block w-full py-2.5 bg-ink text-cream text-center text-sm font-medium group-hover:bg-accent transition">
                    See deal →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Rest as grid */}
      <section className="py-16 border-b border-line bg-cream-100">
        <Container size="xl">
          <SectionHeading eyebrow="#6 – #20" title="The rest of the ranking" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ranked.slice(5, 20).map((p, i) => (
              <div key={`${p.id}-rest-${i}`} className="relative">
                <div className="absolute top-3 right-3 z-10 bg-ink text-cream px-2.5 py-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] font-bold">
                    #{i + 6}
                  </span>
                </div>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Methodology */}
      <section className="py-16">
        <Container size="md">
          <div className="text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3 block">
              Methodology
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold mb-6">
              How we rank trending products
            </h2>
            <p className="text-ink-60 leading-relaxed">
              We blend sales-velocity signals from Amazon, Flipkart, Nykaa and Myntra best-seller rankings with our editors' verdict on quality. Products that are selling fast but aren't worth buying don't make the list. Updated every Sunday at 7 AM IST.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
