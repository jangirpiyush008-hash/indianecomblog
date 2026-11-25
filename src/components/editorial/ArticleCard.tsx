import Link from "next/link";
import Image from "next/image";
import { CategoryTag } from "@/components/ui/Badge";
import { formatRelativeTime } from "@/lib/utils";
import type { Article } from "@/types/content";
import { cn } from "@/lib/utils";

/** Large feature card — used for hero */
export function FeatureArticleCard({ article }: { article: Article }) {
  return (
    <Link href={article.url} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-200 mb-6">
        <Image
          src={article.heroImage}
          alt={article.heroImageAlt || article.title}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          priority
        />
        {article.trending && (
          <div className="absolute top-5 left-5 bg-cream px-3 py-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-accent">
              ● Trending
            </span>
          </div>
        )}
      </div>
      <div>
        <CategoryTag
          slug={article.category}
          name={article.categoryName}
          color={article.categoryAccent}
          className="mb-4"
        />
        <h2 className="font-editorial text-3xl md:text-5xl font-semibold leading-[1.05] tracking-tight text-ink group-hover:text-accent-dark transition-colors">
          {article.title}
        </h2>
        {article.subtitle && (
          <p className="mt-4 text-lg md:text-xl text-ink-60 leading-snug max-w-2xl">
            {article.subtitle}
          </p>
        )}
        <div className="mt-6 flex items-center gap-3 text-sm text-ink-40">
          <span className="text-ink-80 font-medium">{article.author.name}</span>
          <span>·</span>
          <span>{formatRelativeTime(article.publishedAt)}</span>
          <span>·</span>
          <span>{article.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}

/** Medium card — grid use */
export function ArticleCard({
  article,
  showImage = true,
  imageRatio = "landscape",
  className,
}: {
  article: Article;
  showImage?: boolean;
  imageRatio?: "landscape" | "square" | "portrait";
  className?: string;
}) {
  const ratio = {
    landscape: "aspect-[4/3]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  }[imageRatio];

  return (
    <Link href={article.url} className={cn("group block", className)}>
      {showImage && (
        <div className={cn("relative overflow-hidden bg-cream-200 mb-4", ratio)}>
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <CategoryTag
        slug={article.category}
        name={article.categoryName}
        color={article.categoryAccent}
        className="mb-3"
      />
      <h3 className="font-editorial text-xl md:text-2xl font-semibold leading-tight text-ink group-hover:text-accent-dark transition-colors">
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-ink-60 line-clamp-2">{article.excerpt}</p>
      <div className="mt-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-ink-40">
        <span>{article.author.name}</span>
        <span>·</span>
        <span>{article.readingTime}</span>
      </div>
    </Link>
  );
}

/** Compact list card — text only */
export function ArticleListCard({
  article,
  number,
  className,
}: {
  article: Article;
  number?: number;
  className?: string;
}) {
  return (
    <Link
      href={article.url}
      className={cn(
        "group flex gap-4 py-5 border-b border-line last:border-0",
        className
      )}
    >
      {number !== undefined && (
        <span className="font-editorial text-3xl font-semibold text-ink-40 min-w-[2rem] leading-none">
          {String(number).padStart(2, "0")}
        </span>
      )}
      <div className="flex-1">
        <CategoryTag
          slug={article.category}
          name={article.categoryName}
          color={article.categoryAccent}
          className="mb-2"
        />
        <h4 className="font-editorial text-lg font-semibold leading-tight text-ink group-hover:text-accent-dark transition-colors">
          {article.title}
        </h4>
        <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.15em] text-ink-40">
          {article.readingTime}
        </div>
      </div>
    </Link>
  );
}

/** Horizontal card with image — side by side */
export function ArticleHCard({ article }: { article: Article }) {
  return (
    <Link href={article.url} className="group flex gap-5 py-6 border-b border-line last:border-0">
      <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 overflow-hidden bg-cream-200">
        <Image
          src={article.heroImage}
          alt={article.heroImageAlt || article.title}
          fill
          sizes="144px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 min-w-0">
        <CategoryTag
          slug={article.category}
          name={article.categoryName}
          color={article.categoryAccent}
          className="mb-2"
        />
        <h4 className="font-editorial text-lg md:text-xl font-semibold leading-tight text-ink group-hover:text-accent-dark transition-colors line-clamp-2">
          {article.title}
        </h4>
        <p className="mt-2 text-sm text-ink-60 line-clamp-2 hidden md:block">
          {article.excerpt}
        </p>
        <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.15em] text-ink-40">
          {article.author.name} · {article.readingTime}
        </div>
      </div>
    </Link>
  );
}
