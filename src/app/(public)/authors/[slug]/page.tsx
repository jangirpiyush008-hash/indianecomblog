import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { authors, sampleArticles } from "@/lib/sample-content";

export async function generateStaticParams() {
  return Object.values(authors).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = Object.values(authors).find(a => a.slug === slug);
  if (!author) return {};
  return { title: `${author.name} — ${author.role}`, description: author.bio };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = Object.values(authors).find(a => a.slug === slug);
  if (!author) notFound();
  const authorArticles = sampleArticles.filter(a => a.author.slug === slug);

  return (
    <>
      <section className="pt-16 pb-16 border-b border-line">
        <Container size="xl">
          <nav className="pb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-40">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link href="/authors" className="hover:text-accent">Authors</Link>
          </nav>
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-3">
              <div className="h-40 w-40 rounded-full bg-cream-200 flex items-center justify-center font-editorial font-semibold text-5xl text-ink">
                {author.name.split(" ").map(n => n[0]).join("")}
              </div>
            </div>
            <div className="md:col-span-9">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3">
                {author.role}
              </div>
              <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mb-5">
                {author.name}
              </h1>
              <p className="text-xl text-ink-60 max-w-2xl leading-relaxed mb-8">{author.bio}</p>
              <div className="flex items-center gap-6 pt-6 border-t border-line">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 mb-1">Articles</div>
                  <div className="font-editorial text-2xl font-semibold">{authorArticles.length || 24}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 mb-1">Joined</div>
                  <div className="font-editorial text-2xl font-semibold">2026</div>
                </div>
                <div className="ml-auto flex gap-3">
                  <a href="#" className="text-sm text-ink-60 hover:text-accent">Twitter</a>
                  <a href="#" className="text-sm text-ink-60 hover:text-accent">LinkedIn</a>
                  <a href="#" className="text-sm text-ink-60 hover:text-accent">Email</a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading eyebrow="Latest" title={`Recent stories by ${author.name.split(" ")[0]}`} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(authorArticles.length > 0 ? authorArticles : sampleArticles.slice(0, 3)).map(a => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
