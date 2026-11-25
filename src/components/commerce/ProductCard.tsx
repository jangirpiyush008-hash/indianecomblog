import Link from "next/link";
import Image from "next/image";
import { formatINR, formatCompact, cn } from "@/lib/utils";
import { Star } from "lucide-react";
import type { Product } from "@/types/content";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <div
      className={cn(
        "group bg-paper border border-line hover:border-ink transition-all",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover p-6 transition-transform duration-500 group-hover:scale-105"
        />
        {product.discount && product.discount > 10 && (
          <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-bold">
              -{product.discount}%
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-40 mb-2">
          {product.brand}
        </div>
        <h3 className="font-editorial text-base font-semibold text-ink leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        {product.rating && (
          <div className="flex items-center gap-2 mb-3 text-sm">
            <div className="flex items-center gap-0.5 text-gold">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="font-semibold text-ink">{product.rating}</span>
            </div>
            {product.reviewCount && (
              <span className="text-ink-40 text-xs">
                ({formatCompact(product.reviewCount)})
              </span>
            )}
          </div>
        )}
        {product.verdict && (
          <p className="text-sm text-ink-60 italic mb-4 line-clamp-2">
            "{product.verdict}"
          </p>
        )}
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xl font-semibold text-ink">
              {formatINR(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-ink-40 line-through">
                {formatINR(product.originalPrice)}
              </div>
            )}
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-ink-40">
            {product.merchantName}
          </span>
        </div>
        <Link
          href={product.affiliateUrl}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="block w-full py-3 bg-ink text-cream text-center text-sm font-medium tracking-wide hover:bg-accent transition"
        >
          See deal →
        </Link>
        <div className="mt-2 text-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-40">
            Verified {new Date(product.verifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProductCardHorizontal({ product }: { product: Product }) {
  return (
    <div className="group bg-paper border border-line hover:border-ink transition flex">
      <div className="relative w-36 h-36 md:w-48 md:h-48 flex-shrink-0 bg-cream-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="192px"
          className="object-cover p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 p-5 flex flex-col">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-40 mb-1">
          {product.brand}
        </div>
        <h3 className="font-editorial text-lg font-semibold text-ink leading-snug mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-4 mt-auto">
          <div>
            <div className="text-lg font-semibold text-ink">{formatINR(product.price)}</div>
            {product.originalPrice && (
              <div className="text-xs text-ink-40 line-through">
                {formatINR(product.originalPrice)}
              </div>
            )}
          </div>
          <Link
            href={product.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="ml-auto px-5 py-2.5 bg-ink text-cream text-sm font-medium hover:bg-accent transition"
          >
            See deal
          </Link>
        </div>
      </div>
    </div>
  );
}
