import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import PrdBuilder from "@/components/PrdBuilder";

export const metadata: Metadata = {
  title: "PRD builder | Abhishek Singla",
  description: "Answer a few prompts and get a draft product requirements document in markdown, following a clear 11-section structure.",
  alternates: { canonical: "/prd-builder" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">PRD builder</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Draft a PRD in a few minutes</h1>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          Fill in the prompts and the markdown on the right updates as you type. It follows the structure of my{" "}
          <a className="text-[var(--accent)] hover:underline" href="/templates/prd.md">PRD template</a>: problem first, solution last, and no scope without a success metric.
          Load the example to see a finished one.
        </p>
        <div className="mt-10"><PrdBuilder /></div>
      </main>
      <Footer />
    </>
  );
}
