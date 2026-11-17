import Anthropic from "@anthropic-ai/sdk";
import { buildContext, SYSTEM_PROMPT } from "@/lib/askContext";
import { allow, clientIp } from "@/lib/ratelimit";

export const runtime = "nodejs";

// Opus 5.5 is the default. Set ASK_MODEL (for example claude-haiku-5-5) to run a cheaper model.
const MODEL = process.env.ASK_MODEL || "claude-opus-5-5";
const SYSTEM = SYSTEM_PROMPT + buildContext();

export async function GET() {
  return Response.json({ enabled: Boolean(process.env.ANTHROPIC_API_KEY) });
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return Response.json({ error: "not_configured" }, { status: 503 });

  // Per-visitor and overall daily limits keep cost and abuse in check.
  if (!allow(`ask:${clientIp(req)}`, 8, 60 * 60 * 1000) || !allow("ask:all", 300, 24 * 60 * 60 * 1000)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let question = "";
  try {
    const body = (await req.json()) as { question?: unknown };
    question = typeof body.question === "string" ? body.question.trim() : "";
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  if (question.length < 3 || question.length > 300) {
    return Response.json({ error: "bad_length" }, { status: 400 });
  }

  const client = new Anthropic({ timeout: 30_000, maxRetries: 1 });
  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 2000,
      // Opus 5.5 always thinks; low effort keeps answers quick and cheap for simple Q&A.
      output_config: { effort: "low" },
      // Refusal fallback is only wired for the default model, where the fallback model is known.
      ...(MODEL === "claude-opus-5-5"
        ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: [{ model: "claude-opus-4-8" }] }
        : {}),
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: question }],
    });

    if (response.stop_reason === "refusal") {
      return Response.json({ answer: "I can't help with that one. Try asking about Abhishek's work, projects or Bharat Connect." });
    }
    const answer = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return Response.json({ answer: answer || "I don't have an answer to that. Please email Abhishek." });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return Response.json({ error: "busy" }, { status: 429 });
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("ask: invalid Anthropic credentials");
      return Response.json({ error: "not_configured" }, { status: 503 });
    }
    if (error instanceof Anthropic.APIConnectionError) return Response.json({ error: "unavailable" }, { status: 502 });
    if (error instanceof Anthropic.APIError) {
      console.error(`ask: API error ${error.status}`);
      return Response.json({ error: "unavailable" }, { status: 502 });
    }
    console.error("ask: unexpected error");
    return Response.json({ error: "unavailable" }, { status: 500 });
  }
}
