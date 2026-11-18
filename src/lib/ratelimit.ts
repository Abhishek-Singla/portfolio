// Rate limiting for the API routes.
// With UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN set, counts are kept in a shared Redis store, so the
// limits hold across every server instance. Without them, or if the store is unreachable, an in-memory fallback
// is used. That slows abuse on a single instance but resets per instance on serverless hosting.
const hits = new Map<string, number[]>();

function memoryAllow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) { hits.set(key, recent); return false; }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  return true;
}

async function redisAllow(key: string, limit: number, windowMs: number): Promise<boolean | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const k = `rl:${key}`;
    // Fixed-window counter: INCR, and set the expiry only when the key is new.
    const res = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", k], ["PEXPIRE", k, String(windowMs), "NX"]]),
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const out = (await res.json()) as { result?: number }[];
    const count = Number(out?.[0]?.result);
    return Number.isFinite(count) ? count <= limit : null;
  } catch {
    return null;
  }
}

export async function allow(key: string, limit: number, windowMs: number): Promise<boolean> {
  const shared = await redisAllow(key, limit, windowMs);
  return shared ?? memoryAllow(key, limit, windowMs);
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}
