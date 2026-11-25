import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { trendingArticles } from "@/lib/content";
import { getLiveTrends } from "@/lib/trends/live";
import { categories } from "@/config/brand";
import { formatRelativeTime } from "@/lib/utils";
import { itemListSchema, jsonLd } from "@/lib/seo/schema";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Trending in India Today — News, Tech, Money & OTT",
  description:
    "What India is reading about right now across technology, AI, shopping, money, lifestyle, entertainment and travel — pulled from Google News India and linked to the original source.",
  alternates: { canonical: "/trending" },
};

const deskFilters = categories.filter((c) => c.slug !== "trending");

export default async function TrendingPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const all = await getLiveTrends(40);
  const active = deskFilters.find((c) => c.slug === cat)?.slug;
  const trends = active ? all.filter((t) => t.category === active) : all;
  const newest = all[0]?.discoveredAt;
  const explainers = trendingArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          itemListSchema(
            "Trending in India",
            explainers.map((a) => ({ name: a.title, url: a.url }))
          )
        )}
      />

      <section className="pt-16 pb-14 border-b border-line bg-ink text-cream">
        <Container size="xl">
          <div className="flex items-center gap-2 mb-5">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              Trend Radar
            </span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] mb-6 max-w-4xl">
            Trending in India right now
          </h1>
          <p className="text-lg md:text-xl text-cream/70 max-w-2xl leading-relaxed">
            The latest headlines across our seven desks, pulled from Google News India and refreshed every 30 minutes. Every item links to the original publisher.
          </p>
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
            <div className="border-t border-cream/20 pt-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50 mb-1">Headlines now</dt>
              <dd className="font-editorial text-3xl font-semibold">{all.length}</dd>
            </div>
            <div className="border-t border-cream/20 pt-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50 mb-1">Newest</dt>
              <dd className="font-editorial text-3xl font-semibold">{newest ? formatRelativeTime(newest) : "—"}</dd>
            </div>
            <div className="border-t border-cream/20 pt-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50 mb-1">Source</dt>
              <dd className="font-editorial text-3xl font-semibold">Google News</dd>
            </div>
          </dl>
        </Container>
      </section>

      <nav aria-label="Filter by desk" className="border-b border-line bg-paper sticky top-0 z-10">
        <Container size="xl">
          <div className="flex gap-2 py-4 overflow-x-auto">
            <Link
              href="/trending"
              className={`px-4 py-2 text-sm whitespace-nowrap transition ${!active ? "bg-ink text-cream" : "border border-line text-ink-60 hover:border-ink"}`}
            >
              All
            </Link>
            {deskFilters.map((c) => (
              <Link
                key={c.slug}
                href={`/trending?cat=${c.slug}`}
                className={`px-4 py-2 text-sm whitespace-nowrap transition ${active === c.slug ? "bg-ink text-cream" : "border border-line text-ink-60 hover:border-ink"}`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </Container>
      </nav>

      <section className="py-14 border-b border-line">
        <Container size="xl">
          <SectionHeading
            eyebrow={active ? `${deskFilters.find((c) => c.slug === active)?.name} desk` : "All desks"}
            title="Latest headlines"
          />
          {trends.length === 0 ? (
            <p className="py-10 text-ink-60">
              We couldn&apos;t load live headlines right now. Please try again in a few minutes.
            </p>
          ) : (
            <ol className="grid">
              {trends.map((t, i) => {
                const src = t.sources?.[0];
                return (
                  <li key={t.id} className="grid md:grid-cols-12 gap-3 md:gap-8 py-6 border-b border-line last:border-0 items-start">
                    <span className="md:col-span-1 font-editorial text-4xl font-semibold text-ink-40 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="md:col-span-2 flex md:flex-col gap-3 md:gap-1">
                      <Link href={`/${t.category}`} className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold hover:underline">
                        {t.categoryName}
                      </Link>
                      <time dateTime={t.discoveredAt} className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">
                        {formatRelativeTime(t.discoveredAt)}
                      </time>
                    </div>
                    <div className="md:col-span-9">
                      <h2 className="font-editorial text-xl md:text-2xl font-semibold text-ink leading-tight">
                        {src ? (
                          <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-dark transition">
                            {t.topic}
                          </a>
                        ) : (
                          t.topic
                        )}
                      </h2>
                      {t.summary && <p className="mt-2 text-ink-60 leading-relaxed">{t.summary}</p>}
                      {src && (
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">Source: {src.name}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </Container>
      </section>

      {explainers.length > 0 && (
        <section className="py-16 border-b border-line">
          <Container size="xl">
            <SectionHeading eyebrow="Explained" title="Our explainers on what's trending" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {explainers.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 bg-cream-100">
        <Container size="md">
          <div className="text-center">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold mb-6 max-w-2xl mx-auto">
              How this page works
            </h2>
            <p className="text-ink-60 leading-relaxed max-w-2xl mx-auto">
              We query Google News India for each desk and list the most recent headlines with their publisher. We don&apos;t rewrite or score these headlines here — when a topic deserves an explainer, we write one and link to our sources.
            </p>
            <Link href="/editorial-policy" className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-ink hover:text-accent">
              Read our editorial policy →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
