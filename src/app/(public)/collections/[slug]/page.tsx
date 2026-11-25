import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { collections, getCollection } from "@/lib/content";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return { title: c.title, description: c.description, alternates: { canonical: `/collections/${c.slug}` } };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(itemListSchema(c.title, c.articles.map((a) => ({ name: a.title, url: a.url }))))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: c.title, url: `/collections/${c.slug}` },
          ])
        )}
      />
      <section className="pt-16 pb-12 border-b border-line">
        <Container size="xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Collection</span>
          <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mt-4 mb-5 max-w-3xl">{c.title}</h1>
          <p className="text-lg text-ink-60 max-w-2xl">{c.description}</p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40">
            {c.articles.length} {c.articles.length === 1 ? "story" : "stories"}
          </p>
        </Container>
      </section>
      <section className="py-16">
        <Container size="xl">
          {c.articles.length === 0 ? (
            <p className="text-ink-60">No stories here yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {c.articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
          <div className="mt-16 pt-8 border-t border-line flex flex-wrap gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mr-2 self-center">Other collections:</span>
            {collections
              .filter((x) => x.slug !== c.slug)
              .map((x) => (
                <Link key={x.slug} href={`/collections/${x.slug}`} className="px-4 py-2 border border-line hover:border-ink text-sm">
                  {x.title}
                </Link>
              ))}
          </div>
        </Container>
      </section>
    </>
  );
}
