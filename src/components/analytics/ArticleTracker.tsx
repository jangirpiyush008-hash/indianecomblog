"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/track";

export type ArticleMeta = {
  article_id: string;
  article_title: string;
  article_slug: string;
  article_category: string;
  author_name: string;
  publication_date: string;
  reading_time: string;
  content_type: string;
};

const MILESTONES = [25, 50, 75, 90] as const;

/**
 * Article engagement: article_view on load, article_read_start after 10s or the first real
 * scroll, scroll milestones (each once per page view, measured against the article body,
 * not the whole page), and article_read_complete at 90% after at least 30 seconds.
 */
export function ArticleTracker({ meta }: { meta: ArticleMeta }) {
  useEffect(() => {
    const started = Date.now();
    const fired = new Set<string>();
    const fire = (event: Parameters<typeof track>[0], extra: Record<string, unknown> = {}) => {
      if (fired.has(event)) return;
      fired.add(event);
      track(event, { ...meta, page_location: window.location.href, ...extra });
    };

    fire("article_view");
    const startTimer = window.setTimeout(() => fire("article_read_start", { trigger: "time" }), 10_000);

    let ticking = false;
    const measure = () => {
      ticking = false;
      const body = document.querySelector("[data-article-body]");
      if (!body) return;
      const rect = body.getBoundingClientRect();
      const seen = window.innerHeight - rect.top;
      const pct = Math.max(0, Math.min(100, (seen / rect.height) * 100));
      if (pct >= 10) fire("article_read_start", { trigger: "scroll" });
      for (const m of MILESTONES) if (pct >= m) fire(`article_scroll_${m}` as Parameters<typeof track>[0], { percent_scrolled: m });
      if (pct >= 90 && Date.now() - started >= 30_000) {
        fire("article_read_complete", { engagement_seconds: Math.round((Date.now() - started) / 1000) });
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(measure);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Re-check completion for fast readers who reached the end before 30s.
    const completeTimer = window.setInterval(measure, 15_000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(startTimer);
      window.clearInterval(completeTimer);
    };
  }, [meta]);

  return null;
}
