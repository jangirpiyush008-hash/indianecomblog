import { pageContextFromPath } from "./context";

/**
 * Central analytics API. Components call track(); nothing else writes to the dataLayer.
 *
 * Events are only pushed to the dataLayer. Whether anything is sent to Google is decided
 * by Google Tag Manager under Consent Mode v2 (defaults denied until the visitor opts in).
 * Every event automatically carries the edition's country context.
 */
export type AnalyticsEvent =
  | "tn_page_view"
  | "article_view"
  | "article_read_start"
  | "article_scroll_25"
  | "article_scroll_50"
  | "article_scroll_75"
  | "article_scroll_90"
  | "article_read_complete"
  | "article_share"
  | "article_related_click"
  | "view_item_list"
  | "select_item"
  | "affiliate_click"
  | "outbound_click"
  | "newsletter_signup_start"
  | "newsletter_signup_success"
  | "newsletter_signup_error"
  | "contact_form_start"
  | "contact_form_success"
  | "contact_form_error"
  | "search"
  | "search_no_results"
  | "country_switch";

type Params = Record<string, unknown>;
type W = Window & { dataLayer?: unknown[] };

const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
// 9+ digits, optionally separated: phone and card numbers. Dates like 2026-11-27 (8 digits) are kept.
const LONG_NUMBER = /\b(?:\d[\s-]?){8,}\d\b/g;
const BLOCKED_KEYS = /email|phone|password|token|address|name_full|message/i;

/** Strips anything that could be personal data before it reaches the dataLayer. */
export function sanitize(params: Params): Params {
  const out: Params = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    if (BLOCKED_KEYS.test(k)) continue;
    out[k] = typeof v === "string" ? v.replace(EMAIL, "[redacted]").replace(LONG_NUMBER, "[redacted]").slice(0, 300) : v;
  }
  return out;
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...pageContextFromPath(window.location.pathname), ...sanitize(params) });
}

/** GA4 ecommerce events must clear the previous ecommerce object first (Google's guidance). */
export function trackEcommerce(event: "view_item_list" | "select_item", params: Params, ecommerce: Params) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ ecommerce: null });
  w.dataLayer.push({ event, ...pageContextFromPath(window.location.pathname), ...sanitize(params), ecommerce });
}

/** Search terms are kept only if they contain no personal data; capped and lower-cased. */
export const safeSearchTerm = (q: string) =>
  q.replace(EMAIL, "").replace(LONG_NUMBER, "").trim().toLowerCase().slice(0, 100);
