"use client";
import { useMemo, useState } from "react";

const card = "rounded-3xl border border-[var(--line)] p-5 sm:p-8";
const field = "w-full rounded-xl border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--accent)]";

/* ---------- Three Lanes prioritisation tool ---------- */
const lanes = [
  { id: 1, name: "Failure prevention", hint: "Lowers the rate at which transactions break." },
  { id: 2, name: "Failure transparency", hint: "Makes failures easier to understand and recover from." },
  { id: 3, name: "Failure-adjacent growth", hint: "Adds capability without touching the failure surface." },
] as const;

type Item = { id: number; text: string; lane: 1 | 2 | 3 };

const starter: Item[] = [
  { id: 1, text: "Tune timeouts for slow billers", lane: 1 },
  { id: 2, text: "Onboard a new biller category", lane: 3 },
  { id: 3, text: "Add a new payment mode", lane: 3 },
  { id: 4, text: "Support a cross-border corridor", lane: 3 },
  { id: 5, text: "Launch a partner-facing report", lane: 3 },
  { id: 6, text: "Extend the biller API integration", lane: 3 },
  { id: 7, text: "Detect account-format drift", lane: 1 },
  { id: 8, text: "Add a new bill category UI", lane: 3 },
  { id: 9, text: "Add a new geography", lane: 3 },
  { id: 10, text: "Idempotency for retries", lane: 1 },
];

