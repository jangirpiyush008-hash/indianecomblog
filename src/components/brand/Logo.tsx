import { cn } from "@/lib/utils";

/** Globe mark: a world circle with a rising trend line crossing it. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("h-9 w-9 shrink-0", className)}>
      <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="20" cy="20" rx="7.5" ry="17" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <line x1="3" y1="20" x2="37" y2="20" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <polyline
        points="7,27 15,20 21,24 32,12"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline points="26,12 32,12 32,18" fill="none" stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Full logo: mark + "TrendNations" wordmark. */
export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span className="font-editorial font-semibold tracking-tight leading-none">
        Trend<span className="text-accent">Nations</span>
      </span>
    </span>
  );
}
