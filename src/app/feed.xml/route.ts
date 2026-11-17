import { updates, profile } from "@/data";

export const dynamic = "force-static";

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const abs = (u: string) => (u.startsWith("http") ? u : `${site}${u}`);

// RSS 2.0. Only items with an exact date are included.
export function GET() {
  const items = updates
    .filter((u) => u.exact)
    .sort((a, b) => b.iso.localeCompare(a.iso))
    .map((u) => `    <item>
      <title>${xml(u.title)}</title>
      <link>${xml(abs(u.url))}</link>
      <guid isPermaLink="false">${xml(`${u.iso}-${u.title}`)}</guid>
      <pubDate>${new Date(`${u.iso}T09:00:00Z`).toUTCString()}</pubDate>
      <category>${xml(u.kind)}</category>
      <description>${xml(u.body)}</description>
    </item>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(`${profile.name}: what I'm working on`)}</title>
    <link>${xml(site)}</link>
    <atom:link href="${xml(`${site}/feed.xml`)}" rel="self" type="application/rss+xml" />
    <description>${xml("New posts, projects and site updates on Bharat Connect and payments product work.")}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
