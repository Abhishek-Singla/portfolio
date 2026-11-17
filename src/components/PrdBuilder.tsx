"use client";
import { useMemo, useState } from "react";
import CopyButton from "./CopyButton";

// Builds a PRD in markdown that follows the structure of the pm-templates PRD. Nothing is stored or sent.
type F = {
  title: string; owner: string; status: string; problem: string; goals: string; nonGoals: string; users: string;
  inScope: string; outScope: string; requirements: string; flow: string; edge: string; metrics: string; risks: string; rollout: string; questions: string;
};
const empty: F = { title: "", owner: "", status: "Draft", problem: "", goals: "", nonGoals: "", users: "", inScope: "", outScope: "", requirements: "", flow: "", edge: "", metrics: "", risks: "", rollout: "", questions: "" };
const example: F = {
  title: "Plain-language error dictionary for agent-facing screens",
  owner: "Product", status: "Draft",
  problem: "Agent screens show internal error codes. Agents cannot explain them to customers, so they raise tickets or retry blindly, which also risks duplicate payments.",
  goals: "Every failure shows a plain-language reason and one clear next action\nSupport tickets about unclear failures fall",
  nonGoals: "Change the underlying failure rate\nRedesign the whole agent app",
  users: "BC agent | Understand a failed payment and tell the customer what to do | Retries blindly or raises a ticket",
  inScope: "Result and history screens\nA maintained error dictionary",
  outScope: "New languages\nNew payment modes",
  requirements: "Map every internal error code to a message and a next action | Must\nShow the message on the transaction result and history screens | Must\nKeep the dictionary in the product system, owned by product | Should | Not hard-coded\nReview the dictionary quarterly against the top ticket categories | Should",
  flow: "Happy path: the payment succeeds and the receipt shows the reference.\nFailure path: the payment fails, the agent sees the message and the next action, and acts on it.",
  edge: "Bill fetch times out | Show the biller-not-responding message | The biller's system did not respond in time. Wait 30 seconds and retry.\nUnmapped error code | Show a safe generic message and log the code for review | Something went wrong on our side.",
  metrics: "Agent-initiated tickets | Last 30 days | Lower (set a target after baselining) | Support tool\nTransaction success rate | Current | No change (guardrail) | Transaction logs",
  risks: "Wrong message sends agents the wrong way | Product and support | Agents retry incorrectly | Review every message with support before launch",
  rollout: "Release behind a flag to a small agent cohort first, then widen. Rollback by switching the flag off.",
  questions: "Which error codes drive the most tickets today?\nWho signs off the wording?",
};

const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const cells = (l: string, n: number) => { const c = l.split("|").map((x) => x.trim()); while (c.length < n) c.push(""); return c.slice(0, n); };
const table = (head: string[], rows: string[][], placeholder: string[]) =>
  `| ${head.join(" | ")} |\n|${head.map(() => "---").join("|")}|\n` + (rows.length ? rows : [placeholder]).map((r) => `| ${r.join(" | ")} |`).join("\n");

export function toMarkdown(f: F): string {
  const bullets = (s: string, prefix = "") => lines(s).map((l) => `- ${prefix}${l}`).join("\n");
  const reqs = lines(f.requirements).map((l, i) => { const [r, p, n] = cells(l, 3); return [`R${i + 1}`, r, p || "Must", n]; });
  const today = new Date().toISOString().slice(0, 10);
  return `# PRD: ${f.title || "<feature name>"}

| Field | Value |
|---|---|
| Owner | ${f.owner || "<name>"} |
| Status | ${f.status} |
| Version | 1.0 |
| Last updated | ${today} |

## 1. Problem
${f.problem.trim() || "What is going wrong today, for whom, and how do we know (data, tickets, feedback)?"}

## 2. Goals and non-goals
${bullets(f.goals, "Goal: ") || "- Goal: <measurable outcome>"}
${bullets(f.nonGoals, "Non-goal: ") || "- Non-goal: <what this release will not do, and why>"}

## 3. Users and use cases
${table(["User type", "Need", "Today's workaround"], lines(f.users).map((l) => cells(l, 3)), ["<role>", "<need>", "<workaround>"])}

## 4. Scope
**In scope:**
${bullets(f.inScope) || "- <list>"}

**Out of scope:**
${bullets(f.outScope) || "- <list>"}

## 5. Requirements
${table(["ID", "Requirement", "Priority (Must / Should / Could)", "Notes"], reqs, ["R1", "<the system shall ...>", "Must", ""])}

## 6. User flow
${f.flow.trim() || "Describe or link the happy path and the main failure paths."}

## 7. Edge cases and error handling
${table(["Situation", "Expected behaviour", "Message shown"], lines(f.edge).map((l) => cells(l, 3)), ["<case>", "<behaviour>", "<text>"])}

## 8. Success metrics
${table(["Metric", "Baseline", "Target", "How measured"], lines(f.metrics).map((l) => cells(l, 4)), ["<metric>", "<now>", "<goal>", "<source>"])}

## 9. Dependencies and risks
${table(["Item", "Owner", "Impact if late", "Mitigation"], lines(f.risks).map((l) => cells(l, 4)), ["", "", "", ""])}

## 10. Rollout
${f.rollout.trim() || "Phasing, feature flags, pilot group, rollback plan, support readiness."}

## 11. Open questions
${lines(f.questions).map((l) => `- [ ] ${l}`).join("\n") || "- [ ] <question> (owner, due date)"}
`;
}

