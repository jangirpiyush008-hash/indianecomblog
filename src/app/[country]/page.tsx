import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TickerBar } from "@/components/layout/TickerBar";
import { ArticleCard, ArticleHCard, FeatureArticleCard } from "@/components/editorial/ArticleCard";
import { ProductCard } from "@/components/commerce/ProductCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Headlines, SearchChips } from "@/components/edition/Views";
import { edition } from "@/lib/edition";
import { articlesFor, featuredArticles, productsFor } from "@/lib/content";
import { getLiveTrends, getTrendingSearches } from "@/lib/trends/live";
import { urls } from "@/config/countries";
import { brand } from "@/config/brand";
import { sectionMetadata } from "@/lib/seo/meta";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { formatRelativeTime } from "@/lib/utils";

export const revalidate = 1800;

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const e = edition((await params).country);
  return sectionMetadata(e.code, "home", `${brand.name} ${e.country.name} — ${e.dict.home.h1(e.country.phrase)}`, e.dict.home.intro(e.country.phrase));
}

export default async function EditionHome({ params }: { params: Promise<{ country: string }> }) {
  const e = edition((await params).country);
  const [trends, searches] = await Promise.all([getLiveTrends(e.code, 40), getTrendingSearches(e.code, 12)]);
  const articles = articlesFor(e.code);
  const featured = featuredArticles(e.code);
  const hero = featured[0] ?? articles[0];
  const side = articles.filter((a) => a.id !== hero?.id).slice(0, 3);
  const products = [...productsFor(e.code)].sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0)).slice(0, 4);
  const byDesk = e.country.deskPriority.map((desk) => ({ desk, items: trends.filter((t) => t.category === desk).slice(0, 3) })).filter((x) => x.items.length);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema())} />
      <TickerBar
        label={e.dict.ui.latest}
        items={[
          ...articles.slice(0, 2).map((a) => ({ label: a.title, href: a.url })),
          ...trends.slice(0, 6).map((t) => ({ label: t.topic, href: t.sources?.[0]?.url ?? urls.section(e.code, "trending"), external: true })),
        ]}
      />

      <section className="pt-10 md:pt-14 pb-14 border-b border-line">
        <Container size="xl">
          <div className="mb-10 border-b border-line pb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              {e.country.flag} {e.dict.home.eyebrow}
            </span>
            <h1 className="font-editorial text-3xl md:text-5xl font-semibold text-ink mt-2 leading-tight">{e.dict.home.h1(e.country.phrase)}</h1>
            <p className="mt-3 text-ink-60 max-w-2xl">{e.dict.home.intro(e.country.phrase)}</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-8">
              {hero ? (
                <FeatureArticleCard article={hero} />
              ) : (
                <p className="text-ink-60">{e.dict.ui.noStoriesYet}</p>
              )}
            </div>
            <aside className="lg:col-span-4 space-y-8">
              {side.length > 0 && (
                <div className="border-b border-line pb-6">
                  {side.map((a) => (
                    <div key={a.id} className="mb-6 last:mb-0"><ArticleHCard article={a} /></div>
                  ))}
                </div>
              )}
              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">{e.dict.ui.trendingSearches}</h2>
                {searches.length ? <SearchChips e={e} searches={searches.slice(0, 10)} /> : <p className="text-sm text-ink-60">{e.dict.ui.headlinesUnavailable}</p>}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-ink text-cream">
        <Container size="xl">
          <div className="flex items-end justify-between border-b border-cream/20 pb-5 mb-10 gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">{e.dict.ui.trendingNow}</span>
              <h2 className="font-editorial text-3xl md:text-5xl font-semibold mt-2">{e.dict.trending.h1(e.country.phrase)}</h2>
            </div>
            <Link href={urls.section(e.code, "trending")} className="hidden md:inline text-sm text-cream/80 hover:text-accent whitespace-nowrap">{e.dict.ui.seeAll} →</Link>
          </div>
          {byDesk.length === 0 && <p className="text-cream/60">{e.dict.ui.headlinesUnavailable}</p>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {byDesk.map(({ desk, items }) => (
              <div key={desk}>
                <Link href={urls.section(e.code, desk)} className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold hover:underline">
                  {e.dict.sections[desk]} →
                </Link>
                <ul className="mt-3 divide-y divide-cream/10">
                  {items.map((t) => (
                    <li key={t.id} className="py-3">
                      <a href={t.sources?.[0]?.url} target="_blank" rel="noopener noreferrer" className="font-editorial text-lg leading-snug hover:text-accent">{t.topic}</a>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-cream/50">
                        {t.sources?.[0]?.name} · {formatRelativeTime(t.discoveredAt, e.country.locale)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {products.length > 0 && (
        <section className="py-16 border-b border-line">
          <Container size="xl">
            <SectionHeading eyebrow={e.dict.sections.deals} title={e.dict.ui.dealsH1(e.country.phrase)} seeMoreHref={urls.section(e.code, "deals")} seeMoreLabel={e.dict.ui.seeAll} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => <ProductCard key={p.id} product={p} placement="home" />)}
            </div>
          </Container>
        </section>
      )}

      {articles.length > 0 && (
        <section className="py-16 border-b border-line">
          <Container size="xl">
            <SectionHeading eyebrow={e.dict.ui.latest} title={e.dict.ui.fromOurDesks} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.slice(0, 9).map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading eyebrow={e.dict.trending.headlinesTitle} title={e.dict.ui.inTheNews} seeMoreHref={urls.section(e.code, "trending")} seeMoreLabel={e.dict.ui.moreHeadlines} />
          <Headlines e={e} trends={trends.slice(0, 10)} />
        </Container>
      </section>

      <section className="py-20 bg-accent text-white">
        <Container size="sm">
          <div className="text-center">
            <h2 className="font-editorial text-4xl md:text-5xl font-semibold leading-tight mb-4">{e.dict.ui.newsletterTitle}</h2>
            <p className="text-white/90 mb-8">{e.dict.ui.newsletterText}</p>
            <NewsletterForm source={`home:${e.code}`} variant="accent" className="max-w-md mx-auto" />
          </div>
        </Container>
      </section>
    </>
  );
}
