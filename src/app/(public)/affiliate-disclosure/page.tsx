import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/layout/TextPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `How ${brand.name} uses EarnKaro affiliate links and how they're labelled.`,
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <TextPage
      eyebrow="Disclosure"
      title="Affiliate disclosure"
      intro="Some product links on this site earn us a commission. Here's exactly how that works."
      path="/affiliate-disclosure"
      updated="2026-11-25"
    >
      <h2>The short version</h2>
      <p>
        When you buy a product through a &ldquo;View on …&rdquo; link on {brand.name}, we may earn a commission from the retailer. You pay the same price either way.
      </p>

      <h2>Which network we use</h2>
      <p>
        Our product links currently go through <strong>EarnKaro</strong>, an Indian affiliate platform. Clicking one takes you through EarnKaro&apos;s tracking address (linkredirect.in) and on to the retailer&apos;s own product page — for example the boAt or Noise store. We use the full tracking link, not a URL shortener, so you can always see where it goes.
      </p>

      <h2>How to recognise an affiliate link</h2>
      <ul>
        <li>Product cards and &ldquo;View on [store]&rdquo; buttons are affiliate links.</li>
        <li>Articles that contain affiliate links say so near the top.</li>
        <li>Affiliate links are marked <code>rel=&quot;sponsored&quot;</code> for search engines.</li>
      </ul>

      <h2>What affiliate links don&apos;t do</h2>
      <ul>
        <li>They don&apos;t change which products we include or what we say about them.</li>
        <li>They don&apos;t change your price.</li>
        <li>They don&apos;t give us your name, address or payment details. We see only aggregated order reports from EarnKaro.</li>
      </ul>
      <p>
        When we click-track a link on our own site, we log the product and page, plus a one-way hash of your IP address for fraud prevention — see the <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>Standards we follow</h2>
      <p>
        We aim to follow the Advertising Standards Council of India (ASCI) guidance on clear disclosure. If you find a page with an affiliate link and no disclosure, please tell us through the <Link href="/contact">contact page</Link>.
      </p>
    </TextPage>
  );
}
