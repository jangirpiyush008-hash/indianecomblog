import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { allArticles } from "@/lib/content";

export const revalidate = 3600;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const base = siteConfig.url;
  const items = allArticles
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${base}${a.url}</link>
      <guid isPermaLink="true">${base}${a.url}</guid>
      <description>${esc(a.excerpt)}</description>
      <category>${esc(a.categoryName)}</category>
      <dc:creator>${esc(a.author.name)}</dc:creator>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(brand.name)}</title>
    <link>${base}</link>
    <description>${esc(brand.description)}</description>
    <language>en-IN</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
