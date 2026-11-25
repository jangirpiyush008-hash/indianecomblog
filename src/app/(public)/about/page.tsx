import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/layout/TextPage";
import { brand } from "@/config/brand";
import { allArticles, allProducts } from "@/lib/content";
import { jsonLd, organizationSchema, personSchema } from "@/lib/seo/schema";
import { piyush } from "@/content/authors";

export const metadata: Metadata = {
  title: "About Us",
  description: `${brand.name} is an independent Indian publication founded and edited by ${brand.founder}. How we research, how we make money, and what we promise.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(personSchema(piyush))} />
      <TextPage
        eyebrow="About"
        title={`About ${brand.name}`}
        intro={`${brand.name} explains what's trending in India — technology, AI tools, shopping, money, lifestyle, entertainment and travel — and links every claim to its source.`}
        path="/about"
        updated="2026-11-25"
      >
        <h2>Who we are</h2>
        <p>
          {brand.name} was founded by <Link href={`/authors/${piyush.slug}`}>{brand.founder}</Link>, who writes or edits every story on the site. It&apos;s a new, independent publication — we&apos;d rather tell you that than pretend to be a big newsroom.
        </p>

        <h2>What we publish</h2>
        <ul>
          <li><strong>Explainers</strong> on Indian services and changes — UPI, credit reports, government portals, airport systems — built from the official source.</li>
          <li><strong>Buying guides and comparisons</strong> that compare products on the manufacturer&apos;s published specs and the store price on a stated date.</li>
          <li><strong>What&apos;s new</strong> — releases and offers worth knowing about this week.</li>
          <li><strong>A live Trend Radar</strong> of Indian headlines from Google News, each linked to its publisher.</li>
        </ul>
        <p>
          Right now that&apos;s {allArticles.length} published stories and {allProducts.length} products we track. We&apos;d rather publish fewer, useful pages than many thin ones.
        </p>

        <h2>How we research</h2>
        <p>
          Every article lists its sources and a short note on how it was researched. If a guide compares specs rather than testing products hands-on, it says so. We use AI tools to help with research and drafting; a human ({brand.founder}) checks the facts against the sources and is responsible for everything published. Read the full <Link href="/editorial-policy">editorial policy</Link>.
        </p>

        <h2>How we make money</h2>
        <p>
          Some links to products are affiliate links through EarnKaro. If you buy through them, we may earn a commission at no extra cost to you. Commissions never decide which products we include or what we say about them. Details are in our <Link href="/affiliate-disclosure">affiliate disclosure</Link>. If we ever publish sponsored content, it will be clearly labelled as sponsored.
        </p>

        <h2>What we promise</h2>
        <ul>
          <li>No fake reviews, ratings or testimonials.</li>
          <li>No invented prices — every price shows the date we checked it.</li>
          <li>Sources linked on every article.</li>
          <li>Mistakes corrected openly — see our <Link href="/corrections-policy">corrections policy</Link>.</li>
        </ul>

        <h2>Contact</h2>
        <p>
          Questions, corrections or partnership enquiries: <Link href="/contact">contact us</Link>.
        </p>
      </TextPage>
    </>
  );
}
