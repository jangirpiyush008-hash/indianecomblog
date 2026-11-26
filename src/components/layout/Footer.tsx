import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { brand } from "@/config/brand";
import { Logo } from "@/components/brand/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ALL_COUNTRIES, urls } from "@/config/countries";
import { ConsentLink } from "@/components/consent/ConsentLink";

type Col = { title: string; links: { label: string; href: string }[] };

const companyLinks: Col = {
  title: brand.name,
  links: [
    { label: "About", href: "/about" },
    { label: "Authors", href: "/authors" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Corrections", href: "/corrections-policy" },
    { label: "Contact", href: "/contact" },
  ],
};
const legalLinks: Col = {
  title: "Business",
  links: [
    { label: "Advertise", href: "/advertise" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
    { label: "Sitemap", href: "/sitemap" },
  ],
};

export function Footer({
  discover,
  newsletterLabel = "Newsletter",
  newsletterSource = "footer",
  description = brand.description,
  cookieSettingsLabel = "Cookie settings",
}: {
  discover?: Col;
  newsletterLabel?: string;
  newsletterSource?: string;
  description?: string;
  cookieSettingsLabel?: string;
}) {
  const cols = [discover, companyLinks, legalLinks].filter(Boolean) as Col[];
  return (
    <footer className="mt-24 border-t border-line bg-ink text-cream">
      <Container size="xl">
        <div className="py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Logo className="text-3xl text-cream mb-4" markClassName="h-10 w-10" />
            <p className="text-cream/70 text-sm leading-relaxed max-w-sm">{description}</p>
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-3">{newsletterLabel}</p>
              <NewsletterForm source={newsletterSource} variant="dark" />
            </div>
          </div>
          {cols.map((col, i) => (
            <div key={col.title} className={`md:col-span-2 ${i === 0 ? "md:col-start-6" : ""}`}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-cream/80 hover:text-accent transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
                {col === legalLinks && (
                  <li>
                    <ConsentLink label={cookieSettingsLabel} className="text-sm text-cream/80 hover:text-accent transition text-left" />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8 border-t border-cream/10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-4">Editions</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {ALL_COUNTRIES.map((c) => (
              <li key={c.code}>
                <Link href={urls.home(c.code)} hrefLang={c.locale} className="text-sm text-cream/80 hover:text-accent">
                  <span aria-hidden>{c.flag}</span> {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-6 border-t border-cream/10">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-cream/50">
            © {new Date().getFullYear()} {brand.name}. Founded and edited by {brand.founder}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
