"use client";
import { useEffect, useState } from "react";

const examples = [
  "What did Abhishek do to reduce support tickets?",
  "What is a BOU?",
  "Which projects has he built on GitHub?",
  "What kind of roles is he looking for?",
];

export default function AskWidget() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/ask").then((r) => r.json()).then((d) => setEnabled(Boolean(d.enabled))).catch(() => setEnabled(false));
  }, []);

  const ask = async (text: string) => {
    const question = text.trim();
    if (question.length < 3 || busy) return;
    setBusy(true); setError(""); setAnswer("");
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) });
      const data = await res.json();
      if (res.ok) setAnswer(data.answer);
      else if (res.status === 429) setError("Too many questions for now. Please try again later, or email Abhishek.");
      else if (res.status === 503) setError("The assistant is not switched on yet.");
      else setError("Something went wrong. Please try again, or email Abhishek.");
    } catch {
      setError("Could not reach the assistant. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (enabled === null) return <p className="text-sm text-[var(--muted)]">Checking whether the assistant is available…</p>;
  if (!enabled) {
    return (
      <p className="rounded-2xl border border-[var(--line)] p-5 text-sm text-[var(--muted)]">
        The assistant is not switched on yet. In the meantime, the <a href="/#contact" className="text-[var(--accent)] hover:underline">contact options</a> and the <a href="/glossary" className="text-[var(--accent)] hover:underline">glossary</a> can answer most questions.
      </p>
    );
  }
  return (
    <div className="rounded-3xl border border-[var(--line)] p-5 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {examples.map((e) => (
          <button key={e} onClick={() => { setQ(e); ask(e); }} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs hover:border-[var(--accent)]">{e}</button>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); ask(q); }} className="mt-5 flex flex-wrap gap-3">
        <label htmlFor="ask-q" className="sr-only">Your question</label>
        <input id="ask-q" value={q} onChange={(e) => setQ(e.target.value)} maxLength={300} placeholder="Ask about the work, projects or Bharat Connect"
          className="min-w-[14rem] flex-1 rounded-xl border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" />
        <button disabled={busy} className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">{busy ? "Thinking…" : "Ask"}</button>
      </form>
      <div role="status" aria-live="polite" className="mt-5 min-h-[3rem]">
        {answer && <p className="whitespace-pre-wrap text-[var(--ink)]">{answer}</p>}
        {error && <p className="text-[var(--accent)]">{error}</p>}
      </div>
      <p className="mt-4 text-xs text-[var(--muted)]">
        Answers are AI-generated from this site&apos;s content and can be wrong. Your question is sent to an AI provider; please don&apos;t include personal information. See <a href="/privacy" className="underline">privacy</a>.
      </p>
    </div>
  );
}
