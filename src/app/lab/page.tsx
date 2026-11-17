import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { ThreeLanes, ErrorTranslator, Lifecycle, SettlementTimeline } from "@/components/Lab";
import SqlPractice from "@/components/SqlPractice";
import ReconPlayground from "@/components/ReconPlayground";

export const metadata: Metadata = {
  title: "Product lab | Abhishek Singla",
  description: "Interactive tools from payments product work: a roadmap lane checker, an error-code translator, a transaction lifecycle stepper, a settlement timeline, a reconciliation playground and SQL practice.",
  alternates: { canonical: "/lab" },
  openGraph: { images: [{ url: "/og-lab.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/og-lab.png"] },
};

const tools = [
  { id: "lanes", title: "Three Lanes roadmap check", intro: "Drop roadmap items into failure prevention, failure transparency and growth, and see which lane is starved.", C: ThreeLanes },
  { id: "errors", title: "Error-code translator", intro: "The error-dictionary project made hands-on.", C: ErrorTranslator },
  { id: "lifecycle", title: "Transaction lifecycle", intro: "Step through a Bharat Connect payment, including the pending path and status checks.", C: Lifecycle },
  { id: "settlement", title: "Settlement timeline", intro: "How settlement cycles through the day, and what each cycle does.", C: SettlementTimeline },
  { id: "recon", title: "Reconciliation playground", intro: "Find duplicates, missing settlements and amount mismatches between two files, in your browser.", C: ReconPlayground },
  { id: "sql", title: "Payments SQL practice", intro: "Graded SQL questions on a synthetic payments database, with solutions you can reveal.", C: SqlPractice },
];

export default function Lab() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Product lab</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Tools for thinking about payments product</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">Small interactive pieces from my work on Bharat Connect. Nothing here stores or sends your input.</p>
        <nav aria-label="Tools" className="mt-6 flex flex-wrap gap-3 text-sm">
          {tools.map((t) => <a key={t.id} href={`#${t.id}`} className="rounded-full border border-[var(--line)] px-4 py-1.5 hover:border-[var(--accent)]">{t.title}</a>)}
        </nav>
        <div className="mt-12 space-y-16">
          {tools.map(({ id, title, intro, C }) => (
            <section key={id} id={id} className="scroll-mt-24">
              <h2 className="serif text-2xl font-semibold">{title}</h2>
              <p className="mb-5 mt-1 text-sm text-[var(--muted)]">{intro}</p>
              <C />
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
