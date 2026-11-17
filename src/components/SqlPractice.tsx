import { sqlPractice } from "@/data";

export default function SqlPractice() {
  const base = `https://github.com/Abhishek-Singla/${sqlPractice.repo}`;
  return (
    <div className="rounded-3xl border border-[var(--line)] p-5 sm:p-8">
      <p className="text-sm text-[var(--muted)]">{sqlPractice.intro}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {sqlPractice.levels.map(([level, qs]) => (
          <div key={level} className="rounded-2xl border border-[var(--line)] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">{level}</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-[var(--muted)]">{qs.map((q) => <li key={q}>{q}</li>)}</ul>
          </div>
        ))}
      </div>
      <h3 className="mt-8 font-semibold">Four to try</h3>
      <div className="mt-3 space-y-3">
        {sqlPractice.questions.map((q) => (
          <details key={q.n} className="group rounded-2xl border border-[var(--line)] p-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
              <span><span className="text-[var(--accent)]">Q{q.n}.</span> {q.q}<span className="mt-1 block text-xs text-[var(--muted)]">{q.skills}</span></span>
              <span className="shrink-0 text-sm text-[var(--accent)] group-open:hidden">Show solution</span>
              <span className="hidden shrink-0 text-sm text-[var(--accent)] group-open:inline">Hide</span>
            </summary>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-[var(--ink)] p-4 text-xs leading-relaxed text-[var(--paper)]" tabIndex={0}><code>{q.sql}</code></pre>
            <p className="mt-3 text-sm text-[var(--muted)]">{q.note}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-sm">
        <a href={base} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline">Get the database, all 13 questions and tested solutions on GitHub →</a>
      </p>
    </div>
  );
}
