import Link from "next/link";
import type { Article, ArticleBlock } from "@/types/content";
import { productsBySlugs } from "@/lib/content";
import { COUNTRIES } from "@/config/countries";
import { DICTIONARIES } from "@/config/dictionaries";
import { ProductCardHorizontal } from "@/components/commerce/ProductCard";

export function tocFromBody(body: ArticleBlock[] = []) {
  return body.filter((b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2");
}

export type InlineLinks = { heading: string; items: { title: string; url: string }[]; section?: { label: string; url: string } };

const RELATED_HEADING: Record<string, string> = { en: "Related on TrendNations", de: "Mehr dazu bei TrendNations", fr: "À lire aussi sur TrendNations", pt: "Leia também no TrendNations", ja: "TrendNationsの関連記事" };
const MORE_IN: Record<string, string> = { en: "More in", de: "Mehr aus", fr: "Plus de", pt: "Mais em", ja: "もっと見る:" };
export const inlineLinkLabels = (lang: string) => ({ heading: RELATED_HEADING[lang] ?? RELATED_HEADING.en, moreIn: MORE_IN[lang] ?? MORE_IN.en });

/** Contextual internal links, placed after the article's first section. */
function RelatedBox({ links }: { links: InlineLinks }) {
  return (
    <aside className="not-prose my-10 border border-line bg-cream-100 p-5" aria-label={links.heading}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-3">{links.heading}</p>
      {links.items.length > 0 && (
      <ul className="space-y-2">
        {links.items.map((l) => (
          <li key={l.url}>
            <Link href={l.url} className="font-editorial text-lg leading-snug text-ink underline decoration-line underline-offset-4 hover:text-accent-dark hover:decoration-accent">
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
      )}
      {links.section && (
        <Link href={links.section.url} className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-60 hover:text-accent">
          {links.section.label} →
        </Link>
      )}
    </aside>
  );
}

export function ArticleBody({ article, inlineLinks }: { article: Article; inlineLinks?: InlineLinks }) {
  const h2s = (article.body ?? []).map((b, i) => (b.type === "h2" ? i : -1)).filter((i) => i >= 0);
  const insertAt = h2s.length >= 2 ? h2s[1] : -1; // just before the second H2
  // Shown whenever there is at least the section link; article links appear only when genuinely related.
  const showLinks = inlineLinks && (inlineLinks.items.length > 0 || inlineLinks.section);
  return (
    <div className="prose-editorial">
      {article.body?.map((b, i) => {
        const block = renderBlock(b, i);
        return i === insertAt && showLinks ? [<RelatedBox key={`rel-${i}`} links={inlineLinks!} />, block] : block;
      })}
      {insertAt === -1 && showLinks && <RelatedBox links={inlineLinks!} />}
    </div>
  );

  function renderBlock(b: ArticleBlock, i: number) {
    switch (b.type) {
      case "p":
        return <p key={i}>{b.text}</p>;
      case "h2":
        return (
          <h2 key={i} id={b.id} className="scroll-mt-28">
            {b.text}
          </h2>
        );
      case "h3":
        return <h3 key={i}>{b.text}</h3>;
      case "ul":
        return (
          <ul key={i}>
            {b.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        );
      case "ol":
        return (
          <ol key={i}>
            {b.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ol>
        );
      case "callout":
        return (
          <aside key={i} className="not-prose my-8 border-l-4 border-accent bg-cream-100 p-5">
            {b.title && (
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-2">
                {b.title}
              </p>
            )}
            <p className="text-ink-80 leading-relaxed">{b.text}</p>
          </aside>
        );
      case "table":
        return (
          <div key={i} className="not-prose my-8 -mx-4 sm:mx-0 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              {b.caption && (
                <caption className="caption-bottom pt-3 text-left text-xs text-ink-40 italic px-4 sm:px-0">
                  {b.caption}
                </caption>
              )}
              <thead>
                <tr className="border-b-2 border-ink">
                  {b.head.map((h, j) => (
                    <th key={j} scope="col" className="text-left font-semibold text-ink py-3 px-3 first:pl-4 sm:first:pl-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, ri) => (
                  <tr key={ri} className="border-b border-line">
                    {r.map((c, ci) =>
                      ci === 0 ? (
                        <th key={ci} scope="row" className="text-left font-medium text-ink py-3 px-3 pl-4 sm:pl-0 align-top">
                          {c}
                        </th>
                      ) : (
                        <td key={ci} className="py-3 px-3 text-ink-80 align-top">
                          {c}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "products": {
        const items = productsBySlugs(article.country, b.slugs);
        if (!items.length) return null;
        return (
          <div key={i} className="not-prose my-8 space-y-3">
            {items.map((p) => (
              <ProductCardHorizontal key={p.id} product={p} articleId={article.slug} placement="in-article" />
            ))}
            <p className="text-xs text-ink-40 italic">{DICTIONARIES[COUNTRIES[article.country].lang].ui.affiliateNote}</p>
          </div>
        );
      }
    }
  }
}
