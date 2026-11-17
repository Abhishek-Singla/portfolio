import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { ReadingTime } from "@/components/PageMeta";
import { SettlementHistory } from "@/components/Explainers";
import { settlementHistory, restrictedExplainersLive } from "@/data";

export const metadata: Metadata = {
  title: "From one settlement a day to ten | Abhishek Singla",
  description: "How Bharat Connect settlement moved from one cycle a day in 2017 to ten in 2026, and what it changes for billers and reconciliation.",
  alternates: { canonical: "/settlement-history" },
};

export default function Page() {
  if (!restrictedExplainersLive) notFound();
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Settlement history</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">One settlement a day in 2017. Ten a day in 2026.</h1>
        <p className="mt-4 text-[var(--muted)]">{settlementHistory.intro}</p>
        <ReadingTime content={settlementHistory} className="mt-3" />

        <section className="mt-10" aria-labelledby="timeline">
          <h2 id="timeline" className="serif mb-4 text-2xl font-semibold">The timeline</h2>
          <SettlementHistory />
        </section>

        <section className="mt-12">
          <h2 className="serif text-2xl font-semibold">Why NPCI keeps adding cycles</h2>
          <p className="mt-3 text-[var(--muted)]">{settlementHistory.why}</p>
        </section>

        <section className="mt-12">
          <h2 className="serif text-2xl font-semibold">What that changes in practice</h2>
          <ol className="mt-4 space-y-4">
            {settlementHistory.changes.map(([t, d], n) => (
              <li key={t} className="flex gap-4 rounded-2xl border border-[var(--line)] p-5">
                <span className="serif text-2xl text-[var(--accent)]">{n + 1}</span>
                <div><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-[var(--muted)]">{d}</p></div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[var(--muted)]">If your reconciliation job still assumes one file a day, ten cycles will find it.</p>
        </section>

        <p className="mt-10 rounded-2xl bg-[var(--line)]/40 p-4 text-sm text-[var(--muted)]">{settlementHistory.caveat}</p>
      </main>
      <Footer />
    </>
  );
}
