import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { guideArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { itemListSchema, jsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Buying Guides — Compared on Specs and Current Prices",
  description:
    "Buying guides for Indian shoppers: products compared on the manufacturer's published specs and prices checked on the store, with the date we checked.",
  alternates: { canonical: "/buying-guides" },
};

export default function BuyingGuidesPage() {
  const guides = guideArticles();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(itemListSchema("Buying guides", guides.map((g) => ({ name: g.title, url: g.url }))))}
      />
      <section className="pt-16 pb-12 border-b border-line">
        <Container size="xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Buying guides</span>
          <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mt-4 mb-5 max-w-3xl">Buying guides</h1>
          <p className="text-lg text-ink-60 max-w-2xl">
            Each guide says exactly how it was researched. Where we compare on published specs rather than hands-on testing, we say so at the top.
          </p>
        </Container>
      </section>
      <section className="py-14">
        <Container size="xl">
          <ul className="grid md:grid-cols-2 gap-8">
            {guides.map((g) => (
              <li key={g.id}>
                <Link href={g.url} className="group grid sm:grid-cols-5 gap-5 p-5 border border-line hover:border-ink bg-paper h-full">
                  <div className="relative sm:col-span-2 aspect-[4/3] bg-cream-100">
                    <Image src={g.heroImage} alt={g.heroImageAlt ?? g.title} fill sizes="300px" className="object-contain p-4" />
                  </div>
                  <div className="sm:col-span-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{g.categoryName}</span>
                    <h2 className="font-editorial text-xl font-semibold mt-2 group-hover:text-accent leading-snug">{g.title}</h2>
                    <p className="text-sm text-ink-60 mt-2 line-clamp-3">{g.excerpt}</p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">
                      {formatDate(g.updatedAt ?? g.publishedAt)} · {g.productSlugs?.length} products
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
