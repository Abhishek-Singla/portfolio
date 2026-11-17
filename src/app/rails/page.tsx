import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { ReadingTime } from "@/components/PageMeta";
import { rails } from "@/data";

export const metadata: Metadata = {
  title: "NEFT vs RTGS vs IMPS vs UPI | Abhishek Singla",
  description: "How India's four main bank-transfer rails are built, in plain language, and which one fits which job.",
  alternates: { canonical: "/rails" },
  openGraph: { images: [{ url: "/og-rails.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/og-rails.png"] },
};

export default function Rails() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Payment rails</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">NEFT, RTGS, IMPS and UPI</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">{rails.intro}</p>
        <ReadingTime content={rails} className="mt-3" />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {rails.rows.map((r) => (
            <article key={r.name} className="rounded-3xl border border-[var(--line)] p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="serif text-2xl font-semibold">{r.name}</h2>
                <span className="text-sm text-[var(--muted)]">Run by {r.operator}</span>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <div><dt className="font-semibold">How it settles</dt><dd className="text-[var(--muted)]">{r.model}</dd></div>
                <div><dt className="font-semibold">What it feels like</dt><dd className="text-[var(--muted)]">{r.feel}</dd></div>
                <div><dt className="font-semibold">Best for</dt><dd className="text-[var(--muted)]">{r.best}</dd></div>
                <div><dt className="font-semibold">Under the hood</dt><dd className="text-[var(--muted)]">{r.architecture}</dd></div>
              </dl>
            </article>
          ))}
        </div>

        <section className="mt-14" aria-labelledby="chooser">
          <h2 id="chooser" className="serif text-2xl font-semibold">Which rail for which job?</h2>
          <ul className="mt-4 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)]">
            {rails.chooser.map(([need, pick]) => (
              <li key={need} className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 text-sm">
                <span>{need}</span>
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 font-medium text-[var(--accent)]">{pick}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="serif text-2xl font-semibold">Where Bharat Connect fits</h2>
          <p className="mt-3 text-[var(--muted)]">{rails.bharatConnect}</p>
          <p className="mt-3 text-sm"><a href="/lab#lifecycle" className="text-[var(--accent)] hover:underline">Step through a Bharat Connect payment →</a></p>
        </section>

        <p className="mt-12 rounded-2xl bg-[var(--line)]/40 p-4 text-sm text-[var(--muted)]">{rails.caveat}</p>
      </main>
      <Footer />
    </>
  );
}
