"use client";
import { useMemo, useRef, useState } from "react";
import { reconSample } from "@/data";

// A browser version of the reconciliation-demo repository. Everything runs locally; nothing is uploaded.
type Row = Record<string, string>;
type Brk = { type: "missing_in_settlement" | "missing_in_txn" | "amount_mismatch" | "status_mismatch"; id: string; detail: string };

const MAX_BYTES = 2 * 1024 * 1024;
const MAX_ROWS = 20000;

function parseCsv(text: string): { rows: Row[]; error?: string } {
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim());
  if (lines.length < 2) return { rows: [], error: "Needs a header row and at least one data row." };
  if (lines.length - 1 > MAX_ROWS) return { rows: [], error: `Too many rows. This demo reads up to ${MAX_ROWS.toLocaleString()}.` };
  const split = (l: string) => l.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
  const head = split(lines[0]).map((h) => h.toLowerCase());
  return { rows: lines.slice(1).map((l) => { const c = split(l); return Object.fromEntries(head.map((h, i) => [h, c[i] ?? ""])); }) };
}

const rupees = (paise: number) => `₹${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function reconcile(txText: string, stText: string) {
  const tx = parseCsv(txText); const st = parseCsv(stText);
  if (tx.error) return { error: `Transactions: ${tx.error}` };
  if (st.error) return { error: `Settlements: ${st.error}` };
  const need = (rows: Row[], cols: string[], label: string) => {
    const miss = cols.filter((c) => !(c in (rows[0] ?? {})));
    return miss.length ? `${label} is missing column(s): ${miss.join(", ")}` : "";
  };
  const e1 = need(tx.rows, ["txn_id", "amount_paise", "status"], "Transactions"); if (e1) return { error: e1 };
  const e2 = need(st.rows, ["txn_id", "amount_paise", "status"], "Settlements"); if (e2) return { error: e2 };

  // Never drop silently: keep the first occurrence, count repeats, and flag repeats whose values differ.
  let dupes = 0, conflicts = 0;
  const txn = new Map<string, { amt: number; status: string }>();
  for (const r of tx.rows) {
    const amt = Number(r.amount_paise); const status = r.status.toUpperCase();
    if (!r.txn_id || !Number.isInteger(amt)) return { error: `Transactions: bad row for "${r.txn_id || "(blank id)"}". Amounts must be whole paise.` };
    const prev = txn.get(r.txn_id);
    if (!prev) txn.set(r.txn_id, { amt, status });
    else { dupes++; if (prev.amt !== amt || prev.status !== status) conflicts++; }
  }
  const stl = new Map<string, { amt: number; status: string }>();
  for (const r of st.rows) {
    const amt = Number(r.amount_paise);
    if (!r.txn_id || !Number.isInteger(amt)) return { error: `Settlements: bad row for "${r.txn_id || "(blank id)"}". Amounts must be whole paise.` };
    if (!stl.has(r.txn_id)) stl.set(r.txn_id, { amt, status: r.status.toUpperCase() });
  }

  const breaks: Brk[] = [];
  let missSettleAmt = 0, orphanAmt = 0, mismatchDelta = 0;
  for (const [id, t] of txn) {
    if (t.status !== "SUCCESS") continue;
    const s = stl.get(id);
    if (!s) { breaks.push({ type: "missing_in_settlement", id, detail: `Successful payment of ${rupees(t.amt)} was never settled` }); missSettleAmt += t.amt; continue; }
    if (s.amt !== t.amt) { breaks.push({ type: "amount_mismatch", id, detail: `Transaction ${rupees(t.amt)}, settlement ${rupees(s.amt)}` }); mismatchDelta += t.amt - s.amt; }
    if (s.status !== "SETTLED") breaks.push({ type: "status_mismatch", id, detail: `Settlement status is ${s.status || "blank"}, not SETTLED` });
  }
  for (const [id, s] of stl) {
    if (!txn.has(id)) { breaks.push({ type: "missing_in_txn", id, detail: `Settlement of ${rupees(s.amt)} has no matching transaction` }); orphanAmt += s.amt; }
  }

  // Independent check: recompute the totals directly and see whether the listed breaks explain the gap.
  let txTotal = 0; for (const [, t] of txn) if (t.status === "SUCCESS") txTotal += t.amt;
  let stTotalMatched = 0; for (const [id, s] of stl) if (txn.get(id)?.status === "SUCCESS") stTotalMatched += s.amt;
  const gap = txTotal - stTotalMatched;
  const explained = missSettleAmt + mismatchDelta;
  return {
    stats: { txRows: tx.rows.length, unique: txn.size, dupes, conflicts, settlementRows: st.rows.length, txTotal, stTotalMatched, gap, explained, orphanAmt, ok: gap === explained },
    breaks,
  };
}

const typeLabel: Record<Brk["type"], string> = {
  missing_in_settlement: "Missing in settlement", missing_in_txn: "Missing in transactions",
  amount_mismatch: "Amount mismatch", status_mismatch: "Status mismatch",
};

export default function ReconPlayground() {
  const [tx, setTx] = useState(reconSample.transactions);
  const [st, setSt] = useState(reconSample.settlements);
  const [ran, setRan] = useState(true);
  const [note, setNote] = useState("");
  const result = useMemo(() => (ran ? reconcile(tx, st) : null), [ran, tx, st]);
  const fileA = useRef<HTMLInputElement>(null); const fileB = useRef<HTMLInputElement>(null);

  const load = (file: File | undefined, set: (s: string) => void) => {
    if (!file) return;
    if (file.size > MAX_BYTES) { setNote("That file is over 2 MB. This demo reads small files in your browser."); return; }
    setNote("");
    const fr = new FileReader();
    fr.onload = () => { set(String(fr.result)); setRan(false); };
    fr.readAsText(file);
  };

  const download = () => {
    if (!result || "error" in result || !result.breaks) return;
    const csv = "type,txn_id,detail\n" + result.breaks.map((b) => `${b.type},${b.id},"${b.detail.replace(/"/g, '""')}"`).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "reconciliation-breaks.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const area = "mt-1 h-40 w-full rounded-xl border border-[var(--line)] bg-transparent p-3 font-mono text-xs outline-none focus:border-[var(--accent)]";
  const btn = "rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]";
  const counts = result && "breaks" in result && result.breaks ? (Object.keys(typeLabel) as Brk["type"][]).map((t) => [t, result.breaks!.filter((b) => b.type === t).length] as const) : [];

  return (
    <div className="rounded-3xl border border-[var(--line)] p-5 sm:p-8">
      <p className="text-sm text-[var(--muted)]">
        Compare a transactions file with a settlement file. It keeps the first copy of any repeated ID and reports the repeat, then lists four kinds of break, then proves the totals add up.
        It runs entirely in your browser and nothing is uploaded. The sample is synthetic, with problems planted on purpose, and mirrors my{" "}
        <a className="text-[var(--accent)] hover:underline" href="https://github.com/Abhishek-Singla/reconciliation-demo" target="_blank" rel="noreferrer">reconciliation-demo</a> repository.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="recon-tx" className="text-sm font-medium">Transactions (CSV: txn_id, amount_paise, status)</label>
          <textarea id="recon-tx" className={area} value={tx} spellCheck={false} onChange={(e) => { setTx(e.target.value); setRan(false); }} />
          <input ref={fileA} type="file" accept=".csv,text/csv,text/plain" className="sr-only" aria-label="Choose a transactions file" onChange={(e) => load(e.target.files?.[0], setTx)} />
          <button className={`${btn} mt-2`} onClick={() => fileA.current?.click()}>Open a file…</button>
        </div>
        <div>
          <label htmlFor="recon-st" className="text-sm font-medium">Settlements (CSV: txn_id, amount_paise, status)</label>
          <textarea id="recon-st" className={area} value={st} spellCheck={false} onChange={(e) => { setSt(e.target.value); setRan(false); }} />
          <input ref={fileB} type="file" accept=".csv,text/csv,text/plain" className="sr-only" aria-label="Choose a settlements file" onChange={(e) => load(e.target.files?.[0], setSt)} />
          <button className={`${btn} mt-2`} onClick={() => fileB.current?.click()}>Open a file…</button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={() => setRan(true)} className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90">Reconcile</button>
        <button className={btn} onClick={() => { setTx(reconSample.transactions); setSt(reconSample.settlements); setRan(true); setNote(""); }}>Load the sample</button>
        <button className={btn} onClick={() => { setTx(""); setSt(""); setRan(false); setNote(""); }}>Clear</button>
        <span role="status" className="text-sm text-[var(--accent)]">{note}</span>
      </div>

      <div className="mt-6" role="status" aria-live="polite">
        {result && "error" in result && <p className="rounded-xl bg-[var(--accent)]/10 p-4 text-sm">{result.error}</p>}
        {result && "stats" in result && result.stats && (
          <>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Transaction rows", result.stats.txRows], ["Repeated IDs removed", result.stats.dupes], ["Repeats with different values", result.stats.conflicts], ["Settlement rows", result.stats.settlementRows],
              ].map(([k, v]) => (
                <div key={String(k)} className="rounded-2xl border border-[var(--line)] p-3"><dt className="text-xs text-[var(--muted)]">{k}</dt><dd className="serif text-2xl font-semibold">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {counts.map(([t, n]) => (
                <div key={t} className={`rounded-2xl border p-3 ${n ? "border-[var(--accent)]" : "border-[var(--line)]"}`}><p className="text-xs text-[var(--muted)]">{typeLabel[t]}</p><p className="serif text-2xl font-semibold">{n}</p></div>
              ))}
            </div>
            <p className={`mt-4 rounded-xl p-4 text-sm ${result.stats.ok ? "bg-[var(--line)]/40" : "bg-[var(--accent)]/10"}`}>
              <strong>Proof check.</strong> Successful transactions total {rupees(result.stats.txTotal)}; matched settlements total {rupees(result.stats.stTotalMatched)}; the gap is {rupees(result.stats.gap)}.
              The listed breaks explain {rupees(result.stats.explained)}.{" "}
              {result.stats.ok ? "The gap is fully explained by the breaks above." : "The gap is not fully explained. Check the data for repeated IDs with different values."}
              {result.stats.orphanAmt > 0 && ` Settlements with no transaction add ${rupees(result.stats.orphanAmt)} on the other side.`}
            </p>
            {result.breaks && result.breaks.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between"><h3 className="font-semibold">Breaks ({result.breaks.length})</h3><button className={btn} onClick={download}>Download as CSV</button></div>
                <ul className="mt-3 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] text-sm">
                  {result.breaks.slice(0, 200).map((b, i) => (
                    <li key={b.type + b.id + i} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3">
                      <span className="rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 text-xs text-[var(--accent)]">{typeLabel[b.type]}</span>
                      <span className="font-mono">{b.id}</span><span className="text-[var(--muted)]">{b.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.breaks && result.breaks.length === 0 && <p className="mt-4 text-sm">No breaks found.</p>}
          </>
        )}
      </div>
      <p className="mt-4 text-xs text-[var(--muted)]">Amounts are whole paise (1 rupee = 100 paise), so sums are exact. Only SUCCESS transactions are expected to settle. Dates are ignored in this demo.</p>
    </div>
  );
}
