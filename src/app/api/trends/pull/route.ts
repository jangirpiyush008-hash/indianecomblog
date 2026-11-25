import { NextResponse } from "next/server";
import { pullGoogleNewsIndia, pullRedditIndia, scoreTrend } from "@/lib/trends/sources";

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
 * POST /api/trends/pull
 * Collects trends from configured sources, normalizes, dedupes, scores.
 */
export async function POST() {
  const started = Date.now();
  const results = await Promise.allSettled([
    pullGoogleNewsIndia(CATEGORIES),
    pullRedditIndia(),
  ]);

  const signals = results
    .filter((r): r is PromiseFulfilledResult<any[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);

  // Simple dedup by lowercase topic
  const dedup = new Map<string, any>();
  for (const s of signals) {
    const k = s.topic.toLowerCase().trim();
    const existing = dedup.get(k);
    if (!existing || existing.signalStrength < s.signalStrength) {
      dedup.set(k, s);
    }
  }

  // Score each (initial heuristic scoring; refine with SERP data later)
  const scored = Array.from(dedup.values()).map((s) => ({
    ...s,
    interestScore: scoreTrend({
      growth: s.signalStrength,
      indiaRelevance: 70,
      searchDemand: 60,
      commercialIntent: inferCommercialIntent(s.topic, s.category),
      competitionOpportunity: 50,
      affiliatePotential: s.category === "shopping" || s.category === "money" ? 80 : 50,
      contentOpportunity: 60,
      freshness: 100,
    }),
  }));

  scored.sort((a, b) => (b.interestScore ?? 0) - (a.interestScore ?? 0));

  return NextResponse.json({
    collected: scored.length,
    took_ms: Date.now() - started,
    top: scored.slice(0, 20),
  });
}

function inferCommercialIntent(topic: string, category?: string): number {
  const t = topic.toLowerCase();
  if (/\bbuy\b|\bbest\b|price|deal|discount|review/.test(t)) return 85;
  if (category === "shopping" || category === "money") return 70;
  return 40;
}
