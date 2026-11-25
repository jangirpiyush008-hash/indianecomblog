import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { brand } from "@/config/brand";
import { breadcrumbSchema, jsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Contact",
  description: `Report a correction, flag an outdated price, suggest a story or ask about partnerships with ${brand.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]))}
      />
      <section className="pt-16 pb-12 border-b border-line">
        <Container size="lg">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Contact</span>
          <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mt-4">Contact {brand.name}</h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            Spotted an error or an outdated price? Have a story idea or a partnership question? Send a message — {brand.founder} reads them all.
          </p>
        </Container>
      </section>
      <section className="py-16">
        <Container size="lg">
          <div className="grid md:grid-cols-12 gap-14">
            <div className="md:col-span-7">
              <h2 className="font-editorial text-3xl font-semibold mb-6">Send a message</h2>
              <ContactForm />
            </div>
            <aside className="md:col-span-5 space-y-8">
              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3">Email</h2>
                <a href={`mailto:${brand.email}`} className="font-editorial text-xl hover:text-accent">{brand.email}</a>
              </div>
              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3">Before you write</h2>
                <ul className="space-y-2 text-sm text-ink-60">
                  <li><Link href="/corrections-policy" className="underline hover:text-accent">How we handle corrections</Link></li>
                  <li><Link href="/affiliate-disclosure" className="underline hover:text-accent">How affiliate links work</Link></li>
                  <li><Link href="/advertise" className="underline hover:text-accent">Advertising and partnerships</Link></li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
