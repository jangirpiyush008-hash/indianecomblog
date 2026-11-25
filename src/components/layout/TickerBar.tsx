export type TickerItem = { label: string; href: string; external?: boolean };

/** Scrolling headline strip. Items must be real — the homepage passes live headlines and our latest stories. */
export function TickerBar({ items }: { items: TickerItem[] }) {
  if (!items.length) return null;
  const double = [...items, ...items];
  return (
    <div className="border-b border-line bg-cream-100 overflow-hidden" aria-label="Latest headlines">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-accent text-white px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold whitespace-nowrap">Latest</span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker-track flex whitespace-nowrap py-3">
            {double.map((item, i) => (
              <a
                key={`${item.href}-${i}`}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-hidden={i >= items.length ? true : undefined}
                tabIndex={i >= items.length ? -1 : undefined}
                className="inline-flex items-center gap-3 px-6 text-sm text-ink hover:text-accent transition"
              >
                <span className="text-ink-40 font-mono text-xs">◆</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
