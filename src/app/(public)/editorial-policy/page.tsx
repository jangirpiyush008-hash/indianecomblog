import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/layout/TextPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: `How ${brand.name} researches, sources, uses AI, handles affiliate links and corrects mistakes.`,
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <TextPage
      eyebrow="Standards"
      title="Editorial policy"
      intro="The rules every story on this site follows."
      path="/editorial-policy"
      updated="2026-11-25"
    >
      <h2 id="independence">Independence</h2>
      <p>
        {brand.name} is independently owned and edited by {brand.founder}. Advertisers and affiliate partners have no say in what we cover, which products we include, or what we conclude.
      </p>

      <h2 id="sourcing">Sourcing</h2>
      <ul>
        <li>Facts come from primary sources where possible: regulators (RBI, NPCI, DoT), official company pages and product listings.</li>
        <li>Every article lists its sources at the end, with links.</li>
        <li>When reputable sources disagree, we say so rather than picking one silently.</li>
        <li>We don&apos;t invent statistics, prices, specifications, ratings or quotes.</li>
      </ul>

      <h2 id="products">Product coverage</h2>
      <ul>
        <li>Prices are what the store showed on the date stated on the page. They change; the store&apos;s price at checkout is final.</li>
        <li>Specifications are the manufacturer&apos;s published claims unless we say we measured them.</li>
        <li>We only call something &ldquo;tested&rdquo; if we actually used it. Spec-based guides say so in their methodology note.</li>
        <li>We don&apos;t display star ratings or review counts unless they come from a named, reliable source.</li>
      </ul>

      <h2 id="ai">Use of AI</h2>
      <p>
        We use AI tools to help gather research, summarise sources and draft text. Nothing is published without a human checking it against the sources listed on the article. AI quality scores are never treated as proof that something is accurate. We don&apos;t mass-produce pages to chase search traffic.
      </p>

      <h2 id="trend-radar">Trend Radar</h2>
      <p>
        The <Link href="/trending">Trend Radar</Link> lists recent Google News India headlines for each desk, credited and linked to the original publisher. We don&apos;t score or rewrite those headlines on the page. When a topic deserves explanation, we write a separate article with sources.
      </p>

      <h2 id="affiliate">Affiliate links and sponsorship</h2>
      <p>
        Product links may be affiliate links (through EarnKaro) and are marked as sponsored for search engines. Pages with affiliate links carry a disclosure near the top. Sponsored content, if we publish any, will be labelled &ldquo;Sponsored&rdquo; with the sponsor&apos;s name. See the <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>

      <h2 id="corrections">Corrections</h2>
      <p>
        When we get something wrong, we fix it and note the change on the article. See the <Link href="/corrections-policy">corrections policy</Link>.
      </p>
    </TextPage>
  );
}
