import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { RefreshCw, Sparkles, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import fs from "fs";
import path from "path";
import Link from "next/link";

export const metadata = { title: "Keyword Research — Admin" };

interface KeywordRow {
  keyword: string;
  category: string;
  volume: string;
  difficulty: string;
  cpc: string;
  intent: string;
  slug: string;
  content_type: string;
  affiliate_potential: string;
}

function loadKeywords(limit = 100): KeywordRow[] {
  try {
    const file = path.join(process.cwd(), "keywords_india_master.csv");
    const content = fs.readFileSync(file, "utf-8");
    const [header, ...lines] = content.trim().split("\n");
    const cols = header.split(",");
    return lines
      .slice(0, limit)
      .map((line) => {
        const values = line.split(",");
        const obj: any = {};
        cols.forEach((c, i) => (obj[c] = values[i]));
        return obj as KeywordRow;
      })
      .filter((r) => r.keyword)
      .sort((a, b) => Number(b.volume || 0) - Number(a.volume || 0));
  } catch {
    return [];
  }
}

export default async function KeywordResearchPage() {
  const keywords = loadKeywords(80);

  const byCategory = keywords.reduce((acc, k) => {
    acc[k.category] = (acc[k.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <AdminPageHeader
        eyebrow="Keyword Research"
        title="India's highest-opportunity keywords"
        description="Pulled from Ahrefs + DataForSEO · India location · Updated daily"
        actions={
          <>
            <Button variant="soft" size="md" shape="soft">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="primary" size="md" shape="soft">
              <RefreshCw className="h-4 w-4" />
              Pull now
            </Button>
          </>
        }
      />

      <div className="p-6 lg:p-10 space-y-8">
        {/* Snapshot */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total keywords tracked", value: keywords.length.toString() },
            { label: "High-volume (10k+)", value: keywords.filter((k) => Number(k.volume) >= 10000).length.toString() },
            { label: "Zero-KD opportunities", value: keywords.filter((k) => Number(k.difficulty) === 0).length.toString() },
            { label: "High affiliate potential", value: keywords.filter((k) => k.affiliate_potential === "High").length.toString() },
          ].map((s) => (
            <div key={s.label} className="p-5 bg-paper border border-line">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-2">
                {s.label}
              </div>
              <div className="font-editorial text-3xl font-semibold text-ink">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(byCategory).map(([cat, count]) => (
            <button
              key={cat}
              className="px-3 py-1.5 border border-line bg-paper text-sm hover:border-ink transition flex items-center gap-2"
            >
              {cat}
              <span className="font-mono text-[10px] text-ink-40">{count}</span>
            </button>
          ))}
        </div>

        {/* Keyword table */}
        <div className="bg-paper border border-line overflow-hidden">
          <div className="p-5 border-b border-line flex items-center justify-between">
            <div>
              <h3 className="font-editorial text-xl font-semibold">Top opportunities</h3>
              <p className="text-xs text-ink-60 mt-1">Ranked by India monthly volume</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border border-line text-sm bg-cream focus:outline-none">
                <option>All categories</option>
                {Object.keys(byCategory).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select className="px-3 py-2 border border-line text-sm bg-cream focus:outline-none">
                <option>All intents</option>
                <option>Commercial</option>
                <option>Transactional</option>
                <option>Informational</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-line bg-cream-100">
                <tr>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">Keyword</th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">Category</th>
                  <th className="text-right px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">Volume/mo</th>
                  <th className="text-right px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">KD</th>
                  <th className="text-right px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">CPC ₹</th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">Intent</th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">Aff</th>
                  <th />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {keywords.slice(0, 40).map((k, i) => {
                  const kd = Number(k.difficulty);
                  const vol = Number(k.volume);
                  return (
                    <tr key={`${k.keyword}-${i}`} className="hover:bg-cream-100 transition">
                      <td className="px-5 py-3">
                        <div className="font-medium text-sm">{k.keyword}</div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-ink-40 mt-0.5">
                          /{k.slug}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-ink-60">{k.category}</td>
                      <td className="px-5 py-3 text-right font-mono text-sm">
                        {vol.toLocaleString("en-IN")}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span
                          className={cn(
                            "font-mono text-sm px-2 py-0.5",
                            kd === 0 && "bg-emerald-50 text-emerald font-semibold",
                            kd > 0 && kd < 10 && "bg-yellow-50 text-warning",
                            kd >= 10 && "bg-gray-100 text-ink-60"
                          )}
                        >
                          {kd}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-sm">₹{k.cpc}</td>
                      <td className="px-5 py-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">
                          {k.intent}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={cn(
                            "font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 font-semibold",
                            k.affiliate_potential === "High" && "bg-emerald-50 text-emerald",
                            k.affiliate_potential === "Medium" && "bg-yellow-50 text-warning",
                            k.affiliate_potential === "Low" && "bg-gray-100 text-ink-60"
                          )}
                        >
                          {k.affiliate_potential}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Link
                          href={`/admin/generate?keyword=${encodeURIComponent(k.keyword)}`}
                          className="text-xs text-accent hover:text-accent-dark font-medium inline-flex items-center gap-1"
                        >
                          <Sparkles className="h-3 w-3" />
                          Draft
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Source status */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-paper border border-line">
            <h4 className="font-editorial text-lg font-semibold mb-4">Research sources</h4>
            <ul className="space-y-3">
              {[
                { name: "Ahrefs Keywords Explorer", status: "Connected" },
                { name: "DataForSEO Labs", status: "Connected" },
                { name: "Google Ads Search Volume", status: "Connected" },
                { name: "Google Search Console", status: "Needs connection" },
              ].map((s) => (
                <li key={s.name} className="flex items-center justify-between text-sm">
                  <span>{s.name}</span>
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 font-semibold",
                      s.status === "Connected"
                        ? "bg-emerald-50 text-emerald"
                        : "bg-yellow-50 text-warning"
                    )}
                  >
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 bg-paper border border-line">
            <h4 className="font-editorial text-lg font-semibold mb-4">Daily research targets</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span>Trending keywords</span><span className="font-mono">50 / day</span></li>
              <li className="flex justify-between"><span>Commercial keywords</span><span className="font-mono">20 / day</span></li>
              <li className="flex justify-between"><span>Affiliate opportunities</span><span className="font-mono">20 / day</span></li>
              <li className="flex justify-between"><span>Emerging topics</span><span className="font-mono">10 / day</span></li>
              <li className="flex justify-between"><span>Low-competition picks</span><span className="font-mono">10 / day</span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
