import { allow, clientIp } from "@/lib/ratelimit";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const configured = () => Boolean(process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID);

export async function GET() {
  return Response.json({ enabled: configured() });
}

export async function POST(req: Request) {
  if (!configured()) return Response.json({ error: "not_configured" }, { status: 503 });
  if (!allow(`sub:${clientIp(req)}`, 5, 60 * 60 * 1000)) return Response.json({ error: "rate_limited" }, { status: 429 });

  let body: { email?: unknown; website?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "bad_request" }, { status: 400 }); }
  if (typeof body.website === "string" && body.website) return Response.json({ ok: true }); // honeypot
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  if (!EMAIL.test(email)) return Response.json({ error: "invalid" }, { status: 400 });

  try {
    const res = await fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    if (!res.ok) {
      console.error(`subscribe: mail service returned ${res.status}`);
      return Response.json({ error: "failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    console.error("subscribe: mail service unreachable");
    return Response.json({ error: "failed" }, { status: 502 });
  }
}
