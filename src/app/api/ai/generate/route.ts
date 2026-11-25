import { NextResponse } from "next/server";
import { z } from "zod";
import {
  generateArticleOutline,
  generateArticleDraft,
  runQualityChecks,
} from "@/lib/ai/claude";

export const maxDuration = 300;

const bodySchema = z.object({
  topic: z.string().min(3),
  category: z.string(),
  contentType: z.string().default("listicle"),
  angle: z.string().optional(),
  keywordData: z
    .object({
      volume: z.number().optional(),
      difficulty: z.number().optional(),
      relatedKeywords: z.array(z.string()).optional(),
    })
    .optional(),
});

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const input = bodySchema.parse(body);

    // Step 1: Outline
    const outline = await generateArticleOutline(input);
    if (!outline) {
      return NextResponse.json({ error: "Failed to generate outline" }, { status: 500 });
    }

    // Step 2: Draft
    const draft = await generateArticleDraft({
      outline,
      topic: input.topic,
    });

    // Step 3: Quality checks
    const quality = await runQualityChecks({
      markdown: draft.markdown,
      topic: input.topic,
    });

    return NextResponse.json({
      outline,
      draft,
      quality,
      next_step: "Save as draft and open editor for review",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
