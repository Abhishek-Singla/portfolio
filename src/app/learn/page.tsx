import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { ReadingTime } from "@/components/PageMeta";
import { renderDoc } from "@/lib/learn";
import { learnDocs } from "@/lib/learn-index";

export const metadata: Metadata = {
  title: "Bharat Connect (BBPS) explained | Abhishek Singla",
  description: "Plain-language notes on how India's Bharat Bill Payment System works, written from a product manager's point of view and checked against RBI and NBBL sources.",
  alternates: { canonical: "/learn" },
};

export default function Learn() {
  const chapters = learnDocs.map((d, i) => ({ ...d, n: i + 1, doc: renderDoc(d.slug) }));
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Learn</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Bharat Connect (BBPS) explained</h1>
        <p className="mt-4 text-[var(--muted)]">
          Plain-language notes on how India&apos;s Bharat Bill Payment System works, written from a product manager&apos;s point of view and checked against the official sources listed in the{" "}
          <a className="text-[var(--accent)] hover:underline" href="/learn/sources">sources page</a>: the RBI&apos;s BBPS Directions, 2024 and NBBL&apos;s public website.
        </p>
        <p className="mt-4 rounded-2xl bg-[var(--line)]/40 p-4 text-sm text-[var(--muted)]">
          NBBL&apos;s website now uses both &ldquo;Bharat BillPay&rdquo; and &ldquo;Bharat Connect&rdquo; for the same service. Older documents and many systems still say BBPS, so all names appear here.
        </p>

        <ol className="mt-10 space-y-3">
          {chapters.map((c) => (
            <li key={c.slug}>
              <a href={`/learn/${c.slug}`} className="block rounded-2xl border border-[var(--line)] p-5 transition hover:border-[var(--accent)]">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="serif text-xl font-semibold"><span className="text-[var(--accent)]">{c.n}.</span> {c.doc.title}</h2>
                  <ReadingTime words={c.doc.words} />
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{c.blurb}</p>
              </a>
            </li>
          ))}
        </ol>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="serif text-xl font-semibold">How to read the notes</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
              <li>Statements marked with an RBI paragraph or attributed to NBBL&apos;s site come from those sources.</li>
              <li>Sections labelled &ldquo;practitioner notes&rdquo; or &ldquo;illustrative&rdquo; are my own explanations, not published rules.</li>
              <li>Where I could not find something in an official source, the notes say so instead of guessing.</li>
            </ul>
          </div>
          <div>
            <h2 className="serif text-xl font-semibold">What this is not</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
              <li>Not official documentation. For rules, message formats and timelines, use the RBI Directions and the specifications and operating guidelines issued by NBBL.</li>
              <li>Contains no data, designs, APIs or numbers from any employer, bank or client.</li>
            </ul>
          </div>
        </section>

        <p className="mt-10 text-sm text-[var(--muted)]">
          The notes live in a public repository, released under the MIT licence. Corrections are welcome through an issue:{" "}
          <a className="text-[var(--accent)] hover:underline" href="https://github.com/Abhishek-Singla/bbps-explained" target="_blank" rel="noreferrer">github.com/Abhishek-Singla/bbps-explained</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
