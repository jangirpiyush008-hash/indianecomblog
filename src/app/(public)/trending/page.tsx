import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ArticleCard, ArticleHCard } from "@/components/editorial/ArticleCard";
import { sampleTrends, sampleArticles, trendingArticles } from "@/lib/sample-content";
import { formatRelativeTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Trending in India — The Trend Radar",
  description:
    "What India is talking about, buying, watching and searching for right now. Updated continuously.",
};

const timeFilters = ["Last hour", "Today", "This week", "This month"];
const categoryFilters = [
  "All",
  "Technology",
  "AI Tools",
  "Shopping",
  "Money",
  "Lifestyle",
  "Entertainment",
  "Travel",
];

export default function TrendingPage() {
  const trending = trendingArticles();

  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-16 border-b border-line bg-ink text-cream">
        <Container size="xl">
          <div className="flex items-center gap-2 mb-5">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              Trend Radar · Live
            </span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] mb-6 max-w-4xl">
            What India is talking about right now.
          </h1>
          <p className="text-xl text-cream/70 max-w-2xl leading-relaxed">
            Updated every 15 minutes. From Google Trends, news feeds, and e-commerce signals — verified, scored, and ranked.
          </p>

          <div className="mt-12 grid md:grid-cols-4 gap-4">
            {[
              { label: "Topics tracked", value: "1,247" },
              { label: "Rising trends", value: "83" },
              { label: "Last update", value: "4 min ago" },
              { label: "Data sources", value: "22" },
            ].map((s) => (
              <div key={s.label} className="border-t border-cream/20 pt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50 mb-1">
                  {s.label}
                </div>
                <div className="font-editorial text-3xl font-semibold text-cream">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className="sticky top-[73px] z-30 border-b border-line bg-cream py-4">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 whitespace-nowrap mr-2">
                Time
              </span>
              {timeFilters.map((t, i) => (
                <button
                  key={t}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                    i === 1
                      ? "bg-ink text-cream"
                      : "border border-line text-ink-60 hover:border-ink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 whitespace-nowrap mr-2">
                Category
              </span>
              {categoryFilters.map((c, i) => (
                <button
                  key={c}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                    i === 0
                      ? "bg-ink text-cream"
                      : "border border-line text-ink-60 hover:border-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Top 10 Trending */}
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading
            eyebrow="Top 10 Trending"
            title="Ranked by interest, verified by data"
          />
          <div className="grid gap-0">
            {sampleTrends.map((t, i) => (
              <Link
                key={t.id}
                href={`/trending/${t.id}`}
                className="group grid md:grid-cols-12 gap-4 md:gap-8 py-6 border-b border-line last:border-0 items-start"
              >
                <div className="md:col-span-1">
                  <span className="font-editorial text-5xl font-semibold text-ink-40 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-2 flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                    {t.categoryName}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">
                    {formatRelativeTime(t.discoveredAt)}
                  </span>
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-editorial text-2xl md:text-3xl font-semibold text-ink group-hover:text-accent-dark transition leading-tight">
                    {t.topic}
                  </h3>
                  <p className="mt-2 text-ink-60 leading-relaxed">{t.summary}</p>
                  {t.sources && t.sources.length > 0 && (
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40">
                        Sources:
                      </span>
                      {t.sources.map((s) => (
                        <span
                          key={s.name}
                          className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="md:col-span-3 flex md:justify-end items-center gap-6">
                  <div className="text-right">
                    <div className="font-editorial text-5xl font-semibold text-accent leading-none">
                      {t.interestScore}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 mt-1">
                      Interest score
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-mono text-[11px] uppercase tracking-[0.2em] font-semibold ${
                        t.direction === "up"
                          ? "text-success"
                          : t.direction === "down"
                          ? "text-danger"
                          : "text-ink-40"
                      }`}
                    >
                      {t.direction === "up" ? "▲ Rising" : t.direction === "down" ? "▼ Falling" : "— Steady"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Related articles */}
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading
            eyebrow="Trending Deep Dives"
            title="Our editors on today's top stories"
          />
          <div className="grid lg:grid-cols-3 gap-10">
            {trending.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Container>
      </section>

      {/* Methodology */}
      <section className="py-16 bg-cream-100">
        <Container size="md">
          <div className="text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3 block">
              How the Trend Radar works
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold mb-6 max-w-2xl mx-auto">
              Trends scored on data, not opinion.
            </h2>
            <p className="text-ink-60 leading-relaxed max-w-2xl mx-auto">
              We continuously pull from Google Trends India, Google News, Reddit, YouTube, official brand announcements and public e-commerce data. Each topic gets scored on growth, India relevance, search demand, commercial intent, and freshness.
            </p>
            <Link
              href="/editorial-policy#trend-radar"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-ink hover:text-accent"
            >
              Read our methodology →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
