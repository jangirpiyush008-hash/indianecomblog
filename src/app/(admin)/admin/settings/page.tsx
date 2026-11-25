import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Key, Mail, Zap, Globe, FileCheck } from "lucide-react";

export const metadata = { title: "Settings — Admin" };

const sections = [
  {
    id: "ai",
    icon: Zap,
    title: "AI providers",
    description: "Anthropic, OpenAI, image generation",
    fields: [
      { label: "Anthropic API key", key: "ANTHROPIC_API_KEY", type: "password", status: "missing" },
      { label: "Model (writing)", key: "ANTHROPIC_MODEL", value: "claude-sonnet-4-6", type: "text" },
      { label: "OpenAI API key (fallback)", key: "OPENAI_API_KEY", type: "password", status: "missing" },
      { label: "Image provider", key: "IMAGE_PROVIDER", value: "Not configured", type: "text" },
    ],
  },
  {
    id: "supabase",
    icon: Key,
    title: "Supabase (database + auth)",
    description: "Connection to the Fable database",
    fields: [
      { label: "Supabase URL", key: "NEXT_PUBLIC_SUPABASE_URL", type: "text", status: "missing" },
      { label: "Anon public key", key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", type: "password", status: "missing" },
      { label: "Service role key", key: "SUPABASE_SERVICE_ROLE_KEY", type: "password", status: "missing" },
    ],
  },
  {
    id: "seo",
    icon: Globe,
    title: "SEO & data tools",
    description: "Keyword research, SERP data",
    fields: [
      { label: "Ahrefs API key", key: "AHREFS_API_KEY", type: "password", status: "missing" },
      { label: "DataForSEO login", key: "DATAFORSEO_LOGIN", type: "text", status: "missing" },
      { label: "DataForSEO password", key: "DATAFORSEO_PASSWORD", type: "password", status: "missing" },
      { label: "Google Search Console", key: "GSC_PROPERTY", type: "text", status: "missing" },
    ],
  },
  {
    id: "affiliates",
    icon: FileCheck,
    title: "Affiliate networks",
    description: "Amazon, Flipkart, Cuelinks, EarnKaro",
    fields: [
      { label: "Amazon Associates tag", key: "AMAZON_ASSOC_TAG", value: "fablemag-21", type: "text" },
      { label: "Cuelinks token", key: "CUELINKS_TOKEN", type: "password", status: "missing" },
      { label: "EarnKaro API key", key: "EARNKARO_API_KEY", type: "password", status: "missing" },
    ],
  },
  {
    id: "newsletter",
    icon: Mail,
    title: "Newsletter & email",
    description: "Resend for transactional + newsletter delivery",
    fields: [
      { label: "Resend API key", key: "RESEND_API_KEY", type: "password", status: "missing" },
      { label: "From address", key: "NEWSLETTER_FROM_EMAIL", value: "digest@fable.in", type: "text" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="System"
        title="Settings & integrations"
        description="All keys are stored as environment variables. Server actions never expose them to the browser."
      />
      <div className="p-6 lg:p-10 space-y-8 max-w-4xl">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="bg-paper border border-line">
              <div className="p-6 border-b border-line flex items-center gap-3">
                <div className="h-10 w-10 bg-cream-100 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-ink" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-semibold">{section.title}</h3>
                  <p className="text-xs text-ink-60">{section.description}</p>
                </div>
              </div>
              <div className="divide-y divide-line">
                {section.fields.map((f) => (
                  <div key={f.key} className="p-5 flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <label className="font-medium text-sm">{f.label}</label>
                      <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40 mt-0.5">
                        {f.key}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type={f.type}
                        placeholder={(f as any).status === "missing" ? "Not configured" : ""}
                        defaultValue={(f as any).value || ""}
                        className="w-72 px-3 py-2 bg-cream border border-line text-sm focus:outline-none focus:border-ink"
                      />
                      <Button variant="soft" size="sm" shape="soft">Save</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-8 p-6 bg-cream-100 border border-line">
          <h4 className="font-editorial text-lg font-semibold mb-2">Automation safety</h4>
          <p className="text-sm text-ink-80 mb-4">
            Articles always go through human review. Auto-publish is <strong>disabled by default</strong>. Flip the toggle only after you're confident in your editorial pipeline.
          </p>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-accent" />
            <span className="text-sm">Enable auto-publish (not recommended)</span>
          </label>
        </div>
      </div>
    </>
  );
}
