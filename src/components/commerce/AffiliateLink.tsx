"use client";

import { useRef } from "react";
import type { Product } from "@/types/content";
import { linkMode, subIdFor, withSubId, withUtm } from "@/lib/affiliate/links";
import { COMMERCE_COPY } from "@/config/commerce-copy";
import { COUNTRIES } from "@/config/countries";
import { track, trackEcommerce } from "@/lib/analytics/track";
import { toAnalyticsItem } from "@/lib/analytics/items";

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
  const sentRef = useRef(false);
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
    // A plain merchant link: an outbound click, never reported as an affiliate click.
    const outbound = () =>
      track("outbound_click", {
        link_type: "retailer",
        link_domain: safeHost(product.sourceUrl),
        product_id: product.slug,
        product_name: product.name,
        merchant_name: product.merchantName,
        placement,
        article_slug: articleId,
      });
    return (
      <a
        href={withUtm(product.sourceUrl!, articleId ?? `${product.country}-${placement ?? "products"}`, placement ?? "product_card")}
        target="_blank"
        rel="noopener nofollow"
        className={className}
        title={copy.notAffiliate}
        onClick={outbound}
        onAuxClick={outbound}
      >
        {children}
      </a>
    );
  }

  const href = withSubId(product.affiliateUrl!, product.affiliateNetwork, subIdFor(product.country, articleId, placement));

  function onClick() {
    if (sentRef.current) return; // one click = one event, even if click and auxclick both fire
    sentRef.current = true;
    window.setTimeout(() => (sentRef.current = false), 1000);
    const item = toAnalyticsItem(product);
    track("affiliate_click", {
      affiliate_link_id: product.id,
      product_id: product.slug,
      product_name: product.name,
      merchant_name: product.merchantName,
      affiliate_network: product.affiliateNetwork,
      placement,
      article_slug: articleId,
      link_status: "active",
      currency: product.currency,
      link_domain: safeHost(href),
    });
    trackEcommerce("select_item", { item_list_name: placement }, { item_list_name: placement, items: [item] });
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
      onClick={onClick}
      onAuxClick={onClick}
      className={className}
      aria-label={`Buy ${product.name} on ${product.merchantName} (affiliate link, opens in new tab)`}
    >
      {children}
    </a>
  );
}

function safeHost(u?: string) {
  try {
    return u ? new URL(u).hostname : undefined;
  } catch {
    return undefined;
  }
}
