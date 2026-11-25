import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using this website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-line">
        <Container size="md">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Terms of Service</span>
          </div>
          <h1 className="font-editorial text-4xl md:text-5xl font-semibold leading-tight">The ground rules.</h1>
          <p className="mt-4 text-sm text-ink-40 font-mono uppercase tracking-[0.15em]">Last updated: 25 November 2026</p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="md">
          <div className="prose-editorial">
            <h2>1. Acceptance of terms</h2>
            <p>
              By accessing or using this website ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
            </p>

            <h2>2. The Service</h2>
            <p>
              {brand.name}, run by {brand.founder}, operates the Service as a digital publication providing editorial content, product recommendations, deals, trend analysis and related services. We may modify, suspend or discontinue any aspect of the Service at any time.
            </p>

            <h2>3. Eligibility</h2>
            <p>You must be at least 18 years old to use the Service. By using the Service, you represent that you are legally capable of entering into a binding contract.</p>

            <h2>4. Your account</h2>
            <p>If you create an account (e.g., to subscribe to our newsletter), you are responsible for:</p>
            <ul>
              <li>Providing accurate information</li>
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activity under your account</li>
            </ul>

            <h2>5. Editorial content</h2>
            <p>
              Our editorial content reflects our opinions, based on our research and the sources listed on each article. Prices, specifications and availability change frequently — the information on our site is accurate as of publication and reasonable updates thereafter, but we cannot guarantee real-time accuracy. Always verify on the merchant's site before purchasing.
            </p>

            <h2>6. Affiliate links</h2>
            <p>
              The Service contains affiliate links through which we may earn commissions. See our <a href="/affiliate-disclosure">Affiliate Disclosure</a> for details. Purchases made via affiliate links are contracts between you and the respective merchant — Fable is not party to those transactions.
            </p>

            <h2>7. No warranty</h2>
            <p>
              The Service is provided "as is" without warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that the information provided is complete or accurate at all times.
            </p>
            <p>
              Any reliance on the Service's content for purchase, investment, financial, medical or legal decisions is at your own risk. We recommend consulting qualified professionals for material decisions.
            </p>

            <h2>8. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by Indian law, {brand.name} and its operator will not be liable for any indirect, incidental, consequential, special or punitive damages arising from your use of the Service.
            </p>
            <p>
              Our total liability for any claim arising out of or relating to the Service shall not exceed ₹5,000.
            </p>

            <h2>9. Intellectual property</h2>
            <p>
              All content on the Service — articles, images, logos, design, and underlying code — is the property of {brand.name} or its licensors (product images belong to their respective brands), and is protected by Indian and international copyright law.
            </p>
            <p>You may share links to our content and quote brief excerpts with attribution. You may not reproduce, distribute, modify or create derivative works without written permission.</p>

            <h2>10. User conduct</h2>
            <p>When using the Service, you agree not to:</p>
            <ul>
              <li>Violate any applicable law or regulation</li>
              <li>Impersonate any person or entity</li>
              <li>Attempt to gain unauthorized access to the Service or related systems</li>
              <li>Scrape, data-mine or extract content for commercial use without permission</li>
              <li>Upload viruses, malware or harmful code</li>
              <li>Interfere with the operation of the Service</li>
            </ul>

            <h2>11. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any time for violation of these Terms, applicable law, or at our discretion.
            </p>

            <h2>12. Governing law</h2>
            <p>
              These Terms are governed by the laws of India. Any dispute shall be subject to the jurisdiction of the courts of India.
            </p>

            <h2>13. Changes</h2>
            <p>
              We may update these Terms from time to time. Material changes will be announced on this page and, for subscribers, by email at least 14 days before taking effect.
            </p>

            <h2>14. Contact</h2>
            <p>
              Questions about these Terms? Write to <a href={`mailto:${brand.email}`}>{brand.email}</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
