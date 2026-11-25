import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { allTags, articlesByTag, slugify } from "@/lib/content";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return allTags().map((t) => ({ tag: slugify(t) }));
}

const tagName = (slug: string) => allTags().find((t) => slugify(t) === slug);

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const name = tagName(tag);
  if (!name) return {};
  const n = articlesByTag(tag).length;
  return {
    title: `${name} — ${n} ${n === 1 ? "story" : "stories"}`,
    description: `Articles about ${name}: explainers, guides and comparisons with sources.`,
    alternates: { canonical: `/tag/${tag}` },
    // Single-story tag pages are thin; let them be crawled but not indexed.
    robots: n < 2 ? { index: false, follow: true } : undefined,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const name = tagName(tag);
  if (!name) notFound();
  const articles = articlesByTag(tag);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemListSchema(name, articles.map((a) => ({ name: a.title, url: a.url }))))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema([{ name: "Home", url: "/" }, { name, url: `/tag/${tag}` }]))}
      />
      <section className="pt-16 pb-12 border-b border-line">
        <Container size="xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Topic</span>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] mt-4 max-w-4xl">{name}</h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            {articles.length} {articles.length === 1 ? "story" : "stories"} about {name}.
          </p>
        </Container>
      </section>
      <section className="py-16">
        <Container size="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          <div className="mt-14 pt-6 border-t border-line flex flex-wrap gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mr-2 self-center">More topics:</span>
            {allTags()
              .filter((t) => slugify(t) !== tag)
              .slice(0, 16)
              .map((t) => (
                <Link key={t} href={`/tag/${slugify(t)}`} className="px-3 py-1.5 border border-line text-sm hover:border-ink">
                  {t}
                </Link>
              ))}
          </div>
        </Container>
      </section>
    </>
  );
}
