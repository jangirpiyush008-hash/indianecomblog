import type { Product } from "@/types/content";
import type { AnalyticsItem } from "@/components/analytics/ItemListTracker";

/** GA4 item from a product record. Price is included only when we verified it. */
export function toAnalyticsItem(p: Product): AnalyticsItem {
  return {
    item_id: p.slug,
    item_name: p.name,
    item_brand: p.brand,
    item_category: p.category,
    affiliation: p.merchantName,
    currency: p.currency,
    ...(p.price != null ? { price: p.price } : {}),
  };
}
