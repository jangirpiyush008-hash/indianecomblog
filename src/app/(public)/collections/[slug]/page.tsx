import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { sampleArticles } from "@/lib/sample-content";

interface Collection {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  editor: string;
  articleCount: number;
  updatedDate: string;
}

const collections: Record<string, Collection> = {
  "buyers-almanac-2026": {
    slug: "buyers-almanac-2026",
    title: "The 2026 India Buyer's Almanac",
    tagline: "Best products at every price point, tested over six months.",
    description: "A year-in-review of every product category we tested. From ₹499 earbuds to ₹2L cameras — the picks we'd stake our names on. Updated monthly as prices and new entrants shift the landscape.",
    coverImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
    editor: "The Shopping Desk",
    articleCount: 47,
    updatedDate: "2026-11-24",
  },
  "ai-tools-india": {
    slug: "ai-tools-india",
    title: "AI tools that actually work in India",
    tagline: "Reviewed for INR pricing, Indian internet, and real use cases.",
    description: "We tested 60+ AI tools over three months with Indian freelancers, small businesses and students. The 23 that made the cut handle Hinglish, work on patchy broadband, and are priced for Indian wallets.",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    editor: "The AI Desk",
    articleCount: 23,
    updatedDate: "2026-11-20",
  },
  "money-playbooks-2026": {
    slug: "money-playbooks-2026",
    title: "Money playbooks for 2026",
    tagline: "Tax-saving, SIPs, credit cards and the quiet shifts in Indian finance.",
    description: "Everything we've written about personal finance this year, organized into actionable playbooks. From your first SIP to optimising a seven-card credit stack. New plays added monthly.",
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80",
    editor: "The Money Desk",
    articleCount: 31,
    updatedDate: "2026-11-22",
  },
  "weekend-getaways": {
    slug: "weekend-getaways",
    title: "Best weekend getaways from your city",
    tagline: "From Delhi, Bengaluru, Mumbai and Hyderabad.",
    description: "A living collection of every 2-3 day trip we've tested. Organized by starting city, season, and budget. The itineraries real travellers follow.",
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80",
    editor: "The Travel Desk",
    articleCount: 19,
    updatedDate: "2026-11-18",
  },
};

export async function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = collections[slug];
  if (!c) return {};
  return { title: c.title, description: c.description };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections[slug];
  if (!collection) notFound();

  return (
    <>
      <section
        className="pt-24 pb-24 border-b border-line relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,10,11,0.6), rgba(10,10,11,0.85)), url(${collection.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container size="xl">
          <div className="text-cream max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
                Collection · {collection.articleCount} stories
              </span>
            </div>
            <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] mb-6">
              {collection.title}
            </h1>
            <p className="text-2xl text-cream/90 font-editorial italic leading-snug">{collection.tagline}</p>
            <div className="mt-8 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70">
              <span>Curated by {collection.editor}</span>
              <span>·</span>
              <span>Updated {new Date(collection.updatedDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="md">
          <p className="text-xl text-ink-80 leading-relaxed font-editorial">{collection.description}</p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="xl">
          <SectionHeading eyebrow="In this collection" title="Every story, in order" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sampleArticles.slice(0, 9).map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-cream-100">
        <Container size="md">
          <div className="text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3 block">
              Never miss an update
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold mb-6">
              This collection grows. Stay in the loop.
            </h2>
            <p className="text-ink-60 mb-8">Subscribe to {collection.editor} and get an email every time this collection gets a new story.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="you@email.com" className="flex-1 px-5 py-4 border border-line focus:border-ink focus:outline-none" />
              <button type="submit" className="px-7 py-4 bg-ink text-cream font-medium hover:bg-accent transition">Subscribe</button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
