import type { Metadata } from "next";
import { Github } from "lucide-react";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { ReadingTime } from "@/components/PageMeta";

export const metadata: Metadata = {
  title: "How I use AI as a product manager | Abhishek Singla",
  description: "The AI workflows I use in payments product work, and the rules that keep them honest: a named human owner, checks against source files, and no invented claims.",
  alternates: { canonical: "/ai" },
};

const uses: [string, string][] = [
  ["Agentic workflows for BBPS operations", "A chained workflow for daily file download, merge, verification, alerts and a morning exception digest, turning recurring daily checks into one routine."],
  ["Product delivery drafting", "Prompts and templates draft user stories with acceptance criteria and edge cases, and BRDs, PRDs and release notes from Jira tickets. They also generate UAT test cases and test data for biller fetch and pay flows."],
  ["Ops and strategy work", "Drafting product requirements, documentation and analyses for daily catch-up and reconciliation routines, payment-rail architecture comparisons, and offline biller onboarding (master data, JSON, templates, configuration and UAT)."],
  ["A knowledge base of BBPS rules", "NPCI and RBI requirements, fee slabs, onboarding steps and past decisions, plus a summary of each weekly NPCI master-data release and its impact on our billers, to support product decisions."],
  ["Data and KPI work", "SQL drafting and review, success and failure trends by biller, error-code summaries and fee-slab scenario checks in Excel."],
];

const rules: [string, string][] = [
  ["Every AI draft has a named human owner", "Nothing is used until a person owns it and has checked it against the source files."],
  ["Tailoring selects and reorders; it never invents", "Every claim must already exist in the source document. The rule that keeps a tailored resume honest is the same one that keeps an AI-drafted PRD honest."],
  ["Drafts stop at drafts", "A human sends every application and message. Automation prepares; it does not speak for me."],
  ["Skip, don't destroy", "If an input is missing, skip that step and say so. Never delete the last good output."],
  ["Scan before you publish", "Anything copied to a public place passes an automated secret and path check first."],
  ["Test against a known answer", "Plant the problems, record them, and pass only if exactly those are found. Verify independently, and never drop anything silently."],
  ["Leave evidence", "Every automated step leaves a small file or log line that a person or another job can check. A failed check leaves a visible marker."],
];

const repos: [string, string, string][] = [
  ["claude-code-windows-patterns", "Four reusable patterns for recurring, Claude-assisted work: a routine mirror, temporary tasks for CLI logins, rebuilding only when inputs change, and verification markers.", "claude-code-windows-patterns"],
  ["job-hunt-toolkit", "A fit-scoring rubric, a ledger schema and a check that a short resume only contains lines from the full master.", "job-hunt-toolkit"],
  ["reconciliation-demo", "Merge, de-duplicate, verify independently and reconcile, tested against injected problems.", "reconciliation-demo"],
  ["linkedin-activity-audit", "A Claude skill that audits a LinkedIn account. Read-only by default, and it shows what will be affected before any change you ask for.", "linkedin-activity-audit"],
];

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">AI in product work</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">How I use AI as a product manager</h1>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          I use Claude, ChatGPT and Microsoft Copilot in daily payments product work. The tools are the easy part. What matters is the rules around them, so that speed never costs accuracy.
        </p>
        <ReadingTime content={[uses, rules, repos]} className="mt-3" />

        <section className="mt-12" aria-labelledby="uses">
          <h2 id="uses" className="serif text-2xl font-semibold">What I use it for</h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {uses.map(([t, d]) => <li key={t} className="rounded-2xl border border-[var(--line)] p-5"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm text-[var(--muted)]">{d}</p></li>)}
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="rules">
          <h2 id="rules" className="serif text-2xl font-semibold">The rules I work by</h2>
          <ol className="mt-4 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)]">
            {rules.map(([t, d], i) => (
              <li key={t} className="flex gap-4 px-5 py-4">
                <span className="serif text-2xl text-[var(--accent)]">{i + 1}</span>
                <div><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-[var(--muted)]">{d}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12" aria-labelledby="proof">
          <h2 id="proof" className="serif text-2xl font-semibold">Proof, in public</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">These rules are written down and tested in repositories you can read. All data in them is synthetic or generic.</p>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {repos.map(([n, d, r]) => (
              <li key={n}>
                <a href={`https://github.com/Abhishek-Singla/${r}`} target="_blank" rel="noreferrer" className="block h-full rounded-2xl border border-[var(--line)] p-5 hover:border-[var(--accent)]">
                  <p className="flex items-center gap-2 font-mono text-sm font-semibold"><Github size={15} className="text-[var(--accent)]" />{n}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{d}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-3xl bg-[var(--accent)]/10 p-6">
          <h2 className="serif text-xl font-semibold">On this site</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            The <a className="text-[var(--accent)] hover:underline" href="/ask">Ask assistant</a>, when it is switched on, answers only from this site&apos;s content and says so when it does not know. Try the{" "}
            <a className="text-[var(--accent)] hover:underline" href="/prd-builder">PRD builder</a> for the same discipline applied to requirements.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
