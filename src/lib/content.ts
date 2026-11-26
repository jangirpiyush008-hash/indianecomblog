/**
 * Country-scoped content API. Every function takes the edition and only ever
 * reads that edition's records — there is no "all countries" fallback here.
 */
import { ARTICLES } from "@/content/articles";
import { PRODUCTS } from "@/content/products";
import { authors, allAuthors } from "@/content/authors";
import { isCountryCode, type CountryCode, type Desk } from "@/config/countries";
import type { Article, Product } from "@/types/content";

export { authors, allAuthors };

function assertCountry(c: string): asserts c is CountryCode {
  if (!isCountryCode(c)) throw new Error(`Unknown edition: ${c}`);
}

export function articlesFor(country: CountryCode): Article[] {
  assertCountry(country);
  return ARTICLES[country];
}

export function productsFor(country: CountryCode): Product[] {
  assertCountry(country);
  return PRODUCTS[country];
}

export function articlesByDesk(country: CountryCode, desk: Desk, limit = 50): Article[] {
  return articlesFor(country).filter((a) => a.category === desk).slice(0, limit);
}

export function featuredArticles(country: CountryCode): Article[] {
  return articlesFor(country).filter((a) => a.featured);
}

export function trendingArticles(country: CountryCode): Article[] {
  return articlesFor(country).filter((a) => a.trending);
}

export function getArticle(country: CountryCode, desk: string, slug: string): Article | undefined {
  return articlesFor(country).find((a) => a.category === desk && a.slug === slug);
}

export function getProduct(country: CountryCode, slug: string): Product | undefined {
  return productsFor(country).find((p) => p.slug === slug);
}

/** Looks up a product anywhere — only for server-side redirect validation. */
export function findProductAnyEdition(slug: string): Product | undefined {
  for (const list of Object.values(PRODUCTS)) {
    const p = list.find((x) => x.slug === slug);
    if (p) return p;
  }
}

export function productsBySlugs(country: CountryCode, slugs: string[] = []): Product[] {
  return slugs.map((s) => getProduct(country, s)).filter((p): p is Product => Boolean(p));
}

export function relatedArticles(article: Article, limit = 3): Article[] {
  const list = articlesFor(article.country).filter((a) => a.id !== article.id);
  return [...list.filter((a) => a.category === article.category), ...list.filter((a) => a.category !== article.category)].slice(0, limit);
}

/**
 * In-article internal links: other articles from the SAME edition, ranked by shared tags
 * (strongest signal), then same desk, then recency. Only published articles — never invented URLs.
 */
export function contextualLinks(article: Article, limit = 3, exclude: string[] = []): Article[] {
  const tags = new Set((article.tags ?? []).map((t) => t.toLowerCase()));
  const skip = new Set([article.id, ...exclude]);
  return articlesFor(article.country)
    .filter((a) => !skip.has(a.id))
    .map((a) => ({
      a,
      score: (a.tags ?? []).filter((t) => tags.has(t.toLowerCase())).length * 3 + (a.category === article.category ? 2 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || +new Date(y.a.publishedAt) - +new Date(x.a.publishedAt))
    .slice(0, limit)
    .map((x) => x.a);
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function tagsFor(country: CountryCode): string[] {
  return [...new Set(articlesFor(country).flatMap((a) => a.tags ?? []))];
}

export function articlesByTag(country: CountryCode, tagSlug: string): Article[] {
  return articlesFor(country).filter((a) => a.tags?.some((t) => slugify(t) === tagSlug));
}

export function guideArticles(country: CountryCode): Article[] {
  return articlesFor(country).filter((a) => a.productSlugs?.length);
}

export function productCategories(country: CountryCode): string[] {
  return [...new Set(productsFor(country).map((p) => p.category))];
}

/** All articles in every edition — only for global sitemaps/feeds and author pages. */
export function everyArticle(): Article[] {
  return Object.values(ARTICLES).flat();
}

/** Every product in every edition — admin only. */
export function everyProduct(): Product[] {
  return Object.values(PRODUCTS).flat();
}

export function articlesByAuthor(slug: string): Article[] {
  return everyArticle()
    .filter((a) => a.author.slug === slug)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}
