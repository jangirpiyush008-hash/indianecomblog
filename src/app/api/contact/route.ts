import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  topic: z.string().trim().max(60).optional(),
  message: z.string().trim().min(5).max(5000),
  page: z.string().max(300).optional(),
  // Honeypot: real users never fill this hidden field.
  website: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let input: z.infer<typeof schema>;
  try {
    input = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Messages are temporarily unavailable. Please email us instead." }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for") || "";
  const { error } = await createSupabaseServiceClient()
    .from("contact_messages")
    .insert({
      name: input.name,
      email: input.email,
      topic: input.topic ?? null,
      message: input.message,
      page: input.page ?? null,
      ip_hash: ip ? crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32) : null,
    });
  if (error) {
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
