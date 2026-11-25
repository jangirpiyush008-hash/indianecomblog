import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/layout/TextPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Advertise & Partner",
  description: `Partnership options with ${brand.name} and the rules we follow for sponsored content.`,
  alternates: { canonical: "/advertise" },
};

export default function AdvertisePage() {
  return (
    <TextPage
      eyebrow="Partnerships"
      title={`Advertise with ${brand.name}`}
      intro="We're a new, independent publication. If you'd like to work with us, here's what's possible and the rules we won't bend."
      path="/advertise"
      updated="2026-11-25"
    >
      <h2>What we offer</h2>
      <ul>
        <li><strong>Sponsored articles</strong> — clearly labelled &ldquo;Sponsored&rdquo; with your brand name, and held to the same sourcing standards as our own stories.</li>
        <li><strong>Newsletter sponsorship</strong> — a labelled placement in our email, once the list is large enough to be worth your money.</li>
        <li><strong>Affiliate and product partnerships</strong> — if your brand is on an affiliate network we use, we may include products where they genuinely fit a guide.</li>
      </ul>
      <p>
        We don&apos;t publish audience or traffic numbers we can&apos;t back up. Ask, and we&apos;ll share our current analytics directly.
      </p>

      <h2>Our rules</h2>
      <ul>
        <li>Sponsored content is always labelled. Sponsors don&apos;t review or approve our independent coverage.</li>
        <li>No fake reviews, ratings or testimonials — paid or otherwise.</li>
        <li>We decline products we think could harm readers, such as misleading financial products.</li>
      </ul>

      <h2>Get in touch</h2>
      <p>
        Email <a href={`mailto:${brand.email}?subject=Partnership`}>{brand.email}</a> or use the <Link href="/contact">contact form</Link> and choose &ldquo;Brand partnership&rdquo;.
      </p>
    </TextPage>
  );
}
