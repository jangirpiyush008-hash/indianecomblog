import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CategoryTag, Badge } from "@/components/ui/Badge";
import { ArticleHCard, ArticleCard } from "@/components/editorial/ArticleCard";
import { ProductCardHorizontal } from "@/components/commerce/ProductCard";
import { sampleArticles, sampleProducts } from "@/lib/sample-content";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import { brand } from "@/config/brand";

export async function generateStaticParams() {
  return sampleArticles.map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = sampleArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.heroImage],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const article = sampleArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = sampleArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <article>
      {/* Article header */}
      <Container size="lg">
        <nav className="pt-10 pb-4 flex items-center gap-2 text-sm text-ink-40 font-mono text-[11px] uppercase tracking-[0.15em]">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href={`/${article.category}`} className="hover:text-accent">
            {article.categoryName}
          </Link>
        </nav>

        <div className="max-w-4xl pt-6 pb-12">
          <CategoryTag
            slug={article.category}
            name={article.categoryName}
            color={article.categoryAccent}
            className="mb-6"
          />
          <h1 className="font-editorial text-4xl md:text-6xl font-semibold leading-[0.95] tracking-tight mb-6">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-xl md:text-2xl text-ink-60 leading-snug font-editorial">
              {article.subtitle}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 pb-8 border-b border-line">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cream-200 flex items-center justify-center font-editorial font-semibold text-sm text-ink">
                {article.author.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium text-ink">{article.author.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">
                  {article.author.role}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-ink-60">
              <span>{formatDate(article.publishedAt)}</span>
              {article.updatedAt && (
                <>
                  <span>·</span>
                  <span className="italic">Updated {formatRelativeTime(article.updatedAt)}</span>
                </>
              )}
              <span>·</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Hero image */}
      <Container size="xl">
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-cream-200 mb-14">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            fill
            sizes="(min-width: 1440px) 1440px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </Container>

      {/* Body + sidebar */}
      <Container size="xl">
        <div className="grid lg:grid-cols-12 gap-14">
          {/* TOC sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 pb-3 border-b border-line mb-3 block">
                In this article
              </span>
              <ul className="space-y-3">
                {[
                  { id: "intro", label: "The context" },
                  { id: "verdict", label: "Our verdict" },
                  { id: "pros-cons", label: "What works, what doesn't" },
                  { id: "comparison", label: "The alternatives" },
                  { id: "buy", label: "Where to buy" },
                  { id: "bottom-line", label: "Bottom line" },
                ].map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm text-ink-60 hover:text-accent transition block py-1"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-line">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-3 block">
                  Share
                </span>
                <div className="flex gap-2">
                  {["X", "In", "Wa", "FB"].map((s) => (
                    <button
                      key={s}
                      className="h-9 w-9 border border-line hover:border-ink flex items-center justify-center text-xs font-medium transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Article body */}
          <div className="lg:col-span-6 max-w-2xl">
            <div className="prose-editorial">
              <p className="drop-cap text-xl leading-relaxed text-ink-80 first-letter:font-editorial">
                {article.excerpt} The question on every Indian buyer's mind this season isn't just "Is it worth it?" — it's "Is it worth it for my specific use, in my specific city, at my specific income bracket?"
              </p>

              <p>
                We spent four months with the device across three cities, in three climates, with three different users at three different income brackets. The verdict — nuanced, specific, and honest — follows.
              </p>

              <h2 id="verdict">Our verdict, in one line</h2>
              <p>
                If you're spending over ₹1,00,000 on a phone in India today, this is the one. Full stop. The reasons, however, are not the ones the TV ads are selling you.
              </p>

              <blockquote>
                "The best phone isn't the one with the most features. It's the one you reach for without thinking. Four months in, this is that phone."
                <cite className="block mt-3 not-italic font-mono text-xs text-ink-40 uppercase tracking-wide">— {article.author.name}, {article.author.role}</cite>
              </blockquote>

              <h2 id="pros-cons">What we loved, what we didn't</h2>
              <h3>What works</h3>
              <ul>
                <li>The 48MP main camera remains best-in-class in low light — especially under tungsten-heavy Indian streetlights.</li>
                <li>Apple Intelligence (now live in India) handles Hinglish naturally.</li>
                <li>Battery life survives the 42°C Delhi summer without throttling — a first for a Pro iPhone.</li>
                <li>The titanium frame actually feels lighter in daily carry.</li>
              </ul>
              <h3>What doesn't</h3>
              <ul>
                <li>Charging speed still trails OnePlus and Realme flagships by 30 minutes.</li>
                <li>Apple's trade-in in India is 40-60% below street value. Sell on OLX instead.</li>
                <li>AppleCare+ pricing in India remains hard to justify.</li>
              </ul>

              <h2 id="comparison">How it stacks up</h2>
              <p>
                Against the Samsung Galaxy S25 Ultra and the Pixel 10 Pro — the two obvious competitors — the iPhone 16 Pro wins on sustained performance, camera consistency, and resale value (yes, even in India). The Pixel wins on pure photography flexibility. The Samsung wins on sheer feature count.
              </p>
            </div>

            {/* Inline product recommendation */}
            <div className="my-10 p-6 bg-cream-100 border-l-4 border-accent">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4 block">
                Where to buy
              </span>
              <div className="space-y-4">
                {sampleProducts.slice(0, 2).map((p) => (
                  <ProductCardHorizontal key={p.id} product={p} />
                ))}
              </div>
              <p className="mt-4 text-xs text-ink-40 italic">
                We may earn commission when you buy through links on this page. It never affects our picks or verdict.
              </p>
            </div>

            <div className="prose-editorial">
              <h2 id="bottom-line">The bottom line</h2>
              <p>
                If your budget is under ₹80,000, the OnePlus 13 or Google Pixel 10 Pro offer 85% of this phone's experience for 65% of the price. If your budget is ₹1,00,000+ — this is the phone. No hedging.
              </p>
              <p>
                Buy it when the next Amazon sale discounts the 256GB variant below ₹1,15,000 — that's historically the sweet spot.
              </p>
            </div>

            {/* Author bio */}
            <div className="mt-16 pt-10 border-t border-line">
              <div className="flex gap-5">
                <div className="h-16 w-16 rounded-full bg-cream-200 flex items-center justify-center font-editorial font-semibold text-xl text-ink flex-shrink-0">
                  {article.author.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
                    About the author
                  </span>
                  <h3 className="font-editorial text-xl font-semibold mt-1">{article.author.name}</h3>
                  <p className="text-ink-60 mt-2 text-sm leading-relaxed">{article.author.bio}</p>
                  <Link
                    href={`/authors/${article.author.slug}`}
                    className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-ink hover:text-accent"
                  >
                    More by {article.author.name.split(" ")[0]} →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="mt-12 p-6 bg-cream-100">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-3 block">
                How we tested this
              </span>
              <p className="text-sm text-ink-60 leading-relaxed">
                4 months of real-world use across Delhi, Mumbai and Bengaluru by three reviewers. Battery tests run across 42°C ambient. Camera comparisons shot in identical lighting. Prices verified at time of writing on Amazon India and Flipkart.
              </p>
            </div>
          </div>

          {/* Right sidebar — related & newsletter */}
          <aside className="lg:col-span-3 space-y-10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 pb-3 border-b border-line mb-3 block">
                More like this
              </span>
              {related.map((a) => (
                <ArticleHCard key={a.id} article={a} />
              ))}
            </div>

            <div className="p-6 bg-ink text-cream">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3 block">
                Get the digest
              </span>
              <h4 className="font-editorial text-xl font-semibold leading-tight mb-3">
                7 stories. 7 AM. Your inbox.
              </h4>
              <p className="text-sm text-cream/70 mb-4">
                Our editors' daily pick, delivered free.
              </p>
              <form>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full px-3 py-2.5 bg-cream/5 border border-cream/20 text-cream text-sm focus:outline-none focus:border-accent"
                />
                <button className="w-full mt-2 py-2.5 bg-accent text-white text-sm font-medium hover:bg-accent-dark">
                  Join free
                </button>
              </form>
            </div>
          </aside>
        </div>
      </Container>

      {/* Related articles grid */}
      <section className="mt-24 py-16 border-t border-line bg-cream-100">
        <Container size="xl">
          <div className="border-b border-line pb-5 mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-2 block">
              Keep reading
            </span>
            <h2 className="font-editorial text-3xl font-semibold">More in {article.categoryName}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Container>
      </section>

      {/* Schema.org Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.excerpt,
            image: [article.heroImage],
            datePublished: article.publishedAt,
            dateModified: article.updatedAt || article.publishedAt,
            author: {
              "@type": "Person",
              name: article.author.name,
              url: `https://fable.in/authors/${article.author.slug}`,
            },
            publisher: {
              "@type": "Organization",
              name: brand.name,
              logo: {
                "@type": "ImageObject",
                url: "https://fable.in/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://fable.in${article.url}`,
            },
          }),
        }}
      />
    </article>
  );
}
