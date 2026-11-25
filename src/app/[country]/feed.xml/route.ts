import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { COUNTRIES, COUNTRY_CODES, isCountryCode, urls } from "@/config/countries";
import { articlesFor } from "@/lib/content";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return COUNTRY_CODES.map((country) => ({ country }));
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS feed for one edition — contains only that edition's articles. */
export async function GET(_req: Request, { params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!isCountryCode(country)) return new Response("Not found", { status: 404 });
  const c = COUNTRIES[country];
  const base = siteConfig.url;
  const items = articlesFor(country)
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
    <title>${esc(`${brand.name} ${c.name}`)}</title>
    <link>${base}${urls.home(country)}</link>
    <description>${esc(brand.description)}</description>
    <language>${c.locale}</language>
    <atom:link href="${base}/${country}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
