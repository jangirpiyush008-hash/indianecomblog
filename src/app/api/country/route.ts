import { NextResponse } from "next/server";
import { COUNTRY_COOKIE, DESKS, isCountryCode, sectionFromSlug, urls, type CountryCode } from "@/config/countries";
import { getArticle } from "@/lib/content";

/**
 * Manual edition switch. Stores the choice (overrides geolocation on future visits)
 * and redirects to the equivalent page in the chosen edition:
 *   section page  → same section in the new edition (localized slug)
 *   article page  → same desk in the new edition (articles are country-specific)
 *   anything else → the new edition's homepage
 * Only internal paths are produced, so this can't be used as an open redirect.
 */
export function GET(req: Request) {
  const url = new URL(req.url);
  const cc = url.searchParams.get("cc");
  if (!isCountryCode(cc)) return NextResponse.redirect(new URL("/", url), 302);
  const dest = equivalentPath(url.searchParams.get("from") ?? "/", cc);
  const res = NextResponse.redirect(new URL(dest, url), 302);
  res.cookies.set(COUNTRY_COOKIE, cc, {
    path: "/",
    maxAge: 60 * 60 * 24 * 180, // 180 days
    sameSite: "lax",
    secure: url.protocol === "https:",
    httpOnly: false,
  });
  return res;
}

function equivalentPath(from: string, to: CountryCode): string {
  const parts = from.split("?")[0].split("/").filter(Boolean);
  const [fromCc, section, slug] = parts;
  if (!isCountryCode(fromCc) || !section) return urls.home(to);
  if (section === "tag") return urls.home(to);
  const key = sectionFromSlug(fromCc, section);
  if (!key) return urls.home(to);
  if (slug && (DESKS as readonly string[]).includes(key)) {
    // Article: articles are written per edition. Go to the same desk in the new edition.
    return getArticle(fromCc, key, slug) ? urls.section(to, key) : urls.home(to);
  }
  return urls.section(to, key);
}
