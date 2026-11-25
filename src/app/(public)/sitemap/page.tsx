import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { brand } from "@/config/brand";
import { articlesFor } from "@/lib/content";
import { ALL_COUNTRIES, DESKS, urls } from "@/config/countries";
import { DICTIONARIES } from "@/config/dictionaries";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Every page and article on the site, in one list.",
  alternates: { canonical: "/sitemap" },
};

const editionSections = ALL_COUNTRIES.map((c) => {
  const d = DICTIONARIES[c.lang];
  return {
    title: `${c.flag} ${c.name}`,
    links: [
      { label: d.home.eyebrow, href: urls.home(c.code) },
      { label: d.sections.trending, href: urls.section(c.code, "trending") },
      ...DESKS.map((k) => ({ label: d.sections[k], href: urls.section(c.code, k) })),
      { label: d.sections.deals, href: urls.section(c.code, "deals") },
      ...articlesFor(c.code).map((a) => ({ label: a.title, href: a.url })),
    ],
  };
});

const sections = [
  ...editionSections,
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Authors", href: "/authors" },
      { label: "Contact", href: "/contact" },
      { label: "Advertise", href: "/advertise" },
      { label: "Newsletter", href: "/newsletter" },
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
            Every page on {brand.name}
          </h1>
          <p className="mt-6 text-lg text-ink-60">
            An HTML sitemap for humans. The XML version for search engines lives at <a href="/sitemap.xml" className="underline hover:text-accent">/sitemap.xml</a>.
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
