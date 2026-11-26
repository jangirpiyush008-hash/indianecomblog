import Script from "next/script";
import { CONSENT_COOKIE, CONSENT_VERSION } from "@/lib/consent";
import { GTM_ID } from "@/lib/analytics/config";

export { GTM_ID };

/**
 * Google Tag Manager with Google Consent Mode v2.
 *
 * One inline script, so the order is guaranteed: consent defaults are set to "denied"
 * BEFORE gtm.js loads, then any choice already saved in the tn_consent cookie is applied.
 * Tags in the container therefore can't set analytics or advertising cookies until the
 * visitor opts in through our consent banner (see lib/consent.ts, which sends updates).
 *
 * The <noscript> iframe from Google's default snippet is intentionally omitted: without
 * JavaScript the visitor can't give consent, so nothing should load for them.
 */
export function GoogleTagManager() {
  const code = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
try {
  var m = document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);
  var c = m ? JSON.parse(decodeURIComponent(m[1])) : null;
  if (c && c.v === ${CONSENT_VERSION}) {
    var a = c.analytics ? 'granted' : 'denied', k = c.marketing ? 'granted' : 'denied';
    gtag('consent', 'update', { analytics_storage: a, ad_storage: k, ad_user_data: k, ad_personalization: k });
  }
} catch (e) {}
gtag('js', new Date());
dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
(function(){
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
  document.head.appendChild(s);
})();
`;
  return <Script id="gtm-consent-mode" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: code }} />;
}
