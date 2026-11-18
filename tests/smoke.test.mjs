// Smoke tests. Run against a running site:  BASE_URL=http://127.0.0.1:3000 npm test
// Optional: BLOCKED_TERMS="term one,term two" fails the run if any term appears on any page.
// Keep that list in an environment variable or a CI secret, never in the repository.
import test from "node:test";
import assert from "node:assert/strict";

const BASE = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const blocked = (process.env.BLOCKED_TERMS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

const get = (path, opts = {}) => fetch(BASE + path, { redirect: "manual", signal: AbortSignal.timeout(30000), ...opts });

// Pages to check come from the sitemap, so new pages are covered automatically.
let paths = [];
test("the sitemap lists pages", async () => {
  const res = await get("/sitemap.xml");
  assert.equal(res.status, 200);
  const xml = await res.text();
  paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  assert.ok(paths.length > 20, `expected more than 20 pages, got ${paths.length}`);
});

const pages = new Map();
test("every page loads with a title, language and one main heading", async () => {
  const problems = [];
  for (const p of paths) {
    const res = await get(p);
    if (res.status !== 200) { problems.push(`${p}: status ${res.status}`); continue; }
    const html = await res.text();
    pages.set(p, html);
    if (!/<html[^>]*lang="en"/.test(html)) problems.push(`${p}: missing lang`);
    if (!/<title>[^<]{3,}<\/title>/.test(html)) problems.push(`${p}: missing title`);
    const h1s = (html.match(/<h1[\s>]/g) || []).length;
    if (h1s !== 1) problems.push(`${p}: ${h1s} h1 headings`);
    if (!/id="main"/.test(html)) problems.push(`${p}: no #main landmark`);
    if (/\bundefined\b|\[object Object\]/.test(html.replace(/<script[\s\S]*?<\/script>/g, ""))) problems.push(`${p}: shows "undefined" or [object Object]`);
  }
  assert.deepEqual(problems, []);
});

test("internal links resolve", async () => {
  const targets = new Set();
  for (const html of pages.values()) {
    for (const m of html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
      const href = m[1];
      if (href.startsWith("/api/") || href.startsWith("//") || href.startsWith("/_next/")) continue;
      targets.add(href);
    }
  }
  const bad = [];
  for (const t of targets) {
    const res = await get(t);
    // A redirect is fine as long as it points somewhere that loads.
    if (res.status >= 300 && res.status < 400) {
      const to = res.headers.get("location") || "";
      const dest = await get(new URL(to, BASE).pathname);
      if (dest.status !== 200) bad.push(`${t} -> ${to} (${dest.status})`);
    } else if (res.status !== 200) bad.push(`${t} (${res.status})`);
  }
  assert.deepEqual(bad, [], `${targets.size} internal links checked`);
});

test("key files are served", async () => {
  for (const f of ["/portrait.jpg", "/resume.pdf", "/resume-relevant.pdf", "/og.png", "/data/payments.db", "/sqljs/worker.sql-wasm.js", "/sqljs/sql-wasm.wasm", "/visuals/bharat-connect-flow.png", "/feed.xml", "/llms.txt", "/robots.txt"]) {
    const res = await get(f);
    assert.equal(res.status, 200, f);
    await res.arrayBuffer();
  }
});

test("the old rails address redirects to the Learn chapter", async () => {
  const res = await get("/rails");
  assert.equal(res.status, 308);
  assert.match(res.headers.get("location") || "", /\/learn\/payment-rails$/);
});

test("security headers are present", async () => {
  const res = await get("/");
  for (const h of ["content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"]) {
    assert.ok(res.headers.get(h), `missing ${h}`);
  }
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
  assert.ok(!res.headers.get("x-powered-by"), "x-powered-by should be removed");
});

test("optional features report their state and fail safely when not configured", async () => {
  for (const p of ["/api/ask", "/api/subscribe"]) {
    const res = await get(p);
    assert.equal(res.status, 200, p);
    assert.equal(typeof (await res.json()).enabled, "boolean", p);
  }
  const res = await get("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({}) });
  assert.ok([400, 503].includes(res.status), `contact returned ${res.status}`);
});

test("blocked terms do not appear anywhere", { skip: blocked.length === 0 && "BLOCKED_TERMS is not set" }, () => {
  const hits = [];
  for (const [p, html] of pages) {
    const text = html.toLowerCase();
    for (const term of blocked) if (text.includes(term)) hits.push(`${p}: contains a blocked term`);
  }
  assert.deepEqual(hits, []);
});
