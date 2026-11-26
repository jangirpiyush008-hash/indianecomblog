"use client";

import { useEffect, useRef } from "react";
import { trackEcommerce } from "@/lib/analytics/track";

export type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_brand: string;
  item_category: string;
  affiliation: string;
  currency: string;
  price?: number; // only when verified on the merchant's site
  index?: number;
};

/**
 * Sends view_item_list once, when the product list is actually on screen (half of it, or
 * half the viewport for long lists) — not just rendered somewhere down the page.
 */
export function ItemListTracker({ listId, listName, items, children }: { listId: string; listName: string; items: AnalyticsItem[]; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !items.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        // "Seen" = half the list on screen, or (for lists taller than the screen) the list
        // filling at least half the viewport.
        const seen = entries.some((e) => e.intersectionRatio >= 0.5 || e.intersectionRect.height >= window.innerHeight * 0.5);
        if (seen) {
          trackEcommerce(
            "view_item_list",
            { item_list_id: listId, item_list_name: listName },
            { item_list_id: listId, item_list_name: listName, items: items.map((it, i) => ({ ...it, index: i })) },
          );
          obs.disconnect();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [listId, listName, items]);
  return <div ref={ref}>{children}</div>;
}
