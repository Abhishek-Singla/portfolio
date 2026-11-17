"use client";
import { useEffect, useState } from "react";

// Renders only when the server reports that sign-ups are configured.
export default function Subscribe() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    fetch("/api/subscribe").then((r) => r.json()).then((d) => setEnabled(Boolean(d.enabled))).catch(() => setEnabled(false));
  }, []);
  if (!enabled) return null;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="mt-12 rounded-3xl border border-[var(--line)] p-6 sm:p-8">
      <h3 className="serif text-xl font-semibold">Get new notes by email</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">Occasional notes on Bharat Connect and payments product work. No spam, unsubscribe any time.</p>
      {state === "done" ? (
        <p role="status" className="mt-4 text-sm">Thanks. You are on the list.</p>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-wrap gap-3">
          <label htmlFor="sub-email" className="sr-only">Email address</label>
          <input id="sub-email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com"
            className="min-w-[14rem] flex-1 rounded-xl border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" />
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><input name="website" tabIndex={-1} autoComplete="off" /></div>
          <button disabled={state === "sending"} className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">Subscribe</button>
        </form>
      )}
      <p role="status" aria-live="polite" className="mt-2 text-sm text-[var(--accent)]">{state === "error" && "Could not subscribe. Please try again."}</p>
      <p className="mt-2 text-xs text-[var(--muted)]">See <a href="/privacy" className="underline">privacy</a>.</p>
    </div>
  );
}
