import { Clock } from "lucide-react";
import { countWords, readingMinutes } from "@/lib/read";

// Reading-time label. Pass the content shown on the page.
export function ReadingTime({ content, words, className = "" }: { content?: unknown; words?: number; className?: string }) {
  const m = readingMinutes(words ?? countWords(content));
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm text-[var(--muted)] ${className}`}>
      <Clock size={14} /> {m} min read
    </span>
  );
}

// Table of contents for a long page. Items are [label, id].
export function Toc({ items }: { items: [string, string][] }) {
  return (
    <nav aria-label="On this page" className="no-print mt-8 rounded-2xl border border-[var(--line)] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent)]">On this page</p>
      <ol className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {items.map(([t, id]) => <li key={id}><a href={`#${id}`} className="text-[var(--muted)] hover:text-[var(--ink)]">{t}</a></li>)}
      </ol>
    </nav>
  );
}
