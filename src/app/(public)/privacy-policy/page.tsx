import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Fable collects, uses and protects your data under India's DPDP Act 2023.",
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
            Last updated: 24 November 2026 · Compliant with India's DPDP Act 2023
          </p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="md">
          <div className="prose-editorial">
            <h2>Who we are</h2>
            <p>
              Fable Media Pvt Ltd ("Fable", "we", "us") operates fable.in. This Privacy Policy describes how we collect, use, store and share your personal data, in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.
            </p>

            <h2>What data we collect</h2>
            <h3>Information you provide directly</h3>
            <ul>
              <li>Email address (when you subscribe to our newsletter or create an account)</li>
              <li>Name (optional, for newsletter personalization)</li>
              <li>Category preferences (optional)</li>
              <li>Messages you send through our contact form</li>
            </ul>
            <h3>Information collected automatically</h3>
            <ul>
              <li>IP address, approximate location (city-level), browser type, device type</li>
              <li>Pages visited, time on site, referral source</li>
              <li>Cookies and similar technologies (see below)</li>
            </ul>

            <h2>Why we collect it</h2>
            <ul>
              <li>To deliver our newsletter and services</li>
              <li>To understand which content performs well, and improve our editorial</li>
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
            <p>To exercise any of these rights, email <a href="mailto:privacy@fable.in">privacy@fable.in</a>. We respond within 30 days.</p>

            <h2>Cookies</h2>
            <p>
              We use cookies for analytics, newsletter sign-in, and to remember your preferences. Non-essential cookies (analytics) require your consent, which we request via a banner the first time you visit.
            </p>
            <p>You can opt out any time by clearing your cookies or using your browser's privacy settings.</p>

            <h2>Third-party services</h2>
            <p>We share limited data with:</p>
            <ul>
              <li><strong>Supabase</strong> — database and auth (data stored in India/EU regions)</li>
              <li><strong>Google Analytics 4</strong> — anonymized traffic analytics</li>
              <li><strong>Email service providers</strong> — newsletter delivery</li>
              <li><strong>Affiliate networks</strong> — aggregate click tracking only, no personal data</li>
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
              Fable is not directed at children under 18. We do not knowingly collect data from children. If you believe we have, contact us and we will delete it promptly.
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
              <strong>Name:</strong> [To be designated]<br />
              <strong>Email:</strong> <a href="mailto:grievance@fable.in">grievance@fable.in</a><br />
              <strong>Office:</strong> Fable Media Pvt Ltd, Saket District Centre, New Delhi 110017<br />
              <strong>Response time:</strong> Within 72 hours of receipt
            </address>

            <h2>Questions</h2>
            <p>Write to us at <a href="mailto:privacy@fable.in">privacy@fable.in</a>.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
