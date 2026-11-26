# TrendNations analytics & tracking

Last updated: 27 November 2026.

## 1. What's installed

| Piece | Where | Status |
|---|---|---|
| Google Tag Manager `GTM-NV6TQPPK` | `src/components/analytics/GoogleTagManager.tsx`, loaded in all three root layouts (editions, global pages, 404). Not loaded in `/admin`. | **Live, verified** on trendnations.com |
| GA4 property `G-KFSKWPYDK3` | Configured **inside** the GTM container (not in code) | **Live, verified**: `page_view` hits reach `google-analytics.com/g/collect` after consent |
| Google Consent Mode v2 | Same inline script: defaults set to `denied` *before* `gtm.js` loads; saved choice applied on load | **Live, verified** |
| Cookie banner | `src/components/consent/*`, `src/lib/consent.ts` | **Live** in 5 languages |
| dataLayer events | `src/lib/analytics/track.ts` (only writer to the dataLayer) | In code; GTM tags still to be created (§5) |
| Admin analytics | `/admin/analytics` | First-party data live; GA4/GSC APIs not connected |
| Cloudflare Web Analytics (RUM) | Injected by Cloudflare (`/cdn-cgi/rum`) | Cookieless; independent of GTM |

IDs are configurable: `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (defaults in `src/lib/analytics/config.ts`). They are public identifiers, not secrets.

**No duplicates:** the only Google tag in the code is the single GTM container. GA4 must not also be added with `gtag('config', …)` in code.

`noscript` iframe fallback: **deliberately omitted**. Without JavaScript a visitor can't give consent, so nothing should load.

## 2. Country logic

Every event carries the **edition** context, derived from the URL by `pageContextFromPath()` (`src/lib/analytics/context.ts`) — never from the visitor's IP. An Indian visitor reading `/us/...` is reported under the US edition. Visitor geography stays available through GA4's own geo reports.

Parameters on every event: `country_code` (ISO, e.g. `GB`; `GLOBAL` for global pages), `country_name`, `locale`, `currency`, `edition_path`, `page_type`, `page_category`.

`page_type` values: `edition_picker`, `homepage`, `trending`, `category`, `deals`, `buying_guides`, `search`, `article`, `tag`, `author`, `information`, `not_found`.

Editions: in, us, gb, ca, au, ae, **sa** (Saudi Arabia), de, fr, br. There is no Japan edition; it was replaced by Saudi Arabia.

## 3. Consent

- Defaults: `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` = **denied**; `functionality_storage`, `security_storage` = granted.
- "Accept all" grants all four; "Reject all" keeps them denied; "Customise" maps **Analytics** → `analytics_storage`, **Marketing** → `ad_storage` + `ad_user_data` + `ad_personalization`.
- Each change sends `gtag('consent','update', …)` and pushes `tn_consent_update`.
- The choice is stored in the `tn_consent` cookie for about 6 months (`CONSENT_VERSION` 2). The footer has a "Cookie settings" link in every edition.
- The same banner is shown in every edition (strictest-common-denominator approach for GDPR/UK GDPR/LGPD; also fine for India, UAE, Saudi, Canada, Australia, US).

**Mode decision (needs your action in GTM):** as installed, GA4 runs in *Advanced* Consent Mode — before consent it may send cookieless pings. Several EU/UK regulators consider even these to need consent. **Recommended:** switch to *Basic* mode by opening each GA4 tag in GTM → Advanced Settings → Consent Settings → "Require additional consent for tag to fire" → `analytics_storage`. Then nothing is sent to Google until the visitor accepts.

## 4. Event matrix

| Event | Trigger | Key parameters | Country-aware | Status |
|---|---|---|---|---|
| `tn_page_view` | First load + every client-side route change (once per URL) | `page_location`, `page_path`, `page_title`, `page_referrer` | Yes | **Tested locally**: one per URL on load and client-side navigation, correct title, referrer and country (FR, IN, DE, US) |
| GA4 `page_view` | Currently GA4's automatic page view | — | Via §5 | **Live, verified** |
| `article_view` | Article page load | `article_id`, `article_title`, `article_slug`, `article_category`, `author_name`, `publication_date`, `reading_time`, `content_type` | Yes | **Tested locally** (US and India articles) |
| `article_read_start` | 10 s on page or first 10% of article scrolled | + `trigger` | Yes | **Tested locally** |
| `article_scroll_25/50/75/90` | Each milestone once, measured on the article body | + `percent_scrolled` | Yes | **Tested locally**: 25/50/75/90 each once (GB article) |
| `article_read_complete` | 90% of body + at least 30 s | + `engagement_seconds` | Yes | **Tested locally**: fired at 30 s |
| `article_share` | Share button / native share / copy link | `method`, `article_slug` | Yes | In code |
| `view_item_list` | Product grid at least 50% visible, once | `item_list_id`, `item_list_name`, `ecommerce.items[]` | Yes | In code — not yet tested (the test browser pauses visibility callbacks; check in GTM Preview) |
| `select_item` | Affiliate product click | `ecommerce.items[]` | Yes | **Tested locally**: INR item with verified price |
| `affiliate_click` | Click on an **active** affiliate link only | `affiliate_link_id`, `product_id`, `product_name`, `merchant_name`, `affiliate_network`, `placement`, `article_slug`, `link_status`, `currency`, `link_domain` | Yes | **Tested locally**: India EarnKaro product, placement `in-article` |
| `outbound_click` | Click on a plain retailer link (not affiliate) | `link_type=retailer`, `link_domain`, `product_id`, `merchant_name`, `placement` | Yes | In code — not yet tested (no retailer-only products yet) |
| — | Disabled "Link coming soon" buttons | Never tracked | — | By design |
| `newsletter_signup_start` | First focus in a newsletter form | `form_id`, `form_type`, `form_location` | Yes | **Tested locally**: fires once |
| `newsletter_signup_success` / `_error` | After the API confirms / fails | same | Yes | In code — not yet tested (local server has no database) |
| `contact_form_start` / `_success` / `_error` | Same pattern | same | Yes | In code — not yet tested |
| `search` / `search_no_results` | Edition search results page | `search_term` (emails and long numbers stripped), `results_count` | Yes | **Tested locally** (DE search) |
| `country_switch` | Edition chosen in the header switcher | `from_edition`, `to_edition` | Yes | **Tested locally** |
| `tn_consent_update` | Consent saved | `tn_analytics`, `tn_marketing` | — | Live |

Item objects: `item_id` (product slug, same everywhere), `item_name`, `item_brand`, `item_category`, `affiliation` (merchant), `currency` (the product's real currency), and `price` **only when verified**.

Privacy: `track()` drops keys like email/phone/password/token/message, and redacts email addresses and long digit sequences in values. No form contents are sent.

Product pages: the site has no separate product detail pages (products appear in guides, shopping and deals), so `view_item` isn't used. If product pages are added, fire `view_item` from them.

## 5. GTM setup to do (needs your login to tagmanager.google.com)

1. **Variables** (Data Layer Variable, version 2): `country_code`, `country_name`, `locale`, `currency`, `edition_path`, `page_type`, `page_category`, `page_location`, `page_title`, `page_referrer`, `article_id`, `article_title`, `article_slug`, `article_category`, `author_name`, `publication_date`, `reading_time`, `content_type`, `percent_scrolled`, `engagement_seconds`, `method`, `affiliate_link_id`, `product_id`, `product_name`, `merchant_name`, `affiliate_network`, `placement`, `link_status`, `link_type`, `link_domain`, `form_id`, `form_type`, `form_location`, `search_term`, `results_count`, `from_edition`, `to_edition`, `item_list_id`, `item_list_name`.
2. **One page-view strategy:**
   - In the GA4 Google tag, set `send_page_view` = false.
   - In GA4 → Admin → Data streams → Enhanced measurement → Page views → advanced, turn **off** "Page changes based on browser history events".
   - Create a GA4 Event tag `page_view` on Custom Event trigger `tn_page_view`, sending the page and country parameters.
3. **Event tags:** one GA4 Event tag per custom event (or one tag with event name `{{Event}}` on a trigger matching the regex `^(article_.*|affiliate_click|outbound_click|newsletter_signup_.*|contact_form_.*|search|search_no_results|country_switch)$`), passing the parameters above.
4. **Ecommerce:** GA4 Event tags for `view_item_list` and `select_item` with "Send Ecommerce data" → Data Layer.
5. **Custom dimensions in GA4** (Admin → Custom definitions): event-scoped `country_code`, `page_type`, `page_category`, `article_category`, `author_name`, `placement`, `merchant_name`, `affiliate_network`, `form_location`.
6. **Key events (conversions):** mark `newsletter_signup_success`, `contact_form_success` and `affiliate_click` as key events. Don't mark page views or product views.
7. **Consent:** switch to Basic mode as described in §3 (recommended).
8. **Internal traffic:** GA4 → Data streams → Configure tag settings → Define internal traffic (your IP), then activate the "Internal traffic" data filter. `/admin` never loads GTM.
9. Publish the container, then test in **GTM Preview** + **GA4 DebugView** (§8).

## 6. UTM & attribution

GA4's native attribution handles `utm_*`, `gclid`, `dclid`, `wbraid` and `gbraid` from the landing URL and keeps them for the session. No custom code rewrites them.
- Internal links never get UTMs.
- Affiliate links keep their network parameters; sub-IDs are added only for networks that support them (`src/lib/affiliate/links.ts`).
- Channel grouping (Organic Search, Paid, Social, Email, Affiliate, …) is GA4's default channel group. For "Affiliate", use `utm_medium=affiliate` on your own partner campaigns.
- Country breakdown: report by the `country_code` custom dimension.

## 7. Google Ads & Search Console readiness

- **Ads:** none configured; no conversion IDs exist yet. When you create them, add a Conversion Linker tag + Google Ads Conversion tags in GTM on `newsletter_signup_success`, `contact_form_success` and `affiliate_click`. Leave remarketing off unless `ad_personalization` is granted; Consent Mode already passes the signals.
- **Search Console:** trendnations.com is verified (domain TXT). To show GSC data in `/admin/analytics`, set `GSC_SITE_URL=sc-domain:trendnations.com` and `GOOGLE_SERVICE_ACCOUNT_JSON`, and add the service account as a user in Search Console.
- **GA4 Data API for the admin page:** set `GA4_PROPERTY_ID` (numeric property ID) and `GOOGLE_SERVICE_ACCOUNT_JSON` on Railway (server-only), and add the service account as Viewer on the GA4 property. Credentials are never sent to the browser.

## 8. Testing checklist

In the browser console: `dataLayer.filter(e => e.event)`.

| Test | Expected |
|---|---|
| Fresh visit (no `tn_consent`) | Banner; consent defaults denied; no `_ga` cookies |
| Reject all | Still no `_ga` cookies; `tn_consent_update` with false/false |
| Accept all | `consent update` granted; `_ga`, `_ga_KFSKWPYDK3` set; `g/collect` hit with `gcs=G111` |
| Navigate between pages | One `tn_page_view` per URL |
| Open an article, scroll | `article_view`, then `article_read_start`, then `article_scroll_*` once each |
| `/in` deals grid in view | One `view_item_list` with INR items |
| Click a product button (India) | `affiliate_click` + `select_item` |
| Search on `/de/suche?q=…` | `search` with `results_count` |
| Newsletter sign-up | `_start` on focus; `_success` only after the API responds OK |
| Change edition in header | `country_switch` |

## 9. Known limitations

- Custom events reach GA4 only after the GTM tags in §5 are created and published.
- GA4/Search Console numbers in the admin page need API credentials (§7).
- Newsletter sign-ups and contact messages aren't stored with a country, so the admin page shows them across all editions.
- `article_related_click`, `view_promotion` and `select_promotion` aren't wired yet; the site has no promotions or wishlist.
