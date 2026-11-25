import { AdminPageHeader } from "@/components/admin/AdminShell";
import { BarChart3, TrendingUp, Eye, MousePointerClick } from "lucide-react";

export const metadata = { title: "Analytics — Admin" };

export default function AnalyticsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Audience"
        title="Analytics"
        description="Page views, popular articles, affiliate clicks, referral traffic."
      />
      <div className="p-6 lg:p-10 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Eye, label: "Page views (7d)", value: "0", note: "GA4 not connected" },
            { icon: TrendingUp, label: "Organic (7d)", value: "0", note: "GSC not connected" },
            { icon: MousePointerClick, label: "Affiliate clicks (7d)", value: "0", note: "Tracking not live" },
            { icon: BarChart3, label: "Avg session", value: "—", note: "No data" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="p-5 bg-paper border border-line">
                <Icon className="h-4 w-4 text-ink-40 mb-3" />
                <div className="font-editorial text-3xl font-semibold">{s.value}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mt-1">
                  {s.label}
                </div>
                <div className="text-xs text-ink-60 mt-1">{s.note}</div>
              </div>
            );
          })}
        </div>
        <div className="p-10 bg-cream-100 border border-line text-center">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-ink-40" />
          <h3 className="font-editorial text-xl font-semibold mb-2">Analytics not configured</h3>
          <p className="text-sm text-ink-60 max-w-md mx-auto">
            Connect Google Analytics 4, Google Search Console, and Plausible in Settings → Integrations to start seeing data here.
          </p>
        </div>
      </div>
    </>
  );
}
