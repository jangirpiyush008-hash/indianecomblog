/**
 * Schema.org JSON-LD builders.
 * Only emit structured data for genuinely true content — no fake reviews,
 * no fake ratings, no misleading Product markup.
 */

import { brand } from "@/config/brand";
import type { Article, Product } from "@/types/content";

const BASE = "https://fable.in";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: brand.name,
    url: BASE,
    logo: `${BASE}/logo.png`,
    sameAs: [
      `https://twitter.com/${brand.social.twitter.replace("@", "")}`,
      `https://instagram.com/${brand.social.instagram.replace("@", "")}`,
      `https://youtube.com/${brand.social.youtube.replace("@", "")}`,
    ],
    foundingLocation: { "@type": "Place", name: "New Delhi, India" },
    ethicsPolicy: `${BASE}/editorial-policy`,
    correctionsPolicy: `${BASE}/corrections-policy`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleSchema(article: Article) {
  return {
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
      url: `${BASE}/authors/${article.author.slug}`,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: brand.name,
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}${article.url}`,
    },
    articleSection: article.categoryName,
    keywords: article.tags?.join(", "),
  };
}

export function productSchema(product: Product) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.verdict || product.name,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability:
        product.availability === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: product.merchantName },
      url: product.affiliateUrl,
    },
  };
  // Only include aggregateRating when the rating is verifiably from a real source.
  if (product.rating && product.reviewCount && product.reviewCount >= 10) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    };
  }
  return schema;
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE}${item.url}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
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
