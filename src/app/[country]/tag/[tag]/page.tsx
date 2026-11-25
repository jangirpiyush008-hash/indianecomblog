import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { COUNTRY_CODES, urls } from "@/config/countries";
import { edition } from "@/lib/edition";
import { articlesByTag, slugify, tagsFor } from "@/lib/content";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return COUNTRY_CODES.flatMap((country) => tagsFor(country).map((t) => ({ country, tag: slugify(t) })));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; tag: string }> }): Promise<Metadata> {
  const { country, tag } = await params;
  const e = edition(country);
  const name = tagsFor(e.code).find((t) => slugify(t) === tag);
  if (!name) return {};
  const n = articlesByTag(e.code, tag).length;
  return {
    title: `${name} — ${e.country.name}`,
    description: `${name}: ${e.dict.ui.explainers}`,
    alternates: { canonical: urls.tag(e.code, tag) },
    robots: n < 2 ? { index: false, follow: true } : undefined,
  };
}

export default async function TagPage({ params }: { params: Promise<{ country: string; tag: string }> }) {
  const { country, tag } = await params;
  const e = edition(country);
  const name = tagsFor(e.code).find((t) => slugify(t) === tag);
  if (!name) notFound();
  const articles = articlesByTag(e.code, tag);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemListSchema(name, articles.map((a) => ({ name: a.title, url: a.url }))))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema([{ name: e.country.name, url: urls.home(e.code) }, { name, url: urls.tag(e.code, tag) }]))} />
      <section className="pt-14 pb-10 border-b border-line">
        <Container size="xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">{e.country.flag} {e.dict.ui.topics}</span>
          <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mt-4">{name}</h1>
        </Container>
      </section>
      <section className="py-14">
        <Container size="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
          <div className="mt-14 pt-6 border-t border-line flex flex-wrap gap-2">
            {tagsFor(e.code).filter((t) => slugify(t) !== tag).slice(0, 16).map((t) => (
              <Link key={t} href={urls.tag(e.code, slugify(t))} className="px-3 py-1.5 border border-line text-sm hover:border-ink">{t}</Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
