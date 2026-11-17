import { allow, clientIp } from "@/lib/ratelimit";

export const runtime = "nodejs";

const clean = (s: unknown, max: number) => (typeof s === "string" ? s.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) return Response.json({ error: "not_configured" }, { status: 503 });
  if (!allow(`contact:${clientIp(req)}`, 4, 60 * 60 * 1000)) return Response.json({ error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return Response.json({ error: "bad_request" }, { status: 400 }); }

  // Honeypot field and a minimum fill time catch most bots without a CAPTCHA.
  const elapsed = Date.now() - Number(body.ts || 0);
  if (clean(body.website, 200) || !(elapsed > 3000)) return Response.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150) || "New message";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 3000) : "";
  if (!name || !EMAIL.test(email) || message.length < 10) return Response.json({ error: "invalid" }, { status: 400 });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!res.ok) {
      console.error(`contact: mail service returned ${res.status}`);
      return Response.json({ error: "send_failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    console.error("contact: mail service unreachable");
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
}
