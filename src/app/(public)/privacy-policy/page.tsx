import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use and protect your data, in line with India's Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-line">
        <Container size="md">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Privacy Policy</span>
          </div>
          <h1 className="font-editorial text-4xl md:text-5xl font-semibold leading-tight">Your data. Your rules.</h1>
          <p className="mt-4 text-sm text-ink-40 font-mono uppercase tracking-[0.15em]">
            Last updated: 25 November 2026
          </p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="md">
          <div className="prose-editorial">
            <h2>Who we are</h2>
            <p>
              {brand.name} ("we", "us") is a publication founded and run by {brand.founder}. This Privacy Policy describes how we collect, use, store and share your personal data, in line with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.
            </p>

            <h2>What data we collect</h2>
            <h3>Information you provide directly</h3>
            <ul>
              <li>Email address (when you subscribe to our newsletter)</li>
              <li>Messages you send through our contact form</li>
            </ul>
            <h3>Information collected automatically</h3>
            <ul>
              <li>When you click a product link: the product, the page, your browser's user-agent and referrer, and a one-way hash of your IP address (we don't store the IP itself)</li>
              <li>Standard server logs kept by our hosting provider</li>
            </ul>

            <h2>Why we collect it</h2>
            <ul>
              <li>To deliver our newsletter and services</li>
                            <li>To measure affiliate link performance (aggregate, not personal)</li>
              <li>To prevent fraud, spam, and abuse</li>
              <li>To comply with Indian law</li>
            </ul>

            <h2>Your rights under the DPDP Act</h2>
            <p>As an Indian resident, you have the right to:</p>
            <ul>
              <li><strong>Access</strong> the personal data we hold about you</li>
              <li><strong>Correct</strong> inaccurate or outdated information</li>
              <li><strong>Erase</strong> your personal data (subject to legal retention requirements)</li>
              <li><strong>Withdraw consent</strong> at any time for processing based on consent</li>
              <li><strong>Grievance redressal</strong> through our Grievance Officer (contact below)</li>
            </ul>
            <p>To exercise any of these rights, email <a href={`mailto:${brand.email}`}>{brand.email}</a>. We respond within 30 days.</p>

            <h2>Cookies</h2>
            <p>
              We don&apos;t currently use analytics or advertising cookies. If we add analytics in future, we&apos;ll update this page and ask for your consent first where the law requires it.
            </p>

            <h2>Third-party services</h2>
            <p>We share limited data with:</p>
            <ul>
              <li><strong>Supabase</strong> — database that stores newsletter sign-ups, contact messages and click logs</li>
              <li><strong>Railway</strong> — website hosting</li>
              <li><strong>EarnKaro</strong> — when you click a product link you go through EarnKaro&apos;s tracking page to the retailer; their privacy policy applies there</li>
            </ul>
            <p>We do not sell your personal data to anyone. Ever.</p>

            <h2>Data retention</h2>
            <p>
              Newsletter subscribers: retained while you remain subscribed, deleted within 30 days of unsubscribe (except for suppression list, which keeps your email flagged to prevent re-adding).
            </p>
            <p>Analytics data: retained for up to 26 months in aggregated form.</p>
            <p>Contact form submissions: retained for up to 12 months.</p>

            <h2>Children's privacy</h2>
            <p>
              {brand.name} is not directed at children under 18. We do not knowingly collect data from children. If you believe we have, contact us and we will delete it promptly.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              When we materially change this policy, we post the update here and notify newsletter subscribers via email at least 14 days before changes take effect.
            </p>

            <h2>Grievance Officer</h2>
            <p>
              As required under Rule 5 of the IT (Intermediary Guidelines) Rules, 2021 and the DPDP Act:
            </p>
            <address className="not-italic">
              <strong>Name:</strong> {brand.founder}<br />
              <strong>Email:</strong> <a href={`mailto:${brand.email}`}>{brand.email}</a><br />
              <strong>Response time:</strong> Within 72 hours of receipt
            </address>

            <h2>Questions</h2>
            <p>Write to us at <a href={`mailto:${brand.email}`}>{brand.email}</a>.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
