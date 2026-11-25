import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { COUNTRY_COOKIE, countryFromIso, isCountryCode } from "@/config/countries";

const BOT_UA = /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|embedly|whatsapp|telegram|linkedin|google-inspectiontool/i;

/**
 * Edition routing happens ONLY on "/" — never on a country URL — so a direct link
 * to /us/... always works from any country, and redirect loops are impossible.
 *
 * Priority: saved choice (cookie) → trusted geolocation → edition picker.
 * The CF-IPCountry header is only trusted when TRUST_CF_IPCOUNTRY=1, i.e. when the
 * site is served through Cloudflare (otherwise anyone could spoof it).
 */
function routeRoot(req: NextRequest) {
  const saved = req.cookies.get(COUNTRY_COOKIE)?.value;
  let target = isCountryCode(saved) ? saved : undefined;

  if (!target && !BOT_UA.test(req.headers.get("user-agent") ?? "") && process.env.TRUST_CF_IPCOUNTRY === "1") {
    target = countryFromIso(req.headers.get("cf-ipcountry"));
  }

  if (!target) {
    const res = NextResponse.next();
    res.headers.set("Vary", "Cookie, CF-IPCountry");
    return res;
  }
  // Build from the forwarded host: behind Railway's proxy req.url holds the internal
  // host (localhost:8080). Proxy redirects must be absolute.
  const res = NextResponse.redirect(`${publicOrigin(req)}/${target}`, 302);
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("Vary", "Cookie, CF-IPCountry");
  return res;
}

function publicOrigin(req: NextRequest) {
  const host = (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? req.nextUrl.host).split(",")[0].trim();
  const proto = (req.headers.get("x-forwarded-proto") ?? req.nextUrl.protocol.replace(":", "")).split(",")[0].trim();
  // Only accept a plain hostname[:port] — never let a header inject a path or scheme.
  return /^[a-z0-9.-]+(:\d+)?$/i.test(host) ? `${proto === "http" ? "http" : "https"}://${host}` : req.nextUrl.origin;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/" && req.method === "GET") return routeRoot(req);
  if (pathname.startsWith("/admin")) return updateSession(req);
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
