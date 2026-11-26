import Link from "next/link";
import Image from "next/image";
import { Search as SearchIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard, ArticleListCard, FeatureArticleCard } from "@/components/editorial/ArticleCard";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ItemListTracker } from "@/components/analytics/ItemListTracker";
import { SearchTracker } from "@/components/analytics/SearchTracker";
import { toAnalyticsItem } from "@/lib/analytics/items";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { urls, DESKS, type Desk } from "@/config/countries";
import type { Edition } from "@/lib/edition";
import type { Article, Product, Trend } from "@/types/content";
import type { TrendingSearch } from "@/lib/trends/live";
import { articlesByDesk, articlesFor, guideArticles, productsFor, productCategories, slugify, tagsFor } from "@/lib/content";
import { formatRelativeTime } from "@/lib/utils";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/seo/schema";

// ───────────────────────────────────────────── shared pieces

export function PageHero({ eyebrow, title, intro, dark = false, accent }: { eyebrow: string; title: string; intro?: string; dark?: boolean; accent?: string }) {
  return (
    <section className={`pt-14 pb-12 border-b border-line ${dark ? "bg-ink text-cream" : ""}`} style={accent ? { background: `linear-gradient(135deg, ${accent}0d 0%, var(--cream) 100%)` } : undefined}>
      <Container size="xl">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: accent ?? "var(--accent)" }}>
          {eyebrow}
        </span>
        <h1 className="font-editorial text-4xl md:text-6xl font-semibold leading-[0.98] mt-4 max-w-4xl">{title}</h1>
        {intro && <p className={`mt-5 text-lg md:text-xl max-w-2xl leading-relaxed ${dark ? "text-cream/70" : "text-ink-60"}`}>{intro}</p>}
      </Container>
    </section>
  );
}

