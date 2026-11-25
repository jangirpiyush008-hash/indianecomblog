import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Corrections Policy",
  description: "How Fable handles errors, corrections, and reader feedback.",
};

const recentCorrections = [
  {
    date: "2026-11-19",
    article: "iPhone 16 Pro, four months in",
    type: "Factual",
    description: "Original article stated the A18 Pro was manufactured on TSMC's N3E process. It is actually N3P. Updated with correction note in article.",
  },
  {
    date: "2026-11-15",
    article: "Best credit cards in India 2026",
    type: "Price",
    description: "HDFC Infinia joining fee was listed at ₹10,000 pre-GST. Correct figure is ₹12,500 inclusive of GST. Updated.",
  },
  {
    date: "2026-11-08",
    article: "UPI Circle explained",
    type: "Clarification",
    description: "Added clarification that UPI Circle is currently limited to NPCI-approved banks. BHIM support was incorrectly stated as available.",
  },
  {
    date: "2026-10-31",
    article: "Perplexity Pro + Airtel guide",
    type: "Offer scope",
    description: "The Perplexity Pro bundle is available only to Airtel postpaid customers. Original article suggested all Airtel users qualified.",
  },
];

export default function CorrectionsPolicyPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-line">
        <Container size="md">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Corrections Policy</span>
          </div>
          <h1 className="font-editorial text-4xl md:text-5xl font-semibold leading-tight">When we're wrong, we say so.</h1>
          <p className="mt-4 text-sm text-ink-40 font-mono uppercase tracking-[0.15em]">Last updated: 24 November 2026</p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="md">
          <div className="prose-editorial">
            <h2>Our commitment</h2>
            <p>
              Fable commits to admitting errors transparently. Readers deserve to know when we've made a mistake, what the correct information is, and when we fixed it.
            </p>

            <h2>Types of corrections</h2>
            <ul>
              <li><strong>Factual corrections</strong> — Any error in verifiable fact (prices, dates, names, specifications). Logged below and noted in the article.</li>
              <li><strong>Clarifications</strong> — When an article is technically correct but could mislead readers. Added as a note to the article.</li>
              <li><strong>Updates</strong> — When new information meaningfully changes an article (e.g., a price drop, a product recall). Noted at the top of the article.</li>
              <li><strong>Minor edits</strong> — Typos, broken links, and style fixes. Made without a public log.</li>
            </ul>

            <h2>How to report an error</h2>
            <p>
              Spotted something wrong? Please write to <a href="mailto:corrections@fable.in">corrections@fable.in</a> with:
            </p>
            <ul>
              <li>The article URL</li>
              <li>What appears to be incorrect</li>
              <li>The correct information (with a source if possible)</li>
            </ul>
            <p>
              We acknowledge every error report within two business days. If a correction is warranted, it's typically published within one business day of verification.
            </p>

            <h2>Our process</h2>
            <p>
              When an error is reported, a senior editor (not the author of the article) reviews the claim and the original source. If the error is confirmed, the article is corrected, a correction note is added at the top of the article, and the correction is logged on this page.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-cream-100">
        <Container size="lg">
          <div className="border-b border-line pb-5 mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-2 block">Public log</span>
            <h2 className="font-editorial text-3xl font-semibold">Recent corrections</h2>
          </div>
          <div className="space-y-6">
            {recentCorrections.map((c, i) => (
              <div key={i} className="bg-paper border border-line p-6">
                <div className="flex items-start justify-between gap-6 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">{c.type}</span>
                      <span className="font-mono text-[11px] text-ink-40">{c.date}</span>
                    </div>
                    <h3 className="font-editorial text-xl font-semibold">{c.article}</h3>
                  </div>
                </div>
                <p className="text-sm text-ink-60 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
