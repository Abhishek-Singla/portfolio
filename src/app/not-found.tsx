import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";

export const metadata: Metadata = { title: "Page not found | Abhishek Singla", robots: { index: false } };

const links: [string, string][] = [
  ["Home", "/"], ["Selected work", "/#work"], ["Product lab", "/lab"], ["Glossary", "/glossary"], ["Resume", "/resume"],
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Error 404</p>
        <h1 className="serif mt-4 text-5xl font-semibold sm:text-6xl">This payment did not go through.</h1>
        <p className="mx-auto mt-5 max-w-xl text-[var(--muted)]">
          The page you asked for could not be found. Nothing was charged. A plain-language message beats TXN_FAIL_PAGE_MISSING, so here is where to go next.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map(([t, h]) => (
            <li key={h}><a href={h} className="rounded-full border border-[var(--line)] px-5 py-2 text-sm hover:border-[var(--accent)]">{t}</a></li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-[var(--muted)]">Tip: press <kbd className="rounded border border-[var(--line)] px-1.5">/</kbd> to search the site.</p>
      </main>
      <Footer />
    </>
  );
}
