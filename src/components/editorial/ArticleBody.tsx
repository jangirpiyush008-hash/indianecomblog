import type { Article, ArticleBlock } from "@/types/content";
import { productsBySlugs } from "@/lib/content";
import { COUNTRIES } from "@/config/countries";
import { DICTIONARIES } from "@/config/dictionaries";
import { ProductCardHorizontal } from "@/components/commerce/ProductCard";

export function tocFromBody(body: ArticleBlock[] = []) {
  return body.filter((b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2");
}

export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="prose-editorial">
      {article.body?.map((b, i) => {
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
      })}
    </div>
  );
}
