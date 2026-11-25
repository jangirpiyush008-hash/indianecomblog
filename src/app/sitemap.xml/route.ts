import { siteConfig } from "@/config/site";
import { sitemapFiles } from "@/lib/seo/sitemaps";

export const revalidate = 3600;

/** Sitemap index: one global sitemap plus one per edition. */
export function GET() {
  const now = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map((f) => `  <sitemap><loc>${siteConfig.url}/sitemaps/${f}.xml</loc><lastmod>${now}</lastmod></sitemap>`).join("\n")}
</sitemapindex>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
