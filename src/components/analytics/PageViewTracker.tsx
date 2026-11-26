"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics/track";

/**
 * Pushes exactly one `tn_page_view` per page — on first load and on every client-side
 * route change — carrying the edition's country context. In GTM, the GA4 page_view should
 * be fired from this event (with automatic/history page views turned off) so there is one
 * page-view strategy and no duplicates. See docs/analytics-tracking.md.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);
  const prevUrl = useRef<string>("");
  const prevTitle = useRef<string>("");

  useEffect(() => {
    const url = window.location.href;
    if (last.current === url) return; // guards against re-renders and dev double effects
    // On client-side navigation Next.js sets the new <title> slightly after the route
    // changes, so wait (up to 1s) for it before sending.
    const firstLoad = last.current === null;
    const oldTitle = prevTitle.current;
    const started = Date.now();
    let id = 0;
    const send = () => {
      const ready = firstLoad || (document.title !== "" && document.title !== oldTitle) || Date.now() - started > 1500;
      if (!ready) {
        id = window.setTimeout(send, 50);
        return;
      }
      track("tn_page_view", {
        page_location: url,
        page_path: window.location.pathname,
        page_title: document.title,
        page_referrer: prevUrl.current || document.referrer || undefined,
      });
      prevUrl.current = url;
      prevTitle.current = document.title;
    };
    id = window.setTimeout(send, 0);
    last.current = url;
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
