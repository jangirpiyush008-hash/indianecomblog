import "./globals.css";
import Link from "next/link";
import { fontClasses } from "./shared-root";
import { ALL_COUNTRIES, urls } from "@/config/countries";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { CONSENT_COPY } from "@/config/consent-copy";

export const metadata = { title: "Page not found — TrendNations", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontClasses}>
      <body className="min-h-full bg-cream text-ink">
        <main className="max-w-3xl mx-auto px-6 py-24">
          <div className="font-editorial text-[140px] font-semibold text-accent leading-none">404</div>
          <h1 className="font-editorial text-4xl font-semibold mb-4">Page not found</h1>
          <p className="text-ink-60 mb-8">That page doesn&apos;t exist. Pick your edition:</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {ALL_COUNTRIES.map((c) => (
              <li key={c.code}>
                <Link href={urls.home(c.code)} className="flex items-center gap-3 p-4 border border-line hover:border-ink bg-paper">
                  <span className="text-2xl" aria-hidden>{c.flag}</span>
                  <span className="font-medium">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </main>
        <ConsentBanner copy={CONSENT_COPY.en} />
        <GoogleTagManager />
        <PageViewTracker />
      </body>
    </html>
  );
}
