import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { allArticles } from "@/lib/content";
import { formatRelativeTime, cn } from "@/lib/utils";
import { Plus, Sparkles, FileText, Clock, CheckCircle2, Calendar, X as XIcon, Archive } from "lucide-react";

export const metadata = { title: "Articles — Admin" };

const statusTabs = [
  { key: "all", label: "All", icon: FileText, count: 12 },
  { key: "draft", label: "Drafts", icon: Clock, count: 7 },
  { key: "in_review", label: "In review", icon: Clock, count: 2 },
  { key: "approved", label: "Approved", icon: CheckCircle2, count: 1 },
  { key: "scheduled", label: "Scheduled", icon: Calendar, count: 1 },
  { key: "published", label: "Published", icon: CheckCircle2, count: 1 },
  { key: "rejected", label: "Rejected", icon: XIcon, count: 0 },
  { key: "archived", label: "Archived", icon: Archive, count: 0 },
];

export default function AdminArticlesPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const articles = allArticles;

  return (
    <>
      <AdminPageHeader
        eyebrow="Editorial"
        title="Articles"
        description="Everything in the pipeline. Drafts, review, scheduled and published."
        actions={
          <>
            <Link href="/admin/generate">
              <Button variant="soft" size="md" shape="soft">
                <Sparkles className="h-4 w-4" />
                AI generate
              </Button>
            </Link>
            <Link href="/admin/articles/new">
              <Button variant="primary" size="md" shape="soft">
                <Plus className="h-4 w-4" />
                New article
              </Button>
            </Link>
          </>
        }
      />

      {/* Status tabs */}
      <div className="px-6 lg:px-10 border-b border-line bg-cream">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {statusTabs.map((t) => {
            const Icon = t.icon;
            const active = t.key === "all";
            return (
              <Link
                key={t.key}
                href={t.key === "all" ? "/admin/articles" : `/admin/articles?status=${t.key}`}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition",
                  active
                    ? "border-accent text-ink font-medium"
                    : "border-transparent text-ink-60 hover:text-ink"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
                <span
                  className={cn(
                    "font-mono text-[10px] px-1.5 py-0.5",
                    active ? "bg-accent text-white" : "bg-cream-200 text-ink-60"
                  )}
                >
                  {t.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-6 lg:p-10">
        <div className="bg-paper border border-line">
          <table className="w-full">
            <thead className="border-b border-line bg-cream-100">
              <tr>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">Title</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60 hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60 hidden lg:table-cell">Author</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60 hidden lg:table-cell">Status</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60 hidden md:table-cell">Updated</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-cream-100 transition">
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/articles/${a.id}`}
                      className="font-editorial text-base font-semibold text-ink hover:text-accent transition line-clamp-2"
                    >
                      {a.title}
                    </Link>
                    <div className="mt-1 flex items-center gap-2 text-xs text-ink-40">
                      <span>{a.readingTime}</span>
                      {a.featured && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-accent">Featured</span>
                      )}
                      {a.trending && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-emerald">Trending</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">
                      {a.categoryName}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-sm text-ink-80">
                    {a.author.name}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] bg-cream-100 px-2 py-1 text-ink-60">
                      Published
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-xs text-ink-60">
                    {formatRelativeTime(a.updatedAt || a.publishedAt)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={a.url}
                        target="_blank"
                        className="text-xs text-ink-60 hover:text-ink"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/admin/articles/${a.id}`}
                        className="text-xs text-accent hover:text-accent-dark font-medium"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
