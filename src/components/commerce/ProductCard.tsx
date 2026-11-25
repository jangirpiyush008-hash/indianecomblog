import Image from "next/image";
import { formatINR, cn } from "@/lib/utils";
import type { Product } from "@/types/content";
import { AffiliateLink } from "./AffiliateLink";

const checked = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

export function ProductCard({
  product,
  className,
  placement = "card",
  articleId,
}: {
  product: Product;
  className?: string;
  placement?: string;
  articleId?: string;
}) {
  return (
    <div className={cn("group bg-paper border border-line hover:border-ink transition-all flex flex-col", className)}>
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        {product.discount && product.discount >= 10 ? (
          <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-bold">
              {product.discount}% off MRP
            </span>
          </div>
        ) : null}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-40 mb-2">
          {product.brand} · {product.category}
        </div>
        <h3 className="font-editorial text-base font-semibold text-ink leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        {product.keyFeatures?.length ? (
          <ul className="text-xs text-ink-60 space-y-1 mb-4">
            {product.keyFeatures.slice(0, 3).map((f) => (
              <li key={f} className="flex gap-1.5">
                <span className="text-accent">·</span>
                {f}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex items-end justify-between mb-4 mt-auto">
          <div>
            <div className="text-xl font-semibold text-ink">{formatINR(product.price)}</div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-ink-40">
                MRP <span className="line-through">{formatINR(product.originalPrice)}</span>
              </div>
            )}
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-ink-40">
            {product.merchantName}
          </span>
        </div>
        <AffiliateLink
          product={product}
          placement={placement}
          articleId={articleId}
          className="block w-full py-3 bg-ink text-cream text-center text-sm font-medium tracking-wide hover:bg-accent transition"
        >
          View on {product.merchantName} →
        </AffiliateLink>
        <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-ink-40">
          Price checked {checked(product.verifiedAt)} · may change
        </p>
      </div>
    </div>
  );
}

export function ProductCardHorizontal({
  product,
  placement = "inline",
  articleId,
}: {
  product: Product;
  placement?: string;
  articleId?: string;
}) {
  return (
    <div className="group bg-paper border border-line hover:border-ink transition flex">
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 bg-cream-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="144px"
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 p-4 sm:p-5 flex flex-col min-w-0">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-40 mb-1">{product.brand}</div>
        <h3 className="font-editorial text-base sm:text-lg font-semibold text-ink leading-snug mb-1">
          {product.name}
        </h3>
        {product.keyFeatures?.length ? (
          <p className="text-xs text-ink-60 mb-2 line-clamp-1">{product.keyFeatures.slice(0, 3).join(" · ")}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3 mt-auto">
          <div>
            <div className="text-lg font-semibold text-ink">{formatINR(product.price)}</div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-ink-40">
                MRP <span className="line-through">{formatINR(product.originalPrice)}</span>
              </div>
            )}
          </div>
          <AffiliateLink
            product={product}
            placement={placement}
            articleId={articleId}
            className="ml-auto px-4 py-2.5 bg-ink text-cream text-sm font-medium hover:bg-accent transition whitespace-nowrap"
          >
            View on {product.merchantName}
          </AffiliateLink>
        </div>
      </div>
    </div>
  );
}
