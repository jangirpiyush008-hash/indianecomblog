import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export const maxDuration = 10;

const bodySchema = z.object({
  productId: z.string().uuid().optional(),
  productSlug: z.string().optional(),
  articleId: z.string().uuid().optional(),
  merchant: z.string().optional(),
  campaign: z.string().optional(),
  destinationUrl: z.string().url(),
});

/**
 * Logs an affiliate click and 302-redirects to the destination.
 * Called from product cards: /api/affiliate/click?url=...
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = bodySchema.parse(body);

    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createSupabaseServiceClient();
      const ipHash = hashIP(req.headers.get("x-forwarded-for") || "");
      await supabase.from("affiliate_clicks").insert({
        product_id: input.productId ?? null,
        article_id: input.articleId ?? null,
        merchant: input.merchant ?? null,
        campaign: input.campaign ?? null,
        ip_hash: ipHash,
        user_agent: req.headers.get("user-agent") || null,
        referrer: req.headers.get("referer") || null,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const destination = url.searchParams.get("url");
  if (!destination) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }
  try {
    const dest = new URL(destination);
    if (!/^https?:$/.test(dest.protocol)) {
      throw new Error("Invalid protocol");
    }

    // Log async; don't block the redirect
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createSupabaseServiceClient();
      const ipHash = hashIP(req.headers.get("x-forwarded-for") || "");
      supabase
        .from("affiliate_clicks")
        .insert({
          product_id: url.searchParams.get("pid") ?? null,
          article_id: url.searchParams.get("aid") ?? null,
          merchant: url.searchParams.get("m") ?? null,
          campaign: url.searchParams.get("c") ?? null,
          ip_hash: ipHash,
          user_agent: req.headers.get("user-agent") || null,
          referrer: req.headers.get("referer") || null,
        })
        .then(() => {});
    }

    return NextResponse.redirect(destination, 302);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

function hashIP(ip: string) {
  if (!ip) return null;
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);
}
