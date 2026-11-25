import type { MetadataRoute } from "next";
import { categories } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { allArticles, allAuthors, allTags, slugify } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = siteConfig.url;
  const latest = allArticles[0]?.updatedAt || allArticles[0]?.publishedAt;

  const hubs = ["/", "/trending", "/shopping", "/deals", "/trending-products", "/buying-guides", "/product-comparisons", "/newsletter", "/authors"].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: latest,
      changeFrequency: "daily" as const,
      priority: path === "/" ? 1 : 0.8,
    })
  );

  const policies = ["/about", "/contact", "/advertise", "/editorial-policy", "/corrections-policy", "/affiliate-disclosure", "/privacy-policy", "/terms", "/sitemap"].map(
    (path) => ({ url: `${BASE}${path}`, changeFrequency: "yearly" as const, priority: 0.3 })
  );

  const categoryPages = categories
    .filter((c) => c.slug !== "trending")
    .map((c) => {
      const newest = allArticles.find((a) => a.category === c.slug);
      return {
        url: `${BASE}/${c.slug}`,
        lastModified: newest?.updatedAt || newest?.publishedAt,
        changeFrequency: "daily" as const,
        priority: 0.9,
      };
    });

  const articlePages = allArticles.map((a) => ({
    url: `${BASE}${a.url}`,
    lastModified: a.updatedAt || a.publishedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    images: [a.heroImage],
  }));

  const authorPages = allAuthors.map((a) => ({ url: `${BASE}/authors/${a.slug}`, priority: 0.5 }));
  const tagPages = allTags().map((t) => ({ url: `${BASE}/tag/${slugify(t)}`, priority: 0.4 }));

  return [...hubs, ...categoryPages, ...articlePages, ...authorPages, ...tagPages, ...policies];
}
