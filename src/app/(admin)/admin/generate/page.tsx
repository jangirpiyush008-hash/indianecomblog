"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Sparkles, FileText, Wand2, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: "topic", label: "Topic & keyword" },
  { id: "research", label: "Research" },
  { id: "outline", label: "Outline" },
  { id: "draft", label: "Draft" },
  { id: "review", label: "Quality checks" },
];

export default function AIGeneratePage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("technology");
  const [contentType, setContentType] = useState("listicle");
  const [angle, setAngle] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [output, setOutput] = useState<any>(null);

  async function handleGenerate() {
    setStatus("running");
    try {
      // Simulated staged progression
      setStepIndex(1);
      await wait(1500);
      setStepIndex(2);
      await wait(1500);
      setStepIndex(3);
      await wait(2500);
      setStepIndex(4);
      await wait(1500);

      setOutput({
        title: topic || "Draft generated",
        wordCount: 1842,
        readingTime: "9 min read",
        qualityScore: 8.4,
        warnings: [
          "No image attached — add hero image before approval",
          "2 statistics need source verification",
        ],
        sections: 7,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="AI Content Generator"
        title="Research. Draft. Review. Repeat."
        description="Pick a topic, choose an angle, get a researched, cited, India-focused draft ready for your editorial review."
      />

      <div className="p-6 lg:p-10 grid lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-7">
          <div className="bg-paper border border-line p-8">
            <h3 className="font-editorial text-xl font-semibold mb-6">Brief</h3>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.15em] text-ink-60 mb-2">
                  Topic / primary keyword
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. best laptop under 50000 india 2026"
                  className="w-full px-4 py-3 bg-cream border border-line text-sm focus:outline-none focus:border-ink"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.15em] text-ink-60 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-cream border border-line text-sm focus:outline-none focus:border-ink"
                  >
                    {["technology", "ai-tools", "shopping", "money", "lifestyle", "entertainment", "travel"].map((c) => (
                      <option key={c} value={c}>{c.replace("-", " ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.15em] text-ink-60 mb-2">
                    Content type
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-4 py-3 bg-cream border border-line text-sm focus:outline-none focus:border-ink"
                  >
                    <option value="listicle">Listicle / ranked list</option>
                    <option value="guide">Buying guide</option>
                    <option value="comparison">Comparison</option>
                    <option value="review">Review</option>
                    <option value="explainer">Explainer</option>
                    <option value="news">News</option>
                    <option value="how-to">How-to</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.15em] text-ink-60 mb-2">
                  Editorial angle (optional)
                </label>
                <textarea
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  placeholder="e.g. Focus on performance per rupee. Skip gaming laptops. Target students and young professionals."
                  rows={3}
                  className="w-full px-4 py-3 bg-cream border border-line text-sm focus:outline-none focus:border-ink resize-none"
                />
              </div>
              <div className="pt-4 border-t border-line flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-ink-80">
                  <input type="checkbox" defaultChecked className="accent-accent" />
                  Auto-source references
                </label>
                <label className="flex items-center gap-2 text-sm text-ink-80">
                  <input type="checkbox" defaultChecked className="accent-accent" />
                  Attach relevant products
                </label>
                <label className="flex items-center gap-2 text-sm text-ink-80">
                  <input type="checkbox" defaultChecked className="accent-accent" />
                  Generate hero image
                </label>
              </div>
              <Button
                onClick={handleGenerate}
                variant="primary"
                size="lg"
                shape="soft"
                className="w-full"
                disabled={!topic || status === "running"}
              >
                {status === "running" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate draft
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress */}
          {status !== "idle" && (
            <div className="mt-6 bg-paper border border-line p-6">
              <h4 className="font-editorial text-lg font-semibold mb-4">Pipeline</h4>
              <ol className="space-y-3">
                {steps.map((s, i) => (
                  <li key={s.id} className="flex items-center gap-3">
                    {i < stepIndex ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : i === stepIndex ? (
                      <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    ) : (
                      <div className="h-4 w-4 border border-line rounded-full" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        i < stepIndex && "text-ink-40 line-through",
                        i === stepIndex && "text-ink font-medium",
                        i > stepIndex && "text-ink-60"
                      )}
                    >
                      {s.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Output */}
          {output && (
            <div className="mt-6 bg-paper border border-line p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-editorial text-lg font-semibold">Draft ready</h4>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-success font-semibold">
                  Quality {output.qualityScore}/10
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <Stat label="Sections" value={output.sections} />
                <Stat label="Word count" value={output.wordCount} />
                <Stat label="Reading" value={output.readingTime} />
              </div>
              {output.warnings.length > 0 && (
                <div className="p-4 bg-gold-tint border border-gold mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Review before approving</span>
                  </div>
                  <ul className="space-y-1 text-sm text-ink-80">
                    {output.warnings.map((w: string) => (
                      <li key={w}>· {w}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-3">
                <Button variant="primary" size="md" shape="soft" className="flex-1">
                  Open in editor
                </Button>
                <Button variant="soft" size="md" shape="soft">
                  Regenerate
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right rail: AI config + tips */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-paper border border-line p-6">
            <h4 className="font-editorial text-lg font-semibold mb-4">AI configuration</h4>
            <div className="space-y-4 text-sm">
              <ConfigRow label="Research model" value="Claude Sonnet 4.6" />
              <ConfigRow label="Writing model" value="Claude Sonnet 4.6" />
              <ConfigRow label="Image provider" value="Not configured" ok={false} />
              <ConfigRow label="Source verification" value="Perplexity API" />
            </div>
            <Button variant="link" size="sm" className="mt-4 p-0">
              Edit settings →
            </Button>
          </div>

          <div className="bg-paper border border-line p-6">
            <h4 className="font-editorial text-lg font-semibold mb-4">Today's AI usage</h4>
            <div className="space-y-4">
              <Meter label="Articles generated" current={3} max={5} note="Max 5/day default" />
              <Meter label="API credits" current={12} max={50} note="12 of 50 Rs used" />
            </div>
          </div>

          <div className="bg-cream-100 border border-line p-6 text-sm">
            <h4 className="font-editorial text-base font-semibold mb-2">Editorial rules</h4>
            <ul className="space-y-2 text-ink-80">
              <li>· Auto-publish is <strong>disabled</strong>. All drafts need human review.</li>
              <li>· Statistics without sources are flagged.</li>
              <li>· Product prices are verified live before publishing.</li>
              <li>· AI-generated content is marked in article metadata.</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-l-2 border-accent pl-3">
      <div className="font-editorial text-xl font-semibold">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40 mt-0.5">{label}</div>
    </div>
  );
}

function ConfigRow({ label, value, ok = true }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-60">{label}</span>
      <span className={cn("font-medium", !ok && "text-warning")}>{value}</span>
    </div>
  );
}

function Meter({ label, current, max, note }: { label: string; current: number; max: number; note: string }) {
  const pct = Math.round((current / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-ink-80">{label}</span>
        <span className="font-mono text-xs">{current} / {max}</span>
      </div>
      <div className="h-1.5 bg-cream-200 overflow-hidden">
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-xs text-ink-40 mt-1">{note}</div>
    </div>
  );
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
