import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { profile, corrections } from "@/data";

export const metadata: Metadata = {
  title: "Corrections | Abhishek Singla",
  description: "How to report a mistake on this site, and a public log of corrections.",
  alternates: { canonical: "/corrections" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Corrections</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Found a mistake? Please tell me.</h1>
        <p className="mt-4 text-[var(--muted)]">
          The Learn notes, the watch feed and the explainers are written to help people understand Bharat Connect and payments. They are my own explanations, not official documentation, and official documents always win.
        </p>

        <section className="mt-10" aria-labelledby="how">
          <h2 id="how" className="serif text-2xl font-semibold">How to report one</h2>
          <ul className="mt-4 space-y-3 text-[var(--muted)]">
            <li>Email <a className="text-[var(--accent)] hover:underline" href={`mailto:${profile.email}?subject=${encodeURIComponent("Correction")}`}>{profile.email}</a> with the page, what is wrong, and a link to the official source if you have one.</li>
            <li>For the Learn notes you can also <a className="text-[var(--accent)] hover:underline" href="https://github.com/Abhishek-Singla/bbps-explained/issues" target="_blank" rel="noreferrer">open an issue on GitHub</a>.</li>
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="policy">
          <h2 id="policy" className="serif text-2xl font-semibold">What I do with a report</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>Check it against the official source, and fix the page if you are right.</li>
            <li>Record the change below, with the date, so the fix is visible and not silent.</li>
            <li>Update the &ldquo;last updated&rdquo; date on the page.</li>
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="log">
          <h2 id="log" className="serif text-2xl font-semibold">Corrections log</h2>
          {corrections.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-[var(--line)] p-5 text-sm text-[var(--muted)]">No corrections yet. When there is one, it will be listed here.</p>
          ) : (
            <ol className="mt-4 space-y-4">
              {corrections.map((c) => (
                <li key={c.when + c.page} className="rounded-2xl border border-[var(--line)] p-5 text-sm">
                  <p className="text-[var(--muted)]">{c.when} · <a className="text-[var(--accent)] hover:underline" href={c.page}>{c.page}</a></p>
                  <p className="mt-1">{c.change}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
