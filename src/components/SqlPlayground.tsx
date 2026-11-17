"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import questions from "@/content/sql-questions.json";

type ResultSet = { columns: string[]; values: unknown[][] };
type Status = "loading" | "ready" | "running" | "error";

const SCHEMA: [string, string][] = [
  ["billers", "biller_id, name, category"],
  ["customers", "customer_id, city_tier, joined_date"],
  ["transactions", "txn_id, customer_id, biller_id, txn_ts, amount_paise, status, channel, failure_reason"],
  ["settlements", "txn_id, settled_date, settled_amount_paise, settle_status"],
  ["complaints", "complaint_id, txn_id, opened_date, reason, resolved_date"],
];
const TIMEOUT_MS = 8000;
const MAX_ROWS = 200;
const STARTER = "SELECT status, COUNT(*) AS n\nFROM transactions\nGROUP BY status\nORDER BY n DESC;";

export default function SqlPlayground() {
  const [status, setStatus] = useState<Status>("loading");
  const [sql, setSql] = useState(STARTER);
  const [sets, setSets] = useState<ResultSet[]>([]);
  const [error, setError] = useState("");
  const [ms, setMs] = useState(0);
  const [qn, setQn] = useState(0);

  const workerRef = useRef<Worker | null>(null);
  const dbRef = useRef<ArrayBuffer | null>(null);
  const idRef = useRef(0);
  const pending = useRef(new Map<number, { resolve: (v: any) => void; reject: (e: Error) => void }>());

  // Send a message to the worker and wait for its reply, stopping a runaway query after a timeout.
  const call = useCallback((msg: Record<string, unknown>, transfer: Transferable[] = [], timeout = 0) => {
    return new Promise<any>((resolve, reject) => {
      const w = workerRef.current;
      if (!w) return reject(new Error("The SQL engine is not ready."));
      const id = ++idRef.current;
      let timer: ReturnType<typeof setTimeout> | undefined;
      pending.current.set(id, {
        resolve: (v) => { if (timer) clearTimeout(timer); resolve(v); },
        reject: (e) => { if (timer) clearTimeout(timer); reject(e); },
      });
      if (timeout) {
        timer = setTimeout(() => {
          pending.current.delete(id);
          w.terminate();
          workerRef.current = null;
          reject(new Error("TIMEOUT"));
        }, timeout);
      }
      w.postMessage({ id, ...msg }, transfer);
    });
  }, []);

  const spawn = useCallback(async () => {
    const w = new Worker("/sqljs/worker.sql-wasm.js");
    w.onmessage = (e: MessageEvent) => {
      const p = pending.current.get(e.data.id);
      if (!p) return;
      pending.current.delete(e.data.id);
      if (e.data.error) p.reject(new Error(e.data.error)); else p.resolve(e.data);
    };
    w.onerror = () => { setError("The SQL engine failed to start."); setStatus("error"); };
    workerRef.current = w;
    await call({ action: "open", buffer: dbRef.current!.slice(0) });
  }, [call]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/data/payments.db");
        if (!res.ok) throw new Error("Could not load the database.");
        dbRef.current = await res.arrayBuffer();
        await spawn();
        if (!cancelled) setStatus("ready");
      } catch (e) {
        if (!cancelled) { setError((e as Error).message); setStatus("error"); }
      }
    })();
    const pend = pending.current;
    return () => { cancelled = true; workerRef.current?.terminate(); workerRef.current = null; pend.clear(); };
  }, [spawn]);

  const run = async () => {
    if (status !== "ready" || !sql.trim()) return;
    setStatus("running"); setError(""); setSets([]);
    const t0 = performance.now();
    try {
      const r = await call({ action: "exec", sql }, [], TIMEOUT_MS);
      setSets((r.results ?? []) as ResultSet[]);
      setMs(Math.round(performance.now() - t0));
      setStatus("ready");
    } catch (e) {
      const msg = (e as Error).message;
      if (msg === "TIMEOUT") {
        setError(`The query was stopped after ${TIMEOUT_MS / 1000} seconds. Try adding a WHERE filter or a LIMIT.`);
        try { await spawn(); setStatus("ready"); } catch { setStatus("error"); }
      } else {
        setError(msg);
        setStatus("ready");
      }
    }
  };

  const reset = async () => {
    setStatus("loading"); setError(""); setSets([]);
    workerRef.current?.terminate(); workerRef.current = null;
    try { await spawn(); setStatus("ready"); } catch { setError("Could not reset the database."); setStatus("error"); }
  };

  const pick = (n: number) => {
    setQn(n);
    const q = questions.find((x) => x.n === n);
    if (!q) return;
    setSql(`-- Q${q.n}: ${q.q}\n-- Skills: ${q.skills}\n\n`);
    setSets([]); setError("");
  };
  const showSolution = () => {
    const q = questions.find((x) => x.n === qn);
    if (q) setSql(`-- Solution to Q${q.n}: ${q.q}\n${q.sql}\n`);
  };

  const area = "h-48 w-full rounded-xl border border-[var(--line)] bg-transparent p-3 font-mono text-sm outline-none focus:border-[var(--accent)]";
  const btn = "rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)] disabled:opacity-50";
  const q = questions.find((x) => x.n === qn);
  const levels = [...new Set(questions.map((x) => x.level))];

  return (
    <div className="rounded-3xl border border-[var(--line)] p-5 sm:p-8">
      <div className="grid gap-5 md:grid-cols-[1fr_16rem]">
        <div>
          <label htmlFor="q-pick" className="text-sm font-medium">Try a question</label>
          <select id="q-pick" value={qn} onChange={(e) => pick(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm">
            <option value={0}>Write your own query</option>
            {levels.map((l) => (
              <optgroup key={l} label={l}>
                {questions.filter((x) => x.level === l).map((x) => <option key={x.n} value={x.n}>{`Q${x.n}. ${x.q}`}</option>)}
              </optgroup>
            ))}
          </select>
          {q && <p className="mt-2 text-xs text-[var(--muted)]">Skills: {q.skills}. Try it first, then reveal the solution.</p>}

          <label htmlFor="sql" className="mt-4 block text-sm font-medium">SQL (SQLite) <span className="font-normal text-[var(--muted)]">· Ctrl or Cmd + Enter to run</span></label>
          <textarea id="sql" value={sql} spellCheck={false} onChange={(e) => setSql(e.target.value)} className={`${area} mt-1`}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); } }} />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button onClick={run} disabled={status !== "ready"} className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">{status === "running" ? "Running…" : "Run"}</button>
            {q && <button className={btn} onClick={showSolution}>Show solution</button>}
            <button className={btn} onClick={() => { setSql(STARTER); setQn(0); setSets([]); setError(""); }}>Starter query</button>
            <button className={btn} onClick={reset} disabled={status === "loading" || status === "running"}>Reset database</button>
            <span role="status" aria-live="polite" className="text-sm text-[var(--muted)]">
              {status === "loading" && "Loading the database…"}
              {status === "ready" && sets.length > 0 && `${sets[sets.length - 1].values.length} row(s) in ${ms} ms`}
            </span>
          </div>
        </div>
        <aside aria-label="Database schema" className="rounded-2xl border border-[var(--line)] p-4 text-xs">
          <p className="font-semibold">Tables</p>
          <ul className="mt-2 space-y-3">
            {SCHEMA.map(([t, cols]) => (
              <li key={t}><button className="font-mono font-semibold text-[var(--accent)] hover:underline" onClick={() => setSql(`SELECT * FROM ${t} LIMIT 10;`)}>{t}</button><p className="mt-0.5 text-[var(--muted)]">{cols}</p></li>
            ))}
          </ul>
          <p className="mt-3 text-[var(--muted)]">Amounts are in paise. Timestamps are text. Status is SUCCESS, FAILED or PENDING.</p>
        </aside>
      </div>

      {error && <p role="alert" className="mt-5 rounded-xl bg-[var(--accent)]/10 p-4 font-mono text-sm">{error}</p>}
      {status === "error" && !error && <p role="alert" className="mt-5 rounded-xl bg-[var(--accent)]/10 p-4 text-sm">The SQL engine could not start in this browser.</p>}

      {sets.map((s, i) => (
        <div key={i} className="mt-5 overflow-x-auto rounded-2xl border border-[var(--line)]">
          <table className="w-full text-left text-xs">
            <caption className="p-3 text-left text-sm text-[var(--muted)]">Result {sets.length > 1 ? `${i + 1} of ${sets.length}` : ""}: {s.values.length} row(s){s.values.length > MAX_ROWS ? `, showing the first ${MAX_ROWS}` : ""}</caption>
            <thead><tr>{s.columns.map((c) => <th key={c} scope="col" className="border-b border-[var(--line)] bg-[var(--line)]/30 p-2 font-mono">{c}</th>)}</tr></thead>
            <tbody>
              {s.values.slice(0, MAX_ROWS).map((row, r) => (
                <tr key={r}>{row.map((v, c) => <td key={c} className="border-b border-[var(--line)] p-2 font-mono">{v === null ? <span className="text-[var(--muted)]">NULL</span> : String(v)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {status === "ready" && sets.length === 0 && !error && ms > 0 && <p className="mt-5 text-sm text-[var(--muted)]">The statement ran and returned no rows.</p>}

      <p className="mt-6 text-xs text-[var(--muted)]">
        The database is synthetic and runs entirely in your browser with SQLite compiled to WebAssembly; nothing you type is sent anywhere. Changes you make are lost when you reload or press Reset.
        A query that runs longer than {TIMEOUT_MS / 1000} seconds is stopped.
      </p>
    </div>
  );
}
