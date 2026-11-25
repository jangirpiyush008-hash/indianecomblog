import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { allAuthors, articlesByAuthor } from "@/lib/content";
import { breadcrumbSchema, jsonLd, personSchema } from "@/lib/seo/schema";

export const dynamicParams = false;

export async function generateStaticParams() {
  return allAuthors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = allAuthors.find((a) => a.slug === slug);
  if (!author) return {};
  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    alternates: { canonical: `/authors/${author.slug}` },
    openGraph: { type: "profile", title: author.name, description: author.bio },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = allAuthors.find((a) => a.slug === slug);
  if (!author) notFound();
  const articles = articlesByAuthor(slug);
  const desks = [...new Set(articles.map((a) => a.country.toUpperCase()))];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(personSchema(author))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Authors", url: "/authors" },
            { name: author.name, url: `/authors/${author.slug}` },
          ])
        )}
      />
      <section className="pt-16 pb-14 border-b border-line">
        <Container size="xl">
          <nav aria-label="Breadcrumb" className="pb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-40">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/authors" className="hover:text-accent">Authors</Link>
          </nav>
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-3">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-ink text-cream flex items-center justify-center font-editorial font-semibold text-5xl">
                {author.name.split(" ").map((n) => n[0]).join("")}
              </div>
            </div>
            <div className="md:col-span-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3">{author.role}</p>
              <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mb-5">{author.name}</h1>
              <p className="text-lg text-ink-60 leading-relaxed max-w-2xl">{author.bio}</p>
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40">Articles</dt>
                  <dd className="font-editorial text-2xl font-semibold">{articles.length}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40">Editions</dt>
                  <dd className="text-ink-80 mt-1">{desks.join(", ")}</dd>
                </div>
              </dl>
              {author.sameAs?.length ? (
                <ul className="mt-6 flex gap-4">
                  {author.sameAs.map((u) => (
                    <li key={u}>
                      <a href={u} target="_blank" rel="me noopener noreferrer" className="text-sm text-ink-60 hover:text-accent underline">
                        {new URL(u).hostname.replace("www.", "")}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
      <section className="py-16">
        <Container size="xl">
          <SectionHeading eyebrow="Latest" title={`Articles by ${author.name}`} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
