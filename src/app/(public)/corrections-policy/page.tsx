import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/layout/TextPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Corrections Policy",
  description: `How ${brand.name} handles errors and how to report one.`,
  alternates: { canonical: "/corrections-policy" },
};

/** Add an entry here whenever a published article is corrected. Keep it truthful. */
const corrections: { date: string; article: string; url: string; note: string }[] = [];

export default function CorrectionsPolicyPage() {
  return (
    <TextPage
      eyebrow="Standards"
      title="Corrections policy"
      intro="When we get something wrong, we fix it and say so."
      path="/corrections-policy"
      updated="2026-11-25"
    >
      <h2>What we correct</h2>
      <ul>
        <li><strong>Factual errors</strong> — prices, dates, names, specifications, limits. Fixed, with a dated note on the article.</li>
        <li><strong>Clarifications</strong> — when something is technically right but could mislead. A note is added.</li>
        <li><strong>Updates</strong> — when new information changes the story (an offer ends, a price changes). The article&apos;s &ldquo;Updated&rdquo; date changes.</li>
        <li><strong>Minor fixes</strong> — typos and broken links, fixed without a note.</li>
      </ul>

      <h2>How to report an error</h2>
      <p>
        Email <a href={`mailto:${brand.email}?subject=Correction`}>{brand.email}</a> or use the <Link href="/contact">contact page</Link> with the article link, what&apos;s wrong, and a source for the correct information if you have one. {brand.founder} reviews every report.
      </p>

      <h2>Corrections log</h2>
      {corrections.length === 0 ? (
        <p>No corrections have been issued yet.</p>
      ) : (
        <ul>
          {corrections.map((c) => (
            <li key={c.date + c.url}>
              <time dateTime={c.date}>{c.date}</time> — <Link href={c.url}>{c.article}</Link>: {c.note}
            </li>
          ))}
        </ul>
      )}
    </TextPage>
  );
}
