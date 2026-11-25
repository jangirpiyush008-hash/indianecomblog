import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact Fable",
  description: "Pitch a story, report a correction, or send feedback.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-16 pb-16 border-b border-line">
        <Container size="lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Contact</span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">
            Say hello.
          </h1>
          <p className="mt-6 text-xl text-ink-60 max-w-2xl">
            Pitch a story. Report a correction. Flag an outdated price. Or just say hi — we read everything.
          </p>
        </Container>
      </section>

      <section className="py-16 border-b border-line">
        <Container size="lg">
          <div className="grid md:grid-cols-12 gap-14">
            <div className="md:col-span-7">
              <h2 className="font-editorial text-3xl font-semibold mb-6">General inquiry</h2>
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-2">Your name</label>
                    <input type="text" required className="w-full px-4 py-3 border border-line focus:border-ink focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-2">Email</label>
                    <input type="email" required className="w-full px-4 py-3 border border-line focus:border-ink focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-2">Type of inquiry</label>
                  <select className="w-full px-4 py-3 border border-line focus:border-ink focus:outline-none bg-paper">
                    <option>Story pitch</option>
                    <option>Correction / error report</option>
                    <option>Outdated price / dead link</option>
                    <option>Brand partnership</option>
                    <option>Press inquiry</option>
                    <option>Technical issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-2">Subject</label>
                  <input type="text" required className="w-full px-4 py-3 border border-line focus:border-ink focus:outline-none" />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-2">Message</label>
                  <textarea required rows={6} className="w-full px-4 py-3 border border-line focus:border-ink focus:outline-none" />
                </div>
                <button type="submit" className="px-8 py-4 bg-ink text-cream font-medium hover:bg-accent transition">
                  Send message
                </button>
                <p className="text-xs text-ink-40 italic">
                  We read every message. Most get a reply within 2 business days.
                </p>
              </form>
            </div>

            <aside className="md:col-span-5 space-y-10">
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">Direct lines</h3>
                <dl className="space-y-4">
                  {[
                    { label: "Editorial pitches", email: "pitch@fable.in" },
                    { label: "Corrections", email: "corrections@fable.in" },
                    { label: "Brand partnerships", email: "partners@fable.in" },
                    { label: "Press", email: "press@fable.in" },
                    { label: "General", email: "hello@fable.in" },
                  ].map((d) => (
                    <div key={d.email} className="pb-4 border-b border-line">
                      <dt className="text-sm text-ink-60">{d.label}</dt>
                      <dd className="font-editorial text-lg text-ink mt-1">
                        <a href={`mailto:${d.email}`} className="hover:text-accent">{d.email}</a>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">Our offices</h3>
                <div className="space-y-5">
                  <div>
                    <div className="font-editorial text-lg font-semibold mb-1">New Delhi (HQ)</div>
                    <address className="not-italic text-sm text-ink-60 leading-relaxed">
                      Fable Media Pvt Ltd<br />
                      Saket District Centre<br />
                      New Delhi 110017<br />
                      India
                    </address>
                  </div>
                  <div>
                    <div className="font-editorial text-lg font-semibold mb-1">Bengaluru</div>
                    <address className="not-italic text-sm text-ink-60 leading-relaxed">
                      Indiranagar<br />
                      Bengaluru 560038
                    </address>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
