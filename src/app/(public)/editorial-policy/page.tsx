import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How Fable reports, verifies, and publishes.",
};

export default function EditorialPolicyPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-line">
        <Container size="md">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Editorial Policy</span>
          </div>
          <h1 className="font-editorial text-4xl md:text-5xl font-semibold leading-tight">How we report, verify, and publish.</h1>
          <p className="mt-4 text-sm text-ink-40 font-mono uppercase tracking-[0.15em]">Last updated: 24 November 2026</p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="md">
          <div className="prose-editorial">
            <h2>Our standards</h2>
            <p>
              Fable follows the standards of fair, accurate, and transparent journalism. Every article is written by a named human author, edited by a senior editor, and fact-checked before publication. We cite sources, link to primary material, and disclose financial interests.
            </p>

            <h2>Sourcing</h2>
            <ul>
              <li>Named sources are preferred. Anonymous sources are used only when a story cannot be told any other way, and only when the editor-in-chief approves.</li>
              <li>Two independent sources are required for any significant factual claim before publication.</li>
              <li>Quotes are not fabricated or paraphrased as direct quotes.</li>
            </ul>

            <h2>Product reviews</h2>
            <p>
              Every product we review is personally used by one of our reviewers for a minimum of four weeks (two for simpler products like earbuds, longer for laptops, cameras and cars). We purchase our own products where possible. When a review unit is loaned by a brand, we disclose it — and we return or purchase the unit after the review.
            </p>
            <ul>
              <li>We do not accept gifts in exchange for coverage.</li>
              <li>We do not publish reviews based on spec sheets, press releases or unboxing videos alone.</li>
              <li>Our recommendations are not influenced by affiliate commissions.</li>
            </ul>

            <h2>AI disclosure</h2>
            <p>
              We use AI assistants (including Claude and GPT) for research, summarization, and draft outlines. Every published article has a human editor's byline and judgement behind it. We do not publish AI-generated articles without substantive human editing, reporting, and fact-checking.
            </p>
            <p>
              When AI tools contribute materially to a story (e.g., analysing large datasets), we disclose it in the methodology section.
            </p>

            <h2>Affiliate links</h2>
            <p>
              Many of the product recommendations on this site contain affiliate links. When you purchase through them, we may earn a small commission. This never changes our editorial verdict. Full policy on our <a href="/affiliate-disclosure">Affiliate Disclosure</a> page.
            </p>

            <h2>Sponsored content</h2>
            <p>
              Sponsored content is labelled "Sponsored" in the header and byline. Editorial staff are not involved in writing sponsored content unless clearly disclosed. We reserve the right to decline sponsorships that conflict with our editorial values.
            </p>

            <h2 id="trend-radar">Trend Radar methodology</h2>
            <p>
              Our Trend Radar monitors public signals from Google Trends, Google News, YouTube public data, Reddit (with respect to platform ToS), official brand channels, and e-commerce bestseller feeds. Trends are scored on growth, India relevance, search demand, commercial intent, competition, and freshness.
            </p>
            <p>
              The Trend Radar is a signal, not a verdict. Editors use it to find topics worth covering — but every published story is independently researched and verified.
            </p>

            <h2>Corrections</h2>
            <p>
              When we're wrong, we admit it. Significant corrections are logged on our <a href="/corrections-policy">Corrections Policy</a> page with the date, nature of the error, and how it was fixed. Minor corrections (typos, broken links) are made without logging.
            </p>

            <h2>Independence</h2>
            <p>
              Fable Media Pvt Ltd is independently owned. No political party, foreign entity, or major advertiser holds a stake in our editorial decisions. If this ever changes, we will disclose it on this page before any such change takes effect.
            </p>

            <h2>Questions</h2>
            <p>
              If you have questions about our editorial standards or want to report a concern, write to our editor-in-chief at <a href="mailto:editor@fable.in">editor@fable.in</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
