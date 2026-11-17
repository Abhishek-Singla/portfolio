"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      setDone(false);
    }
  };
  return (
    <button onClick={copy} className="no-print inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs hover:border-[var(--accent)]">
      {done ? <Check size={14} /> : <Copy size={14} />}
      <span role="status">{done ? "Copied" : label}</span>
    </button>
  );
}