export default function PrdBuilder() {
  const [f, setF] = useState<F>(empty);
  const md = useMemo(() => toMarkdown(f), [f]);
  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  const download = () => {
    const url = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url; a.download = `${(f.title || "prd").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "prd"}.md`;
    a.click(); URL.revokeObjectURL(url);
  };

  const field = "mt-1 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]";
  const Txt = ({ k, label, hint, rows = 3 }: { k: keyof F; label: string; hint?: string; rows?: number }) => (
    <div>
      <label htmlFor={`f-${k}`} className="text-sm font-medium">{label}</label>
      {hint && <p id={`h-${k}`} className="text-xs text-[var(--muted)]">{hint}</p>}
      <textarea id={`f-${k}`} aria-describedby={hint ? `h-${k}` : undefined} value={f[k]} onChange={set(k)} rows={rows} className={field} />
    </div>
  );
  const btn = "rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4" aria-label="PRD builder">
        <div className="flex flex-wrap gap-3">
          <button type="button" className={btn} onClick={() => setF(example)}>Load an example</button>
          <button type="button" className={btn} onClick={() => setF(empty)}>Clear</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2"><label htmlFor="f-title" className="text-sm font-medium">Feature name</label><input id="f-title" value={f.title} onChange={set("title")} className={field} /></div>
          <div><label htmlFor="f-status" className="text-sm font-medium">Status</label><select id="f-status" value={f.status} onChange={set("status")} className={`${field} bg-[var(--paper)]`}>{["Draft", "In review", "Approved"].map((s) => <option key={s}>{s}</option>)}</select></div>
        </div>
        <div><label htmlFor="f-owner" className="text-sm font-medium">Owner</label><input id="f-owner" value={f.owner} onChange={set("owner")} className={field} /></div>
        <Txt k="problem" label="1. Problem" hint="What is going wrong today, for whom, and how do you know?" />
        <Txt k="goals" label="2a. Goals" hint="One per line. Make each measurable." />
        <Txt k="nonGoals" label="2b. Non-goals" hint="One per line." rows={2} />
        <Txt k="users" label="3. Users" hint="One per line: user type | need | today's workaround" />
        <Txt k="inScope" label="4a. In scope" hint="One per line." rows={2} />
        <Txt k="outScope" label="4b. Out of scope" hint="One per line." rows={2} />
        <Txt k="requirements" label="5. Requirements" hint="One per line: requirement | Must, Should or Could | notes" rows={4} />
        <Txt k="flow" label="6. User flow" hint="The happy path and the main failure paths." />
        <Txt k="edge" label="7. Edge cases" hint="One per line: situation | expected behaviour | message shown" />
        <Txt k="metrics" label="8. Success metrics" hint="One per line: metric | baseline | target | how measured" />
        <Txt k="risks" label="9. Dependencies and risks" hint="One per line: item | owner | impact if late | mitigation" />
        <Txt k="rollout" label="10. Rollout" hint="Phasing, flags, pilot group, rollback, support readiness." />
        <Txt k="questions" label="11. Open questions" hint="One per line." rows={2} />
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="serif text-xl font-semibold">Your PRD (markdown)</h2>
          <div className="flex gap-2"><CopyButton text={md} label="Copy markdown" /><button onClick={download} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs hover:border-[var(--accent)]">Download .md</button></div>
        </div>
        <pre tabIndex={0} aria-label="Markdown preview" className="mt-3 max-h-[70vh] overflow-auto whitespace-pre-wrap rounded-2xl border border-[var(--line)] p-4 text-xs leading-relaxed">{md}</pre>
        <p className="mt-3 text-xs text-[var(--muted)]">Everything stays in your browser. Nothing is saved or sent, so copy or download before you leave.</p>
      </div>
    </div>
  );
}
