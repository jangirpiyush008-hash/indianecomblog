import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatINR } from "@/lib/utils";

interface ComparisonData {
  slug: string;
  category: string;
  productA: { name: string; brand: string; price: number; originalPrice?: number; image: string; merchant: string; affiliateUrl: string };
  productB: { name: string; brand: string; price: number; image: string; merchant: string; affiliateUrl: string };
  verdict: { winner: "a" | "b" | "tie"; bestFor: string; summary: string };
  specs: { label: string; a: string; b: string; winner: "a" | "b" | "tie" }[];
  pros: { a: string[]; b: string[] };
  cons: { a: string[]; b: string[] };
  bestFor: { a: string; b: string };
}

const comparisonsData: Record<string, ComparisonData> = {
  "iphone-16-pro-vs-samsung-s25-ultra": {
    slug: "iphone-16-pro-vs-samsung-s25-ultra",
    category: "Smartphones",
    productA: { name: "iPhone 16 Pro", brand: "Apple", price: 119900, originalPrice: 129900, image: "https://images.unsplash.com/photo-1695048132833-99a0a3b8ba0a?auto=format&fit=crop&w=800&q=80", merchant: "Amazon.in", affiliateUrl: "#" },
    productB: { name: "Galaxy S25 Ultra", brand: "Samsung", price: 129999, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", merchant: "Flipkart", affiliateUrl: "#" },
    verdict: { winner: "a", bestFor: "The iPhone 16 Pro wins.", summary: "After six months of daily use, the iPhone 16 Pro wins on sustained performance, camera consistency, resale value and iOS 18. The S25 Ultra wins on sheer feature count, S-Pen productivity, and zoom photography. For most Indian buyers, the iPhone is the right call." },
    specs: [
      { label: "Display", a: '6.3" LTPO OLED, 120Hz', b: '6.9" Dynamic AMOLED 2X', winner: "b" },
      { label: "Processor", a: "A18 Pro", b: "Snapdragon 8 Elite", winner: "a" },
      { label: "RAM", a: "8GB", b: "12GB", winner: "b" },
      { label: "Main camera", a: "48MP", b: "200MP", winner: "a" },
      { label: "Battery", a: "3,582 mAh", b: "5,000 mAh", winner: "b" },
      { label: "Charging", a: "27W wired", b: "45W wired", winner: "b" },
      { label: "Price (base)", a: "₹1,19,900", b: "₹1,29,999", winner: "a" },
      { label: "Resale (1yr)", a: "~75%", b: "~55%", winner: "a" },
    ],
    pros: { a: ["Best-in-class sustained performance", "Most consistent camera", "Highest resale value in India", "iOS 18 + Apple Intelligence", "Lighter for all-day carry"], b: ["Larger, brighter display", "S-Pen for productivity", "100x Space Zoom camera", "Bigger battery, faster charging", "DeX for desktop-like use"] },
    cons: { a: ["Charging speed trails Android", "AppleCare+ is steep in India", "Only 128GB base storage"], b: ["Software updates less consistent long-term", "Heaviest flagship", "One UI bloat"] },
    bestFor: { a: "Power users who want reliability, best camera consistency, and strongest resale value.", b: "Productivity users who need the S-Pen, zoom photography, and a tablet-like display." },
  },
};

export async function generateStaticParams() {
  return Object.keys(comparisonsData).map((comparison) => ({ comparison }));
}

export async function generateMetadata({ params }: { params: Promise<{ comparison: string }> }): Promise<Metadata> {
  const { comparison } = await params;
  const d = comparisonsData[comparison];
  if (!d) return {};
  return { title: `${d.productA.name} vs ${d.productB.name}`, description: d.verdict.summary };
}

export default async function ComparePage({ params }: { params: Promise<{ comparison: string }> }) {
  const { comparison } = await params;
  const d = comparisonsData[comparison];
  if (!d) notFound();

  return (
    <article>
      <section className="pt-12 pb-10 border-b border-line">
        <Container size="lg">
          <nav className="pb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-40">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link href="/product-comparisons" className="hover:text-accent">Comparisons</Link>
          </nav>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">{d.category} · Comparison</span>
          </div>
          <h1 className="font-editorial text-4xl md:text-6xl font-semibold leading-[0.95] max-w-4xl">
            {d.productA.name} <em className="text-accent">vs</em> {d.productB.name}
          </h1>
          <p className="mt-6 text-xl text-ink-60 max-w-3xl">{d.verdict.summary}</p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-8">
            {[d.productA, d.productB].map((p, i) => {
              const isWinner = (i === 0 && d.verdict.winner === "a") || (i === 1 && d.verdict.winner === "b");
              return (
                <div key={p.name} className={`p-8 border transition ${isWinner ? "bg-accent/5 border-accent" : "bg-paper border-line"}`}>
                  {isWinner && <div className="inline-block mb-4 px-3 py-1 bg-accent text-white font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Our pick</div>}
                  <div className="relative aspect-square bg-cream-100 mb-6">
                    <Image src={p.image} alt={p.name} fill sizes="400px" className="object-cover p-8" />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 mb-2">{p.brand}</div>
                  <h2 className="font-editorial text-3xl font-semibold mb-4">{p.name}</h2>
                  <div className="text-3xl font-semibold mb-6">{formatINR(p.price)}</div>
                  <Link href={p.affiliateUrl} target="_blank" rel="sponsored nofollow noopener" className="block w-full py-3 bg-ink text-cream text-center font-medium hover:bg-accent transition">
                    Buy on {p.merchant}
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="lg">
          <SectionHeading eyebrow="Specifications" title="Spec-by-spec breakdown" />
          <div className="border border-line">
            <div className="grid grid-cols-7 bg-ink text-cream font-mono text-[11px] uppercase tracking-[0.15em] font-semibold">
              <div className="col-span-3 p-4">Specification</div>
              <div className="col-span-2 p-4 border-l border-cream/20">{d.productA.name}</div>
              <div className="col-span-2 p-4 border-l border-cream/20">{d.productB.name}</div>
            </div>
            {d.specs.map((s, i) => (
              <div key={s.label} className={`grid grid-cols-7 border-t border-line ${i % 2 === 0 ? "bg-cream-100" : "bg-paper"}`}>
                <div className="col-span-3 p-4 font-medium text-ink">{s.label}</div>
                <div className={`col-span-2 p-4 border-l border-line text-sm ${s.winner === "a" ? "font-semibold text-accent" : "text-ink-80"}`}>{s.winner === "a" && "✓ "}{s.a}</div>
                <div className={`col-span-2 p-4 border-l border-line text-sm ${s.winner === "b" ? "font-semibold text-accent" : "text-ink-80"}`}>{s.winner === "b" && "✓ "}{s.b}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line bg-cream-100">
        <Container size="lg">
          <SectionHeading eyebrow="What Works, What Doesn't" title="Pros and cons" />
          <div className="grid md:grid-cols-2 gap-8">
            {([d.productA, d.productB] as const).map((p, i) => (
              <div key={p.name} className="bg-paper p-8 border border-line">
                <h3 className="font-editorial text-2xl font-semibold mb-6">{p.name}</h3>
                <div className="mb-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-success font-semibold mb-3">Pros</div>
                  <ul className="space-y-2">
                    {(i === 0 ? d.pros.a : d.pros.b).map((pro) => (
                      <li key={pro} className="flex gap-2 text-sm text-ink-80"><span className="text-success">✓</span> {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-danger font-semibold mb-3">Cons</div>
                  <ul className="space-y-2">
                    {(i === 0 ? d.cons.a : d.cons.b).map((con) => (
                      <li key={con} className="flex gap-2 text-sm text-ink-80"><span className="text-danger">×</span> {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="lg">
          <SectionHeading eyebrow="Who should buy what" title="Best for..." />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-accent pl-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mb-2">Get the {d.productA.name} if</div>
              <p className="text-lg text-ink-80 leading-relaxed font-editorial">{d.bestFor.a}</p>
            </div>
            <div className="border-l-4 border-ink pl-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink font-semibold mb-2">Get the {d.productB.name} if</div>
              <p className="text-lg text-ink-80 leading-relaxed font-editorial">{d.bestFor.b}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-ink text-cream">
        <Container size="md">
          <div className="text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4 block">Our verdict</span>
            <h2 className="font-editorial text-5xl md:text-6xl font-semibold leading-tight mb-6">{d.verdict.bestFor}</h2>
            <p className="text-lg text-cream/80 leading-relaxed max-w-2xl mx-auto">{d.verdict.summary}</p>
          </div>
        </Container>
      </section>
    </article>
  );
}
