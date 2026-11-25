import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

export async function generateArticleOutline({
  topic,
  category,
  contentType,
  angle,
  keywordData,
}: {
  topic: string;
  category: string;
  contentType: string;
  angle?: string;
  keywordData?: { volume?: number; difficulty?: number; relatedKeywords?: string[] };
}) {
  const system = `You are the senior editor of TrendNations, a digital publication that explains what's trending and helps readers buy well.

EDITORIAL VOICE:
- Premium, warm, directly useful
- Written for Indian readers — INR pricing, Indian cities, Indian context
- Confident but honest ("Skip this one" is okay)
- No clickbait, no hype

OUTPUT: A JSON outline with H2 headings, intended sub-points, sources to verify, and products to mention.`;

  const user = `Topic: ${topic}
Category: ${category}
Content type: ${contentType}
${angle ? `Angle: ${angle}` : ""}
${keywordData ? `Keyword data: ${JSON.stringify(keywordData)}` : ""}

Produce a JSON outline with this shape:
{
  "working_title": "...",
  "excerpt": "...",
  "target_word_count": 1200,
  "sections": [
    { "h2": "...", "intent": "...", "points": ["..."], "sources_needed": ["..."] }
  ],
  "products_to_mention": ["..."],
  "angle_summary": "..."
}

Respond with JSON only, no preamble.`;

  const res = await client.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: 4000,
    system,
    messages: [{ role: "user", content: user }],
  });

  const text = res.content
    .filter((b) => b.type === "text")
    .map((b: any) => b.text)
    .join("");
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  } catch {
    return null;
  }
}

export async function generateArticleDraft({
  outline,
  topic,
}: {
  outline: any;
  topic: string;
}) {
  const system = `You are TrendNations' senior editor. Write a complete article in Markdown based on the outline provided.

STYLE:
- Premium editorial prose, not SEO spam
- Indian references, INR prices, Indian cities
- Short paragraphs (2-4 sentences)
- Strong lede, strong kicker
- Honest verdicts — don't hedge everything
- Each product mention links with [product](affiliate-url-placeholder)
- Cite every statistic — if you can't cite, don't use it
- Flag unverified claims with [NEEDS VERIFICATION]

Mark sections with H2 (##) and H3 (###).`;

  const res = await client.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: 8000,
    system,
    messages: [
      {
        role: "user",
        content: `Topic: ${topic}\n\nOutline:\n${JSON.stringify(outline, null, 2)}\n\nWrite the full article now.`,
      },
    ],
  });

  const text = res.content
    .filter((b) => b.type === "text")
    .map((b: any) => b.text)
    .join("");

  return {
    markdown: text,
    word_count: text.split(/\s+/).length,
    tokens_used: res.usage.input_tokens + res.usage.output_tokens,
  };
}

export async function runQualityChecks({
  markdown,
  topic,
}: {
  markdown: string;
  topic: string;
}) {
  const system = `You are an editorial fact-checker and quality analyst for TrendNations.

Check the draft for:
1. Unsourced claims / statistics
2. Weak paragraphs / filler text
3. Clickbait or over-promising
4. Missing INR pricing on product mentions
5. Readability issues (long sentences, jargon)
6. SEO issues (missing keyword, thin sections)
7. India-specificity (is this actually for Indian readers?)

Output JSON: { score: 0-10, warnings: [...], suggestions: [...] }`;

  const res = await client.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: 2000,
    system,
    messages: [
      {
        role: "user",
        content: `Topic: ${topic}\n\nDraft:\n${markdown.slice(0, 15000)}`,
      },
    ],
  });

  const text = res.content
    .filter((b) => b.type === "text")
    .map((b: any) => b.text)
    .join("");
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : { score: 0, warnings: ["Could not parse"], suggestions: [] };
  } catch {
    return { score: 0, warnings: ["Parsing error"], suggestions: [] };
  }
}
