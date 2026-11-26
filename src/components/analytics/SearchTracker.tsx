"use client";

import { useEffect } from "react";
import { safeSearchTerm, track } from "@/lib/analytics/track";

/** Internal site search: `search` with the (sanitised) term and result count, plus `search_no_results`. */
export function SearchTracker({ q, results }: { q: string; results: number }) {
  useEffect(() => {
    const search_term = safeSearchTerm(q);
    if (!search_term) return;
    track("search", { search_term, results_count: results });
    if (results === 0) track("search_no_results", { search_term });
  }, [q, results]);
  return null;
}
