/**
 * Runs once per server start (i.e. once per deploy on Railway).
 * Pings IndexNow with fresh URLs in the background so new and updated articles in
 * every edition get picked up quickly. Never blocks startup; failures are only logged.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NODE_ENV !== "production") return;
  const { indexNowEnabled, submitIndexNow, freshUrls } = await import("@/lib/seo/indexnow");
  if (!indexNowEnabled()) return;
  setTimeout(() => {
    submitIndexNow(freshUrls())
      .then((r) => console.log(`[indexnow] submitted ${r.count} URLs → HTTP ${r.status}`))
      .catch((e) => console.warn("[indexnow] submit failed:", e instanceof Error ? e.message : e));
  }, 60_000); // wait until the new deploy is serving traffic
}
