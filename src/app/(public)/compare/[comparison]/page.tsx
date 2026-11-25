import { notFound, permanentRedirect } from "next/navigation";
import { comparisonArticles } from "@/lib/content";

/**
 * /compare/<slug> is a short alias for comparison articles.
 * It permanently redirects to the canonical article URL so search engines index one page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return comparisonArticles().map((a) => ({ comparison: a.slug }));
}

export default async function ComparePage({ params }: { params: Promise<{ comparison: string }> }) {
  const { comparison } = await params;
  const article = comparisonArticles().find((a) => a.slug === comparison);
  if (!article) notFound();
  permanentRedirect(article.url);
}
