/**
 * Schema.org JSON-LD builders.
 * Only emit structured data for genuinely true content — no fake reviews,
 * no fake ratings, no misleading Product markup.
 */

import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";
import type { Article, Author, FaqItem, Product } from "@/types/content";

export const BASE = siteConfig.url;
export const abs = (path: string) => (path.startsWith("http") ? path : `${BASE}${path}`);

/** Serialise JSON-LD safely (escapes `<` per Next.js JSON-LD guidance). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

const publisher = () => ({
  "@type": "NewsMediaOrganization",
  "@id": `${BASE}/#organization`,
  name: brand.name,
  url: BASE,
  logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` },
  founder: { "@type": "Person", name: brand.founder },
  ethicsPolicy: `${BASE}/editorial-policy`,
  correctionsPolicy: `${BASE}/corrections-policy`,
  publishingPrinciples: `${BASE}/editorial-policy`,
});

export function organizationSchema() {
  const social = Object.values(brand.social);
  return {
    "@context": "https://schema.org",
    ...publisher(),
    ...(social.length ? { sameAs: social } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    name: brand.name,
    url: BASE,
    inLanguage: "en-IN",
    publisher: { "@id": `${BASE}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function personSchema(author: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/authors/${author.slug}#person`,
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${BASE}/authors/${author.slug}`,
    worksFor: { "@id": `${BASE}/#organization` },
    ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seoTitle ?? article.title,
    description: article.excerpt,
    image: [abs(article.heroImage)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    inLanguage: "en-IN",
    author: {
      "@type": "Person",
      "@id": `${BASE}/authors/${article.author.slug}#person`,
      name: article.author.name,
      url: `${BASE}/authors/${article.author.slug}`,
      jobTitle: article.author.role,
    },
    publisher: publisher(),
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(article.url) },
    articleSection: article.categoryName,
    keywords: article.tags?.join(", "),
    ...(article.sources?.length
      ? { citation: article.sources.map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url })) }
      : {}),
  };
}

export function productSchema(product: Product) {
  // Product + Offer only. No aggregateRating/review: we don't have verified ratings.
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.keyFeatures?.join(", ") || product.name,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      priceValidUntil: undefined,
      availability:
        product.availability === "out_of_stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      seller: { "@type": "Organization", name: product.merchantName },
      url: product.sourceUrl,
    },
  };
}

export function itemListSchema(name: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: abs(it.url),
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
