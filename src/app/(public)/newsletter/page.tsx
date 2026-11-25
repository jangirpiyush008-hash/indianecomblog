import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { brand } from "@/config/brand";
import { allArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Newsletter",
  description: `Get new explainers, buying guides and price-checked picks from ${brand.name} by email. Free, unsubscribe any time.`,
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  const recent = allArticles.slice(0, 6);
  return (
    <>
      <section className="pt-16 pb-16 border-b border-line bg-accent text-white">
        <Container size="md">
          <div className="text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold">Newsletter</span>
            <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mt-4 mb-6">
              Get {brand.name} in your inbox
            </h1>
            <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto">
              New explainers, buying guides and price-checked picks, when we publish them. Free.
            </p>
            <NewsletterForm source="newsletter-page" variant="accent" className="max-w-md mx-auto" />
            <p className="mt-4 text-xs text-white/80">
              We only use your email to send the newsletter. Unsubscribe any time. <Link href="/privacy-policy" className="underline">Privacy policy</Link>
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="lg">
          <h2 className="font-editorial text-3xl font-semibold mb-8">What you&apos;ll get</h2>
          <ul className="grid md:grid-cols-3 gap-8">
            {[
              { t: "New stories", d: "Explainers on UPI, credit, government services, AI offers and more — with sources." },
              { t: "Price-checked picks", d: "Products from our guides, with the price and the date we checked it." },
              { t: "No spam", d: "We email when there's something worth reading, not on a quota." },
            ].map((f) => (
              <li key={f.t}>
                <h3 className="font-editorial text-xl font-semibold mb-2">{f.t}</h3>
                <p className="text-ink-60 leading-relaxed">{f.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 bg-cream-100">
        <Container size="md">
          <h2 className="font-editorial text-3xl font-semibold mb-6">Recently published</h2>
          <ul>
            {recent.map((a) => (
              <li key={a.id} className="py-5 border-b border-line last:border-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-1">
                  {formatDate(a.publishedAt)} · {a.categoryName}
                </p>
                <Link href={a.url} className="font-editorial text-lg hover:text-accent">{a.title}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
