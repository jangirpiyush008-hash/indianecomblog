import Link from "next/link";

const defaultItems = [
  { label: "Jio AI Cloud announced for July rollout", href: "/technology/jio-ai-cloud" },
  { label: "iPhone 16 Pro drops to ₹1,19,900 on Amazon", href: "/deals/iphone-16-pro" },
  { label: "Perplexity Pro free for Airtel customers", href: "/ai-tools/perplexity-airtel" },
  { label: "HDFC Infinia now gives 10X on Amazon", href: "/money/hdfc-infinia-amazon" },
  { label: "Panchayat Season 4 release confirmed", href: "/entertainment/panchayat-s4" },
  { label: "Lakshadweep opens 3 new islands to tourists", href: "/travel/lakshadweep-new-islands" },
  { label: "Nykaa's Blockbuster Beauty Sale starts Friday", href: "/shopping/nykaa-sale" },
];

export function TickerBar({ items = defaultItems }: { items?: typeof defaultItems }) {
  const double = [...items, ...items];
  return (
    <div className="border-b border-line bg-cream-100 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-accent text-white px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold whitespace-nowrap">
              Trending now
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker-track flex whitespace-nowrap py-3">
            {double.map((item, i) => (
              <Link
                key={`${item.href}-${i}`}
                href={item.href}
                className="inline-flex items-center gap-3 px-6 text-sm text-ink hover:text-accent transition"
              >
                <span className="text-ink-40 font-mono text-xs">◆</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
