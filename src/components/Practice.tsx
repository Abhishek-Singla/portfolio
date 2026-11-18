"use client";
import { useEffect, useMemo, useState } from "react";
import { quiz } from "@/content/quiz";
import { glossary } from "@/data";

const btn = "rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)] disabled:opacity-50";

/* ---------------- Quiz ---------------- */
export function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<string[]>([]);
  const done = i >= quiz.length;
  const q = quiz[Math.min(i, quiz.length - 1)];

  const choose = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    if (n === q.answer) setScore((s) => s + 1);
    else setMissed((m) => (m.includes(q.chapter) ? m : [...m, q.chapter]));
  };
  const next = () => { setPicked(null); setI((n) => n + 1); };
  const restart = () => { setI(0); setPicked(null); setScore(0); setMissed([]); };

  if (done) {
    return (
      <div className="rounded-3xl border border-[var(--line)] p-6 sm:p-8" role="status">
        <p className="text-sm text-[var(--muted)]">Your score</p>
        <p className="serif text-5xl font-semibold text-[var(--accent)]">{score} <span className="text-2xl text-[var(--muted)]">of {quiz.length}</span></p>
        <p className="mt-3 text-[var(--muted)]">
          {score === quiz.length ? "A perfect round." : score >= quiz.length * 0.7 ? "Solid. A few details left to firm up." : "A good start. The chapters below will help."}
        </p>
        {missed.length > 0 && (
          <div className="mt-5">
            <p className="text-sm font-medium">Review these chapters</p>
            <ul className="mt-2 flex flex-wrap gap-2">{missed.map((c) => <li key={c}><a className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--accent)] hover:border-[var(--accent)]" href={`/learn/${c}`}>{c.replace(/-/g, " ")}</a></li>)}</ul>
          </div>
        )}
        <div className="mt-6 flex gap-3"><button onClick={restart} className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90">Try again</button><a href="/flashcards" className={btn}>Practise the glossary</a></div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[var(--line)] p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm text-[var(--muted)]">
        <span>Question {i + 1} of {quiz.length}</span><span>Score {score}</span>
      </div>
      <div className="mt-2 flex gap-1" aria-hidden>{quiz.map((_, n) => <span key={n} className={`h-1.5 flex-1 rounded ${n < i ? "bg-[var(--accent)]" : n === i ? "bg-[var(--accent)]/50" : "bg-[var(--line)]"}`} />)}</div>
      <fieldset className="mt-6">
        <legend className="serif text-xl font-semibold leading-snug">{q.q}</legend>
        <div className="mt-4 space-y-2">
          {q.options.map((o, n) => {
            const state = picked === null ? "" : n === q.answer ? "border-[var(--accent)] bg-[var(--accent)]/10" : n === picked ? "border-[var(--muted)] opacity-70" : "opacity-60";
            return (
              <label key={o} className={`flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--line)] p-4 text-sm ${state} ${picked === null ? "hover:border-[var(--accent)]" : "cursor-default"}`}>
                <input type="radio" name={`q${i}`} className="mt-1" checked={picked === n} onChange={() => choose(n)} disabled={picked !== null} />
                <span>{o}{picked !== null && n === q.answer && <strong className="ml-2 text-[var(--accent)]">Correct</strong>}{picked === n && n !== q.answer && <strong className="ml-2">Your answer</strong>}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <div role="status" aria-live="polite" className="mt-4 min-h-[4rem]">
        {picked !== null && (
          <div className="rounded-2xl bg-[var(--line)]/40 p-4 text-sm">
            <p className="font-semibold">{picked === q.answer ? "Right." : "Not quite."}</p>
            <p className="mt-1 text-[var(--muted)]">{q.why}</p>
            <p className="mt-2"><a className="text-[var(--accent)] hover:underline" href={`/learn/${q.chapter}`}>Read the chapter</a></p>
          </div>
        )}
      </div>
      <button onClick={next} disabled={picked === null} className="mt-2 rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)] disabled:opacity-40">{i === quiz.length - 1 ? "See my score" : "Next question"}</button>
    </div>
  );
}

/* ---------------- Flashcards ---------------- */
const KEY = "flashcards-known";

export function Flashcards() {
  const terms = useMemo(() => glossary.map(([t, d]) => ({ t, d })), []);
  const [known, setKnown] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [onlyReview, setOnlyReview] = useState(false);

  // The set of known terms is remembered in this browser only, as a convenience.
  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setKnown(JSON.parse(s)); } catch {} }, []);
  const save = (k: string[]) => { setKnown(k); try { localStorage.setItem(KEY, JSON.stringify(k)); } catch {} };

  const deck = onlyReview ? terms.filter((x) => !known.includes(x.t)) : terms;
  const card = deck[Math.min(idx, Math.max(deck.length - 1, 0))];
  const go = (n: number) => { setFlipped(false); setIdx((i) => Math.max(0, Math.min(deck.length - 1, i + n))); };
  const mark = (isKnown: boolean) => {
    if (!card) return;
    save(isKnown ? (known.includes(card.t) ? known : [...known, card.t]) : known.filter((k) => k !== card.t));
    if (!onlyReview) go(1); else { setFlipped(false); setIdx((i) => Math.min(i, Math.max(deck.length - 2, 0))); }
  };

  if (!card) {
    return (
      <div className="rounded-3xl border border-[var(--line)] p-8 text-center" role="status">
        <p className="serif text-2xl font-semibold">You know all {terms.length} terms.</p>
        <button className={`${btn} mt-4`} onClick={() => { save([]); setOnlyReview(false); setIdx(0); }}>Start over</button>
      </div>
    );
  }
  return (
    <div className="rounded-3xl border border-[var(--line)] p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--muted)]">
        <span>Card {Math.min(idx, deck.length - 1) + 1} of {deck.length} · {known.length} of {terms.length} known</span>
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={onlyReview} onChange={(e) => { setOnlyReview(e.target.checked); setIdx(0); setFlipped(false); }} /> Review only the ones I don&apos;t know</label>
      </div>
      <button
        onClick={() => setFlipped((f) => !f)} aria-pressed={flipped}
        className="mt-5 flex min-h-[14rem] w-full flex-col items-center justify-center rounded-3xl border border-[var(--line)] p-6 text-center transition hover:border-[var(--accent)]"
      >
        {flipped ? (
          <><span className="text-xs uppercase tracking-[0.14em] text-[var(--accent)]">Meaning</span><span className="mt-3 max-w-xl text-base leading-relaxed">{card.d}</span></>
        ) : (
          <><span className="text-xs uppercase tracking-[0.14em] text-[var(--accent)]">Term</span><span className="serif mt-3 text-3xl font-semibold">{card.t}</span><span className="mt-4 text-xs text-[var(--muted)]">Click or press Space to flip</span></>
        )}
      </button>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2"><button className={btn} onClick={() => go(-1)} disabled={idx === 0}>Previous</button><button className={btn} onClick={() => go(1)} disabled={idx >= deck.length - 1}>Next</button></div>
        <div className="flex gap-2"><button className={btn} onClick={() => mark(false)}>Still learning</button><button className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90" onClick={() => mark(true)}>I know it</button></div>
      </div>
      <p className="mt-4 text-xs text-[var(--muted)]">Your progress is saved in this browser only. <button className="underline" onClick={() => { save([]); setIdx(0); setFlipped(false); }}>Reset progress</button></p>
    </div>
  );
}
