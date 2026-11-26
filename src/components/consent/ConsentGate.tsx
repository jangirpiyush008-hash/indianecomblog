"use client";

import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type ConsentCategory } from "@/lib/consent";

/**
 * Renders its children (e.g. an analytics <Script>) only after the visitor has opted in to
 * that category, and reacts immediately when they change their choice.
 */
export function ConsentGate({ category, children }: { category: ConsentCategory; children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const sync = () => setAllowed(Boolean(readConsent()?.[category]));
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, [category]);
  return allowed ? <>{children}</> : null;
}
