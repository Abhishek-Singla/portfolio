"use client";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="no-print inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]">
      <Printer size={14} /> Print
    </button>
  );
}
