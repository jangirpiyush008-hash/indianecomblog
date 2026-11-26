import type { Product } from "@/types/content";

/**
 * Central outbound-link service. One place decides what a product's button does:
 *  - "affiliate": an approved, tested affiliate URL exists → sponsored link.
 *  - "retailer":  no affiliate link yet, but a verified merchant page → plain external link,
 *                 clearly not an affiliate link.
 *  - "pending":   nothing verified to link to → disabled "Link coming soon".
 * Activating a programme later only means filling `affiliateUrl` on the product record.
 */
export type LinkMode = "affiliate" | "retailer" | "pending";

export function linkMode(p: Pick<Product, "affiliateUrl" | "sourceUrl">): LinkMode {
  if (p.affiliateUrl) return "affiliate";
  if (p.sourceUrl) return "retailer";
  return "pending";
}

/**
 * Sub-ID parameter each network documents for publisher-side reporting.
 * Networks not listed (EarnKaro, Amazon) get no extra parameters: we never append
 * arbitrary query strings (or UTMs) to links a network doesn't support them on.
 */
const SUB_ID_PARAM: Partial<Record<Product["affiliateNetwork"], string>> = {
  awin: "clickref",
  impact: "subId1",
  cj: "sid",
};

/** Adds the network's sub-ID (e.g. "us_best-laptops_inline") without overwriting existing params. */
export function withSubId(url: string, network: Product["affiliateNetwork"], subId: string): string {
  const param = SUB_ID_PARAM[network];
  if (!param) return url;
  try {
    const u = new URL(url);
    if (u.searchParams.has(param)) return url;
    u.searchParams.set(param, subId.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").slice(0, 100));
    return u.toString();
  } catch {
    return url;
  }
}

export const subIdFor = (country: string, context: string | undefined, placement: string | undefined) =>
  [country, context, placement].filter(Boolean).join("_");
