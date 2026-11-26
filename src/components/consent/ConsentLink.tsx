"use client";

import { openConsentSettings } from "@/lib/consent";

/** Footer link that reopens the consent banner so visitors can change or withdraw consent. */
export function ConsentLink({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      {label}
    </button>
  );
}
