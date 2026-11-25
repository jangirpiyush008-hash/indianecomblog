import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Mail, Send, FileText, TrendingUp } from "lucide-react";

export const metadata = { title: "Newsletter — Admin" };

export default function NewsletterPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Audience"
        title="Newsletter"
        description="The Daily Digest — India's morning read."
        actions={
          <Button variant="primary" size="md" shape="soft">
            <Send className="h-4 w-4" />
            Compose issue
          </Button>
        }
      />
      <div className="p-6 lg:p-10 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active subscribers", value: "0", note: "Not live yet" },
            { label: "Last issue opens", value: "—", note: "No issues sent" },
            { label: "Last issue clicks", value: "—", note: "No issues sent" },
            { label: "Avg open rate", value: "—", note: "No data" },
          ].map((s) => (
            <div key={s.label} className="p-5 bg-paper border border-line">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-2">
                {s.label}
              </div>
              <div className="font-editorial text-3xl font-semibold">{s.value}</div>
              <div className="text-xs text-ink-60 mt-1">{s.note}</div>
            </div>
          ))}
        </div>

        <div className="bg-paper border border-line">
          <div className="p-5 border-b border-line">
            <h3 className="font-editorial text-xl font-semibold">Issues</h3>
          </div>
          <div className="p-10 text-center text-ink-60">
            <Mail className="h-12 w-12 mx-auto mb-4 text-ink-40" />
            <p className="font-medium">No issues yet</p>
            <p className="text-sm mt-2">Compose your first daily digest when you're ready to launch.</p>
            <Link href="/admin/newsletter/compose" className="mt-5 inline-block">
              <Button variant="soft" size="md" shape="soft">
                <FileText className="h-4 w-4" />
                Draft today's digest
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
