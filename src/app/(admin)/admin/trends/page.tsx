import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Sparkles, RefreshCw, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { sampleTrends } from "@/lib/sample-content";
import { formatRelativeTime, cn } from "@/lib/utils";

export const metadata = { title: "Trend Radar — Admin" };

const scoringBreakdown = [
  { label: "Trend growth", weight: 20, note: "Velocity of mentions + search interest" },
  { label: "India relevance", weight: 15, note: "India-specific signal + geo distribution" },
  { label: "Search demand", weight: 15, note: "Current monthly volume + trend direction" },
  { label: "Commercial intent", weight: 15, note: "Buying signals, product mentions, prices" },
  { label: "Competition opportunity", weight: 10, note: "SERP weakness + content gap" },
  { label: "Affiliate potential", weight: 10, note: "Commission rate × conversion likelihood" },
  { label: "Content opportunity", weight: 10, note: "Angles not yet covered well" },
  { label: "Freshness", weight: 5, note: "How new the signal is" },
];

export default function TrendRadarPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Trend Radar · Live"
        title="What India is about to want"
        description="Discovered from Google Trends, news feeds, Reddit, YouTube, brand releases and e-commerce signals."
        actions={
          <>
            <Button variant="soft" size="md" shape="soft">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="primary" size="md" shape="soft">
              <RefreshCw className="h-4 w-4" />
              Pull now
            </Button>
          </>
        }
      />

      <div className="p-6 lg:p-10 space-y-10">
        {/* Snapshot */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Tracked topics", value: "1,247" },
            { label: "Rising (24h)", value: "83" },
            { label: "Last update", value: "4 min ago" },
            { label: "Data sources", value: "22" },
          ].map((s) => (
            <div key={s.label} className="p-5 bg-paper border border-line">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-2">
                {s.label}
              </div>
              <div className="font-editorial text-3xl font-semibold text-ink">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Top trends table */}
        <div className="bg-paper border border-line">
          <div className="p-5 border-b border-line flex items-center justify-between">
            <div>
              <h3 className="font-editorial text-xl font-semibold">Top trends right now</h3>
              <p className="text-xs text-ink-60 mt-1">Ranked by interest score</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border border-line text-sm bg-cream focus:outline-none">
                <option>All categories</option>
                <option>Technology</option>
                <option>AI Tools</option>
                <option>Shopping</option>
                <option>Money</option>
                <option>Lifestyle</option>
                <option>Entertainment</option>
                <option>Travel</option>
              </select>
              <select className="px-3 py-2 border border-line text-sm bg-cream focus:outline-none">
                <option>Last 24 hours</option>
                <option>Last hour</option>
                <option>This week</option>
                <option>This month</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-line">
            {sampleTrends.map((t, i) => {
              const DirIcon =
                t.direction === "up" ? TrendingUp : t.direction === "down" ? TrendingDown : Minus;
              const dirColor =
                t.direction === "up"
                  ? "text-success"
                  : t.direction === "down"
                  ? "text-danger"
                  : "text-ink-40";
              return (
                <div
                  key={t.id}
                  className="grid md:grid-cols-12 items-center gap-4 p-5 hover:bg-cream-100 transition"
                >
                  <div className="md:col-span-1">
                    <span className="font-editorial text-2xl font-semibold text-ink-40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent font-semibold">
                        {t.categoryName}
                      </span>
                      <span className="font-mono text-[10px] text-ink-40">·</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">
                        {formatRelativeTime(t.discoveredAt)}
                      </span>
                    </div>
                    <h4 className="font-editorial text-lg font-semibold text-ink leading-tight">
                      {t.topic}
                    </h4>
                    <p className="text-sm text-ink-60 mt-1 line-clamp-2">{t.summary}</p>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                      <DirIcon className={cn("h-4 w-4", dirColor)} />
                      <span className={cn("font-mono text-[11px] uppercase tracking-[0.15em] font-semibold", dirColor)}>
                        {t.direction === "up" ? "Rising" : t.direction === "down" ? "Falling" : "Steady"}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-1 text-right">
                    <div className="font-editorial text-3xl font-semibold text-accent leading-none">
                      {t.interestScore}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40 mt-1">
                      score
                    </div>
                  </div>
                  <div className="md:col-span-3 flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/trends/${t.id}`}
                      className="px-3 py-1.5 border border-line text-xs font-medium hover:border-ink"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/admin/generate?trend=${t.id}`}
                      className="px-3 py-1.5 bg-ink text-cream text-xs font-medium hover:bg-accent inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="h-3 w-3" />
                      Generate
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scoring methodology */}
        <div className="bg-paper border border-line p-8">
          <h3 className="font-editorial text-xl font-semibold mb-2">How trends are scored</h3>
          <p className="text-sm text-ink-60 mb-6">
            Every trend scores out of 100 across 8 factors. Confidence is shown alongside each score — missing data lowers confidence, never inflates the score.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scoringBreakdown.map((s) => (
              <div key={s.label} className="border-l-2 border-accent pl-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-editorial text-2xl font-semibold text-ink">{s.weight}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">weight</span>
                </div>
                <div className="font-medium text-sm mt-2">{s.label}</div>
                <div className="text-xs text-ink-60 mt-1">{s.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data sources */}
        <div>
          <h3 className="font-editorial text-xl font-semibold mb-4">Data sources</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { name: "Google Trends India", status: "Active", last: "4 min ago" },
              { name: "Google News (NewsAPI)", status: "Active", last: "8 min ago" },
              { name: "Reddit (India subreddits)", status: "Active", last: "12 min ago" },
              { name: "YouTube Data API", status: "Needs key", last: "—" },
              { name: "Amazon Bestsellers", status: "Active", last: "1 hour ago" },
              { name: "Flipkart deals feed", status: "Active", last: "1 hour ago" },
              { name: "Ahrefs Keywords", status: "Active", last: "6 hours ago" },
              { name: "DataForSEO SERP", status: "Active", last: "6 hours ago" },
              { name: "Editorial submissions", status: "Active", last: "Manual" },
            ].map((s) => (
              <div key={s.name} className="p-4 bg-paper border border-line">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-sm">{s.name}</div>
                    <div className="text-xs text-ink-40 mt-1">Last: {s.last}</div>
                  </div>
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 font-semibold",
                      s.status === "Active" ? "text-success bg-emerald-50" : "text-warning bg-yellow-50"
                    )}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