export function Headlines({ e, trends, numbered = true }: { e: Edition; trends: Trend[]; numbered?: boolean }) {
  if (!trends.length) return <p className="py-8 text-ink-60">{e.dict.ui.headlinesUnavailable}</p>;
  return (
    <ol>
      {trends.map((t, i) => {
        const src = t.sources?.[0];
        return (
          <li key={t.id} className="grid md:grid-cols-12 gap-2 md:gap-8 py-5 border-b border-line last:border-0 items-start">
            {numbered && <span className="hidden md:block md:col-span-1 font-editorial text-3xl font-semibold text-ink-40 leading-none">{String(i + 1).padStart(2, "0")}</span>}
            <div className={`${numbered ? "md:col-span-2" : "md:col-span-3"} flex md:flex-col gap-3 md:gap-1`}>
              {t.category !== "trending" ? (
                <Link href={urls.section(e.code, t.category)} className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold hover:underline">
                  {t.categoryName}
                </Link>
              ) : (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">{t.categoryName}</span>
              )}
              <time dateTime={t.discoveredAt} className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">
                {formatRelativeTime(t.discoveredAt, e.country.locale)}
              </time>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-editorial text-lg md:text-xl font-semibold leading-snug">
                {src ? (
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-dark">{t.topic}</a>
                ) : (
                  t.topic
                )}
              </h3>
              {src && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">{e.dict.ui.source}: {src.name}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function SearchChips({ e, searches }: { e: Edition; searches: TrendingSearch[] }) {
  if (!searches.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {searches.map((s) => (
        <li key={s.term}>
          <a
            href={s.newsUrl ?? `https://www.google.com/search?q=${encodeURIComponent(s.term)}&gl=${e.country.iso}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-line bg-paper text-sm hover:border-ink"
            title={s.newsTitle}
          >
            {s.term}
            {s.traffic && <span className="font-mono text-[10px] text-ink-40">{s.traffic}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

function NewsletterBox({ e, source }: { e: Edition; source: string }) {
  return (
    <div className="p-8 bg-ink text-cream">
      <p className="font-editorial text-2xl font-semibold mb-2">{e.dict.ui.newsletterTitle}</p>
      <p className="text-cream/70 mb-5 text-sm">{e.dict.ui.newsletterText}</p>
      <NewsletterForm source={source} variant="dark" />
    </div>
  );
}

function crumbs(e: Edition, name: string, path: string) {
  return jsonLd(breadcrumbSchema([{ name: `${e.country.name}`, url: urls.home(e.code) }, { name, url: path }]));
}

// ───────────────────────────────────────────── Trending

export function TrendingView({ e, trends, searches, active }: { e: Edition; trends: Trend[]; searches: TrendingSearch[]; active?: Desk }) {
  const list = active ? trends.filter((t) => t.category === active) : trends;
  const explainers = articlesFor(e.code).filter((a) => a.trending || a.featured).slice(0, 6);
  const base = urls.section(e.code, "trending");
  const chip = (on: boolean) => `px-4 py-2 text-sm whitespace-nowrap transition ${on ? "bg-ink text-cream" : "border border-line text-ink-60 hover:border-ink"}`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={crumbs(e, e.dict.sections.trending, base)} />
      <PageHero dark eyebrow={`${e.country.flag} ${e.dict.sections.trending}`} title={e.dict.trending.h1(e.country.phrase)} intro={e.dict.trending.intro(e.country.phrase)} />
      {searches.length > 0 && (
        <section className="py-10 border-b border-line">
          <Container size="xl">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">{e.dict.trending.searchesTitle}</h2>
            <SearchChips e={e} searches={searches} />
          </Container>
        </section>
      )}
      <nav aria-label={e.dict.ui.allDesks} className="border-b border-line bg-paper">
        <Container size="xl">
          <div className="flex gap-2 py-4 overflow-x-auto">
            <Link href={base} className={chip(!active)}>{e.dict.ui.allDesks}</Link>
            {e.country.deskPriority.map((d) => (
              <Link key={d} href={`${base}?desk=${d}`} className={chip(active === d)}>{e.dict.sections[d]}</Link>
            ))}
          </div>
        </Container>
      </nav>
      <section className="py-12 border-b border-line">
        <Container size="xl">
          <SectionHeading eyebrow={active ? e.dict.sections[active] : e.dict.ui.allDesks} title={e.dict.trending.headlinesTitle} />
          <Headlines e={e} trends={list} />
        </Container>
      </section>
      {explainers.length > 0 && (
        <section className="py-14 border-b border-line">
          <Container size="xl">
            <SectionHeading eyebrow={e.dict.ui.explainers} title={e.dict.ui.fromOurDesks} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {explainers.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
          </Container>
        </section>
      )}
      <section className="py-14 bg-cream-100">
        <Container size="md">
          <p className="text-ink-60 leading-relaxed">{e.dict.trending.how}</p>
        </Container>
      </section>
    </>
  );
}

// ───────────────────────────────────────────── Desk (category)

export function DeskView({ e, desk, headlines }: { e: Edition; desk: Desk; headlines: Trend[] }) {
  const articles = articlesByDesk(e.code, desk);
  const [hero, ...rest] = articles;
  const path = urls.section(e.code, desk);
  const tags = [...new Set(articles.flatMap((a) => a.tags ?? []))];
  const products = productsFor(e.code).filter((p) => articles.some((a) => a.productSlugs?.includes(p.slug))).slice(0, 4);
  const others = articlesFor(e.code).filter((a) => a.category !== desk).slice(0, 5);
  const name = e.dict.sections[desk];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={crumbs(e, name, path)} />
      {articles.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemListSchema(name, articles.map((a) => ({ name: a.title, url: a.url }))))} />
      )}
      <PageHero eyebrow={`${e.country.flag} ${e.country.name}`} title={name} intro={e.dict.deskTagline[desk]} accent={articles[0]?.categoryAccent} />
      {tags.length > 0 && (
        <Container size="xl">
          <div className="py-5 flex flex-wrap gap-x-5 gap-y-2 border-b border-line">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40">{e.dict.ui.topics}:</span>
            {tags.map((t) => (
              <Link key={t} href={urls.tag(e.code, slugify(t))} className="text-sm hover:text-accent">{t}</Link>
            ))}
          </div>
        </Container>
      )}
      <section className="py-14 border-b border-line">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-8">
              {hero ? <FeatureArticleCard article={hero} /> : <p className="text-lg text-ink-60">{e.dict.ui.deskEmpty(name)}</p>}
            </div>
            <aside className="lg:col-span-4">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 pb-3 border-b border-line">{e.dict.ui.inTheNews}</h2>
              <Headlines e={e} trends={headlines} numbered={false} />
              <Link href={`${urls.section(e.code, "trending")}?desk=${desk}`} className="mt-4 inline-block text-sm font-medium hover:text-accent">
                {e.dict.ui.moreHeadlines} →
              </Link>
            </aside>
          </div>
        </Container>
      </section>
      {rest.length > 0 && (
        <section className="py-14 border-b border-line">
          <Container size="xl">
            <SectionHeading eyebrow={e.dict.ui.latest} title={name} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {rest.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
          </Container>
        </section>
      )}
      {products.length > 0 && (
        <section className="py-14 border-b border-line bg-cream-100">
          <Container size="xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => <ProductCard key={p.id} product={p} placement={`desk:${desk}`} />)}
            </div>
          </Container>
        </section>
      )}
      <section className="py-14">
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              {others.length > 0 && (
                <>
                  <SectionHeading eyebrow={e.dict.ui.fromOurDesks} title={e.dict.ui.keepReading} size="sm" />
                  {others.map((a, i) => <ArticleListCard key={a.id} article={a} number={i + 1} />)}
                </>
              )}
            </div>
            <NewsletterBox e={e} source={`desk:${e.code}:${desk}`} />
          </div>
        </Container>
      </section>
    </>
  );
}

// ───────────────────────────────────────────── Shopping, deals, guides

function ProductGrid({ products, placement }: { products: Product[]; placement: string }) {
  return (
    <ItemListTracker listId={placement} listName={placement} items={products.map(toAnalyticsItem)}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => <ProductCard key={p.id} product={p} placement={placement} />)}
      </div>
    </ItemListTracker>
  );
}

export function ShoppingView({ e }: { e: Edition }) {
  const guides = guideArticles(e.code);
  const guideIds = new Set(guides.map((g) => g.id));
  const explainers = articlesByDesk(e.code, "shopping").filter((a) => !guideIds.has(a.id));
  const products = productsFor(e.code);
  const top = [...products].sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0)).slice(0, 4);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={crumbs(e, e.dict.sections.shopping, urls.section(e.code, "shopping"))} />
      <PageHero dark eyebrow={`${e.country.flag} ${e.dict.sections.shopping}`} title={e.dict.ui.shoppingH1(e.country.phrase)} intro={e.dict.ui.shoppingIntro} />
      {guides.length > 0 && (
        <section className="py-14 border-b border-line">
          <Container size="xl">
            <SectionHeading eyebrow={e.dict.sections.guides} title={e.dict.sections.guides} seeMoreHref={urls.section(e.code, "guides")} seeMoreLabel={e.dict.ui.seeAll} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {guides.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
          </Container>
        </section>
      )}
      {explainers.length > 0 && (
        <section className="py-14 border-b border-line">
          <Container size="xl">
            <SectionHeading eyebrow={e.dict.sections.shopping} title={e.dict.ui.explainers} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {explainers.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
          </Container>
        </section>
      )}
      <section className="py-14 bg-cream-100">
        <Container size="xl">
          <SectionHeading eyebrow={e.dict.sections.deals} title={e.dict.ui.dealsH1(e.country.phrase)} seeMoreHref={urls.section(e.code, "deals")} seeMoreLabel={e.dict.ui.seeAll} />
          {top.length ? <ProductGrid products={top} placement="shopping-hub" /> : <p className="text-ink-60 max-w-2xl">{e.dict.ui.dealsSoon}</p>}
        </Container>
      </section>
    </>
  );
}

export function DealsView({ e, type }: { e: Edition; type?: string }) {
  const cats = productCategories(e.code);
  const active = cats.find((c) => slugify(c) === type);
  const all = productsFor(e.code);
  const list = [...all].filter((p) => !active || p.category === active).sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
  const base = urls.section(e.code, "deals");
  const chip = (on: boolean) => `px-4 py-2 text-sm whitespace-nowrap ${on ? "bg-ink text-cream" : "border border-line hover:border-ink"}`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={crumbs(e, e.dict.sections.deals, base)} />
      <PageHero eyebrow={`${e.country.flag} ${e.dict.sections.deals}`} title={e.dict.ui.dealsH1(e.country.phrase)} intro={all.length ? e.dict.ui.shoppingIntro : undefined} />
      {all.length === 0 ? (
        <section className="py-16">
          <Container size="md">
            <p className="text-lg text-ink-60 leading-relaxed">{e.dict.ui.dealsSoon}</p>
          </Container>
        </section>
      ) : (
        <>
          <nav className="border-b border-line">
            <Container size="xl">
              <div className="flex gap-2 py-4 overflow-x-auto">
                <Link href={base} className={chip(!active)}>{e.dict.ui.allDesks} ({all.length})</Link>
                {cats.map((c) => (
                  <Link key={c} href={`${base}?type=${slugify(c)}`} className={chip(active === c)}>{c}</Link>
                ))}
              </div>
            </Container>
          </nav>
          <section className="py-14">
            <Container size="xl">
              <h2 className="sr-only">{active ?? e.dict.sections.deals}</h2>
              <ProductGrid products={list} placement="deals" />
              <p className="mt-10 text-sm text-ink-60 max-w-2xl">
                {e.dict.ui.affiliateNote} <Link href="/affiliate-disclosure" className="underline">{e.dict.ui.howWeMakeMoney}</Link>
              </p>
            </Container>
          </section>
        </>
      )}
    </>
  );
}

export function GuidesView({ e }: { e: Edition }) {
  const guides = guideArticles(e.code);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={crumbs(e, e.dict.sections.guides, urls.section(e.code, "guides"))} />
      <PageHero eyebrow={`${e.country.flag} ${e.dict.sections.guides}`} title={e.dict.ui.guidesH1} intro={e.dict.ui.shoppingIntro} />
      <section className="py-14">
        <Container size="xl">
          {guides.length === 0 ? (
            <p className="text-lg text-ink-60 max-w-2xl">{e.dict.ui.noStoriesYet}</p>
          ) : (
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
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}

// ───────────────────────────────────────────── Search (edition-scoped)

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^\p{L}\p{N} ]/gu, " ");

function articleText(a: Article) {
  const body = (a.body ?? []).map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : "rows" in b ? b.rows.flat().join(" ") : "")).join(" ");
  return norm([a.title, a.subtitle, a.excerpt, a.categoryName, ...(a.tags ?? []), ...(a.keyTakeaways ?? []), body].join(" "));
}

export function SearchView({ e, q }: { e: Edition; q: string }) {
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
  const score = (text: string, title: string) => {
    let s = 0;
    for (const t of terms) {
      if (!text.includes(t)) return 0;
      s += title.includes(t) ? 3 : 1;
    }
    return s;
  };
  const articles = terms.length
    ? articlesFor(e.code).map((a) => ({ a, s: score(articleText(a), norm(a.title)) })).filter((x) => x.s > 0).sort((x, y) => y.s - x.s).map((x) => x.a)
    : [];
  const products = terms.length
    ? productsFor(e.code).map((p) => ({ p, s: score(norm([p.name, p.brand, p.category, ...(p.keyFeatures ?? [])].join(" ")), norm(p.name)) })).filter((x) => x.s > 0).map((x) => x.p)
    : [];
  const suggestions = tagsFor(e.code).slice(0, 12);
  return (
    <>
      {q && <SearchTracker q={q} results={articles.length + products.length} />}
      <section className="pt-14 pb-10 border-b border-line">
        <Container size="xl">
          <div className="max-w-3xl">
            <h1 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">
              {e.country.flag} {q ? `${e.dict.ui.searchH1}: “${q}”` : e.dict.ui.searchH1}
            </h1>
            <form action={urls.section(e.code, "search")} role="search" className="relative">
              <label htmlFor="q" className="sr-only">{e.dict.ui.searchH1}</label>
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-ink-60" aria-hidden />
              <input id="q" name="q" type="search" defaultValue={q} autoFocus={!q} placeholder={e.dict.ui.searchPlaceholder} className="w-full pl-10 pr-4 py-4 text-2xl md:text-3xl font-editorial border-b-2 border-ink bg-transparent focus:outline-none placeholder:text-ink-40" />
            </form>
            {q && <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40">{e.dict.ui.results(articles.length + products.length)}</p>}
          </div>
        </Container>
      </section>
      {articles.length + products.length === 0 ? (
        <section className="py-16">
          <Container size="md">
            {q && <h2 className="font-editorial text-3xl font-semibold mb-4">{e.dict.ui.noResults(q)}</h2>}
            {suggestions.length > 0 && (
              <>
                <p className="text-ink-60 mb-4">{e.dict.ui.topics}:</p>
                <div className="flex flex-wrap gap-3">
                  {suggestions.map((s) => (
                    <Link key={s} href={urls.tag(e.code, slugify(s))} className="px-4 py-2 border border-line hover:border-ink text-sm">{s}</Link>
                  ))}
                </div>
              </>
            )}
          </Container>
        </section>
      ) : (
        <section className="py-14">
          <Container size="xl">
            {articles.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-14">
                {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
              </div>
            )}
            {products.length > 0 && <ProductGrid products={products} placement="search" />}
          </Container>
        </section>
      )}
    </>
  );
}

export const deskKeys = DESKS;
