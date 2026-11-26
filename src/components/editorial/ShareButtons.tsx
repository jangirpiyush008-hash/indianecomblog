"use client";

import { useState } from "react";
import { track } from "@/lib/analytics/track";

export function ShareButtons({ url, title, slug }: { url: string; title: string; slug?: string }) {
  const shared = (method: string) => track("article_share", { method, article_slug: slug });
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "X", name: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: "Wa", name: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "In", name: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "FB", name: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];

  async function copy() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        shared("native_share");
        return;
      }
      await navigator.clipboard.writeText(url);
      shared("copy_link");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.name}
          onClick={() => shared(l.name.replace("Share on ", "").toLowerCase())}
          title={l.name}
          className="h-9 w-9 border border-line hover:border-ink flex items-center justify-center text-xs font-medium transition"
        >
          {l.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className="h-9 px-3 border border-line hover:border-ink text-xs font-medium transition"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
