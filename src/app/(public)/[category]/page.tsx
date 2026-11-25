import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import {
  FeatureArticleCard,
  ArticleCard,
  ArticleListCard,
  ArticleHCard,
} from "@/components/editorial/ArticleCard";
import { ProductCard } from "@/components/commerce/ProductCard";
import { categories } from "@/config/brand";
import { articlesByCategory, sampleProducts, sampleArticles } from "@/lib/sample-content";

const validSlugs = categories.filter((c) => c.slug !== "trending").map((c) => c.slug);

export async function generateStaticParams() {
  return validSlugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name} — ${cat.tagline}`,
    description: `The best ${cat.name.toLowerCase()} coverage in India — tested, verified, curated by our editors.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat || cat.slug === "trending") notFound();

  const articles = articlesByCategory(category, 20);
  const hero = articles[0];
  const grid = articles.slice(1, 7);
  const list = sampleArticles.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section
        className="pt-16 pb-16 border-b border-line"
        style={{ background: `linear-gradient(135deg, ${cat.accent}05 0%, var(--cream) 100%)` }}
      >
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: cat.accent }} />
            <span
              className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold"
              style={{ color: cat.accent }}
            >
              The {cat.name} Desk
            </span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            {cat.tagline}.
          </h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            Deep reporting, verified recommendations, and the stories you'll want to send to a friend.
          </p>

          <div className="mt-10 flex items-center gap-6 flex-wrap">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40">
              Browse by:
            </span>
            {categorySubtopics[category]?.map((s) => (
              <Link
                key={s.slug}
                href={`/${category}/${s.slug}`}
                className="text-sm text-ink hover:text-accent border-b border-transparent hover:border-accent transition pb-0.5"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured */}
      {hero && (
        <section className="py-16 border-b border-line">
          <Container size="xl">
            <div className="grid lg:grid-cols-12 gap-14">
              <div className="lg:col-span-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-5 inline-block">
                  The feature
                </span>
                <FeatureArticleCard article={hero} />
              </div>
              <aside className="lg:col-span-4">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 pb-4 border-b border-line mb-2">
                  Trending in {cat.name}
                </h3>
                {sampleArticles.slice(0, 5).map((a, i) => (
                  <ArticleListCard key={a.id} article={a} number={i + 1} />
                ))}
              </aside>
            </div>
          </Container>
        </section>
      )}

      {/* Grid of articles */}
      {grid.length > 0 && (
        <section className="py-16 border-b border-line">
          <Container size="xl">
            <SectionHeading
              eyebrow="Latest"
              title={`New in ${cat.name}`}
              seeMoreHref={`/${category}/all`}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {grid.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Shopping strip for commercial categories */}
      {(category === "shopping" || category === "technology" || category === "lifestyle") && (
        <section className="py-16 border-b border-line bg-cream-100">
          <Container size="xl">
            <SectionHeading
              eyebrow="Recommended"
              title="Products we stand behind"
              description="Every pick verified in the last 24 hours."
              seeMoreHref="/shopping"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Most read + collections */}
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <SectionHeading
                eyebrow="Most read"
                title={`The ${cat.name} stories India is reading`}
                size="sm"
              />
              {list.slice(0, 5).map((a, i) => (
                <ArticleListCard key={a.id} article={a} number={i + 1} />
              ))}
            </div>
            <div>
              <SectionHeading
                eyebrow="Editorial collections"
                title="Guides, comparisons & explainers"
                size="sm"
              />
              <div className="grid gap-5">
                {editorialCollections.slice(0, 4).map((c) => (
                  <Link
                    key={c.title}
                    href={c.href}
                    className="block p-6 bg-paper border border-line hover:border-ink transition group"
                  >
                    <span
                      className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold"
                      style={{ color: cat.accent }}
                    >
                      {c.count} stories
                    </span>
                    <h4 className="font-editorial text-xl font-semibold mt-2 group-hover:text-accent transition">
                      {c.title}
                    </h4>
                    <p className="text-sm text-ink-60 mt-2">{c.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

const categorySubtopics: Record<string, { slug: string; name: string }[]> = {
  technology: [
    { slug: "smartphones", name: "Smartphones" },
    { slug: "laptops", name: "Laptops" },
    { slug: "audio", name: "Audio" },
    { slug: "wearables", name: "Wearables" },
    { slug: "accessories", name: "Accessories" },
  ],
  "ai-tools": [
    { slug: "chatgpt", name: "ChatGPT & Claude" },
    { slug: "image", name: "AI Image" },
    { slug: "video", name: "AI Video" },
    { slug: "writing", name: "AI Writing" },
    { slug: "productivity", name: "Productivity" },
  ],
  shopping: [
    { slug: "deals", name: "Deals" },
    { slug: "buying-guides", name: "Buying Guides" },
    { slug: "comparisons", name: "Comparisons" },
    { slug: "editors-picks", name: "Editor's Picks" },
  ],
  money: [
    { slug: "credit-cards", name: "Credit Cards" },
    { slug: "mutual-funds", name: "Mutual Funds" },
    { slug: "stocks", name: "Stocks" },
    { slug: "upi", name: "UPI & Fintech" },
    { slug: "tax", name: "Tax" },
  ],
  lifestyle: [
    { slug: "skincare", name: "Skincare" },
    { slug: "fragrance", name: "Fragrance" },
    { slug: "fashion", name: "Fashion" },
    { slug: "home", name: "Home" },
    { slug: "wellness", name: "Wellness" },
  ],
  entertainment: [
    { slug: "ott", name: "OTT" },
    { slug: "cinema", name: "Cinema" },
    { slug: "series", name: "Web Series" },
    { slug: "music", name: "Music" },
  ],
  travel: [
    { slug: "india", name: "India" },
    { slug: "international", name: "International" },
    { slug: "weekend", name: "Weekend Trips" },
    { slug: "hill-stations", name: "Hill Stations" },
    { slug: "beaches", name: "Beaches" },
  ],
};

const editorialCollections = [
  {
    title: "The 2026 India Buyer's Almanac",
    description: "Best products at every price point, tested over six months.",
    href: "/collections/buyers-almanac-2026",
    count: 47,
  },
  {
    title: "AI tools that actually work in India",
    description: "Reviewed for INR pricing, Indian internet, and real use cases.",
    href: "/collections/ai-tools-india",
    count: 23,
  },
  {
    title: "Money playbooks for 2026",
    description: "Tax-saving, SIPs, credit cards and the quiet shifts in Indian finance.",
    href: "/collections/money-playbooks-2026",
    count: 31,
  },
  {
    title: "Best weekend getaways from your city",
    description: "From Delhi, Bengaluru, Mumbai and Hyderabad.",
    href: "/collections/weekend-getaways",
    count: 19,
  },
];
