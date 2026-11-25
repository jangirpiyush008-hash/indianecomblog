import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ALL_COUNTRIES, urls } from "@/config/countries";
import { DICTIONARIES } from "@/config/dictionaries";
import { brand } from "@/config/brand";
import { articlesFor } from "@/lib/content";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { sectionLanguages } from "@/lib/seo/meta";

export const metadata: Metadata = {
  title: { absolute: `${brand.name} — what's trending in your country, explained` },
  description:
    "TrendNations has a local edition for India, the US, the UK, Canada, Australia, the UAE, Saudi Arabia, Germany, France and Brazil — each with that country's trends, explainers and deals.",
  alternates: { canonical: "/", languages: sectionLanguages("home") },
};

/**
 * Global entry point (x-default). Visitors in a supported country are sent to their
 * edition by the proxy; everyone else — and search engines — choose here.
 */
export default function EditionPicker() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema())} />
      <section className="pt-16 pb-12 border-b border-line">
        <Container size="xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">10 editions · one brand</span>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] mt-4 max-w-4xl">
            What&apos;s trending where you are
          </h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            Choose your edition. Each one has its own live trends, local explainers with sources, and deals from local stores.
          </p>
        </Container>
      </section>
      <section className="py-14">
        <Container size="xl">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ALL_COUNTRIES.map((c) => {
              const d = DICTIONARIES[c.lang];
              const latest = articlesFor(c.code)[0];
              return (
                <li key={c.code}>
                  <Link
                    href={`/api/country?cc=${c.code}&from=/`}
                    hrefLang={c.locale}
                    className="group flex flex-col h-full p-6 border border-line hover:border-ink bg-paper transition"
                  >
                    <span className="text-4xl" aria-hidden>{c.flag}</span>
                    <span className="mt-4 font-editorial text-2xl font-semibold group-hover:text-accent">{c.name}</span>
                    {c.nativeName !== c.name && <span className="text-sm text-ink-40">{c.nativeName}</span>}
                    <span className="mt-3 text-sm text-ink-60">{d.home.h1(c.phrase)}</span>
                    {latest && <span className="mt-4 pt-4 border-t border-line text-xs text-ink-60 line-clamp-2">{latest.title}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
          <nav aria-label="Editions" className="sr-only">
            {ALL_COUNTRIES.map((c) => (
              <a key={c.code} href={urls.home(c.code)} hrefLang={c.locale}>{c.name}</a>
            ))}
          </nav>
        </Container>
      </section>
    </>
  );
}
