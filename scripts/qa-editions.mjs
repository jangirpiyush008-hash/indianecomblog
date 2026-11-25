#!/usr/bin/env node
/**
 * Country-edition QA: routing, isolation (no leakage), SEO and link integrity.
 * Run against a production server started with TRUST_CF_IPCOUNTRY=1:
 *   TRUST_CF_IPCOUNTRY=1 npx next start -p 3100 &
 *   node scripts/qa-editions.mjs http://localhost:3100
 * Exits non-zero if any critical check fails.
 */
const BASE = process.argv[2] || "http://localhost:3100";
const EDITIONS = ["in", "us", "gb", "ca", "au", "ae", "sa", "de", "fr", "br"];
const LANG = { in: "en-IN", us: "en-US", gb: "en-GB", ca: "en-CA", au: "en-AU", ae: "en-AE", sa: "en-SA", de: "de-DE", fr: "fr-FR", br: "pt-BR" };
const CURRENCY_LEAKS = { "₹": ["in"] }; // symbol -> editions allowed to show it

let pass = 0;
const failures = [];
const check = (name, ok, detail = "") => {
  if (ok) pass++;
  else failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
  console.log(`${ok ? "✓" : "✗"} ${name}${!ok && detail ? ` — ${detail}` : ""}`);
};

const get = (path, { headers = {}, redirect = "manual" } = {}) =>
  fetch(BASE + path, { headers: { "user-agent": "Mozilla/5.0 QA", ...headers }, redirect });

