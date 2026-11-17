import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

import { learnDocs } from "./learn-index";

export type LearnSlug = (typeof learnDocs)[number]["slug"];

const linkMap: Record<string, string> = {
  "SOURCES.md": "/learn/sources",
  "01-ecosystem.md": "/learn/ecosystem",
  "02-bill-fetch-and-pay.md": "/learn/fetch-and-pay",
  "03-biller-onboarding.md": "/learn/onboarding",
  "04-settlement-and-reconciliation.md": "/learn/settlement-and-reconciliation",
  "05-glossary.md": "/learn/glossary",
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const decode = (s: string) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const stripTags = (s: string) => s.replace(/<[^>]+>/g, "");
const slugify = (s: string) => stripTags(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Converts the three Mermaid diagrams in the notes into plain, accessible HTML at build time.
function mermaidToHtml(code: string): string {
  const lines = code.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines[0]?.startsWith("sequenceDiagram")) {
    const names: Record<string, string> = {};
    const steps: string[] = [];
    for (const l of lines.slice(1)) {
      const p = l.match(/^participant\s+(\w+)\s+as\s+(.+)$/);
      if (p) { names[p[1]] = p[2]; continue; }
      const m = l.match(/^(\w+)(-->>|->>)(\w+):\s*(.+)$/);
      if (m) {
        steps.push(`<li class="${m[2] === "-->>" ? "reply" : ""}"><span class="who">${esc(names[m[1]] ?? m[1])} → ${esc(names[m[3]] ?? m[3])}</span><span class="msg">${esc(m[4])}</span></li>`);
      }
    }
    return `<figure class="doc-diagram"><figcaption>Message sequence (simplified illustration). Dashed replies are shown in italics.</figcaption><ol class="seq">${steps.join("")}</ol></figure>`;
  }
  if (/^flowchart/.test(lines[0] ?? "")) {
    const label: Record<string, string> = {};
    const edges: [string, string, boolean][] = [];
    const node = (s: string) => {
      const m = s.trim().match(/^(\w+)(?:\[(.+)\])?$/);
      if (!m) return s.trim();
      if (m[2]) label[m[1]] = m[2];
      return m[1];
    };
    for (const l of lines.slice(1)) {
      const m = l.match(/^(.+?)\s*(-->|---)\s*(.+)$/);
      if (m) { const a = node(m[1]); const b = node(m[3]); edges.push([a, b, m[2] === "---"]); }
    }
    const name = (id: string) => esc(label[id] ?? id);
    const outs = new Map<string, number>(); const ins = new Map<string, number>();
    edges.forEach(([a, b]) => { outs.set(a, (outs.get(a) ?? 0) + 1); ins.set(b, (ins.get(b) ?? 0) + 1); });
    const starts = [...new Set(edges.map(([a]) => a))].filter((a) => !ins.has(a));
    const isChain = starts.length === 1 && edges.every(([a, b, u]) => !u && (outs.get(a) ?? 0) <= 1 && (ins.get(b) ?? 0) <= 1);
    if (isChain) {
      const next = new Map(edges.map(([a, b]) => [a, b] as [string, string]));
      const order: string[] = [starts[0]];
      while (next.has(order[order.length - 1])) order.push(next.get(order[order.length - 1])!);
      return `<figure class="doc-diagram"><figcaption>Flow</figcaption><ol class="flowchain">${order.map((id) => `<li>${name(id)}</li>`).join("")}</ol></figure>`;
    }
    return `<figure class="doc-diagram"><figcaption>Who talks to whom</figcaption><ul class="flowedges">${edges.map(([a, b, u]) => `<li>${name(a)} <span aria-hidden="true">${u ? "↔" : "→"}</span><span class="sr-only">${u ? " linked with " : " to "}</span> ${name(b)}</li>`).join("")}</ul></figure>`;
  }
  return `<pre><code>${esc(code)}</code></pre>`;
}

export function renderDoc(slug: LearnSlug) {
  const raw = readFileSync(join(process.cwd(), "src", "content", "learn", `${slug}.md`), "utf8");
  const firstLine = raw.split("\n")[0].replace(/^#\s*/, "").replace(/^\d+\.\s*/, "").trim();
  const body = raw.replace(/^#.*\n/, "");
  let html = marked.parse(body, { gfm: true, async: false }) as string;

  html = html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (_m, c: string) => mermaidToHtml(decode(c)));

  const headings: [string, string][] = [];
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level: string, inner: string) => {
    const id = slugify(inner);
    if (level === "2") headings.push([stripTags(inner), id]);
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  html = html.replace(/<table>/g, '<div class="doc-table"><table>').replace(/<\/table>/g, "</table></div>");
  html = html.replace(/href="([^"#]*?)([A-Za-z0-9-]+\.md)"/g, (_m, _p: string, file: string) => `href="${linkMap[file] ?? "#"}"`);
  html = html.replace(/<a href="(https?:)/g, '<a target="_blank" rel="noreferrer" href="$1');

  return { title: firstLine, html, headings, words: body.split(/\s+/).filter(Boolean).length };
}
