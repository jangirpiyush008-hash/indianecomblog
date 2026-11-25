import type { MetadataRoute } from "next";
import { categories } from "@/config/brand";
import { sampleArticles } from "@/lib/sample-content";

const BASE = "https://fable.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    "/",
    "/trending",
    "/shopping",
    "/deals",
    "/trending-products",
    "/buying-guides",
    "/product-comparisons",
    "/about",
    "/contact",
    "/advertise",
    "/newsletter",
    "/editorial-policy",
    "/corrections-policy",
    "/affiliate-disclosure",
    "/privacy-policy",
    "/terms",
    "/sitemap",
    "/authors",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const categoryPages = categories
    .filter((c) => c.slug !== "trending")
    .map((c) => ({
      url: `${BASE}/${c.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

  const articlePages = sampleArticles.map((a) => ({
    url: `${BASE}${a.url}`,
    lastModified: a.updatedAt || a.publishedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
