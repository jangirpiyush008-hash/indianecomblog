import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CategoryTag } from "@/components/ui/Badge";
import { ArticleHCard, ArticleCard } from "@/components/editorial/ArticleCard";
import { ArticleBody, tocFromBody } from "@/components/editorial/ArticleBody";
import { ShareButtons } from "@/components/editorial/ShareButtons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { allArticles, getArticle, relatedArticles, slugify } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { abs, articleSchema, breadcrumbSchema, faqSchema, jsonLd } from "@/lib/seo/schema";

export const dynamicParams = false;

export async function generateStaticParams() {
  return allArticles.map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  const title = article.seoTitle ?? article.title;
  return {
    title: { absolute: title },
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author.name, url: `/authors/${article.author.slug}` }],
    alternates: { canonical: article.url },
    openGraph: {
      title,
      description: article.excerpt,
      url: article.url,
      images: [{ url: article.heroImage, alt: article.heroImageAlt ?? article.title }],
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author.name],
      section: article.categoryName,
      tags: article.tags,
    },
    twitter: { card: "summary_large_image", title, description: article.excerpt, images: [article.heroImage] },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();

  const related = relatedArticles(article, 3);
  const toc = tocFromBody(article.body);
  const hasProducts = article.body?.some((b) => b.type === "products");
  const initials = article.author.name.split(" ").map((n) => n[0]).join("");

  const schemas = [
    articleSchema(article),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: article.categoryName, url: `/${article.category}` },
      { name: article.title, url: article.url },
    ]),
    ...(article.faq?.length ? [faqSchema(article.faq)] : []),
  ];

  return (
    <article>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(s)} />
      ))}

      {/* Header */}
      <Container size="lg">
        <nav aria-label="Breadcrumb" className="pt-10 pb-4">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-40">
            <li>
              <Link href="/" className="hover:text-accent">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/${article.category}`} className="hover:text-accent">{article.categoryName}</Link>
            </li>
          </ol>
        </nav>

        <header className="max-w-4xl pt-6 pb-10">
          <CategoryTag slug={article.category} name={article.categoryName} color={article.categoryAccent} className="mb-6" />
          <h1 className="font-editorial text-4xl md:text-6xl font-semibold leading-[0.98] tracking-tight mb-6">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-xl md:text-2xl text-ink-60 leading-snug font-editorial">{article.subtitle}</p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 pb-8 border-b border-line">
            <Link href={`/authors/${article.author.slug}`} className="flex items-center gap-3 group" rel="author">
              <div className="h-10 w-10 rounded-full bg-ink text-cream flex items-center justify-center font-editorial font-semibold text-sm">
                {initials}
              </div>
              <div>
                <div className="text-sm font-medium text-ink group-hover:text-accent">{article.author.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">{article.author.role}</div>
              </div>
            </Link>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-60">
              <span>
                Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </span>
              {article.updatedAt && (
                <>
                  <span aria-hidden>·</span>
                  <span>
                    Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                  </span>
                </>
              )}
              <span aria-hidden>·</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </header>
      </Container>

      {/* Hero image */}
      <Container size="xl">
        <figure className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-cream-100 mb-14">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            fill
            sizes="(min-width: 1440px) 1440px, 100vw"
            className={article.heroImage.includes("cdn.shopify.com") ? "object-contain p-8" : "object-cover"}
            priority
          />
        </figure>
      </Container>

      {/* Body + sidebars */}
      <Container size="xl">
        <div className="grid lg:grid-cols-12 gap-14">
          <aside className="hidden lg:block lg:col-span-3" aria-label="Table of contents">
            <div className="sticky top-32">
              {toc.length > 0 && (
                <>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 pb-3 border-b border-line mb-3 block">
                    In this article
                  </span>
                  <ul className="space-y-2">
                    {toc.map((s) => (
                      <li key={s.id}>
                        <a href={`#${s.id}`} className="text-sm text-ink-60 hover:text-accent transition block py-1">
                          {s.text}
                        </a>
                      </li>
                    ))}
                    {article.faq?.length ? (
                      <li>
                        <a href="#faq" className="text-sm text-ink-60 hover:text-accent transition block py-1">FAQs</a>
                      </li>
                    ) : null}
                    {article.sources?.length ? (
                      <li>
                        <a href="#sources" className="text-sm text-ink-60 hover:text-accent transition block py-1">Sources</a>
                      </li>
                    ) : null}
                  </ul>
                </>
              )}
              <div className="mt-10 pt-6 border-t border-line">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-3 block">Share</span>
                <ShareButtons url={abs(article.url)} title={article.title} />
              </div>
            </div>
          </aside>

          <div className="lg:col-span-6 max-w-2xl min-w-0">
            {hasProducts && (
              <p className="mb-8 text-sm text-ink-60 border border-line bg-cream-100 px-4 py-3">
                This article contains affiliate links. If you buy through them we may earn a commission, at no extra cost to you.{" "}
                <Link href="/affiliate-disclosure" className="underline hover:text-accent">How we make money</Link>
              </p>
            )}

            {article.keyTakeaways?.length ? (
              <section aria-labelledby="key-takeaways" className="mb-10 border-y-2 border-ink py-6">
                <h2 id="key-takeaways" className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">
                  Key takeaways
                </h2>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((k) => (
                    <li key={k} className="flex gap-3 text-ink-80 leading-relaxed">
                      <span className="text-accent font-bold">→</span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <ArticleBody article={article} />

            {article.faq?.length ? (
              <section aria-labelledby="faq" className="mt-14">
                <h2 id="faq" className="font-editorial text-3xl font-semibold mb-6 scroll-mt-28">
                  Frequently asked questions
                </h2>
                <div className="divide-y divide-line border-y border-line">
                  {article.faq.map((f) => (
                    <details key={f.question} className="group py-5">
                      <summary className="cursor-pointer list-none flex justify-between gap-4 font-medium text-ink">
                        <h3 className="text-lg font-editorial font-semibold">{f.question}</h3>
                        <span className="text-accent group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                      </summary>
                      <p className="mt-3 text-ink-60 leading-relaxed">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {(article.sources?.length || article.methodology) && (
              <section aria-labelledby="sources" className="mt-12 p-6 bg-cream-100">
                <h2 id="sources" className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-3 scroll-mt-28">
                  Sources &amp; how this was researched
                </h2>
                {article.methodology && <p className="text-sm text-ink-60 leading-relaxed mb-4">{article.methodology}</p>}
                {article.sources?.length ? (
                  <ol className="list-decimal pl-5 space-y-1.5 text-sm">
                    {article.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent underline decoration-line underline-offset-2">
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ol>
                ) : null}
                <p className="mt-4 text-xs text-ink-40">
                  Found an error? See our <Link href="/corrections-policy" className="underline">corrections policy</Link>.
                </p>
              </section>
            )}

            {article.tags?.length ? (
              <div className="mt-10 flex flex-wrap gap-2">
                {article.tags.map((t) => (
                  <Link key={t} href={`/tag/${slugify(t)}`} className="px-3 py-1.5 border border-line text-sm text-ink-60 hover:border-ink hover:text-ink">
                    #{t}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="lg:hidden mt-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-3 block">Share</span>
              <ShareButtons url={abs(article.url)} title={article.title} />
            </div>

            {/* Author bio */}
            <div className="mt-16 pt-10 border-t border-line">
              <div className="flex gap-5">
                <div className="h-16 w-16 rounded-full bg-ink text-cream flex items-center justify-center font-editorial font-semibold text-xl flex-shrink-0">
                  {initials}
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">About the author</span>
                  <p className="font-editorial text-xl font-semibold mt-1">{article.author.name}</p>
                  <p className="text-ink-60 mt-2 text-sm leading-relaxed">{article.author.bio}</p>
                  <Link href={`/authors/${article.author.slug}`} className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-ink hover:text-accent">
                    More by {article.author.name.split(" ")[0]} →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-3 space-y-10">
            {related.length > 0 && (
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 pb-3 border-b border-line mb-3 block">
                  More like this
                </span>
                {related.map((a) => (
                  <ArticleHCard key={a.id} article={a} />
                ))}
              </div>
            )}
            <div className="p-6 bg-ink text-cream">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3 block">Get the digest</span>
              <p className="font-editorial text-xl font-semibold leading-tight mb-3">New stories, in your inbox.</p>
              <p className="text-sm text-cream/70 mb-4">Free. Unsubscribe any time.</p>
              <NewsletterForm source={`article:${article.slug}`} variant="dark" />
            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="mt-24 py-16 border-t border-line bg-cream-100">
          <Container size="xl">
            <div className="border-b border-line pb-5 mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-2 block">Keep reading</span>
              <h2 className="font-editorial text-3xl font-semibold">More from {article.categoryName} and beyond</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
