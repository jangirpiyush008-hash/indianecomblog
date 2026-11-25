import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "The Daily Digest — Fable's Morning Newsletter",
  description: "7 stories. Picked by editors. Delivered by 7 AM. Free.",
};

const archivePreview = [
  { date: "Nov 24, 2026", subject: "iPhone 16 Pro hits lowest price · Jio AI Cloud · Panchayat S4 confirmed" },
  { date: "Nov 23, 2026", subject: "The ₹1,200 skincare routine beating ₹9,000 shelves · HDFC Infinia upgrade" },
  { date: "Nov 22, 2026", subject: "Perplexity Pro free on Airtel · 7 AI tools Indian freelancers use" },
  { date: "Nov 21, 2026", subject: "The 7 best credit cards of 2026, ranked · Zerodha vs Groww" },
  { date: "Nov 20, 2026", subject: "Best laptop under ₹50k tested · Goa December guide · Nothing vs OnePlus" },
];

export default function NewsletterPage() {
  return (
    <>
      <section className="pt-16 pb-16 border-b border-line bg-accent text-white">
        <Container size="md">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-white/60" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold">The Daily Digest</span>
              <div className="h-px w-8 bg-white/60" />
            </div>
            <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] mb-6">
              India's morning email, done right.
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
              7 stories. Picked by editors. Delivered to your inbox by 7 AM. No hype, no clickbait, no "sponsored content pretending to be editorial."
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-5 py-4 bg-white text-ink placeholder:text-ink-40 focus:outline-none focus:ring-2 focus:ring-ink"
              />
              <button type="submit" className="px-7 py-4 bg-ink text-cream font-medium hover:bg-ink-80 transition whitespace-nowrap">
                Join free →
              </button>
            </form>
            <p className="mt-4 text-xs text-white/70">Unsubscribe in one click. We never share your email.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading eyebrow="What you'll get" title="Why thousands of Indians start their day with Fable" align="center" />
          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {[
              { title: "7 stories, hand-picked", description: "Our editors read ~400 stories a day. We send you the 7 you actually need to know." },
              { title: "Trending Radar signal", description: "The top rising topics across India, ranked and summarized in one scroll." },
              { title: "One verified deal", description: "A single product deal we'd personally buy — priced, verified, and ready to grab." },
              { title: "Zero clickbait", description: "We don't rank stories by clicks. We rank them by usefulness to you." },
              { title: "Written by humans", description: "Our newsletter is written and edited by humans. AI assists research; it doesn't ship the email." },
              { title: "7 AM IST sharp", description: "Delivered by 7 AM every weekday. Reliable enough to set your alarm by." },
            ].map((f) => (
              <div key={f.title}>
                <h3 className="font-editorial text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-ink-60 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line bg-cream-100">
        <Container size="md">
          <SectionHeading eyebrow="Recent editions" title="See what you've missed" />
          <div>
            {archivePreview.map((a) => (
              <div key={a.date} className="py-5 border-b border-line last:border-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-2">{a.date}</div>
                <div className="font-editorial text-lg text-ink">{a.subject}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/newsletter/archive" className="text-sm font-medium text-ink hover:text-accent">
              Browse the full archive →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container size="sm">
          <div className="text-center">
            <h2 className="font-editorial text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Join your mornings in good company.
            </h2>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-10">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-5 py-4 border border-line focus:border-ink focus:outline-none"
              />
              <button type="submit" className="px-7 py-4 bg-accent text-white font-medium hover:bg-accent-dark transition">
                Join free
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
