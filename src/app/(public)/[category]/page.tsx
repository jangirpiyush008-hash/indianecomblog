import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureArticleCard, ArticleCard, ArticleListCard } from "@/components/editorial/ArticleCard";
import { ProductCard } from "@/components/commerce/ProductCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { categories } from "@/config/brand";
import { articlesByCategory, allArticles, productsBySlugs, slugify } from "@/lib/content";
import { getLiveTrends } from "@/lib/trends/live";
import { formatRelativeTime } from "@/lib/utils";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/seo/schema";

export const revalidate = 1800;
export const dynamicParams = false;

const desks = categories.filter((c) => c.slug !== "trending");

/** What each desk covers — used as the page intro and meta description. */
const intros: Record<string, string> = {
  technology: "Phones, laptops, wearables and the tools that make them work — plus how-tos for the services every Indian phone owner should know.",
  "ai-tools": "What AI tools cost in rupees, which offers are still running, and how to use them well.",
  shopping: "Buying guides built on manufacturer specs and prices we check on the store, with the date we checked.",
  money: "UPI, credit, tax and everyday personal finance in India, explained from the official source.",
  lifestyle: "Skincare, grooming, fashion and wellness — what the labels mean and what's worth buying.",
  entertainment: "What's new on Netflix, Prime Video, JioHotstar, SonyLIV and in cinemas.",
  travel: "Practical travel guides for Indian travellers — airports, documents, destinations.",
};

export async function generateStaticParams() {
  // /shopping has its own hub page.
  return desks.filter((c) => c.slug !== "shopping").map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = desks.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name} — ${cat.tagline}`,
    description: intros[cat.slug],
    alternates: { canonical: `/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = desks.find((c) => c.slug === category);
  if (!cat) notFound();

  const articles = articlesByCategory(category, 50);
  const hero = articles[0];
  const rest = articles.slice(1);
  const tags = [...new Set(articles.flatMap((a) => a.tags ?? []))];
  const products = productsBySlugs([...new Set(articles.flatMap((a) => a.productSlugs ?? []))]).slice(0, 4);
  const elsewhere = allArticles.filter((a) => a.category !== category).slice(0, 5);
  const headlines = (await getLiveTrends(40)).filter((t) => t.category === category).slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema([{ name: "Home", url: "/" }, { name: cat.name, url: `/${cat.slug}` }]))}
      />
      {articles.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(itemListSchema(`${cat.name} stories`, articles.map((a) => ({ name: a.title, url: a.url }))))}
        />
      )}

      <section className="pt-16 pb-14 border-b border-line" style={{ background: `linear-gradient(135deg, ${cat.accent}0d 0%, var(--cream) 100%)` }}>
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: cat.accent }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: cat.accent }}>
              The {cat.name} desk
            </span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">{cat.name}: {cat.tagline.toLowerCase()}</h1>
          <p className="mt-6 text-lg md:text-xl text-ink-60 max-w-2xl">{intros[cat.slug]}</p>
          {tags.length > 0 && (
            <div className="mt-8 flex items-center gap-x-5 gap-y-2 flex-wrap">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40">Topics:</span>
              {tags.map((t) => (
                <Link key={t} href={`/tag/${slugify(t)}`} className="text-sm text-ink hover:text-accent border-b border-transparent hover:border-accent transition pb-0.5">
                  {t}
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {hero ? (
        <section className="py-16 border-b border-line">
          <Container size="xl">
            <div className="grid lg:grid-cols-12 gap-14">
              <div className="lg:col-span-8">
                <FeatureArticleCard article={hero} />
              </div>
              <aside className="lg:col-span-4">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 pb-4 border-b border-line mb-2">
                  {cat.name} in the news
                </h2>
                {headlines.length === 0 && <p className="text-sm text-ink-60 py-4">Live headlines unavailable right now.</p>}
                <ul>
                  {headlines.map((t) => (
                    <li key={t.id} className="py-4 border-b border-line last:border-0">
                      <a href={t.sources?.[0]?.url} target="_blank" rel="noopener noreferrer" className="font-editorial text-base font-semibold leading-snug hover:text-accent">
                        {t.topic}
                      </a>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">
                        {t.sources?.[0]?.name} · {formatRelativeTime(t.discoveredAt)}
                      </p>
                    </li>
                  ))}
                </ul>
                <Link href={`/trending?cat=${cat.slug}`} className="mt-4 inline-block text-sm font-medium hover:text-accent">
                  More {cat.name.toLowerCase()} headlines →
                </Link>
              </aside>
            </div>
          </Container>
        </section>
      ) : (
        <section className="py-20 border-b border-line">
          <Container size="md">
            <p className="text-ink-60">Our first {cat.name.toLowerCase()} stories are on the way.</p>
          </Container>
        </section>
      )}

      {rest.length > 0 && (
        <section className="py-16 border-b border-line">
          <Container size="xl">
            <SectionHeading eyebrow="Latest" title={`More from ${cat.name}`} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {rest.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {products.length > 0 && (
        <section className="py-16 border-b border-line bg-cream-100">
          <Container size="xl">
            <SectionHeading
              eyebrow="From our guides"
              title="Products in this desk's guides"
              description="Prices from the brand's own store on the date shown. Affiliate links."
              seeMoreHref="/deals"
              seeMoreLabel="All products"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} placement={`desk:${cat.slug}`} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 border-b border-line">
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <SectionHeading eyebrow="Elsewhere" title="From our other desks" size="sm" />
              {elsewhere.map((a, i) => (
                <ArticleListCard key={a.id} article={a} number={i + 1} />
              ))}
            </div>
            <div className="p-8 bg-ink text-cream self-start">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Newsletter</span>
              <h2 className="font-editorial text-3xl font-semibold mt-3 mb-3">Get new {cat.name.toLowerCase()} stories by email</h2>
              <p className="text-cream/70 mb-6">Free. Unsubscribe any time.</p>
              <NewsletterForm source={`desk:${cat.slug}`} variant="dark" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
