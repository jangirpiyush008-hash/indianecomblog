import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "gold" | "ghost" | "live" | "deal";
  className?: string;
}) {
  const variants = {
    default: "bg-ink text-cream",
    accent: "bg-accent text-white",
    gold: "bg-gold-tint text-ink border border-gold",
    ghost: "border border-line text-ink",
    live: "bg-danger text-white",
    deal: "bg-emerald text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.15em] font-semibold",
        variants[variant],
        className
      )}
    >
      {variant === "live" && (
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
      )}
      {children}
    </span>
  );
}

export function CategoryTag({
  slug,
  name,
  color,
  className,
  asLink = true,
}: {
  slug: string;
  name: string;
  color?: string;
  className?: string;
  /** Set false when rendered inside another link (nested <a> is invalid HTML). */
  asLink?: boolean;
}) {
  const Tag = asLink ? "a" : "span";
  return (
    <Tag
      {...(asLink ? { href: `/${slug}` } : {})}
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] font-semibold hover:opacity-80 transition",
        className
      )}
      style={{ color: color || "var(--accent)" }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: color || "var(--accent)" }}
      />
      {name}
    </Tag>
  );
}
