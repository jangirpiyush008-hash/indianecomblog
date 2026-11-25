import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Product Comparisons — Head-to-Head, Honestly",
  description:
    "Two products. Same price. One verdict. Side-by-side comparisons by India's toughest product reviewers.",
};

const comparisons = [
  {
    slug: "iphone-16-pro-vs-samsung-s25-ultra",
    a: "iPhone 16 Pro",
    b: "Samsung S25 Ultra",
    category: "Smartphones",
    priceRange: "₹1,19,900 – ₹1,29,999",
    winner: "iPhone 16 Pro",
    imageA: "https://images.unsplash.com/photo-1695048132833-99a0a3b8ba0a?auto=format&fit=crop&w=400&q=80",
    imageB: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
  },
  {
    slug: "nothing-phone-3a-vs-oneplus-13r",
    a: "Nothing Phone 3a",
    b: "OnePlus 13R",
    category: "Smartphones",
    priceRange: "₹39,999 – ₹42,999",
    winner: "OnePlus 13R",
    imageA: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?auto=format&fit=crop&w=400&q=80",
    imageB: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
  },
  {
    slug: "sony-wh1000xm6-vs-bose-qc-ultra",
    a: "Sony WH-1000XM6",
    b: "Bose QC Ultra",
    category: "Headphones",
    priceRange: "₹29,990 – ₹37,900",
    winner: "Sony WH-1000XM6",
    imageA: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80",
    imageB: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
  },
  {
    slug: "zerodha-vs-groww-vs-angelone",
    a: "Zerodha",
    b: "Groww",
    category: "Brokers",
    priceRange: "Free – ₹20 per order",
    winner: "Depends on use",
    imageA: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80",
    imageB: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
  },
  {
    slug: "hdfc-infinia-vs-axis-magnus",
    a: "HDFC Infinia",
    b: "Axis Magnus",
    category: "Credit Cards",
    priceRange: "₹10,000 – ₹12,500 fee",
    winner: "HDFC Infinia",
    imageA: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80",
    imageB: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80",
  },
  {
    slug: "netflix-vs-prime-vs-hotstar",
    a: "Netflix",
    b: "Prime Video",
    category: "OTT",
    priceRange: "₹149 – ₹649/month",
    winner: "Prime Video for India",
    imageA: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80",
    imageB: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?auto=format&fit=crop&w=400&q=80",
  },
];

export default function ProductComparisonsPage() {
  const featured = comparisons[0];

  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-16 border-b border-line bg-ink text-cream">
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              Product Comparisons
            </span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            Two products. One verdict.
          </h1>
          <p className="mt-6 text-xl text-cream/70 max-w-2xl">
            Head-to-head comparisons by editors who use both. No fence-sitting, no "it depends" — just the one you should buy.
          </p>
        </Container>
      </section>

      {/* Featured comparison */}
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading eyebrow="This week's showdown" title="The one everyone's asking about" />
          <Link
            href={`/compare/${featured.slug}`}
            className="group block bg-cream-100 border border-line hover:border-ink transition p-10"
          >
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5">
                <div className="relative aspect-square bg-paper overflow-hidden">
                  <Image
                    src={featured.imageA}
                    alt={featured.a}
                    fill
                    sizes="400px"
                    className="object-cover p-8"
                  />
                </div>
                <div className="text-center mt-4">
                  <div className="font-editorial text-2xl font-semibold">{featured.a}</div>
                </div>
              </div>
              <div className="md:col-span-2 text-center">
                <div className="font-editorial text-6xl font-semibold text-accent">vs</div>
              </div>
              <div className="md:col-span-5">
                <div className="relative aspect-square bg-paper overflow-hidden">
                  <Image
                    src={featured.imageB}
                    alt={featured.b}
                    fill
                    sizes="400px"
                    className="object-cover p-8"
                  />
                </div>
                <div className="text-center mt-4">
                  <div className="font-editorial text-2xl font-semibold">{featured.b}</div>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-line text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                Our verdict
              </div>
              <div className="font-editorial text-3xl font-semibold">
                The {featured.winner} wins.
              </div>
              <p className="mt-3 text-ink-60">Read the full head-to-head →</p>
            </div>
          </Link>
        </Container>
      </section>

      {/* All comparisons */}
      <section className="py-16 border-b border-line bg-cream-100">
        <Container size="xl">
          <SectionHeading eyebrow="All comparisons" title="Browse by category" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group bg-paper border border-line hover:border-ink transition p-6"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">
                  {c.category}
                </div>
                <div className="grid grid-cols-5 gap-4 items-center mb-5">
                  <div className="col-span-2 relative aspect-square bg-cream-100">
                    <Image src={c.imageA} alt={c.a} fill sizes="200px" className="object-cover p-3" />
                  </div>
                  <div className="font-editorial text-xl font-semibold text-center text-ink-40">vs</div>
                  <div className="col-span-2 relative aspect-square bg-cream-100">
                    <Image src={c.imageB} alt={c.b} fill sizes="200px" className="object-cover p-3" />
                  </div>
                </div>
                <h3 className="font-editorial text-xl font-semibold text-ink group-hover:text-accent-dark transition leading-tight">
                  {c.a} vs {c.b}
                </h3>
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em]">
                  <span className="text-ink-60">{c.priceRange}</span>
                  <span className="text-accent font-semibold">
                    Winner: {c.winner.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
