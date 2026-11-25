"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { CountrySwitcher, type SwitcherCountry } from "./CountrySwitcher";

export type HeaderProps = {
  homeHref: string;
  tagline: string;
  nav: { label: string; href: string }[];
  highlight?: { label: string; href: string };
  topLinks: { label: string; href: string }[];
  searchAction?: string;
  labels: { search: string; searchPlaceholder: string; subscribe: string; menu: string; close: string; edition: string };
  locale: string;
  timeZone: string;
  countries: SwitcherCountry[];
  current?: SwitcherCountry;
  popular?: { label: string; href: string }[];
};

export function Header(p: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="border-b border-line/60 bg-ink text-cream">
        <Container size="xl">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] py-2 gap-4">
            <div className="hidden md:block">
              {p.current && <span className="text-cream/60 mr-2">{p.current.flag} {p.current.name} —</span>}
              <HeaderDate locale={p.locale} timeZone={p.timeZone} />
            </div>
            <div className="flex items-center gap-6 ml-auto">
              {p.topLinks.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-accent transition">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container size="xl">
        <div className="flex items-center justify-between py-4 md:py-5 gap-3">
          <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 -ml-2" aria-label={p.labels.menu}>
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 md:flex-none min-w-0">
            <Link href={p.homeHref} className="inline-flex items-center">
              <Logo className="text-xl sm:text-2xl md:text-3xl text-ink" markClassName="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9" />
              <span className="hidden lg:inline-block ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40">
                {p.tagline}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <CountrySwitcher countries={p.countries} current={p.current} label={p.labels.edition} />
            {p.searchAction && (
              <button
                onClick={() => setSearchOpen(true)}
                className="inline-flex items-center gap-2 p-2 md:px-4 md:py-2 md:border md:border-line hover:border-ink text-ink-60 hover:text-ink text-sm transition"
                aria-label={p.labels.search}
              >
                <Search className="h-4 w-4" />
                <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.15em]">{p.labels.search}</span>
              </button>
            )}
          </div>
        </div>
      </Container>

      {p.nav.length > 0 && (
        <nav className="hidden md:block border-t border-line bg-cream" aria-label="Sections">
          <Container size="xl">
            <ul className="flex items-center gap-7 py-3 overflow-x-auto no-scrollbar">
              {p.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] font-medium tracking-wide text-ink hover:text-accent whitespace-nowrap transition">
                    {item.label}
                  </Link>
                </li>
              ))}
              {p.highlight && (
                <li className="ml-auto">
                  <Link href={p.highlight.href} className="text-[13px] font-medium text-accent hover:text-accent-dark whitespace-nowrap flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    {p.highlight.label}
                  </Link>
                </li>
              )}
            </ul>
          </Container>
        </nav>
      )}

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-cream overflow-auto">
          <div className="flex items-center justify-between p-5 border-b border-line">
            <Logo className="text-2xl text-ink" markClassName="h-8 w-8" />
            <button onClick={() => setMobileOpen(false)} aria-label={p.labels.close}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-5">
            <ul className="space-y-1">
              {[...p.nav, ...(p.highlight ? [p.highlight] : [])].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-3 border-b border-line text-lg font-editorial">
                    {item.label}
                  </Link>
                </li>
              ))}
              {p.topLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-3 border-b border-line text-base text-ink-60">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {searchOpen && p.searchAction && (
        <div className="fixed inset-0 z-50 bg-cream/98 backdrop-blur-md" onClick={() => setSearchOpen(false)}>
          <div className="min-h-screen pt-28 px-5" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto max-w-2xl">
              <form action={p.searchAction} role="search" className="flex items-center gap-3 border-b-2 border-ink pb-3">
                <Search className="h-6 w-6 text-ink-60" aria-hidden />
                <label htmlFor="site-search" className="sr-only">{p.labels.search}</label>
                <input
                  id="site-search"
                  name="q"
                  type="search"
                  autoFocus
                  placeholder={p.labels.searchPlaceholder}
                  className="flex-1 bg-transparent outline-none text-xl md:text-2xl font-editorial placeholder:text-ink-40"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="text-ink-60 hover:text-ink" aria-label={p.labels.close}>
                  <X className="h-5 w-5" />
                </button>
              </form>
              {p.popular?.length ? (
                <ul className="mt-10 flex flex-wrap gap-2">
                  {p.popular.map((x) => (
                    <li key={x.href}>
                      <a href={x.href} className="px-3 py-1.5 border border-line hover:border-ink text-sm">{x.label}</a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HeaderDate({ locale, timeZone }: { locale: string; timeZone: string }) {
  const [d, setD] = useState("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date must render client-side in the edition's time zone
    setD(new Date().toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", timeZone }));
  }, [locale, timeZone]);
  return <span>{d}</span>;
}
