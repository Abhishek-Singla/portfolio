import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Payments dashboard demo | Abhishek Singla",
  description: "A product dashboard built on a synthetic payments database: failure rate by biller tier and channel, settlement lag and complaints per 1,000 transactions.",
  alternates: { canonical: "/dashboard" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-5xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Dashboard demo</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">A payments dashboard you can see, not just read about</h1>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          I built a KPI dashboard for product and engineering leadership to prioritise sprints. This is a public, synthetic version of the idea: the same questions, asked of made-up data.
          Every number comes from the database in the <a className="text-[var(--accent)] hover:underline" href="/sql">SQL playground</a>, so you can reproduce any of it with a query.
        </p>
        <p className="mt-3"><span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs">Synthetic data: 5,000 made-up payments over 90 days</span></p>
        <div className="mt-10"><Dashboard /></div>
        <p className="mt-10 text-sm text-[var(--muted)]">
          How it connects to the rest of the work: the four branches of my <a className="text-[var(--accent)] hover:underline" href="/#metrics">KPI tree</a> (delivery quality, reliability, support load, sentiment) and the{" "}
          <a className="text-[var(--accent)] hover:underline" href="/work/performance-dashboard">dashboard project deep-dive</a>. Data: the <code>payments-sql-practice</code> repository, seeded so everyone gets the same numbers.
        </p>
      </main>
      <Footer />
    </>
  );
}
