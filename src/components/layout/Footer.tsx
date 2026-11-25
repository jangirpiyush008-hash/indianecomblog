import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-cream">
      <Container size="xl">
        <div className="py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Logo className="text-3xl text-cream mb-4" markClassName="h-10 w-10" />
            <p className="text-cream/70 text-sm leading-relaxed max-w-sm">
              {brand.description}
            </p>
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-3">Newsletter</p>
              <NewsletterForm source="footer" variant="dark" />
              <p className="mt-3 text-[11px] text-cream/50">New stories by email. No spam.</p>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-5">
              Discover
            </p>
            <ul className="space-y-3">
              {siteConfig.footerNav.discover.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/80 hover:text-accent transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-5">
              {brand.name}
            </p>
            <ul className="space-y-3">
              {siteConfig.footerNav.about.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/80 hover:text-accent transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-5">
              Business
            </p>
            <ul className="space-y-3">
              {siteConfig.footerNav.business.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/80 hover:text-accent transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-cream/50">
            © {new Date().getFullYear()} {brand.name}. Founded and edited by {brand.founder}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
