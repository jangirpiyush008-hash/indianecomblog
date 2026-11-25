/**
 * Trend collection sources.
 * Each returns a normalized TrendSignal we can rank + store.
 */

export interface TrendSignal {
  topic: string;
  source: string;
  sourceUrl?: string;
  category?: string;
  signalStrength: number; // 0-100
  metadata?: Record<string, any>;
  discoveredAt: string;
}

/** Pulls trending Google News RSS for India categories. */
export async function pullGoogleNewsIndia(categories: string[]): Promise<TrendSignal[]> {
  const signals: TrendSignal[] = [];
  const queries: Record<string, string> = {
    technology: "technology+india",
    "ai-tools": "artificial+intelligence+india",
    shopping: "e-commerce+sale+india",
    money: "personal+finance+india",
    lifestyle: "lifestyle+india",
    entertainment: "entertainment+ott+india",
    travel: "travel+india",
  };

  for (const cat of categories) {
    const q = queries[cat];
    if (!q) continue;
    const url = `https://news.google.com/rss/search?q=${q}&hl=en-IN&gl=IN&ceid=IN:en`;
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 TrendNations/1.0" },
        next: { revalidate: 300 },
      });
      const text = await res.text();
      const items = text.match(/<item>[\s\S]*?<\/item>/g) || [];
      for (const item of items.slice(0, 10)) {
        const title = item.match(/<title>([\s\S]*?)<\/title>/)?.[1]
          ?.replace(/<!\[CDATA\[|\]\]>/g, "")
          ?.trim();
        const link = item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim();
        if (title) {
          signals.push({
            topic: title,
            source: "google_news",
            sourceUrl: link,
            category: cat,
            signalStrength: 60,
            discoveredAt: new Date().toISOString(),
          });
        }
      }
    } catch {
      /* ignore failures per source */
    }
  }
  return signals;
}

/** Pulls Reddit India hot posts across relevant subreddits. */
export async function pullRedditIndia(): Promise<TrendSignal[]> {
  const subs = [
    "india",
    "IndianGaming",
    "IndianStreetBets",
    "IndiaInvestments",
    "IndianTravelClub",
    "indianmakeupaddicts",
    "IndianTeenagers",
    "IndianGamers",
  ];
  const signals: TrendSignal[] = [];
  for (const sub of subs) {
    try {
      const res = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=10`, {
        headers: { "User-Agent": "TrendNations/1.0" },
        next: { revalidate: 600 },
      });
      const json = await res.json();
      for (const post of json?.data?.children || []) {
        const d = post.data;
        if (d.stickied || d.over_18) continue;
        signals.push({
          topic: d.title,
          source: "reddit",
          sourceUrl: `https://reddit.com${d.permalink}`,
          category: inferCategory(d.title),
          signalStrength: Math.min(100, Math.round((d.ups / 500) * 100)),
          metadata: { subreddit: sub, score: d.ups, comments: d.num_comments },
          discoveredAt: new Date().toISOString(),
        });
      }
    } catch {
      /* ignore */
    }
  }
  return signals;
}

function inferCategory(text: string): string | undefined {
  const t = text.toLowerCase();
  if (/phone|laptop|gadget|tech|android|iphone/.test(t)) return "technology";
  if (/\bai\b|chatgpt|claude|gemini/.test(t)) return "ai-tools";
  if (/sale|discount|deal|offer|amazon|flipkart|nykaa/.test(t)) return "shopping";
  if (/mutual fund|credit card|sip|loan|stock|upi/.test(t)) return "money";
  if (/skincare|beauty|perfume|fashion|style/.test(t)) return "lifestyle";
  if (/netflix|hotstar|prime|ott|series|movie/.test(t)) return "entertainment";
  if (/goa|kerala|travel|trip|places/.test(t)) return "travel";
  return undefined;
}

/**
 * Trend scoring — 8-factor model.
 */
export function scoreTrend({
  growth = 50,
  indiaRelevance = 50,
  searchDemand = 50,
  commercialIntent = 50,
  competitionOpportunity = 50,
  affiliatePotential = 50,
  contentOpportunity = 50,
  freshness = 100,
}: Partial<{
  growth: number;
  indiaRelevance: number;
  searchDemand: number;
  commercialIntent: number;
  competitionOpportunity: number;
  affiliatePotential: number;
  contentOpportunity: number;
  freshness: number;
}>) {
  const weights = {
    growth: 0.20,
    indiaRelevance: 0.15,
    searchDemand: 0.15,
    commercialIntent: 0.15,
    competitionOpportunity: 0.10,
    affiliatePotential: 0.10,
    contentOpportunity: 0.10,
    freshness: 0.05,
  };
  const score =
    growth * weights.growth +
    indiaRelevance * weights.indiaRelevance +
    searchDemand * weights.searchDemand +
    commercialIntent * weights.commercialIntent +
    competitionOpportunity * weights.competitionOpportunity +
    affiliatePotential * weights.affiliatePotential +
    contentOpportunity * weights.contentOpportunity +
    freshness * weights.freshness;
  return Math.round(score);
}
