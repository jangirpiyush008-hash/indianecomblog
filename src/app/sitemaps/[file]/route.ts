import { isCountryCode } from "@/config/countries";
import { editionEntries, globalEntries, renderUrlset, sitemapFiles } from "@/lib/seo/sitemaps";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return sitemapFiles.map((f) => ({ file: `${f}.xml` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const name = file.replace(/\.xml$/, "");
  const entries = name === "global" ? globalEntries() : isCountryCode(name) ? editionEntries(name) : null;
  if (!entries) return new Response("Not found", { status: 404 });
  return new Response(renderUrlset(entries), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
