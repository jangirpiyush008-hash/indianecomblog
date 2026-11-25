import Link from "next/link";
import { ALL_COUNTRIES, type CountryCode } from "@/config/countries";

/** Global admin country selector. Every admin view shows which edition it's scoped to. */
export function AdminCountryPicker({ basePath, active, allowAll = true }: { basePath: string; active?: CountryCode; allowAll?: boolean }) {
  const chip = (on: boolean) => `px-3 py-1.5 text-xs font-medium whitespace-nowrap border ${on ? "bg-ink text-cream border-ink" : "border-line text-ink-60 hover:border-ink"}`;
  return (
    <nav aria-label="Edition" className="flex items-center gap-2 overflow-x-auto pb-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mr-2 whitespace-nowrap">Global admin</span>
      {allowAll && <Link href={basePath} className={chip(!active)}>🌐 All countries</Link>}
      {ALL_COUNTRIES.map((c) => (
        <Link key={c.code} href={`${basePath}?country=${c.code}`} className={chip(active === c.code)}>
          {c.flag} {c.name}
        </Link>
      ))}
    </nav>
  );
}
