"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { work, glossary, writing, templates, projects, restrictedExplainersLive } from "@/data";
import { learnDocs } from "@/lib/learn-index";

type Entry = { title: string; hint: string; href: string; kind: string; external?: boolean };

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function buildIndex(): Entry[] {
  const e: Entry[] = [];
  const sections: [string, string][] = [
    ["Impact", "impact"], ["Selected work", "work"], ["Experience", "experience"], ["About", "about"], ["Side projects", "projects"],
    ["Case studies", "case-study"], ["Writing", "writing"], ["Quotes from my posts", "quotes"], ["Explore", "explore"],
    ["How my KPIs connect", "metrics"], ["Worked PRD example", "prd"], ["How I work", "approach"], ["Skills and tools", "skills"],
    ["Free templates", "templates"], ["What I'm looking for", "fit"], ["Education and certifications", "education"], ["Contact", "contact"],
  ];
  sections.forEach(([t, id]) => e.push({ title: t, hint: "Home page section", href: `/#${id}`, kind: "Section" }));
  const pages: [string, string, string][] = [
    ["Product lab", "/lab", "Interactive tools"], ["Three Lanes roadmap check", "/lab#lanes", "Tool"], ["Error-code translator", "/lab#errors", "Tool"],
    ["Transaction lifecycle", "/lab#lifecycle", "Tool"], ["Settlement timeline", "/lab#settlement", "Tool"], ["Payments SQL practice", "/lab#sql", "Tool"],
    ["NEFT vs RTGS vs IMPS vs UPI", "/rails", "Payment rails comparison"], ["Glossary", "/glossary", "Bharat Connect terms"],
    ["Watch: ecosystem changes", "/watch", "Regulatory and ecosystem feed"], ["One-page summary", "/hire", "For recruiters"],
    ["Resume (print-friendly)", "/resume", "Full resume"], ["Product-focused resume", "/resume/relevant", "Shorter resume"],
    ["Ask about my work", "/ask", "AI assistant"], ["Privacy", "/privacy", "What the site collects"],
    ["Learn: Bharat Connect explained", "/learn", "Plain-language notes, five chapters"], ["Reconciliation playground", "/lab#recon", "Tool"],
    ["Press and speaker kit", "/press", "Bios, topics and headshot"], ["What I'm working on", "/updates", "Dated updates and RSS"],
  ];
  if (restrictedExplainersLive) pages.push(["Biller types: six payment journeys", "/billers", "Interactive explainer"], ["Settlement history: one cycle to ten", "/settlement-history", "Interactive timeline"]);
  pages.forEach(([t, h, hint]) => e.push({ title: t, hint, href: h, kind: "Page" }));
  learnDocs.forEach((d) => e.push({ title: `Learn: ${d.title}`, hint: d.blurb.slice(0, 70) + "…", href: `/learn/${d.slug}`, kind: "Learn" }));
  work.forEach((w) => e.push({ title: w.title, hint: "Project deep-dive", href: `/work/${w.slug}`, kind: "Project" }));
  projects.forEach((p) => e.push({ title: p.name, hint: "Open-source repository", href: `https://github.com/Abhishek-Singla/${p.repo}`, kind: "GitHub", external: true }));
  glossary.forEach(([t, d]) => e.push({ title: t, hint: d.slice(0, 70) + "…", href: `/glossary#${slug(t)}`, kind: "Glossary" }));
  writing.forEach((w) => e.push({ title: w.title, hint: `LinkedIn · ${w.date}`, href: w.url, kind: "Post", external: true }));
  templates.forEach(([n, f]) => e.push({ title: `${n} template`, hint: "Free download", href: `/templates/${f}`, kind: "Template" }));
  return e;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return index.filter((e) => e.kind === "Section" || e.kind === "Page").slice(0, 12);
    return index
      .map((e) => {
        const t = e.title.toLowerCase();
        const score = t.startsWith(s) ? 0 : t.includes(s) ? 1 : e.hint.toLowerCase().includes(s) ? 2 : 9;
        return { e, score };
      })
      .filter((r) => r.score < 9)
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map((r) => r.e);
  }, [q, index]);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((ev.target as HTMLElement)?.tagName) || (ev.target as HTMLElement)?.isContentEditable;
      if ((ev.key === "k" && (ev.ctrlKey || ev.metaKey)) || (ev.key === "/" && !typing)) {
        ev.preventDefault();
        setOpen(true);
      } else if (ev.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-search", onOpen); };
  }, []);

  useEffect(() => {
    if (open) { setQ(""); setActive(0); setTimeout(() => inputRef.current?.focus(), 0); document.body.style.overflow = "hidden"; }
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => setActive(0), [q]);

  const go = (e?: Entry) => {
    if (!e) return;
    setOpen(false);
    if (e.external) window.open(e.href, "_blank", "noopener,noreferrer");
    else window.location.href = e.href;
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-[12vh]" onClick={() => setOpen(false)}>
      <div role="dialog" aria-modal="true" aria-label="Search the site" className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4">
          <Search size={16} className="text-[var(--muted)]" aria-hidden />
          <input
            ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sections, projects, glossary, posts…"
            role="combobox" aria-expanded="true" aria-controls="palette-list" aria-activedescendant={results[active] ? `pal-${active}` : undefined} aria-label="Search"
            className="w-full bg-transparent py-4 text-sm outline-none"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              else if (e.key === "Enter") { e.preventDefault(); go(results[active]); }
            }}
          />
          <kbd className="rounded border border-[var(--line)] px-1.5 text-xs text-[var(--muted)]">Esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" className="max-h-[50vh] overflow-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-[var(--muted)]">No matches. Try a different word.</li>}
          {results.map((r, i) => (
            <li key={r.kind + r.href + r.title} id={`pal-${i}`} role="option" aria-selected={i === active}
              onMouseEnter={() => setActive(i)} onClick={() => go(r)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm ${i === active ? "bg-[var(--accent)]/10" : ""}`}>
              <span className="min-w-0"><span className="block truncate font-medium">{r.title}</span><span className="block truncate text-xs text-[var(--muted)]">{r.hint}</span></span>
              <span className="shrink-0 rounded-full border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--muted)]">{r.kind}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SearchButton() {
  return (
    <button onClick={() => window.dispatchEvent(new Event("open-search"))} aria-label="Search the site (press slash)"
      className="rounded-full border border-[var(--line)] p-2 text-[var(--muted)] hover:text-[var(--ink)]">
      <Search size={16} />
    </button>
  );
}
