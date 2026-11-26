import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { AdminCountryPicker } from "@/components/admin/AdminCountryPicker";
import { CheckCircle2, CircleDashed, AlertCircle } from "lucide-react";
import { ALL_COUNTRIES, COUNTRIES, isCountryCode, type CountryCode } from "@/config/countries";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { GA4_MEASUREMENT_ID, GTM_ID } from "@/lib/analytics/config";

export const metadata = { title: "Analytics — Admin" };
export const dynamic = "force-dynamic";

const RANGES = { "7": "Last 7 days", "28": "Last 28 days", "90": "Last 90 days" } as const;
type Range = keyof typeof RANGES;

type Click = { product_slug: string | null; country_code: string | null; network: string | null; article_slug: string | null; campaign: string | null; clicked_at: string };

/**
 * Admin analytics. First-party numbers (affiliate clicks, newsletter sign-ups, contact
 * messages) come from our own database and are real. GA4 and Search Console figures need
 * their APIs connected with server-side credentials; until then this page says so instead
 * of showing placeholder numbers.
 */
export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<{ country?: string; range?: string }> }) {
  const sp = await searchParams;
  const active: CountryCode | undefined = isCountryCode(sp.country) ? sp.country : undefined;
  const range: Range = sp.range && sp.range in RANGES ? (sp.range as Range) : "28";
  const data = await loadFirstParty(Number(range), active);
  const ga4Api = Boolean(process.env.GA4_PROPERTY_ID && process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const gscApi = Boolean(process.env.GSC_SITE_URL && process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

  const qs = (r: string) => `/admin/analytics?range=${r}${active ? `&country=${active}` : ""}`;

  return (
    <>
      <AdminPageHeader eyebrow="Audience" title="Analytics" description="Tracking status, affiliate clicks, sign-ups and enquiries — real data only." />
      <div className="p-6 lg:p-10 space-y-10">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <AdminCountryPicker active={active} basePath="/admin/analytics" />
          <div className="flex gap-2">
            {(Object.keys(RANGES) as Range[]).map((r) => (
              <Link key={r} href={qs(r)} className={`px-3 py-1.5 text-sm border ${r === range ? "bg-ink text-cream border-ink" : "border-line hover:border-ink"}`}>
                {RANGES[r]}
              </Link>
            ))}
          </div>
        </div>

        <section>
          <h2 className="font-editorial text-2xl font-semibold mb-4">Tracking status</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            <Status ok label="Google Tag Manager" detail={`${GTM_ID} on every public page, all editions`} />
            <Status ok label="Consent Mode v2" detail="Defaults denied; cookie banner sends updates" />
            <Status ok label="GA4 property" detail={`${GA4_MEASUREMENT_ID} fires through GTM (verified live)`} />
            <Status ok label="Site events in dataLayer" detail="Page views, articles, products, affiliate, forms, search" />
            <Status warn label="GTM tags for custom events" detail="Need to be set up in the GTM web interface — see docs/analytics-tracking.md" />
            <Status ok={ga4Api} label="GA4 Data API (reports here)" detail={ga4Api ? "Connected" : "Not connected — needs GA4_PROPERTY_ID and a service account"} />
            <Status ok={gscApi} label="Search Console API" detail={gscApi ? "Connected" : "Not connected — property verified; API needs a service account"} />
            <Status ok={data.ok} label="First-party click & form logs" detail={data.ok ? "Reading from Supabase" : "Supabase service key missing"} />
          </ul>
        </section>

        <section>
          <h2 className="font-editorial text-2xl font-semibold mb-1">First-party numbers</h2>
          <p className="text-sm text-ink-60 mb-5">{RANGES[range]}{active ? ` · ${COUNTRIES[active].name}` : " · all editions"}. Counted on our own server, so they include visitors who declined analytics cookies.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Affiliate clicks" value={data.clicks.length} />
            <Stat label="Newsletter sign-ups" value={data.signups} note={active ? "All editions (not tagged by country)" : undefined} />
            <Stat label="Contact messages" value={data.contacts} note={active ? "All editions (not tagged by country)" : undefined} />
            <Stat label="Products clicked" value={new Set(data.clicks.map((c) => c.product_slug)).size} />
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <Breakdown title="Affiliate clicks by edition" rows={count(data.clicks, (c) => (c.country_code ? `${COUNTRIES[c.country_code as CountryCode]?.flag ?? ""} ${c.country_code.toUpperCase()}` : "Unknown"))} />
          <Breakdown title="By network" rows={count(data.clicks, (c) => c.network ?? "Unknown")} />
          <Breakdown title="By product" rows={count(data.clicks, (c) => c.product_slug ?? "Unknown")} />
          <Breakdown title="By placement" rows={count(data.clicks, (c) => c.campaign?.split(":").pop() || "Unknown")} />
          <Breakdown title="By article" rows={count(data.clicks.filter((c) => c.article_slug), (c) => c.article_slug!)} empty="No clicks from inside articles yet." />
        </section>

        <section className="p-6 bg-cream-100 border border-line">
          <h2 className="font-editorial text-xl font-semibold mb-2">Traffic, readership and SEO reports</h2>
          <p className="text-sm text-ink-60 max-w-3xl">
            Users, sessions, engagement, top articles, traffic sources and scroll completion live in GA4; organic clicks, impressions and queries live in
            Search Console. Open them directly until the APIs are connected:{" "}
            <a className="underline" href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">Google Analytics</a> ·{" "}
            <a className="underline" href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">Search Console</a> ·{" "}
            <a className="underline" href="https://tagmanager.google.com/" target="_blank" rel="noopener noreferrer">Tag Manager</a>. Editions available: {ALL_COUNTRIES.map((c) => c.flag).join(" ")}
          </p>
        </section>
      </div>
    </>
  );
}

async function loadFirstParty(days: number, country?: CountryCode) {
  const since = new Date(Date.now() - days * 86400_000).toISOString();
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return { ok: false, clicks: [] as Click[], signups: 0, contacts: 0 };
  try {
    const db = createSupabaseServiceClient();
    let q = db.from("affiliate_clicks").select("product_slug,country_code,network,article_slug,campaign,clicked_at").gte("clicked_at", since).limit(10000);
    if (country) q = q.eq("country_code", country);
    const [clicks, subs, msgs] = await Promise.all([
      q,
      db.from("newsletter_subscribers").select("id", { count: "exact", head: true }).gte("created_at", since),
      db.from("contact_messages").select("id", { count: "exact", head: true }).gte("created_at", since),
    ]);
    return { ok: true, clicks: (clicks.data ?? []) as Click[], signups: subs.count ?? 0, contacts: msgs.count ?? 0 };
  } catch {
    return { ok: false, clicks: [] as Click[], signups: 0, contacts: 0 };
  }
}

function count<T>(rows: T[], key: (r: T) => string) {
  const m = new Map<string, number>();
  for (const r of rows) m.set(key(r), (m.get(key(r)) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
}

function Status({ ok, warn, label, detail }: { ok?: boolean; warn?: boolean; label: string; detail: string }) {
  const Icon = warn ? AlertCircle : ok ? CheckCircle2 : CircleDashed;
  return (
    <li className="flex gap-3 p-4 bg-paper border border-line">
      <Icon className={`h-5 w-5 shrink-0 ${warn ? "text-accent" : ok ? "text-green-700" : "text-ink-40"}`} />
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-ink-60">{detail}</div>
      </div>
    </li>
  );
}

function Stat({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="p-5 bg-paper border border-line">
      <div className="font-editorial text-3xl font-semibold">{value.toLocaleString("en-IN")}</div>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mt-1">{label}</div>
      {note && <div className="text-xs text-ink-60 mt-1">{note}</div>}
    </div>
  );
}

function Breakdown({ title, rows, empty = "No clicks in this period." }: { title: string; rows: [string, number][]; empty?: string }) {
  return (
    <div>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-3">{title}</h3>
      {rows.length ? (
        <ul className="divide-y divide-line border-y border-line">
          {rows.map(([k, v]) => (
            <li key={k} className="flex justify-between py-2 text-sm">
              <span className="truncate pr-4">{k}</span>
              <span className="font-semibold">{v}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink-60">{empty}</p>
      )}
    </div>
  );
}
