import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TickerBar } from "@/components/layout/TickerBar";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { EditionHero } from "@/components/edition/EditionHero";
import { HEROES, HOME_COPY } from "@/config/heroes";
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
  const h = HEROES[e.code];
  return sectionMetadata(e.code, "home", `${h.headline} | ${brand.name} ${e.country.name}`, h.intro);
}

export default async function EditionHome({ params }: { params: Promise<{ country: string }> }) {
  const e = edition((await params).country);
  const [trends, searches] = await Promise.all([getLiveTrends(e.code, 40), getTrendingSearches(e.code, 12)]);
  const articles = articlesFor(e.code);
  const featured = featuredArticles(e.code);
  const hero = HEROES[e.code];
  const copy = HOME_COPY[e.country.lang];
  const leading = [...featured, ...articles.filter((a) => !a.featured)].slice(0, 3);
  const deskSections = e.country.deskPriority
    .map((desk) => ({ desk, items: articles.filter((a) => a.category === desk) }))
    .filter((x) => x.items.length);
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

      <EditionHero
        hero={hero}
        flag={e.country.flag}
        eyebrow={e.dict.home.eyebrow}
        leadingLabel={copy.leading}
        photoCredit={copy.photo}
        leading={leading}
      />

      <section className="py-16 bg-ink text-cream">
        <Container size="xl">
          <div className="flex items-end justify-between border-b border-cream/20 pb-5 mb-10 gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">{e.dict.ui.trendingNow}</span>
              <h2 className="font-editorial text-3xl md:text-5xl font-semibold mt-2">{e.dict.trending.h1(e.country.phrase)}</h2>
            </div>
            <Link href={urls.section(e.code, "trending")} className="hidden md:inline text-sm text-cream/80 hover:text-accent whitespace-nowrap">{e.dict.ui.seeAll} →</Link>
          </div>
          {searches.length > 0 && (
            <div className="mb-12 text-ink">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 font-semibold mb-3">{e.dict.ui.trendingSearches}</h3>
              <SearchChips e={e} searches={searches.slice(0, 10)} />
            </div>
          )}
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

      {deskSections.map(({ desk, items }, i) => (
        <section key={desk} className={i % 2 ? "py-14 border-b border-line bg-cream-100" : "py-14 border-b border-line"}>
          <Container size="xl">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">{copy.stories(items.length)}</span>
                <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-ink mt-2 leading-tight">{e.dict.sections[desk]}</h2>
                <p className="mt-3 text-ink-60">{e.dict.deskTagline[desk]}</p>
                <Link href={urls.section(e.code, desk)} className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-ink hover:text-accent border-b border-ink hover:border-accent pb-0.5">
                  {copy.viewAll} →
                </Link>
              </div>
              <div className="lg:col-span-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.slice(0, 3).map((a) => <ArticleCard key={a.id} article={a} />)}
              </div>
            </div>
          </Container>
        </section>
      ))}

      {products.length > 0 && (
        <section className="py-16 border-b border-line">
          <Container size="xl">
            <SectionHeading eyebrow={e.dict.sections.shopping} title={copy.shopping} description={copy.shoppingText} seeMoreHref={urls.section(e.code, "shopping")} seeMoreLabel={copy.viewAll} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => <ProductCard key={p.id} product={p} placement="home" />)}
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
