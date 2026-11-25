import { NextResponse } from "next/server";
import { z } from "zod";
import { indexNowEnabled, submitIndexNow } from "@/lib/seo/indexnow";

const schema = z.object({ urls: z.array(z.string().max(2000)).min(1).max(10_000) });

/**
 * POST /api/indexnow  { "urls": ["/us/money/…", …] }
 * For publishing tools (future CMS / cron). Requires Authorization: Bearer <CRON_SECRET>.
 */
export async function POST(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 503 });
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!indexNowEnabled()) return NextResponse.json({ error: "IndexNow disabled for this host" }, { status: 409 });
  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Body must be { urls: string[] }" }, { status: 400 });
  }
  const r = await submitIndexNow(body.urls);
  return NextResponse.json(r, { status: r.ok ? 200 : 502 });
}
