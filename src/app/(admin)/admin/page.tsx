import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import {
  TrendingUp,
  FileText,
  Clock,
  Sparkles,
  Eye,
  MousePointerClick,
  Mail,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { everyArticle, everyProduct, articlesFor, productsFor } from "@/lib/content";
import { ALL_COUNTRIES, COUNTRIES, isCountryCode, type CountryCode } from "@/config/countries";
import { AdminCountryPicker } from "@/components/admin/AdminCountryPicker";
import { getLiveTrends } from "@/lib/trends/live";
import { formatRelativeTime } from "@/lib/utils";

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ country?: string }> }) {
  const { country } = await searchParams;
  const active: CountryCode | undefined = isCountryCode(country) ? country : undefined;
  const allArticles = active ? articlesFor(active) : everyArticle();
  const allProducts = active ? productsFor(active) : everyProduct();
  const live = await getLiveTrends(active ?? "in", 5);
  const weekAgo = Date.now() - 7 * 86400_000;
  const thisWeek = allArticles.filter((a) => +new Date(a.publishedAt) > weekAgo).length;
  const stats = [
    { label: "Published articles", value: String(allArticles.length), change: `${thisWeek} this week`, icon: FileText, trend: "up" },
    { label: "Products (EarnKaro)", value: String(allProducts.length), change: "Full tracking links", icon: CheckCircle2, trend: "neutral" },
    { label: "Live headlines", value: String(live.length), change: `Google News ${active ? COUNTRIES[active].name : "India"}`, icon: TrendingUp, trend: "neutral" },
    { label: "Newsletter subs", value: "—", change: "See Newsletter tab", icon: Mail, trend: "neutral" },
    { label: "Page views", value: "—", change: "Connect GA4", icon: Eye, trend: "neutral" },
    { label: "Affiliate clicks", value: "—", change: "Logged to Supabase", icon: MousePointerClick, trend: "neutral" },
  ];

  const recentDrafts = allArticles.slice(0, 4);
  const topTrends = live;

  return (
    <>
      <AdminPageHeader
        eyebrow="Today"
        title="Good morning, Piyush"
        description={`${active ? `${COUNTRIES[active].flag} ${COUNTRIES[active].name}` : `All ${ALL_COUNTRIES.length} editions`} · ${allArticles.length} published articles · ${allProducts.length} products.`}
        actions={
          <>
            <Link href="/admin/generate">
              <Button variant="soft" size="md" shape="soft">
                <Sparkles className="h-4 w-4" />
                Generate article
              </Button>
            </Link>
            <Link href="/admin/articles/new">
              <Button variant="primary" size="md" shape="soft">New article</Button>
            </Link>
          </>
        }
      />

      <div className="p-6 lg:p-10 space-y-10">
        <AdminCountryPicker basePath="/admin" active={active} />
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="p-5 bg-paper border border-line hover:border-ink-40 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="h-4 w-4 text-ink-40" />
                  {s.trend === "up" && (
                    <TrendingUp className="h-3 w-3 text-success" />
                  )}
                </div>
                <div className="font-editorial text-3xl font-semibold text-ink leading-none">
                  {s.value}
                </div>
                <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.15em] text-ink-40">
                  {s.label}
                </div>
                <div className="mt-1 text-xs text-ink-60">{s.change}</div>
              </div>
            );
          })}
        </div>

        {/* Setup checklist (shown until integrations are live) */}
        <div className="p-6 bg-gold-tint border-l-4 border-gold">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-ink" />
                <h3 className="font-editorial text-lg font-semibold">Setup checklist</h3>
              </div>
              <p className="text-sm text-ink-80 mb-4">
                7 things to configure before you go live. Walk through them in order.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  { done: false, label: "Connect Supabase (schema is ready, deploy it)", href: "/admin/settings" },
                  { done: false, label: "Add Anthropic API key for AI generation", href: "/admin/settings" },
                  { done: false, label: "Configure affiliate networks (Amazon, Flipkart, Cuelinks)", href: "/admin/affiliate" },
                  { done: false, label: "Set up newsletter (Resend API key)", href: "/admin/settings" },
                  { done: false, label: "Verify Google Search Console", href: "/admin/settings" },
                  { done: false, label: "Enable Trend Radar automation", href: "/admin/trends" },
                  { done: false, label: "Approve first batch of AI drafts", href: "/admin/articles?status=draft" },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    {item.done ? (
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                    ) : (
                      <div className="h-4 w-4 border border-line rounded-full flex-shrink-0" />
                    )}
                    <Link
                      href={item.href}
                      className={
                        item.done
                          ? "text-ink-40 line-through"
                          : "text-ink hover:text-accent"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Two-col: drafts + trends */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-paper border border-line">
            <div className="p-5 border-b border-line flex items-center justify-between">
              <div>
                <h3 className="font-editorial text-xl font-semibold">Drafts needing review</h3>
                <p className="text-xs text-ink-60 mt-1">Click to review and approve</p>
              </div>
              <Link href="/admin/articles?status=draft" className="text-xs text-ink-60 hover:text-accent">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-line">
              {recentDrafts.map((a) => (
                <Link
                  key={a.id}
                  href={`/admin/articles/${a.id}`}
                  className="flex items-start gap-4 p-5 hover:bg-cream-100 transition group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent font-semibold">
                        {a.categoryName}
                      </span>
                      <span className="font-mono text-[10px] text-ink-40">·</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40">
                        Draft · {formatRelativeTime(a.publishedAt)}
                      </span>
                    </div>
                    <h4 className="font-editorial text-base font-semibold text-ink group-hover:text-accent transition line-clamp-2">
                      {a.title}
                    </h4>
                    <div className="mt-2 text-xs text-ink-60">
                      {a.author.name} · {a.readingTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line">
            <div className="p-5 border-b border-line flex items-center justify-between">
              <div>
                <h3 className="font-editorial text-xl font-semibold">Top trends right now</h3>
                <p className="text-xs text-ink-60 mt-1">Google News {active ? COUNTRIES[active].name : "India"} · live</p>
              </div>
              <Link href="/admin/trends" className="text-xs text-ink-60 hover:text-accent">
                Full radar →
              </Link>
            </div>
            <div className="divide-y divide-line">
              {topTrends.map((t, i) => (
                <Link
                  key={t.id}
                  href={`/admin/generate?topic=${encodeURIComponent(t.topic)}`}
                  className="flex items-center gap-4 p-5 hover:bg-cream-100 transition group"
                >
                  <span className="font-editorial text-2xl font-semibold text-ink-40 min-w-[2rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent font-semibold">
                        {t.categoryName}
                      </span>
                      <span className="font-mono text-[10px] text-ink-40">
                        {t.sources?.[0]?.name}
                      </span>
                    </div>
                    <h4 className="font-editorial text-base font-semibold text-ink group-hover:text-accent transition">
                      {t.topic}
                    </h4>
                  </div>
                  <span className="text-xs text-ink-40 whitespace-nowrap">{formatRelativeTime(t.discoveredAt)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h3 className="font-editorial text-xl font-semibold mb-4">Quick actions</h3>
          <div className="grid md:grid-cols-4 gap-3">
            {[
              { label: "Collect trends now", href: "/admin/trends?action=refresh", icon: TrendingUp },
              { label: "Pull keyword opportunities", href: "/admin/keywords?action=refresh", icon: Sparkles },
              { label: "Generate 3 drafts", href: "/admin/generate", icon: FileText },
              { label: "Send today's digest", href: "/admin/newsletter/compose", icon: Mail },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.label}
                  href={a.href}
                  className="group p-5 bg-paper border border-line hover:border-ink flex items-center gap-4 transition"
                >
                  <div className="h-10 w-10 bg-cream-100 group-hover:bg-ink group-hover:text-cream flex items-center justify-center transition">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-ink group-hover:text-accent transition">
                    {a.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