export function ThreeLanes() {
  const [items, setItems] = useState<Item[]>(starter);
  const [text, setText] = useState("");
  const [lane, setLane] = useState<1 | 2 | 3>(2);
  const total = items.length || 1;
  const counts = useMemo(() => lanes.map((l) => items.filter((i) => i.lane === l.id).length), [items]);
  const starved = lanes.filter((_, idx) => counts[idx] / total < 0.15);

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setItems((p) => [...p, { id: Date.now(), text: t, lane }]);
    setText("");
  };

  return (
    <div className={card}>
      <p className="text-sm text-[var(--muted)]">
        Every payments opportunity sits in one of three lanes. Edit the sample roadmap below and watch which lane is starved. The starter list is deliberately lopsided, like many real roadmaps.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {lanes.map((l, idx) => (
          <div key={l.id} className="rounded-2xl border border-[var(--line)] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">Lane {l.id}</p>
            <p className="font-semibold">{l.name}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{l.hint}</p>
            <div className="mt-3 h-2 rounded bg-[var(--line)]">
              <div className="h-full rounded bg-[var(--accent)] transition-all" style={{ width: `${Math.round((counts[idx] / total) * 100)}%` }} />
            </div>
            <p className="mt-1 text-sm">{counts[idx]} items · {Math.round((counts[idx] / total) * 100)}%</p>
          </div>
        ))}
      </div>
      <p role="status" className={`mt-4 rounded-xl px-4 py-3 text-sm ${starved.length ? "bg-[var(--accent)]/10" : "bg-[var(--line)]/40"}`}>
        {starved.length
          ? `Starved: ${starved.map((l) => l.name).join(", ")}. Under 15% of the roadmap sits there, so you may be storing up work for later.`
          : "All three lanes are funded. Check the sequencing and visibility next."}
      </p>
      <ul className="mt-5 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)]">
        {items.map((i) => (
          <li key={i.id} className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
            <span className="min-w-0 flex-1">{i.text}</span>
            <label className="sr-only" htmlFor={`lane-${i.id}`}>Lane for {i.text}</label>
            <select
              id={`lane-${i.id}`}
              value={i.lane}
              onChange={(e) => setItems((p) => p.map((x) => (x.id === i.id ? { ...x, lane: Number(e.target.value) as 1 | 2 | 3 } : x)))}
              className="rounded-lg border border-[var(--line)] bg-transparent px-2 py-1"
            >
              {lanes.map((l) => <option key={l.id} value={l.id} className="text-black">Lane {l.id}</option>)}
            </select>
            <button onClick={() => setItems((p) => p.filter((x) => x.id !== i.id))} className="text-[var(--muted)] hover:text-[var(--accent)]" aria-label={`Remove ${i.text}`}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => { e.preventDefault(); add(); }} className="mt-5 flex flex-wrap gap-3">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a roadmap item" className={`${field} min-w-[12rem] flex-1`} maxLength={80} aria-label="New roadmap item" />
        <select value={lane} onChange={(e) => setLane(Number(e.target.value) as 1 | 2 | 3)} className={`${field} w-auto`} aria-label="Lane for the new item">
          {lanes.map((l) => <option key={l.id} value={l.id} className="text-black">Lane {l.id}</option>)}
        </select>
        <button className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white hover:opacity-90">Add</button>
      </form>
      <button onClick={() => setItems(starter)} className="mt-3 text-sm text-[var(--muted)] underline hover:text-[var(--ink)]">Reset to the starter roadmap</button>
    </div>
  );
}

/* ---------- Error-code translator ---------- */
// Illustrative codes only. They are not any employer's real internal codes.
const errors: Record<string, [string, string]> = {
  TXN_FAIL_BILLER_TIMEOUT: ["The biller's system did not respond in time.", "Wait 30 seconds and retry. If it fails again, ask the customer to try after 2 hours."],
  ACCOUNT_FORMAT_INVALID: ["The account number does not match the biller's format.", "Check the number against the customer's latest bill and enter it again."],
  PAYMENT_PENDING_CONFIRMATION: ["The payment is being confirmed and has not failed.", "Do not retry. Check the status after a few minutes to avoid a duplicate payment."],
  BILL_FETCH_UNAVAILABLE: ["The biller's bill could not be fetched right now.", "Try again shortly, or ask the customer for the exact amount if the biller allows it."],
  DUPLICATE_REQUEST: ["A payment for this bill is already in progress.", "Wait for the first payment to finish before trying again."],
  BILLER_NOT_ACTIVE: ["This biller is not accepting payments at the moment.", "Ask the customer to try later or use another channel."],
};

export function ErrorTranslator() {
  const [code, setCode] = useState("TXN_FAIL_BILLER_TIMEOUT");
  const key = code.trim().toUpperCase().replace(/[^A-Z0-9_]/g, "").replace(/_?\d{3}$/, "");
  const hit = errors[key];
  return (
    <div className={card}>
      <p className="text-sm text-[var(--muted)]">
        Agents cannot explain codes like these. Pick or type one to see the message and next action they should get instead. The codes are illustrative, not any real system&apos;s.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {Object.keys(errors).map((c) => (
          <button key={c} onClick={() => setCode(c)}
            className={`rounded-full border px-3 py-1 text-xs ${key === c ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)] hover:border-[var(--accent)]"}`}>
            {c}
          </button>
        ))}
      </div>
      <label className="mt-5 block text-sm font-medium" htmlFor="code">Error code</label>
      <input id="code" value={code} onChange={(e) => setCode(e.target.value)} className={`${field} mt-2 font-mono`} spellCheck={false} />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--line)] p-5">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">What the agent sees today</p>
          <p className="mt-2 font-mono text-sm">{code.trim() || "(nothing entered)"}</p>
        </div>
        <div className="rounded-2xl border border-[var(--accent)] p-5" role="status">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">What they should see</p>
          {hit ? (
            <>
              <p className="mt-2 font-semibold">{hit[0]}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{hit[1]}</p>
            </>
          ) : (
            <>
              <p className="mt-2 font-semibold">Something went wrong on our side.</p>
              <p className="mt-1 text-sm text-[var(--muted)]">Unmapped codes fall back to a safe generic message and are logged for the quarterly dictionary review.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Transaction lifecycle stepper ---------- */
const happy = [
  ["1. Fetch request", "The customer asks their app, bank or agent (the COU) for a bill. The COU sends the request to the central unit (BBPCU), which routes it by biller to the right BOU."],
  ["2. Bill from the biller", "The BOU translates the request into the biller's own system and brings back the bill. Per biller, fetch can be mandatory, optional or not supported."],
  ["3. Customer pays", "The customer pays through the COU. Bharat Connect does not carry the money: funds go straight into the acquiring COU's nodal or sponsor bank account."],
  ["4. Confirmation and receipt", "The BOU confirms the payment with the biller and returns a receipt. One 35-character reference ID chains the request and response end to end."],
  ["5. Settlement and reconciliation", "The central unit computes net positions per operating unit and settles in cycles through the day. Each cycle needs matching records at every unit."],
];
const slow = [
  ...happy.slice(0, 3),
  ["4. The BOU times out or answers badly", "The payment cannot be confirmed, so the transaction is left pending. The customer or agent is tempted to retry, which risks a duplicate payment."],
  ["5. Status checks", "The central unit polls the BOU about the pending payment with a 402 message. An operating unit can also ask for a transaction's state with a 401 message."],
  ["6. Deemed success or reversal", "For billers with deemed success enabled, the central unit marks the transaction a success and settles it. For other billers the reversal and force-closure rules apply."],
  ["7. Reconciliation", "Every cycle needs matching records, including the deemed-success file, so these transactions are accounted for on both sides."],
];

export function Lifecycle() {
  const [branch, setBranch] = useState<"happy" | "slow">("happy");
  const [step, setStep] = useState(0);
  const steps = branch === "happy" ? happy : slow;
  const s = steps[Math.min(step, steps.length - 1)];
  return (
    <div className={card}>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a path">
        {([["happy", "Normal payment"], ["slow", "The BOU does not respond"]] as const).map(([k, label]) => (
          <button key={k} onClick={() => { setBranch(k); setStep(0); }}
            className={`rounded-full border px-4 py-2 text-sm ${branch === k ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)] hover:border-[var(--accent)]"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="mt-6 flex gap-1" aria-hidden>
        {steps.map((_, i) => <div key={i} className={`h-1.5 flex-1 rounded ${i <= step ? "bg-[var(--accent)]" : "bg-[var(--line)]"}`} />)}
      </div>
      <div className="mt-6 min-h-[8rem]" role="status">
        <h3 className="serif text-xl font-semibold">{s[0]}</h3>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">{s[1]}</p>
      </div>
      <div className="mt-4 flex gap-3">
        <button disabled={step === 0} onClick={() => setStep((n) => n - 1)} className="rounded-full border border-[var(--line)] px-5 py-2 text-sm disabled:opacity-40">Back</button>
        <button disabled={step >= steps.length - 1} onClick={() => setStep((n) => n + 1)} className="rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)] disabled:opacity-40">Next step</button>
      </div>
    </div>
  );
}

/* ---------- Settlement timeline ---------- */
export function SettlementTimeline() {
  const [era, setEra] = useState<2 | 10>(10);
  return (
    <div className={card}>
      <p className="text-sm text-[var(--muted)]">
        Settlement runs in cycles through the day, now ten, up from two in 2019. The diagram is schematic: spacing is illustrative, not the real cut-off times.
      </p>
      <div className="mt-5 flex gap-2" role="group" aria-label="Choose a year">
        {([[2, "2019: two cycles"], [10, "Today: ten cycles"]] as const).map(([n, label]) => (
          <button key={n} onClick={() => setEra(n)}
            className={`rounded-full border px-4 py-2 text-sm ${era === n ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)] hover:border-[var(--accent)]"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <div className="flex h-12 overflow-hidden rounded-xl border border-[var(--line)]" aria-label={`A day with ${era} settlement cycles`} role="img">
          {Array.from({ length: era }).map((_, i) => (
            <div key={i} className="flex flex-1 items-center justify-center border-r border-[var(--line)] bg-[var(--accent)]/10 text-xs text-[var(--accent)] last:border-r-0">{i + 1}</div>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-xs text-[var(--muted)]"><span>Start of day</span><span>End of day</span></div>
      </div>
      <p className="mt-5 text-sm">
        {era === 2
          ? "With only two cycles, money and records move less often, so a mismatch can take longer to surface."
          : "With ten cycles, money and records move more often, so there are more chances to catch a mismatch early."}
      </p>
      <h3 className="mt-6 font-semibold">What happens in each cycle</h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
        <li>The central unit computes each operating unit&apos;s net position from the transactions in the cycle.</li>
        <li>Funds settle against those positions, backed by a settlement guarantee fund if a participant defaults.</li>
        <li>Every unit matches its own records to the cycle, including the deemed-success file.</li>
        <li>Any exception goes to reconciliation before the next cycle, which is why reconciliation is a product problem, not only an ops one.</li>
      </ol>
    </div>
  );
}
