import type { Metadata } from "next";
import "../globals.css";
import { baseMetadata, fontClasses } from "../shared-root";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { COUNTRY_CODES } from "@/config/countries";
import { edition, footerDiscover, headerProps } from "@/lib/edition";
import { brand } from "@/config/brand";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { CONSENT_COPY } from "@/config/consent-copy";

export const dynamicParams = false;

export function generateStaticParams() {
  return COUNTRY_CODES.map((country) => ({ country }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const e = edition(country);
  return {
    ...baseMetadata,
    title: { default: `${brand.name} ${e.country.name}`, template: `%s | ${brand.name} ${e.country.name}` },
    openGraph: { ...baseMetadata.openGraph, locale: e.country.locale.replace("-", "_"), siteName: `${brand.name} ${e.country.name}` },
  };
}

/** Root layout for one country edition — sets the page language for that edition. */
export default async function EditionLayout({ children, params }: { children: React.ReactNode; params: Promise<{ country: string }> }) {
  const { country } = await params;
  const e = edition(country);
  return (
    <html lang={e.country.locale} className={fontClasses}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Header {...headerProps(e.code)} />
        <main className="flex-1">{children}</main>
        <Footer
          discover={footerDiscover(e.code)}
          newsletterLabel={e.dict.ui.newsletterTitle}
          newsletterSource={`footer:${e.code}`}
          cookieSettingsLabel={CONSENT_COPY[e.country.lang].settingsLink}
        />
        <ConsentBanner copy={CONSENT_COPY[e.country.lang]} />
        <GoogleTagManager />
      </body>
    </html>
  );
}
