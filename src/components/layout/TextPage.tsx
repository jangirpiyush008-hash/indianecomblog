import { Container } from "@/components/ui/Container";
import { breadcrumbSchema, jsonLd } from "@/lib/seo/schema";

/** Shared layout for about/policy pages: one H1, readable measure, last-updated date. */
export function TextPage({
  eyebrow,
  title,
  intro,
  updated,
  path,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  updated?: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema([{ name: "Home", url: "/" }, { name: title, url: path }]))}
      />
      <section className="pt-16 pb-12 border-b border-line">
        <Container size="md">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">{eyebrow}</span>
          <h1 className="font-editorial text-5xl md:text-6xl font-semibold leading-[0.95] mt-4">{title}</h1>
          {intro && <p className="mt-6 text-xl text-ink-60 leading-relaxed">{intro}</p>}
          {updated && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40">
              Last updated <time dateTime={updated}>{new Date(updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time>
            </p>
          )}
        </Container>
      </section>
      <section className="py-14">
        <Container size="md">
          <div className="prose-editorial">{children}</div>
        </Container>
      </section>
    </>
  );
}
