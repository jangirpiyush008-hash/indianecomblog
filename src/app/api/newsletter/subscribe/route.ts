import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
  preferredCategories: z.array(z.string().uuid()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = bodySchema.parse(body);

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { ok: false, error: "Newsletter not configured" },
        { status: 503 }
      );
    }

    const supabase = createSupabaseServiceClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        {
          email: input.email,
          source: input.source || "website",
          preferred_categories: input.preferredCategories || [],
          consent_at: new Date().toISOString(),
          status: "active",
        },
        { onConflict: "email" }
      );

    if (error) throw error;

    return NextResponse.json({ ok: true, message: "Subscribed" });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Subscription failed" },
      { status: 400 }
    );
  }
}
