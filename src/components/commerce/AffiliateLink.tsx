"use client";

import type { Product } from "@/types/content";

/**
 * Outbound affiliate link. The href is the product's FULL EarnKaro tracking URL
 * (no shorteners, no internal redirect), marked rel="sponsored" for search engines.
 * The click is logged with a beacon so navigation is never delayed.
 */
export function AffiliateLink({
  product,
  articleId,
  placement,
  className,
  children,
}: {
  product: Product;
  articleId?: string;
  placement?: string;
  className?: string;
  children: React.ReactNode;
}) {
  function track() {
    try {
      const body = JSON.stringify({
        productSlug: product.slug,
        articleId,
        merchant: product.merchant,
        campaign: placement,
        destinationUrl: product.affiliateUrl,
      });
      navigator.sendBeacon?.("/api/affiliate/click", new Blob([body], { type: "application/json" }));
    } catch {
      /* never block the click */
    }
  }

  return (
    <a
      href={product.affiliateUrl}
      target="_blank"
      rel="sponsored nofollow noopener"
      onClick={track}
      onAuxClick={track}
      className={className}
      aria-label={`Buy ${product.name} on ${product.merchantName} (affiliate link, opens in new tab)`}
    >
      {children}
    </a>
  );
}