const loc = (r) => (r.headers.get("location") || "").replace(BASE, "");
const mainHtml = (html) => (html.match(/<main[\s\S]*?<\/main>/) || [html])[0];
const hrefs = (html) => [...html.matchAll(/href="([^"#]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));

async function routing() {
  console.log("\n— Routing");
  for (const [iso, cc] of [["IN", "in"], ["US", "us"], ["DE", "de"], ["BR", "br"], ["SA", "sa"], ["AE", "ae"]]) {
    const r = await get("/", { headers: { "cf-ipcountry": iso } });
    check(`Visitor from ${iso} → /${cc}`, r.status === 302 && loc(r) === `/${cc}`, `${r.status} ${loc(r)}`);
  }
  const jp = await get("/", { headers: { "cf-ipcountry": "JP" } });
  check("Unsupported country (JP) sees edition picker", jp.status === 200);
  const none = await get("/");
  check("Missing geo header sees edition picker", none.status === 200);
  const bot = await get("/", { headers: { "cf-ipcountry": "US", "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" } });
  check("Search bots are not geo-redirected", bot.status === 200);

  // Test E: manual switch India -> USA
  const sw = await get("/api/country?cc=us&from=%2Fin%2Fmoney", { headers: { "cf-ipcountry": "IN" } });
  const cookie = sw.headers.get("set-cookie") || "";
  check("Manual switch IN→US lands on US money desk", sw.status === 302 && loc(sw) === "/us/money", loc(sw));
  check("Manual switch stores preference cookie", /tn_country=us/.test(cookie));
  // Test F: preference retained over geolocation
  const back = await get("/", { headers: { "cf-ipcountry": "IN", cookie: "tn_country=us" } });
  check("Saved US preference overrides Indian IP", back.status === 302 && loc(back) === "/us", loc(back));
  // Localized section mapping
  const de = await get("/api/country?cc=de&from=%2Fus%2Fdeals");
  check("Switch US deals → German 'angebote'", loc(de) === "/de/angebote", loc(de));
  const art = await get("/api/country?cc=fr&from=%2Fus%2Fmoney%2Ffree-credit-report-and-credit-freeze");
  check("Switch from US article → French money desk (no unrelated article)", loc(art) === "/fr/argent", loc(art));
  const evil = await get("/api/country?cc=us&from=https%3A%2F%2Fevil.example");
  check("Switch never redirects off-site", loc(evil).startsWith("/us"), loc(evil));
  // Test G: direct US URL from India IP is not redirected
  const direct = await get("/us/money/free-credit-report-and-credit-freeze", { headers: { "cf-ipcountry": "IN" } });
  check("Direct US article from Indian IP stays (no forced redirect)", direct.status === 200);
  // No loops: edition homepages never redirect
  for (const cc of EDITIONS) {
    const r = await get(`/${cc}`, { headers: { "cf-ipcountry": "US", cookie: "tn_country=de" } });
    if (r.status !== 200) check(`/${cc} never redirects`, false, String(r.status));
  }
  check("Edition homepages never redirect (loop-proof)", true);
}

async function sitemapUrls() {
  const idx = await (await get("/sitemap.xml")).text();
  const files = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
  check("Sitemap index lists global + 10 edition sitemaps", files.length === 11, String(files.length));
  const perEdition = {};
  const alternates = new Set();
  for (const f of files) {
    const xml = await (await get(f)).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
    [...xml.matchAll(/hreflang="[^"]+" href="([^"]+)"/g)].forEach((m) => alternates.add(m[1].replace(/^https?:\/\/[^/]+/, "")));
    const cc = f.match(/\/sitemaps\/([a-z]+)\.xml/)[1];
    perEdition[cc] = locs;
    if (cc !== "global") {
      const foreign = locs.filter((l) => !l.startsWith(`/${cc}`));
      check(`Sitemap ${cc}.xml only lists /${cc} URLs`, foreign.length === 0, foreign.slice(0, 3).join(", "));
    }
  }
  return { perEdition, alternates: [...alternates] };
}

async function pages(perEdition, alternates) {
  console.log("\n— Pages, isolation and SEO");
  const seen = new Map();
  const status = async (p) => {
    if (!seen.has(p)) seen.set(p, (await get(p)).status);
    return seen.get(p);
  };
  for (const [cc, urls] of Object.entries(perEdition)) {
    if (cc === "global") continue;
    let leaks = [], h1s = [], canon = [], langs = [], cur = [], aff = [];
    for (const u of urls) {
      const r = await get(u);
      seen.set(u, r.status);
      if (r.status !== 200) { leaks.push(`${u} → ${r.status}`); continue; }
      const html = await r.text();
      const main = mainHtml(html);
      const h1 = (html.match(/<h1[\s>]/g) || []).length;
      if (h1 !== 1) h1s.push(`${u} (${h1})`);
      const c = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]?.replace(/^https?:\/\/[^/]+/, "");
      if (c !== u) canon.push(`${u} → ${c}`);
      if (!html.includes(`<html lang="${LANG[cc]}"`)) langs.push(u);
      // Cross-edition links inside the main content (header/footer edition lists excluded)
      for (const h of hrefs(main)) {
        const m = h.match(/^\/([a-z]{2})(\/|$)/);
        if (m && EDITIONS.includes(m[1]) && m[1] !== cc) leaks.push(`${u} links to ${h}`);
      }
      for (const [sym, allowed] of Object.entries(CURRENCY_LEAKS)) if (!allowed.includes(cc) && main.includes(sym)) cur.push(`${u} shows ${sym}`);
      const affLinks = hrefs(main).filter((h) => /linkredirect\.in|earnkaro|bitli\.in/.test(h));
      if (cc !== "in" && affLinks.length) aff.push(`${u}: ${affLinks[0]}`);
      if (affLinks.some((h) => /bitli\.in/.test(h))) aff.push(`${u} uses a short link`);
    }
    check(`[${cc}] all sitemap pages return 200 with no cross-edition links`, leaks.length === 0, leaks.slice(0, 3).join(" | "));
    check(`[${cc}] exactly one H1 per page`, h1s.length === 0, h1s.slice(0, 3).join(", "));
    check(`[${cc}] self-referencing canonicals`, canon.length === 0, canon.slice(0, 3).join(", "));
    check(`[${cc}] <html lang="${LANG[cc]}">`, langs.length === 0, langs.slice(0, 2).join(", "));
    check(`[${cc}] no foreign currency`, cur.length === 0, cur.slice(0, 2).join(", "));
    check(`[${cc}] affiliate links valid for edition`, aff.length === 0, aff.slice(0, 2).join(", "));
  }
  const bad = [];
  for (const a of alternates) if ((await status(a)) !== 200) bad.push(a);
  check("Every hreflang alternate resolves (200)", bad.length === 0, bad.slice(0, 3).join(", "));

  // Test H: related articles from a US article stay in the US edition
  const us = await (await get("/us/money/free-credit-report-and-credit-freeze")).text();
  const foreign = hrefs(mainHtml(us)).filter((h) => /^\/(in|gb|ca|au|ae|sa|de|fr|br)\//.test(h));
  check("US article links only to US content", foreign.length === 0, foreign.join(", "));

  // Localized navigation
  const de = await (await get("/de")).text();
  check("German edition has German navigation", de.includes(">Technologie<") && de.includes(">Finanzen<"));
  const br = await (await get("/br")).text();
  check("Brazil edition has Portuguese navigation", br.includes(">Tecnologia<") && br.includes(">Dinheiro<"));
  const deDeals = await (await get("/de/angebote")).text();
  check("German deals page shows no INR products", !deDeals.includes("₹") && !deDeals.includes("linkredirect.in"));

  // Wrong-country article URLs must 404 (isolation at the routing layer)
  const wrong = await get("/us/money/upi-circle-explained");
  check("India article under /us/ returns 404", wrong.status === 404, String(wrong.status));
  const wrongDesk = await get("/in/technology/upi-circle-explained");
  check("Article under the wrong desk returns 404", wrongDesk.status === 404, String(wrongDesk.status));
  const unknown = await get("/xx");
  check("Unknown edition returns 404", unknown.status === 404, String(unknown.status));
  const old = await get("/money/upi-circle-explained");
  check("Old India URL 301/308-redirects to /in/", [301, 308].includes(old.status) && loc(old) === "/in/money/upi-circle-explained", `${old.status} ${loc(old)}`);

  // Admin is never indexable
  const robots = await (await get("/robots.txt")).text();
  check("robots.txt blocks /admin and /api", robots.includes("Disallow: /admin") && robots.includes("Disallow: /api"));
}

await routing();
const { perEdition, alternates } = await sitemapUrls();
await pages(perEdition, alternates);

console.log(`\n${pass} passed, ${failures.length} failed`);
if (failures.length) {
  console.log("\nFailures:\n- " + failures.join("\n- "));
  process.exit(1);
}
