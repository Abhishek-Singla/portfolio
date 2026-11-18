// Checks that external links on the site still work.  BASE_URL=http://127.0.0.1:3000 npm run check:links
// Sites that block automated requests (LinkedIn, for example) are reported as skipped, not broken.
const BASE = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const SKIP_STATUS = new Set([401, 403, 405, 429, 999]);

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const found = new Map(); // url -> first page that links to it
for (const p of paths) {
  const html = await (await fetch(BASE + p)).text();
  for (const m of html.matchAll(/href="(https?:\/\/[^"#]+)/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (!found.has(url)) found.set(url, p);
  }
}

async function check(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, { method, redirect: "follow", signal: AbortSignal.timeout(12000), headers: { "user-agent": "Mozilla/5.0 (link checker)" } });
      if (res.ok) return { state: "ok" };
      if (method === "HEAD" && res.status >= 400) continue;
      return SKIP_STATUS.has(res.status) ? { state: "skipped", note: res.status } : { state: "broken", note: res.status };
    } catch (e) {
      if (method === "GET") return { state: "broken", note: e.name === "TimeoutError" ? "timeout" : "unreachable" };
    }
  }
  return { state: "broken", note: "no response" };
}

// The site's own address (from the sitemap) and localhost are not external links.
const own = new Set(["localhost", "127.0.0.1"]);
try { own.add(new URL(xml.match(/<loc>([^<]+)<\/loc>/)[1]).hostname); } catch {}
for (const url of [...found.keys()]) {
  try { if (own.has(new URL(url).hostname)) found.delete(url); } catch { found.delete(url); }
}

const urls = [...found.keys()];
const results = [];
const queue = [...urls];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const url = queue.shift();
    results.push({ url, page: found.get(url), ...(await check(url)) });
  }
}));

const broken = results.filter((r) => r.state === "broken");
const skipped = results.filter((r) => r.state === "skipped");
console.log(`${urls.length} external links: ${results.filter((r) => r.state === "ok").length} ok, ${skipped.length} skipped (site blocks bots), ${broken.length} broken`);
for (const r of broken) console.log(`BROKEN  ${r.url}  (${r.note}) on ${r.page}`);
process.exit(broken.length ? 1 : 0);
