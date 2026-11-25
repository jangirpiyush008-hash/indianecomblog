import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "About Fable",
  description: "The story behind India's premium digital discovery magazine.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-16 border-b border-line">
        <Container size="lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">About {brand.name}</span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            Discovery, rebuilt for India.
          </h1>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="md">
          <div className="prose-editorial">
            <p className="text-2xl text-ink-80 leading-relaxed">
              {brand.name} is India's premium digital discovery magazine. We write about technology, AI tools, shopping, money, lifestyle, entertainment and travel — in a voice that respects your intelligence and your time.
            </p>

            <h2>Our mission</h2>
            <p>
              Every day, millions of Indians make purchase and decision calls on information that was written for the writer, not the reader. We think you deserve better. {brand.name} exists to be the one source you can trust — for a laptop, a credit card, a weekend trip, an AI tool, or the next series worth your time.
            </p>

            <h2>How we make money</h2>
            <p>
              We are an affiliate-supported publication. When you buy a product through our links, we may earn a small commission. This never changes our editorial verdict. If we think a product is not worth buying, we say so — even when there's a commission on the line.
            </p>
            <p>
              We also run occasional brand partnerships and sponsored features — always clearly labelled as sponsored, and reviewed by an editor outside the deal before publication.
            </p>

            <h2>What we promise</h2>
            <ul>
              <li><strong>No fake reviews.</strong> If a product wasn't tested, we don't review it. Period.</li>
              <li><strong>No stealth advertising.</strong> Sponsored stories are labelled clearly. Affiliate links are disclosed on every page.</li>
              <li><strong>No AI-generated listicles.</strong> We use AI to assist research. Every published article has a human editor's byline and judgement behind it.</li>
              <li><strong>No stale prices.</strong> Every product price is verified within the last 72 hours — often the last 24.</li>
              <li><strong>Public corrections.</strong> When we're wrong, we admit it, fix it, and log it publicly.</li>
            </ul>

            <h2>Who we are</h2>
            <p>
              {brand.name} is a small, remote-first team of editors, writers, reviewers and engineers. We publish from New Delhi, Mumbai, Bengaluru, Pune, Hyderabad and Kochi. Our senior editors have published at Gadgets360, Moneycontrol, YourStory, Inc42 and The Ken.
            </p>

            <h2>Where we're going</h2>
            <p>
              We launched in 2026 with a single belief: India deserves a discovery platform that feels like it was built by people who actually read. Over the next twelve months we'll expand into Hindi coverage, add deeper personal finance tools, and launch our Trend Radar — a real-time dashboard of what India is talking about, buying, and searching for.
            </p>
            <p className="pt-4">
              Thanks for reading. If you ever want to reach us — <Link href="/contact" className="underline">here's how</Link>.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line bg-cream-100">
        <Container size="xl">
          <SectionHeading eyebrow="By the numbers" title="Where we are today" />
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: "7", label: "Senior editors" },
              { value: "240+", label: "Products tested" },
              { value: "35+", label: "Cities covered" },
              { value: "100%", label: "Independent" },
            ].map(s => (
              <div key={s.label} className="bg-paper border border-line p-8 text-center">
                <div className="font-editorial text-5xl font-semibold text-accent mb-2">{s.value}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-60">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
