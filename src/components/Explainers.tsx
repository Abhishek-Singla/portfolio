"use client";
import { useState } from "react";
import { billerJourneys as bj, settlementHistory as sh } from "@/data";

const pill = (on: boolean) =>
  `rounded-full border px-4 py-2 text-sm transition ${on ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)] hover:border-[var(--accent)]"}`;

/* ---------- Biller journey picker ---------- */
export function BillerJourneys() {
  const [fetch, setFetch] = useState("Optional");
  const [validation, setValidation] = useState("Optional");
  const [adhoc, setAdhoc] = useState(true);

  // Maps the three settings onto one of the six journeys.
  let idx: number;
  if (fetch === "Optional") idx = 0;
  else if (fetch === "Mandatory") idx = adhoc ? 4 : 5;
  else idx = validation === "Optional" ? 1 : validation === "Mandatory" ? 2 : 3;
  const [name, body] = bj.journeys[idx];

  const Group = ({ label, options, value, set }: { label: string; options: string[]; value: string; set: (v: string) => void }) => (
    <fieldset className="min-w-0">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => set(o)} className={pill(value === o)}>{o}</button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="rounded-3xl border border-[var(--line)] p-5 sm:p-8">
      <div className="grid gap-5 md:grid-cols-3">
        <Group label="Fetch" options={bj.fetch} value={fetch} set={setFetch} />
        <Group label="Validation" options={bj.validation} value={validation} set={setValidation} />
        <Group label="Ad-hoc payment" options={["Accepted", "Not accepted"]} value={adhoc ? "Accepted" : "Not accepted"} set={(v) => setAdhoc(v === "Accepted")} />
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">
        {fetch === "Optional" && "With fetch optional, validation and ad-hoc settings do not change the journey in this simplified view."}
        {fetch === "Mandatory" && "With fetch mandatory, validation is not part of the journey. Ad-hoc payment decides whether the amount rule applies."}
        {fetch === "Not supported" && "With no fetch, validation decides the journey. Ad-hoc payment is not a deciding setting here."}
      </p>
      <div role="status" aria-live="polite" className="mt-6 rounded-2xl border border-[var(--accent)] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">Journey {idx + 1} of 6</p>
        <h3 className="serif mt-1 text-xl font-semibold">{name}</h3>
        <p className="mt-2 text-[var(--muted)]">{body}</p>
        {idx === 5 && <p className="mt-3 text-sm">Only this journey is held to the amount rules.</p>}
      </div>
      <h3 className="mt-8 font-semibold">All six journeys</h3>
      <ol className="mt-3 space-y-2">
        {bj.journeys.map(([n, b], i) => (
          <li key={n} className={`rounded-xl border p-3 text-sm ${i === idx ? "border-[var(--accent)]" : "border-[var(--line)]"}`}>
            <span className="font-semibold">{i + 1}. {n}.</span> <span className="text-[var(--muted)]">{b}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Settlement history ---------- */
export function SettlementHistory() {
  const [i, setI] = useState(sh.events.length - 1);
  const [when, cycles, note] = sh.events[i];
  return (
    <div className="rounded-3xl border border-[var(--line)] p-5 sm:p-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a date">
        {sh.events.map(([w], k) => (
          <button key={w} aria-pressed={k === i} onClick={() => setI(k)} className={pill(k === i)}>{w}</button>
        ))}
      </div>
      <div className="mt-6" aria-hidden>
        <div className="flex h-12 gap-1 overflow-hidden rounded-xl">
          {Array.from({ length: 10 }).map((_, n) => (
            <div key={n} className={`flex-1 rounded ${n < cycles ? "bg-[var(--accent)]/80" : "bg-[var(--line)]/60"}`} />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-xs text-[var(--muted)]"><span>1</span><span>10 cycles</span></div>
      </div>
      <div role="status" aria-live="polite" className="mt-5">
        <p className="serif text-4xl font-semibold text-[var(--accent)]">{cycles} <span className="text-lg text-[var(--muted)]">{cycles === 1 ? "cycle a day" : "cycles a day"}</span></p>
        <p className="mt-1 text-sm font-semibold">{when}</p>
        <p className="mt-1 text-[var(--muted)]">{note}</p>
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">The bars are schematic: they show how many cycles, not when they fall in the day.</p>
    </div>
  );
}
