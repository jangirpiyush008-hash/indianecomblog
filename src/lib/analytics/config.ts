/**
 * Analytics IDs. Override with environment variables; the defaults are the live
 * TrendNations container and the GA4 property it loads (verified on 27 Nov 2026).
 * Both are public identifiers, not secrets.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NV6TQPPK";
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-KFSKWPYDK3";
