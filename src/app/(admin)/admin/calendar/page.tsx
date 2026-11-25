import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { sampleArticles } from "@/lib/sample-content";
import { cn } from "@/lib/utils";
import { Plus, Calendar as CalIcon } from "lucide-react";

export const metadata = { title: "Publishing Calendar — Admin" };

const categoryColors: Record<string, string> = {
  technology: "bg-blue-100 text-blue-700 border-blue-200",
  "ai-tools": "bg-purple-100 text-purple-700 border-purple-200",
  shopping: "bg-emerald-100 text-emerald-700 border-emerald-200",
  money: "bg-red-100 text-red-700 border-red-200",
  lifestyle: "bg-pink-100 text-pink-700 border-pink-200",
  entertainment: "bg-orange-100 text-orange-700 border-orange-200",
  travel: "bg-cyan-100 text-cyan-700 border-cyan-200",
};

export default function PublishingCalendarPage() {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const startDay = start.getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const cells: { day: number | null; articles: typeof sampleArticles }[] = [];
  for (let i = 0; i < startDay; i++) cells.push({ day: null, articles: [] });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      articles: sampleArticles.filter((a) => new Date(a.publishedAt).getDate() === d),
    });
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Publishing Calendar"
        title={today.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        description="Drag-and-drop scheduling. Automatic publishing disabled by default."
        actions={
          <>
            <Button variant="soft" size="md" shape="soft">
              <CalIcon className="h-4 w-4" />
              Month view
            </Button>
            <Button variant="primary" size="md" shape="soft">
              <Plus className="h-4 w-4" />
              Schedule article
            </Button>
          </>
        }
      />
      <div className="p-6 lg:p-10">
        <div className="bg-paper border border-line">
          <div className="grid grid-cols-7 border-b border-line bg-cream-100">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="p-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60 text-center border-r border-line last:border-0"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((c, i) => (
              <div
                key={i}
                className={cn(
                  "min-h-28 p-2 border-r border-b border-line last:border-r-0",
                  c.day === null && "bg-cream-100"
                )}
              >
                {c.day && (
                  <>
                    <div
                      className={cn(
                        "text-xs font-medium mb-1",
                        c.day === today.getDate() ? "text-accent" : "text-ink-60"
                      )}
                    >
                      {c.day}
                    </div>
                    <div className="space-y-1">
                      {c.articles.slice(0, 3).map((a) => (
                        <div
                          key={a.id}
                          className={cn(
                            "text-[11px] p-1 border line-clamp-2 leading-tight cursor-pointer hover:brightness-95",
                            categoryColors[a.category] || "bg-gray-100 text-gray-700 border-gray-200"
                          )}
                        >
                          {a.title}
                        </div>
                      ))}
                      {c.articles.length > 3 && (
                        <div className="text-[10px] text-ink-40">+{c.articles.length - 3} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gold-tint border-l-4 border-gold text-sm">
          <span className="font-medium">Automatic publishing is disabled.</span>{" "}
          Scheduled articles still need a human approver. Turn on auto-publish in Settings → Automation if you want.
        </div>
      </div>
    </>
  );
}
