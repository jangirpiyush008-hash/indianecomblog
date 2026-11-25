import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge, CategoryTag } from "@/components/ui/Badge";
import { TickerBar } from "@/components/layout/TickerBar";
import {
  FeatureArticleCard,
  ArticleCard,
  ArticleListCard,
  ArticleHCard,
} from "@/components/editorial/ArticleCard";
import { ProductCard } from "@/components/commerce/ProductCard";
import {
  allArticles,
  allProducts,
  articlesByCategory,
  featuredArticles,
  allTags,
  slugify,
} from "@/lib/content";
import { getLiveTrends } from "@/lib/trends/live";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/seo/schema";

export const revalidate = 1800;
import { brand } from "@/config/brand";
import { formatRelativeTime } from "@/lib/utils";
import { ClientDate } from "@/components/ui/ClientDate";

export default async function HomePage() {
  const featured = featuredArticles();
  const hero = featured[0] ?? allArticles[0];
  const subHero = [...featured.slice(1), ...allArticles].filter((a, i, arr) => a.id !== hero.id && arr.findIndex((x) => x.id === a.id) === i).slice(0, 3);
  const trends = await getLiveTrends(8);
  const topics = allTags().slice(0, 10);
  const tech = articlesByCategory("technology", 4);
  const ai = articlesByCategory("ai-tools", 4);
  const money = articlesByCategory("money", 4);
  const lifestyle = articlesByCategory("lifestyle", 4);
  const entertainment = articlesByCategory("entertainment", 4);
  const travel = articlesByCategory("travel", 4);
  const topDeals = allProducts.slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema())} />
      <TickerBar
        items={[
          ...allArticles.slice(0, 3).map((a) => ({ label: a.title, href: a.url })),
          ...trends.slice(0, 5).map((t) => ({ label: t.topic, href: t.sources?.[0]?.url ?? "/trending", external: true })),
        ]}
      />

      {/* ================== HERO ================== */}
      <section className="pt-10 md:pt-16 pb-16 border-b border-line">
        <Container size="xl">
          <div className="mb-10 flex items-end justify-between border-b border-line pb-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-8 bg-accent" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
                  Today's edition
                </span>
              </div>
              <h1 className="font-editorial text-2xl md:text-3xl font-semibold text-ink">
                {brand.name}: what&apos;s trending in India, explained
              </h1>
            </div>
            <ClientDate className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40" />

          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-8">
              <FeatureArticleCard article={hero} />
            </div>
            <aside className="lg:col-span-4 space-y-8">
              <div className="border-b border-line pb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-5 block">
                  Also leading today
                </span>
                {subHero.map((a) => (
                  <div key={a.id} className="mb-6 last:mb-0">
                    <ArticleHCard article={a} />
                  </div>
                ))}
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-5 block">
                  Popular topics
                </span>
                <div className="flex flex-wrap gap-2">
                  {topics.map((s) => (
                    <Link
                      key={s}
                      href={`/tag/${slugify(s)}`}
                      className="px-3 py-1.5 border border-line bg-paper text-sm text-ink hover:border-ink hover:bg-cream-100 transition"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ================== TRENDING NOW ================== */}
      <section className="py-20 bg-ink text-cream">
        <Container size="xl">
          <div className="flex items-end justify-between border-b border-cream/20 pb-5 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-accent" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
                  Trend Radar · Google News India
                </span>
              </div>
              <h2 className="font-editorial text-4xl md:text-5xl font-semibold text-cream leading-tight">
                What India is talking about right now
              </h2>
            </div>
            <Link
              href="/trending"
              className="hidden md:inline-flex items-center gap-2 text-sm text-cream/80 hover:text-accent"
            >
              See full radar <span>→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {trends.length === 0 && (
              <p className="text-cream/60">Live headlines are temporarily unavailable.</p>
            )}
            {trends.map((t, i) => (
              <div key={t.id} className="group">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-editorial text-5xl font-semibold text-cream/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <time dateTime={t.discoveredAt} className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
                    {formatRelativeTime(t.discoveredAt)}
                  </time>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                  {t.categoryName}
                </div>
                <h3 className="font-editorial text-xl font-semibold text-cream leading-tight mb-2">
                  {t.sources?.[0] ? (
                    <a href={t.sources[0].url} target="_blank" rel="noopener noreferrer" className="group-hover:text-accent transition">
                      {t.topic}
                    </a>
                  ) : (
                    t.topic
                  )}
                </h3>
                {t.sources?.[0] && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-cream/50">{t.sources[0].name}</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================== DEALS STRIP ================== */}
      <section className="py-20 border-b border-line">
        <Container size="xl">
          <SectionHeading
            eyebrow="Deals"
            title="Prices checked on the brand's own store"
            description="Each card shows when we last checked the price. Prices change — the store's price at checkout is the one that counts."
            seeMoreHref="/deals"
            seeMoreLabel="See all deals"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDeals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* ================== TECHNOLOGY ================== */}
      <CategorySection
        slug="technology"
        name="Technology"
        eyebrow="The Tech Desk"
        headline="Phones, laptops, and the hardware that matters in India"
        accent="#2563EB"
        articles={tech}
      />

      {/* ================== AI TOOLS ================== */}
      <section className="py-20 border-b border-line bg-cream-100">
        <Container size="xl">
          <SectionHeading
            eyebrow="AI Tools · The Working Edition"
            title={<>AI tools, <em className="text-accent-dark">explained for India</em></>}
            description="Prices in rupees, offers checked against the provider's own pages."
            seeMoreHref="/ai-tools"
          />
          <div className="grid lg:grid-cols-3 gap-10">
            {ai.map((a, i) => (
              <ArticleCard
                key={a.id}
                article={a}
                imageRatio={i === 0 ? "landscape" : "landscape"}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ================== MONEY ================== */}
      <section className="py-20 border-b border-line">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-7">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-8 bg-accent" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
                    The Money Desk
                  </span>
                </div>
                <h2 className="font-editorial text-4xl md:text-5xl font-semibold leading-tight">
                  Personal finance, decoded for Indian wallets
                </h2>
              </div>
              {money[0] && <ArticleCard article={money[0]} imageRatio="landscape" />}
            </div>
            <div className="lg:col-span-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 pb-4 border-b border-line mb-2">
                More from Money
              </h3>
              {money.slice(1).map((a, i) => (
                <ArticleListCard key={a.id} article={a} number={i + 1} />
              ))}
              <Link
                href="/money"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent"
              >
                All Money stories <span>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================== SHOPPING / PRODUCT COMPARISON CTA ================== */}
      <section className="py-20 border-b border-line bg-ink text-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center relative">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-accent" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
                  Smart Shopping
                </span>
              </div>
              <h2 className="font-editorial text-4xl md:text-6xl font-semibold leading-[0.95] mb-6">
                Never buy the wrong thing again.
              </h2>
              <p className="text-lg text-cream/80 leading-relaxed max-w-lg mb-8">
                Side-by-side comparisons built from manufacturer specs and prices checked on the store — with the date we checked, every time.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/product-comparisons"
                  className="px-7 py-4 bg-accent hover:bg-accent-dark text-white font-medium transition"
                >
                  Compare products →
                </Link>
                <Link
                  href="/buying-guides"
                  className="px-7 py-4 border border-cream/40 text-cream hover:bg-cream/5 font-medium transition"
                >
                  Read buying guides
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {allArticles
                  .filter((a) => a.productSlugs?.length)
                  .slice(0, 4)
                  .map((a) => (
                  <Link
                    key={a.id}
                    href={a.url}
                    className="group p-6 border border-cream/20 hover:border-accent transition bg-cream/5"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50 mb-2">
                      {a.categoryName}
                    </div>
                    <div className="font-editorial text-lg md:text-xl font-semibold text-cream leading-snug">
                      {a.title}
                    </div>
                    <div className="mt-4 text-sm text-cream/60 group-hover:text-accent">
                      See picks →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================== LIFESTYLE + ENTERTAINMENT SPLIT ================== */}
      <section className="py-20 border-b border-line">
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <SectionHeading
                eyebrow="Lifestyle"
                title="Fashion, beauty & how we live"
                seeMoreHref="/lifestyle"
                size="sm"
              />
              <div className="grid gap-6">
                {lifestyle[0] && <ArticleCard article={lifestyle[0]} imageRatio="landscape" />}
                {lifestyle.slice(1, 3).map((a) => (
                  <ArticleHCard key={a.id} article={a} />
                ))}
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Entertainment & OTT"
                title="Series, cinema, what to stream"
                seeMoreHref="/entertainment"
                size="sm"
              />
              <div className="grid gap-6">
                {entertainment[0] && <ArticleCard article={entertainment[0]} imageRatio="landscape" />}
                {entertainment.slice(1, 3).map((a) => (
                  <ArticleHCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================== TRAVEL ================== */}
      <CategorySection
        slug="travel"
        name="Travel"
        eyebrow="Travel Desk"
        headline="Where India is going next"
        accent="#0891B2"
        articles={travel}
      />

      {/* ================== MOST READ ================== */}
      <section className="py-20 border-b border-line bg-cream-100">
        <Container size="xl">
          <SectionHeading
            eyebrow="Latest"
            title="Every story, newest first"
            seeMoreHref="/sitemap"
          />
          <div className="grid md:grid-cols-2 gap-x-12">
            {allArticles.slice(0, 10).map((a, i) => (
              <ArticleListCard key={a.id} article={a} number={i + 1} />
            ))}
          </div>
        </Container>
      </section>

      {/* ================== NEWSLETTER CTA ================== */}
      <section className="py-24 bg-accent text-white">
        <Container size="sm">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-white/60" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold">
                The Daily Digest
              </span>
              <div className="h-px w-8 bg-white/60" />
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl font-semibold leading-[0.95] mb-6">
              New stories, straight to your inbox
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-lg mx-auto">
              The explainers and price-checked picks from {brand.name}, when they publish. Free.
            </p>
            <NewsletterForm source="home" variant="accent" className="max-w-md mx-auto" />
            <p className="mt-4 text-xs text-white/70">
              No spam. Unsubscribe in one click.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

function CategorySection({
  slug,
  name,
  eyebrow,
  headline,
  accent,
  articles,
}: {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  accent: string;
  articles: ReturnType<typeof articlesByCategory>;
}) {
  if (articles.length === 0) return null;
  return (
    <section className="py-20 border-b border-line">
      <Container size="xl">
        <SectionHeading
          eyebrow={eyebrow}
          title={headline}
          seeMoreHref={`/${slug}`}
        />
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            {articles[0] && (
              <ArticleCard article={articles[0]} imageRatio="landscape" />
            )}
          </div>
          <div className="lg:col-span-5 space-y-0">
            {articles.slice(1).map((a) => (
              <ArticleHCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
