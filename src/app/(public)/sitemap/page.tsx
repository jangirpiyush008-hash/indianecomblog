import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Every page on Fable, in one list.",
};

const sections = [
  {
    title: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "Trending", href: "/trending" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Technology", href: "/technology" },
      { label: "AI Tools", href: "/ai-tools" },
      { label: "Shopping", href: "/shopping" },
      { label: "Money", href: "/money" },
      { label: "Lifestyle", href: "/lifestyle" },
      { label: "Entertainment", href: "/entertainment" },
      { label: "Travel", href: "/travel" },
    ],
  },
  {
    title: "Shopping",
    links: [
      { label: "Shopping Hub", href: "/shopping" },
      { label: "Today's Deals", href: "/deals" },
      { label: "Trending Products", href: "/trending-products" },
      { label: "Buying Guides", href: "/buying-guides" },
      { label: "Product Comparisons", href: "/product-comparisons" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "2026 India Buyer's Almanac", href: "/collections/buyers-almanac-2026" },
      { label: "AI Tools That Actually Work", href: "/collections/ai-tools-india" },
      { label: "Money Playbooks for 2026", href: "/collections/money-playbooks-2026" },
      { label: "Weekend Getaways", href: "/collections/weekend-getaways" },
    ],
  },
  {
    title: "About Fable",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Authors", href: "/authors" },
      { label: "Contact", href: "/contact" },
      { label: "Advertise", href: "/advertise" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Editorial Policy", href: "/editorial-policy" },
      { label: "Corrections Policy", href: "/corrections-policy" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <section className="pt-16 pb-16 border-b border-line">
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Sitemap</span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            Every page on Fable.
          </h1>
          <p className="mt-6 text-lg text-ink-60">
            An HTML sitemap for humans. The XML version for search engines lives at <Link href="/sitemap.xml" className="underline hover:text-accent">/sitemap.xml</Link>.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container size="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold pb-3 border-b border-line mb-5">
                  {s.title}
                </h2>
                <ul className="space-y-3">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group flex items-center gap-2 text-ink hover:text-accent transition">
                        <span className="text-ink-40 group-hover:text-accent">→</span>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
