import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { allAuthors, articlesByAuthor } from "@/lib/content";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Authors",
  description: `Who writes and edits ${brand.name}.`,
  alternates: { canonical: "/authors" },
};

export default function AuthorsPage() {
  return (
    <>
      <section className="pt-16 pb-12 border-b border-line">
        <Container size="xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Authors</span>
          <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mt-4 max-w-4xl">Who writes {brand.name}</h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            Every story has a named author who is responsible for it.
          </p>
        </Container>
      </section>
      <section className="py-16 border-b border-line">
        <Container size="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allAuthors.map((a) => (
              <Link key={a.slug} href={`/authors/${a.slug}`} className="group block bg-paper border border-line p-8 hover:border-ink transition">
                <div className="flex items-center gap-5 mb-5">
                  <div className="h-16 w-16 rounded-full bg-ink text-cream flex items-center justify-center font-editorial font-semibold text-xl flex-shrink-0">
                    {a.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h2 className="font-editorial text-2xl font-semibold text-ink group-hover:text-accent-dark transition">{a.name}</h2>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mt-1">{a.role}</p>
                  </div>
                </div>
                <p className="text-sm text-ink-60 leading-relaxed">{a.bio}</p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-40 group-hover:text-accent transition">
                  {articlesByAuthor(a.slug).length} articles →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-16 bg-cream-100">
        <Container size="md">
          <div className="text-center">
            <h2 className="font-editorial text-3xl font-semibold mb-4">Want to contribute?</h2>
            <p className="text-ink-60 leading-relaxed mb-8">If you know a topic well and want to write for {brand.name}, send a short pitch.</p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-ink text-cream font-medium hover:bg-accent transition">
              Send a pitch →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
