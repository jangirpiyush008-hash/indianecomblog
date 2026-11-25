import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { authors } from "@/lib/sample-content";

export const metadata: Metadata = {
  title: "Our Authors — The Fable Editorial Team",
  description: "Meet the editors and writers behind Fable's reporting.",
};

export default function AuthorsPage() {
  const authorList = Object.values(authors);

  return (
    <>
      <section className="pt-16 pb-16 border-b border-line">
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">The Newsroom</span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            The editors behind Fable.
          </h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            Journalists, reviewers, analysts and researchers — covering India from Delhi, Mumbai, Bengaluru, and beyond.
          </p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {authorList.map((a) => (
              <Link
                key={a.slug}
                href={`/authors/${a.slug}`}
                className="group block bg-paper border border-line p-8 hover:border-ink transition"
              >
                <div className="flex items-center gap-5 mb-5">
                  <div className="h-16 w-16 rounded-full bg-cream-200 flex items-center justify-center font-editorial font-semibold text-xl text-ink flex-shrink-0 group-hover:bg-accent group-hover:text-cream transition">
                    {a.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl font-semibold text-ink group-hover:text-accent-dark transition">
                      {a.name}
                    </h3>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mt-1">
                      {a.role}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-ink-60 leading-relaxed">{a.bio}</p>
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-40 group-hover:text-accent transition">
                  Read articles →
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-cream-100">
        <Container size="md">
          <div className="text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3 block">
              Join the newsroom
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold mb-6">
              Want to write for Fable?
            </h2>
            <p className="text-ink-60 leading-relaxed mb-8">
              We're hiring editors, writers and reviewers across technology, money, lifestyle and travel. Based in India, paid in INR, published at scale.
            </p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-ink text-cream font-medium hover:bg-accent transition">
              Pitch us →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
