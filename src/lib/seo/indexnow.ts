import { siteConfig } from "@/config/site";
import { INDEXNOW_KEY } from "@/config/indexnow";
import { ALL_COUNTRIES, urls } from "@/config/countries";
import { everyArticle } from "@/lib/content";

/** Only ping for the real production domain — never for previews or the Railway URL. */
export const indexNowEnabled = () =>
  new URL(siteConfig.url).hostname === "trendnations.com" && process.env.INDEXNOW_DISABLED !== "1";

/**
 * Submit URLs to IndexNow (shared by Bing, Yandex, Seznam, Naver and others).
 * Accepts paths or absolute URLs on our own host only.
 */
export async function submitIndexNow(paths: string[]): Promise<{ ok: boolean; status: number; count: number }> {
  const origin = siteConfig.url;
  const host = new URL(origin).hostname;
  const urlList = [...new Set(paths)]
    .map((p) => (p.startsWith("http") ? p : `${origin}${p}`))
    .filter((u) => {
      try {
        return new URL(u).hostname === host;
      } catch {
        return false;
      }
    })
    .slice(0, 10_000);
  if (!urlList.length) return { ok: true, status: 204, count: 0 };
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${origin}/${INDEXNOW_KEY}.txt`, urlList }),
  });
  return { ok: res.ok, status: res.status, count: urlList.length };
}

/**
 * What to ping after a deploy: pages that change often (edition homes and trending),
 * plus articles published or updated in the last 14 days. Unchanged old articles are
 * left to the sitemap, as IndexNow asks.
 */
export function freshUrls(days = 14): string[] {
  const since = Date.now() - days * 86_400_000;
  const live = ALL_COUNTRIES.flatMap((c) => [urls.home(c.code), urls.section(c.code, "trending")]);
  const articles = everyArticle()
    .filter((a) => +new Date(a.updatedAt ?? a.publishedAt) >= since)
    .map((a) => a.url);
  return ["/", ...live, ...articles];
}
