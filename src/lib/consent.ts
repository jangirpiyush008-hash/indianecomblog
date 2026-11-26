/**
 * Cookie consent state, stored in a first-party cookie so it works without JavaScript
 * storage and can be read server-side later if needed.
 *
 * Categories:
 *  - necessary: always on (edition preference, consent record, admin login, CDN security)
 *  - analytics: off until the visitor opts in
 *  - marketing: off until the visitor opts in (ads, affiliate/retargeting pixels)
 *
 * Today the site loads no analytics or marketing scripts. Any that are added later must be
 * wrapped in <ConsentGate category="..."> so they only load after opt-in.
 */
export const CONSENT_COOKIE = "tn_consent";
export const CONSENT_VERSION = 1;
/** Re-ask after ~6 months, in line with CNIL guidance. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;
export const CONSENT_EVENT = "tn-consent-change";
export const OPEN_CONSENT_EVENT = "tn-open-consent";

export type ConsentCategory = "analytics" | "marketing";
export type Consent = { v: number; analytics: boolean; marketing: boolean; ts: string };

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!raw) return null;
  try {
    const c = JSON.parse(decodeURIComponent(raw.slice(CONSENT_COOKIE.length + 1))) as Consent;
    return c.v === CONSENT_VERSION ? c : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }): Consent {
  const c: Consent = { v: CONSENT_VERSION, ...choice, ts: new Date().toISOString() };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(c))}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  return c;
}

export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
