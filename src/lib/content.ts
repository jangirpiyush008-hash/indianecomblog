import { articles } from "@/content/articles";
import { products } from "@/content/products";
import { authors, allAuthors } from "@/content/authors";
import type { Article, Product } from "@/types/content";

export { articles as allArticles, products as allProducts, authors, allAuthors };

export function articlesByCategory(category: string, limit = 6): Article[] {
  return articles.filter((a) => a.category === category).slice(0, limit);
}

export function featuredArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function trendingArticles(): Article[] {
  return articles.filter((a) => a.trending);
}

export function getArticle(category: string, slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug && a.category === category);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsBySlugs(slugs: string[] = []): Product[] {
  return slugs.map(getProduct).filter((p): p is Product => Boolean(p));
}

export function articlesByAuthor(slug: string): Article[] {
  return articles.filter((a) => a.author.slug === slug);
}

export function articlesByTag(tag: string): Article[] {
  const t = tag.toLowerCase();
  return articles.filter((a) => a.tags?.some((x) => slugify(x) === t || x.toLowerCase() === t));
}

export function allTags(): string[] {
  return [...new Set(articles.flatMap((a) => a.tags ?? []))];
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function relatedArticles(article: Article, limit = 3): Article[] {
  const sameCat = articles.filter((a) => a.id !== article.id && a.category === article.category);
  const rest = articles.filter((a) => a.id !== article.id && a.category !== article.category);
  return [...sameCat, ...rest].slice(0, limit);
}

/** Articles that recommend specific products (buying guides & comparisons). */
export function guideArticles(): Article[] {
  return articles.filter((a) => a.productSlugs?.length);
}

export function comparisonArticles(): Article[] {
  return articles.filter((a) => / vs /i.test(a.title));
}

export function productCategories(): string[] {
  return [...new Set(products.map((p) => p.category))];
}

/** Editorial collections are built from real content — counts are never hard-coded. */
export const collections = [
  {
    slug: "buying-guides",
    title: "Buying guides",
    description: "Spec-and-price comparisons, with prices checked on the store and the date we checked.",
    filter: (a: Article) => Boolean(a.productSlugs?.length),
  },
  {
    slug: "how-to",
    title: "How-tos for Indian services",
    description: "Step-by-step guides to government and banking services, with links to the official source.",
    filter: (a: Article) => ["money", "technology", "travel"].includes(a.category) && !a.productSlugs?.length,
  },
  {
    slug: "whats-new",
    title: "What's new this week",
    description: "Timely explainers on releases, offers and changes worth knowing about.",
    filter: (a: Article) => Boolean(a.trending),
  },
] as const;

export function getCollection(slug: string) {
  const c = collections.find((x) => x.slug === slug);
  if (!c) return undefined;
  return { ...c, articles: articles.filter(c.filter) };
}
