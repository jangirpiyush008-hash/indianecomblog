import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-cream">
      <Container size="xl">
        <div className="py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <h3 className="font-editorial text-4xl font-semibold mb-4">{brand.name}</h3>
            <p className="text-cream/70 text-sm leading-relaxed max-w-sm">
              {brand.description}
            </p>
            <form className="mt-8">
              <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-3 block">
                The daily digest
              </label>
              <div className="flex">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 px-4 py-3 bg-cream/5 border border-cream/20 text-cream text-sm placeholder:text-cream/40 focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent hover:bg-accent-dark text-white text-sm font-medium tracking-wide transition"
                >
                  Join free
                </button>
              </div>
              <p className="mt-3 text-[11px] text-cream/50">
                Join 120,000+ readers. 1 email. No spam.
              </p>
            </form>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-5">
              Discover
            </h4>
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
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-5">
              Fable
            </h4>
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
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-5">
              Business
            </h4>
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
            © 2026 {brand.name}. Published from New Delhi, India.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={`https://twitter.com/${brand.social.twitter.replace("@", "")}`}
              className="text-[11px] font-mono uppercase tracking-[0.2em] text-cream/50 hover:text-accent"
            >
              Twitter
            </Link>
            <Link
              href={`https://instagram.com/${brand.social.instagram.replace("@", "")}`}
              className="text-[11px] font-mono uppercase tracking-[0.2em] text-cream/50 hover:text-accent"
            >
              Instagram
            </Link>
            <Link
              href={`https://youtube.com/${brand.social.youtube.replace("@", "")}`}
              className="text-[11px] font-mono uppercase tracking-[0.2em] text-cream/50 hover:text-accent"
            >
              YouTube
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
