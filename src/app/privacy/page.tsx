import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { profile } from "@/data";

export const metadata: Metadata = {
  title: "Privacy | Abhishek Singla",
  description: "What this site collects, and what it does not.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const items: [string, string][] = [
  ["Analytics", "The site uses Vercel Web Analytics to count page views. It does not use advertising trackers and does not set cookies for tracking."],
  ["Contact form", "If you send a message, your name, email address and message are emailed to me through a mail-delivery service. I use them only to reply."],
  ["Newsletter", "If a sign-up form is shown and you subscribe, your email address is stored with the mail-delivery service so I can send you updates. You can ask me to remove it at any time."],
  ["Ask about my work", "If the assistant is switched on and you ask a question, the question text is sent to an AI provider to produce an answer. Please do not include personal or confidential information."],
  ["Theme setting", "Your light or dark choice is saved in your own browser so it persists between visits. It is not sent anywhere."],
  ["Resume downloads", "The resume PDFs contain my own contact details. Downloading them is not tracked individually."],
];

export default function Privacy() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Privacy</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">What this site collects</h1>
        <p className="mt-4 text-[var(--muted)]">Short version: very little, and nothing is sold.</p>
        <dl className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {items.map(([t, d]) => (
            <div key={t} className="py-5">
              <dt className="serif text-xl font-semibold">{t}</dt>
              <dd className="mt-2 text-[var(--muted)]">{d}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm text-[var(--muted)]">Questions or removal requests: <a className="text-[var(--accent)] hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a>.</p>
      </main>
      <Footer />
    </>
  );
}
