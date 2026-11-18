"use client";
import { useState } from "react";

type Status = "PENDING" | "SUCCESS";
type Pay = { ref: string; status: Status };
type Entry = { text: string; kind: "ok" | "info" | "warn" };

// An illustrative model of idempotent retries. It is not a statement of any network's exact rules.
export default function DuplicateSim() {
  const [pays, setPays] = useState<Pay[]>([]);
  const [log, setLog] = useState<Entry[]>([]);
  const [guard, setGuard] = useState(false);
  const [dupes, setDupes] = useState(0);
  const [blocked, setBlocked] = useState(0);
  const [n, setN] = useState(1000);

  const add = (e: Entry) => setLog((l) => [e, ...l].slice(0, 12));
  const pendingExists = pays.some((p) => p.status === "PENDING");
  const succeeded = pays.filter((p) => p.status === "SUCCESS").length;

  const payNew = () => {
    if (guard && pendingExists) {
      setBlocked((b) => b + 1);
      add({ kind: "info", text: "Blocked: a payment for this bill is already in progress. The customer is not charged." });
      return;
    }
    const ref = `EX-${n + 1}`;
    setN((x) => x + 1);
    setPays((p) => [...p, { ref, status: "PENDING" }]);
    add({ kind: "ok", text: `New payment ${ref} accepted and the customer is charged. Waiting for the biller to confirm.` });
  };
  const retrySame = () => {
    const last = pays[pays.length - 1];
    if (!last) return;
    setDupes((d) => d + 1);
    add({ kind: "info", text: `Same reference ${last.ref}: recognised as a duplicate of the earlier request. The customer is not charged again.` });
  };
  const confirm = (ref: string) => {
    setPays((p) => p.map((x) => (x.ref === ref ? { ...x, status: "SUCCESS" } : x)));
    add({ kind: "ok", text: `The biller confirms ${ref}: payment successful.` });
  };
  const reset = () => { setPays([]); setLog([]); setDupes(0); setBlocked(0); setN(1000); };

  const verdict =
    succeeded >= 2 ? { t: "Double payment", d: `The customer paid ${succeeded} times for one bill. The second payment was a new transaction.`, warn: true }
    : succeeded === 1 ? { t: "Paid once", d: pays.length > 1 ? "One payment succeeded, but another is still pending and could also succeed." : "One payment, one success.", warn: pays.length > 1 }
    : { t: "Nothing settled yet", d: pays.length ? "Confirm a payment to see the outcome." : "Start by paying the bill.", warn: false };

  const btn = "rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)] disabled:opacity-40";
  return (
    <div className="rounded-3xl border border-[var(--line)] p-5 sm:p-8">
      <p className="text-sm text-[var(--muted)]">
        A customer pays a bill and the biller is slow to confirm, so the payment stays pending. The customer or agent is tempted to retry. See what happens when the retry reuses the same reference, and when it starts a new payment.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90" onClick={payNew}>{pays.length ? "Retry as a new payment" : "Pay the bill"}</button>
        <button className={btn} onClick={retrySame} disabled={pays.length === 0}>Retry with the same reference</button>
        <button className={btn} onClick={reset}>Reset</button>
        <label className="ml-auto inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={guard} onChange={(e) => setGuard(e.target.checked)} /> Product guard: block new payments while one is pending</label>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Payments accepted", pays.length], ["Duplicates caught", dupes], ["Retries blocked", blocked], ["Successful", succeeded]].map(([k, v]) => (
          <div key={String(k)} className="rounded-2xl border border-[var(--line)] p-3"><dt className="text-xs text-[var(--muted)]">{k}</dt><dd className="serif text-2xl font-semibold">{v}</dd></div>
        ))}
      </dl>
      <div role="status" aria-live="polite" className={`mt-4 rounded-2xl p-4 ${verdict.warn ? "border border-[var(--accent)] bg-[var(--accent)]/10" : "bg-[var(--line)]/40"}`}>
        <p className="font-semibold">{verdict.t}</p><p className="mt-1 text-sm text-[var(--muted)]">{verdict.d}</p>
      </div>

      {pays.length > 0 && (
        <ul className="mt-5 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] text-sm">
          {pays.map((p) => (
            <li key={p.ref} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <span><span className="font-mono">{p.ref}</span> <span className={p.status === "SUCCESS" ? "text-[var(--accent)]" : "text-[var(--muted)]"}>{p.status === "SUCCESS" ? "Successful" : "Pending"}</span></span>
              {p.status === "PENDING" && <button className={btn} onClick={() => confirm(p.ref)}>Biller confirms {p.ref}</button>}
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-6 font-semibold">What just happened</h3>
      <ol aria-live="polite" className="mt-2 space-y-2 text-sm">
        {log.length === 0 && <li className="text-[var(--muted)]">Nothing yet. Pay the bill, then try both kinds of retry.</li>}
        {log.map((e, i) => <li key={i} className={e.kind === "warn" ? "text-[var(--accent)]" : "text-[var(--muted)]"}>{e.text}</li>)}
      </ol>
      <p className="mt-5 text-xs text-[var(--muted)]">
        Illustrative model of idempotent retries: a repeated reference is treated as the same request, and a new reference is a new transaction. Check how your own platform treats repeats before relying on this. It is not a statement of any network&apos;s exact rules.
        The error-code translator in this lab has the matching message for a blocked retry.
      </p>
    </div>
  );
}
