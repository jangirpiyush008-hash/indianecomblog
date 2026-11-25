import { NextResponse } from "next/server";
import { pullGoogleNewsIndia, pullRedditIndia, scoreTrend } from "@/lib/trends/sources";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export const maxDuration = 300;

const CATEGORIES = [
  "technology",
  "ai-tools",
  "shopping",
  "money",
  "lifestyle",
  "entertainment",
  "travel",
];

/**
 * GET /api/cron/trends — called by Railway/external cron every 4-6 hours.
 * Protected by a shared token header (CRON_SECRET).
 */
export async function GET(req: Request) {
  const token = req.headers.get("x-cron-secret");
  if (process.env.CRON_SECRET && token !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  const results = await Promise.allSettled([
    pullGoogleNewsIndia(CATEGORIES),
    pullRedditIndia(),
  ]);

  const signals = results
    .filter((r): r is PromiseFulfilledResult<any[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);

  const dedup = new Map<string, any>();
  for (const s of signals) {
    const k = s.topic.toLowerCase().trim();
    const existing = dedup.get(k);
    if (!existing || existing.signalStrength < s.signalStrength) dedup.set(k, s);
  }

  const scored = Array.from(dedup.values()).map((s) => ({
    ...s,
    interest_score: scoreTrend({
      growth: s.signalStrength,
      indiaRelevance: 70,
      searchDemand: 60,
      commercialIntent: /\bbest\b|price|deal|buy/.test(s.topic.toLowerCase()) ? 85 : 40,
      affiliatePotential: s.category === "shopping" || s.category === "money" ? 80 : 50,
      contentOpportunity: 60,
    }),
  }));

  // Persist to Supabase if configured
  let persisted = 0;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createSupabaseServiceClient();
      const rows = scored.slice(0, 100).map((t) => ({
        topic: t.topic,
        normalized_topic: t.topic.toLowerCase().trim(),
        summary: t.metadata?.summary || null,
        interest_score: t.interest_score,
        direction: "up",
        sources: [{ source: t.source, url: t.sourceUrl }],
        source_urls: t.sourceUrl ? [t.sourceUrl] : [],
        discovered_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from("trends").upsert(rows, {
        onConflict: "normalized_topic",
        ignoreDuplicates: false,
      });
      if (!error) persisted = rows.length;
    } catch {
      // Keep going — the cron succeeded even if persistence failed.
    }
  }

  return NextResponse.json({
    ok: true,
    collected: scored.length,
    persisted,
    took_ms: Date.now() - started,
  });
}
