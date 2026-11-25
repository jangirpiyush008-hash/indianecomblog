import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Advertise & Partner with Fable",
  description: "Reach India's most engaged premium discovery audience.",
};

export default function AdvertisePage() {
  return (
    <>
      <section className="pt-16 pb-16 border-b border-line bg-ink text-cream">
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Partnerships</span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            Reach India's premium discovery audience.
          </h1>
          <p className="mt-6 text-xl text-cream/80 max-w-2xl">
            Fable readers come to make decisions — not to scroll. They buy phones, invest their savings, book trips, and try new tools. Partner with us to reach them.
          </p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading eyebrow="Our audience" title="Who reads Fable" />
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { v: "Metro-first", l: "Top 8 Indian metros — 78% of readership" },
              { v: "25–44", l: "Core age bracket" },
              { v: "₹12L+", l: "Median household income" },
              { v: "67% male", l: "Gender split, trending balanced" },
            ].map(s => (
              <div key={s.v} className="bg-paper border border-line p-8">
                <div className="font-editorial text-3xl font-semibold text-ink mb-2">{s.v}</div>
                <div className="text-sm text-ink-60">{s.l}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line bg-cream-100">
        <Container size="xl">
          <SectionHeading eyebrow="Formats" title="Ways to partner" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Sponsored stories", desc: "Long-form editorial supported by your brand, written by our editors, clearly labeled as sponsored.", from: "₹3,00,000" },
              { name: "Newsletter sponsorship", desc: "A dedicated placement in our Daily Digest newsletter. Reaches engaged readers at 7 AM.", from: "₹75,000" },
              { name: "Dedicated send", desc: "Your message in a standalone email to our newsletter list.", from: "₹2,50,000" },
              { name: "Category sponsorship", desc: "Sponsor a vertical (Technology, Money, Shopping) for a month. Top-of-page placement.", from: "₹5,00,000" },
              { name: "Research partnership", desc: "Co-publish original research or data journalism with us.", from: "₹8,00,000" },
              { name: "Display advertising", desc: "Thoughtful, non-intrusive display placements. Programmatic or direct.", from: "₹1,50,000" },
            ].map(f => (
              <div key={f.name} className="bg-paper border border-line p-8">
                <h3 className="font-editorial text-xl font-semibold mb-3">{f.name}</h3>
                <p className="text-sm text-ink-60 leading-relaxed mb-5">{f.desc}</p>
                <div className="pt-4 border-t border-line">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 mb-1">Starts from</div>
                  <div className="font-editorial text-2xl font-semibold text-accent">{f.from}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-ink-60 italic max-w-2xl">
            Rates are indicative and depend on format, duration and placement. Request our media kit for full pricing.
          </p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="md">
          <SectionHeading eyebrow="How we work with partners" title="Our rules of engagement" />
          <div className="prose-editorial">
            <ul>
              <li><strong>Editorial independence stays intact.</strong> Sponsored content runs clearly labelled. Partners never see editorial coverage before publication.</li>
              <li><strong>We say no.</strong> We reject partnerships that conflict with our editorial values — misleading financial products, predatory lending, dark-pattern apps, etc.</li>
              <li><strong>Brand safety guaranteed.</strong> We don't run clickbait, fake reviews, or chase outrage. Your brand shows up next to work we're proud of.</li>
              <li><strong>Real metrics.</strong> We report real engagement numbers — not inflated impression counts.</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-accent text-white">
        <Container size="md">
          <div className="text-center">
            <h2 className="font-editorial text-4xl md:text-5xl font-semibold mb-6">Request a media kit</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">Full audience data, rate card, and example work. Sent same day.</p>
            <Link href="mailto:partners@fable.in" className="inline-block px-8 py-4 bg-ink text-cream font-medium hover:bg-ink-80 transition">
              Email partners@fable.in →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
