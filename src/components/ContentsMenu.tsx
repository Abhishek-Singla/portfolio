"use client";
import { useEffect, useRef } from "react";
import { List } from "lucide-react";

const sections: [string, string][] = [
  ["About", "/#about"],
  ["Impact", "/#impact"],
  ["Selected work", "/#work"],
  ["Experience", "/#experience"],
  ["Case studies", "/#case-study"],
  ["Writing", "/#writing"],
  ["Quotes", "/#quotes"],
  ["Side projects", "/#projects"],
  ["Explore", "/#explore"],
  ["How my KPIs connect", "/#metrics"],
  ["Worked PRD example", "/#prd"],
  ["How I work", "/#approach"],
  ["Skills and tools", "/#skills"],
  ["Free templates", "/#templates"],
  ["What I'm looking for", "/#fit"],
  ["Education", "/#education"],
  ["Contact", "/#contact"],
];
const pages: [string, string][] = [
  ["Product lab", "/lab"],
  ["Learn: BBPS explained", "/learn"],
  ["NEFT, RTGS, IMPS, UPI", "/rails"],
  ["Glossary", "/glossary"],
  ["Watch", "/watch"],
  ["Updates and RSS", "/updates"],
  ["Press and speaker kit", "/press"],
  ["One-page summary", "/hire"],
  ["Ask about my work", "/ask"],
  ["Resume (print-friendly)", "/resume"],
  ["Privacy", "/privacy"],
];

export default function ContentsMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent | KeyboardEvent) => {
      const d = ref.current;
      if (!d?.open) return;
      if (e instanceof KeyboardEvent) { if (e.key === "Escape") d.open = false; return; }
      if (!d.contains(e.target as Node) || (e.target as HTMLElement).closest("a")) d.open = false;
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", close); };
  }, []);
  return (
    <details ref={ref} className="relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[var(--line)] px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--ink)]" aria-label="Contents">
        <List size={16} /> <span className="hidden sm:inline">Contents</span>
      </summary>
      <div className="absolute right-0 mt-2 max-h-[70vh] w-72 overflow-auto rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 shadow-lg">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent)]">On the home page</p>
        <ul className="space-y-1 text-sm">
          {sections.map(([t, h]) => <li key={h}><a href={h} className="block rounded px-2 py-1 hover:bg-[var(--line)]/50">{t}</a></li>)}
        </ul>
        <p className="mb-2 mt-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent)]">More pages</p>
        <ul className="space-y-1 text-sm">
          {pages.map(([t, h]) => <li key={h}><a href={h} className="block rounded px-2 py-1 hover:bg-[var(--line)]/50">{t}</a></li>)}
        </ul>
      </div>
    </details>
  );
}
