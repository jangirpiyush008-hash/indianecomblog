import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { findProductAnyEdition } from "@/lib/content";
import { isCountryCode } from "@/config/countries";

export const maxDuration = 10;

/** Only affiliate destinations we generate are allowed (prevents open redirects). */
const ALLOWED_HOSTS = new Set(["trackingv3.linkredirect.in"]);

const bodySchema = z.object({
  productSlug: z.string().max(200).optional(),
  country: z.string().max(2).optional(),
  network: z.string().max(40).optional(),
  articleId: z.string().max(200).optional(),
  merchant: z.string().max(50).optional(),
  campaign: z.string().max(100).optional(),
  destinationUrl: z.string().url().optional(),
});

async function logClick(req: Request, input: z.infer<typeof bodySchema>) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  const supabase = createSupabaseServiceClient();
  // Trust the product record, not the client, for country and network.
  const product = input.productSlug ? findProductAnyEdition(input.productSlug) : undefined;
  await supabase.from("affiliate_clicks").insert({
    product_slug: product?.slug ?? null,
    country_code: product?.country ?? (isCountryCode(input.country) ? input.country : null),
    network: product?.affiliateNetwork ?? null,
    article_slug: input.articleId ?? null,
    merchant: null, // merchant enum in DB is legacy; slug identifies the product
    campaign: [input.merchant, input.campaign].filter(Boolean).join(":") || null,
    ip_hash: hashIP(req.headers.get("x-forwarded-for") || ""),
    user_agent: req.headers.get("user-agent")?.slice(0, 300) || null,
    referrer: req.headers.get("referer")?.slice(0, 500) || null,
  });
}

/** Beacon endpoint used by <AffiliateLink>. */
export async function POST(req: Request) {
  try {
    const input = bodySchema.parse(await req.json());
    await logClick(req, input);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

/** /api/affiliate/click?p=<product-slug> — logs and redirects to the product's EarnKaro URL. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const product = findProductAnyEdition(url.searchParams.get("p") ?? "");
  if (!product) return NextResponse.json({ error: "Unknown product" }, { status: 404 });
  const dest = new URL(product.affiliateUrl);
  if (!ALLOWED_HOSTS.has(dest.hostname)) {
    return NextResponse.json({ error: "Destination not allowed" }, { status: 400 });
  }
  logClick(req, { productSlug: product.slug, campaign: url.searchParams.get("c") ?? undefined }).catch(() => {});
  return NextResponse.redirect(dest.toString(), 302);
}

function hashIP(ip: string) {
  if (!ip) return null;
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);
}
