import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { ReadingTime } from "@/components/PageMeta";
import { BillerJourneys } from "@/components/Explainers";
import { billerJourneys, restrictedExplainersLive } from "@/data";

export const metadata: Metadata = {
  title: "Six payment journeys hiding in Bharat Connect billers | Abhishek Singla",
  description: "How a few master-data settings decide a biller's payment journey on Bharat Connect, with an interactive picker.",
  alternates: { canonical: "/billers" },
};

export default function Billers() {
  if (!restrictedExplainersLive) notFound();
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Biller types</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Six payment journeys hiding in biller settings</h1>
        <p className="mt-4 text-[var(--muted)]">{billerJourneys.intro}</p>
        <ReadingTime content={billerJourneys} className="mt-3" />

        <section className="mt-10" aria-labelledby="settings">
          <h2 id="settings" className="serif text-2xl font-semibold">The four settings</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {billerJourneys.settings.map(([k, v]) => <div key={k} className="rounded-2xl border border-[var(--line)] p-4"><dt className="font-semibold">{k}</dt><dd className="mt-1 text-sm text-[var(--muted)]">{v}</dd></div>)}
          </dl>
        </section>

        <section className="mt-12" aria-labelledby="picker">
          <h2 id="picker" className="serif mb-4 text-2xl font-semibold">Try it</h2>
          <BillerJourneys />
        </section>

        <section className="mt-12">
          <h2 className="serif text-2xl font-semibold">Why it matters</h2>
          <p className="mt-3 text-[var(--muted)]">{billerJourneys.why}</p>
        </section>

        <p className="mt-10 rounded-2xl bg-[var(--line)]/40 p-4 text-sm text-[var(--muted)]">
          A simplified view for learning, based on my own notes. It is not official documentation: use the NBBL specifications and your operating unit&apos;s configuration for real behaviour.
        </p>
      </main>
      <Footer />
    </>
  );
}
