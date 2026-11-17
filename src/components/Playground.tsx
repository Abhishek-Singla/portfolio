"use client";
import { useState } from "react";
import { bbpsFlow } from "@/data";

export function BbpsExplorer() {
  const [active, setActive] = useState("bou");
  const node = bbpsFlow.find((n) => n.id === active)!;
  return (
    <div className="rounded-3xl border border-[var(--line)] p-5 sm:p-8">
      <p className="text-sm text-[var(--muted)]">Tap a stop to see what it does and where transactions fail.</p>
      <div role="tablist" aria-label="Bharat Connect flow" className="mt-5 flex flex-wrap items-center gap-2">
        {bbpsFlow.map((n, i) => (
          <div key={n.id} className="flex items-center gap-2">
            <button
              role="tab"
              aria-selected={active === n.id}
              onClick={() => setActive(n.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active === n.id ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)] hover:border-[var(--accent)]"
              }`}
            >
              {n.name}
              {n.failures.length > 0 && <span className="ml-2 opacity-70">{n.failures.length}</span>}
            </button>
            {i < bbpsFlow.length - 1 && <span aria-hidden className="text-[var(--muted)]">→</span>}
          </div>
        ))}
      </div>
      <div className="mt-7" role="tabpanel">
        <h3 className="serif text-2xl font-semibold">{node.name}</h3>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">{node.role}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {node.failures.map(([title, what, fix]) => (
            <div key={title} className="rounded-2xl border border-[var(--line)] p-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent)]">Where it fails</p>
              <p className="mt-1 font-semibold">{title}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{what}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">Product fix</p>
              <p className="mt-1 text-sm">{fix}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FailureCalculator() {
  const [volume, setVolume] = useState(250000);
  const [rate, setRate] = useState(99.5);
  const safeVol = Math.max(0, Math.min(volume || 0, 1e9));
  const safeRate = Math.max(0, Math.min(rate || 0, 100));
  const perDay = Math.round(safeVol * (1 - safeRate / 100));
  const fmt = (n: number) => n.toLocaleString("en-IN");
  const field = "mt-2 w-full rounded-xl border border-[var(--line)] bg-transparent px-4 py-3 text-lg outline-none focus:border-[var(--accent)]";
  return (
    <div className="rounded-3xl border border-[var(--line)] p-5 sm:p-8">
      <p className="text-sm text-[var(--muted)]">
        A success rate that sounds good can still be a lot of failed payments. Defaults mirror my post about Postal Life Insurance: about 2.5 lakh transactions a day at 99.5%.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Transactions per day
          <input type="number" min={0} step={1000} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className={field} />
        </label>
        <label className="text-sm font-medium">
          Success rate (%)
          <input type="number" min={0} max={100} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className={field} />
        </label>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)]">
        <div className="bg-[var(--paper)] p-5">
          <p className="serif text-4xl font-semibold text-[var(--accent)]">{fmt(perDay)}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">failed payments per day</p>
        </div>
        <div className="bg-[var(--paper)] p-5">
          <p className="serif text-4xl font-semibold">{fmt(perDay * 365)}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">per year</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-[var(--muted)]">For an insurance premium, each failure can mean a customer who believes they paid and did not.</p>
    </div>
  );
}
