"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ConsentCopy } from "@/config/consent-copy";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent } from "@/lib/consent";

/**
 * Cookie consent banner. "Accept all" and "Reject all" are equally prominent (CNIL/ICO
 * guidance), nothing optional is pre-ticked, and the page stays usable while it's open.
 * It reappears from the footer "Cookie settings" link.
 */
export function ConsentBanner({ copy }: { copy: ConsentCopy }) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- consent lives in a cookie only readable on the client
    if (!existing) setOpen(true);
    const reopen = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const done = (choice: { analytics: boolean; marketing: boolean }) => {
    saveConsent(choice);
    setOpen(false);
    setCustom(false);
  };

  const btn = "px-4 py-2.5 text-sm font-medium border transition whitespace-nowrap";
  const primary = `${btn} bg-ink text-cream border-ink hover:bg-accent hover:border-accent`;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl bg-cream border border-ink shadow-[0_8px_30px_rgba(0,0,0,0.18)] p-5 sm:p-6">
        <h2 id="consent-title" className="font-editorial text-xl font-semibold text-ink">{copy.title}</h2>
        <p className="mt-2 text-sm text-ink-60 leading-relaxed">
          {copy.text}{" "}
          <Link href="/privacy-policy#cookies" className="underline hover:text-accent">{copy.policy}</Link>
        </p>

        {custom && (
          <ul className="mt-4 divide-y divide-line border-y border-line">
            <Row label={copy.necessary} text={copy.necessaryText} fixed={copy.alwaysOn} />
            <Row label={copy.analytics} text={copy.analyticsText} checked={analytics} onChange={setAnalytics} />
            <Row label={copy.marketing} text={copy.marketingText} checked={marketing} onChange={setMarketing} />
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" className={primary} onClick={() => done({ analytics: false, marketing: false })}>
            {copy.rejectAll}
          </button>
          <button type="button" className={primary} onClick={() => done({ analytics: true, marketing: true })}>
            {copy.acceptAll}
          </button>
          {custom ? (
            <button type="button" className={`${btn} border-ink text-ink hover:border-accent hover:text-accent`} onClick={() => done({ analytics, marketing })}>
              {copy.save}
            </button>
          ) : (
            <button type="button" className={`${btn} border-line text-ink hover:border-ink`} onClick={() => setCustom(true)}>
              {copy.customize}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, text, fixed, checked, onChange }: { label: string; text: string; fixed?: string; checked?: boolean; onChange?: (v: boolean) => void }) {
  const id = `consent-${label.toLowerCase().replace(/[^a-z]/g, "")}`;
  return (
    <li className="py-3 flex items-start justify-between gap-4">
      <div>
        <label htmlFor={fixed ? undefined : id} className="text-sm font-semibold text-ink">{label}</label>
        <p className="text-xs text-ink-60 mt-0.5">{text}</p>
      </div>
      {fixed ? (
        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-ink-40 whitespace-nowrap">{fixed}</span>
      ) : (
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="mt-1 h-5 w-5 accent-[var(--accent)] cursor-pointer"
        />
      )}
    </li>
  );
}
