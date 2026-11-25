import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Search } from "lucide-react";
import { allArticles } from "@/lib/content";

export default function NotFound() {
  const popular = allArticles.slice(0, 5);

  return (
    <section className="min-h-[70vh] py-24 flex items-center">
      <Container size="lg">
        <div className="grid md:grid-cols-12 gap-14 items-center">
          <div className="md:col-span-7">
            <div className="font-editorial text-[180px] md:text-[240px] font-semibold text-accent leading-none mb-0">404</div>
            <h1 className="font-editorial text-4xl md:text-5xl font-semibold leading-tight mb-4">
              This page got away from us.
            </h1>
            <p className="text-lg text-ink-60 mb-10 max-w-md">
              That URL doesn't exist here — maybe it was moved, maybe we never wrote it. Either way, let's get you somewhere useful.
            </p>

            <form action="/search" className="relative max-w-md mb-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-60" />
              <input
                name="q"
                type="search"
                aria-label="Search"
                placeholder="Search articles and products…"
                className="w-full pl-12 pr-4 py-4 border-2 border-ink bg-paper focus:outline-none"
              />
            </form>

            <div className="flex flex-wrap gap-3">
              <Link href="/" className="px-6 py-3 bg-ink text-cream font-medium hover:bg-accent transition">
                Go home →
              </Link>
              <Link href="/trending" className="px-6 py-3 border border-ink text-ink hover:bg-ink hover:text-cream transition font-medium">
                See what's trending
              </Link>
            </div>
          </div>

          <aside className="md:col-span-5">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold pb-3 border-b border-line mb-5">
              Latest stories
            </h2>
            <div className="space-y-5">
              {popular.map((a, i) => (
                <Link key={a.id} href={a.url} className="group flex gap-4 py-3 border-b border-line last:border-0">
                  <span className="font-editorial text-3xl font-semibold text-ink-40 min-w-[2rem] leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-1">
                      {a.categoryName}
                    </div>
                    <h3 className="font-editorial text-base font-semibold text-ink group-hover:text-accent-dark transition leading-tight">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
