import Link from "next/link";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  seeMoreHref,
  seeMoreLabel = "See all",
  align = "left",
  size = "md",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  seeMoreHref?: string;
  seeMoreLabel?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const titleSize = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
  }[size];

  return (
    <div
      className={cn(
        "flex items-end justify-between gap-6 border-b border-line pb-5 mb-10",
        align === "center" && "flex-col items-center text-center",
        className
      )}
    >
      <div className={cn(align === "center" && "text-center")}>
        {eyebrow && (
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              {eyebrow}
            </span>
          </div>
        )}
        <h2
          className={cn(
            "font-editorial font-semibold text-ink leading-[1.05]",
            titleSize
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-ink-60 max-w-xl">{description}</p>
        )}
      </div>
      {seeMoreHref && (
        <Link
          href={seeMoreHref}
          className="group hidden md:inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent whitespace-nowrap pb-1"
        >
          {seeMoreLabel}
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
