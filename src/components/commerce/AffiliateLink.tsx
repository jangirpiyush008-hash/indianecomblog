"use client";

import type { Product } from "@/types/content";
import { linkMode, subIdFor, withSubId } from "@/lib/affiliate/links";
import { COMMERCE_COPY } from "@/config/commerce-copy";
import { COUNTRIES } from "@/config/countries";

/**
 * Outbound product button.
 *  - Affiliate link: the full tracking URL (no shorteners, no internal redirect), rel="sponsored";
 *    the click is logged with a beacon so navigation is never delayed.
 *  - No affiliate link yet: a plain link to the verified merchant page, labelled as not an affiliate link.
 *  - Nothing verified: a disabled "Link coming soon" state — never a broken or invented URL.
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
  const mode = linkMode(product);
  const copy = COMMERCE_COPY[COUNTRIES[product.country].lang];

  if (mode === "pending") {
    return (
      <span aria-disabled="true" className={`${className ?? ""} !bg-cream-200 !text-ink-40 cursor-not-allowed`}>
        {copy.comingSoon}
      </span>
    );
  }

  if (mode === "retailer") {
    return (
      <a href={product.sourceUrl} target="_blank" rel="noopener nofollow" className={className} title={copy.notAffiliate}>
        {children}
      </a>
    );
  }

  const href = withSubId(product.affiliateUrl!, product.affiliateNetwork, subIdFor(product.country, articleId, placement));

  function track() {
    try {
      const body = JSON.stringify({
        productSlug: product.slug,
        country: product.country,
        network: product.affiliateNetwork,
        articleId,
        merchant: product.merchant,
        campaign: placement,
        destinationUrl: href,
      });
      navigator.sendBeacon?.("/api/affiliate/click", new Blob([body], { type: "application/json" }));
    } catch {
      /* never block the click */
    }
  }

  return (
    <a
      href={href}
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
