"use client";
import { useRef, useState } from "react";
import { profile } from "@/data";

type State = "idle" | "sending" | "sent" | "fallback" | "error";
const field = "mt-1 w-full rounded-xl border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--accent)]";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const started = useRef(Date.now());

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ts: started.current }),
      });
      if (res.ok) { setState("sent"); form.reset(); return; }
      if (res.status === 503) {
        // Server-side email is not configured: open the visitor's email app instead.
        const body = `${data.message}\n\n${data.name} (${data.email})`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(data.subject || "Hello")}&body=${encodeURIComponent(body)}`;
        setState("fallback");
        return;
      }
      setState("error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") return <p role="status" className="rounded-2xl bg-[var(--accent)]/10 p-5 text-sm">Thank you. Your message was sent, and Abhishek will reply by email.</p>;

  return (
    <form onSubmit={submit} className="mx-auto mt-10 max-w-xl space-y-4 text-left" aria-label="Send a message">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Name<input name="name" required maxLength={100} autoComplete="name" className={field} /></label>
        <label className="text-sm font-medium">Email<input name="email" type="email" required maxLength={200} autoComplete="email" className={field} /></label>
      </div>
      <label className="block text-sm font-medium">Subject<input name="subject" maxLength={150} className={field} /></label>
      <label className="block text-sm font-medium">Message<textarea name="message" required minLength={10} maxLength={3000} rows={5} className={field} /></label>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button disabled={state === "sending"} className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <span role="status" aria-live="polite" className="text-sm text-[var(--muted)]">
          {state === "fallback" && "Opening your email app instead."}
          {state === "error" && "Could not send. Please try again or email directly."}
        </span>
      </div>
      <p className="text-xs text-[var(--muted)]">Your details are used only to reply. See <a href="/privacy" className="underline">privacy</a>.</p>
    </form>
  );
}
