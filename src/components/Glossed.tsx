import { Fragment } from "react";
import { hoverTerms } from "@/data";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Matches each term, allowing a capital first letter for phrases. Longer terms come first in data.
const pattern = new RegExp(
  `\\b(${hoverTerms.map(([t]) => (/[a-z]/.test(t[0]) ? `[${t[0].toUpperCase()}${t[0]}]${escape(t.slice(1))}` : escape(t))).join("|")})\\b`,
  "g"
);
const lookup = new Map(hoverTerms.map(([t, d]) => [t.toLowerCase(), d]));

// Wraps the first occurrence of each known term in text with a hover/focus definition.
export function Glossed({ text }: { text: string }) {
  const seen = new Set<string>();
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        const key = part.toLowerCase();
        const def = lookup.get(key);
        if (!def || seen.has(key)) return <Fragment key={i}>{part}</Fragment>;
        seen.add(key);
        return (
          <span key={i} className="gloss" tabIndex={0}>
            {part}
            <span role="tooltip" className="tip">{def}</span>
          </span>
        );
      })}
    </>
  );
}
