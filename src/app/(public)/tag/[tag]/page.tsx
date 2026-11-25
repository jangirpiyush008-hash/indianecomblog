import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { sampleArticles } from "@/lib/sample-content";

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const t = decodeURIComponent(tag).replace(/-/g, " ");
  return { title: `${t} — Stories tagged`, description: `All Fable articles tagged ${t}` };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const t = decodeURIComponent(tag).toLowerCase();
  const articles = sampleArticles.filter(a => a.tags?.some(x => x.toLowerCase().includes(t.replace(/-/g, " "))));
  const list = articles.length > 0 ? articles : sampleArticles.slice(0, 6);
  const displayTag = decodeURIComponent(tag).replace(/-/g, " ");

  return (
    <>
      <section className="pt-16 pb-16 border-b border-line">
        <Container size="xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Tag</span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl capitalize">
            #{displayTag}
          </h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            {list.length} {list.length === 1 ? "story" : "stories"} tagged <span className="font-semibold text-ink">{displayTag}</span>.
          </p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {list.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        </Container>
      </section>
    </>
  );
}
