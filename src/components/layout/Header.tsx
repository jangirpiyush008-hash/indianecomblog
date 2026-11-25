"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      {/* Top strip */}
      <div className="border-b border-line/60 bg-ink text-cream">
        <Container size="xl">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] py-2">
            <div className="hidden md:block">
              <span className="text-cream/60">Today —</span>{" "}
              <HeaderDate />
            </div>
            <div className="flex items-center gap-6">
              <Link href="/newsletter" className="hover:text-accent transition">
                Daily digest
              </Link>
              <Link href="/trending" className="hover:text-accent transition">
                Trending now
              </Link>
              <span className="hidden md:inline text-cream/60">New Delhi · Mumbai · Bengaluru</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <Container size="xl">
        <div className="flex items-center justify-between py-5 md:py-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -ml-2"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link href="/" className="inline-block">
              <span className="font-editorial text-3xl md:text-4xl font-semibold tracking-tight text-ink">
                {brand.name}
              </span>
              <span className="hidden md:inline-block ml-3 align-top font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 pt-2">
                {brand.tagline}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-line hover:border-ink text-ink-60 hover:text-ink text-sm transition"
            >
              <Search className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em]">Search</span>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/newsletter"
              className="hidden lg:inline-flex items-center px-5 py-2 bg-ink text-cream text-sm font-medium hover:bg-accent transition"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </Container>

      {/* Category nav */}
      <nav className="hidden md:block border-t border-line bg-cream">
        <Container size="xl">
          <ul className="flex items-center gap-8 py-3.5 overflow-x-auto no-scrollbar">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] font-medium tracking-wide text-ink hover:text-accent whitespace-nowrap transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <Link
                href="/deals"
                className="text-[13px] font-medium tracking-wide text-accent hover:text-accent-dark whitespace-nowrap transition flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Hot deals
              </Link>
            </li>
          </ul>
        </Container>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-cream">
          <div className="flex items-center justify-between p-5 border-b border-line">
            <span className="font-editorial text-2xl font-semibold">{brand.name}</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-5">
            <ul className="space-y-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 border-b border-line text-lg font-editorial"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3">
              <Link
                href="/newsletter"
                className="block w-full py-3 bg-ink text-cream text-center text-sm font-medium"
              >
                Subscribe to daily digest
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <SearchOverlay onClose={() => setSearchOpen(false)} />
      )}
    </header>
  );
}

function HeaderDate() {
  const [d, setD] = useState("");
  useEffect(() => {
    setD(new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }));
  }, []);
  return <span>{d}</span>;
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const popular = ["best phones under 30000", "best AI tools", "mutual funds 2026", "Goa in winter", "OTT releases this week"];
  return (
    <div className="fixed inset-0 z-50 bg-cream/98 backdrop-blur-md" onClick={onClose}>
      <div
        className="min-h-screen pt-28 px-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 border-b-2 border-ink pb-3">
            <Search className="h-6 w-6 text-ink-60" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles, products, deals…"
              className="flex-1 bg-transparent outline-none text-xl md:text-2xl font-editorial placeholder:text-ink-40"
            />
            <button onClick={onClose} className="text-ink-60 hover:text-ink">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-4">Popular searches</p>
            <ul className="space-y-2">
              {popular.map((p) => (
                <li key={p}>
                  <button
                    onClick={() => setQ(p)}
                    className="group flex items-center gap-2 text-base text-ink-80 hover:text-accent py-2"
                  >
                    <span className="text-ink-40 group-hover:text-accent">↗</span>
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
