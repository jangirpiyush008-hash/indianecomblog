import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How Fable uses affiliate links and partner commissions.",
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-line">
        <Container size="md">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Affiliate Disclosure</span>
          </div>
          <h1 className="font-editorial text-4xl md:text-5xl font-semibold leading-tight">How we use affiliate links.</h1>
          <p className="mt-4 text-sm text-ink-40 font-mono uppercase tracking-[0.15em]">Last updated: 24 November 2026</p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="md">
          <div className="prose-editorial">
            <h2>The short version</h2>
            <p>
              When you buy a product through a link on Fable, we may earn a small commission from the merchant. It costs you nothing extra. This is one of the ways we fund our editorial work.
            </p>
            <p>
              Crucially: affiliate commissions do not influence what we recommend. We rank products on merit. We recommend "do not buy" when the product deserves it. We recommend cheaper alternatives when they're better — even when the cheaper option pays us less.
            </p>

            <h2>How to spot an affiliate link</h2>
            <p>
              Every "Buy", "See deal", or "Shop" link on Fable goes through an affiliate network. We don't hide them. Our product cards also note the merchant (Amazon.in, Flipkart, Nykaa, etc.).
            </p>
            <p>
              You can always buy a product by searching for it directly on the merchant's site. We'd just appreciate it if you used our link — it helps us keep the lights on.
            </p>

            <h2>Our affiliate partners</h2>
            <p>Fable is an affiliate of the following programs (as of this date):</p>
            <ul>
              <li>Amazon Associates India</li>
              <li>Flipkart Affiliates (where applicable)</li>
              <li>Cuelinks</li>
              <li>EarnKaro</li>
              <li>Admitad India</li>
              <li>Impact</li>
              <li>CJ Affiliate</li>
              <li>Various direct brand partnerships (reviewed and approved by our editorial team)</li>
            </ul>
            <p>
              This list changes. Some partners come and go as programs evolve.
            </p>

            <h2>What affiliate links do NOT do</h2>
            <ul>
              <li><strong>They do not affect our editorial verdict.</strong> We rank products by merit, not by commission.</li>
              <li><strong>They do not change your price.</strong> You pay the same price with or without our link.</li>
              <li><strong>They do not share your personal information with us.</strong> We receive aggregate data about orders, not your details.</li>
            </ul>

            <h2>The FTC / ASCI standard</h2>
            <p>
              We follow both the US FTC guidelines on affiliate disclosure and the Advertising Standards Council of India (ASCI) guidelines for influencer and affiliate transparency. If you find a page on Fable that uses an affiliate link without clear disclosure, please report it to <a href="mailto:corrections@fable.in">corrections@fable.in</a>.
            </p>

            <h2>Questions</h2>
            <p>
              If you have questions about how we use affiliate links, write to <a href="mailto:editor@fable.in">editor@fable.in</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
