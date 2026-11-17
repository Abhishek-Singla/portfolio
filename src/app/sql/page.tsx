import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import SqlPlayground from "@/components/SqlPlayground";

export const metadata: Metadata = {
  title: "Payments SQL playground | Abhishek Singla",
  description: "Run real SQL against a synthetic payments database in your browser, with 13 graded questions and tested solutions.",
  alternates: { canonical: "/sql" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-5xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">SQL playground</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Query a payments database, right here</h1>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          5,000 synthetic payments, 12 billers, settlements and complaints, with problems planted on purpose: one flaky biller, unsettled payments and a few wrong settlement amounts.
          Pick one of the 13 questions from my <a className="text-[var(--accent)] hover:underline" href="https://github.com/Abhishek-Singla/payments-sql-practice" target="_blank" rel="noreferrer">payments-sql-practice</a> repository, write the query, and check it against the solution.
        </p>
        <div className="mt-8"><SqlPlayground /></div>
        <p className="mt-8 text-sm text-[var(--muted)]">
          Want the results as a picture? See the <a className="text-[var(--accent)] hover:underline" href="/dashboard">payments dashboard demo</a>, built from this same data.
        </p>
      </main>
      <Footer />
    </>
  );
}
