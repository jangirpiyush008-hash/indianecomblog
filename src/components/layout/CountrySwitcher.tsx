"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export type SwitcherCountry = { code: string; flag: string; name: string; nativeName: string };

/**
 * Edition picker. Every option goes through /api/country, which stores the choice
 * in a cookie (overriding geolocation on future visits) and sends the visitor to
 * the equivalent page in the chosen edition.
 */
export function CountrySwitcher({
  countries,
  current,
  label,
  variant = "light",
}: {
  countries: SwitcherCountry[];
  current?: SwitcherCountry;
  label: string;
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dark = variant === "dark";
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-2 text-sm border transition ${
          dark ? "border-cream/30 text-cream hover:border-cream" : "border-line text-ink hover:border-ink"
        }`}
      >
        <span aria-hidden>{current?.flag ?? "🌐"}</span>
        <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.15em]">{current ? current.code.toUpperCase() : label}</span>
        <ChevronDown className="h-3.5 w-3.5" aria-hidden />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-64 max-h-[70vh] overflow-auto bg-paper border border-ink shadow-lg py-1 text-ink"
        >
          {countries.map((c) => (
            <li key={c.code} role="option" aria-selected={c.code === current?.code}>
              <a
                href={`/api/country?cc=${c.code}&from=${encodeURIComponent(pathname ?? "/")}`}
                rel="nofollow"
                className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-cream-100 ${c.code === current?.code ? "font-semibold" : ""}`}
              >
                <span aria-hidden className="text-lg">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                {c.nativeName !== c.name && <span className="text-xs text-ink-40">{c.nativeName}</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
