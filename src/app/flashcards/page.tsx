import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { Flashcards } from "@/components/Practice";

export const metadata: Metadata = {
  title: "Glossary flashcards | Abhishek Singla",
  description: "Flip through 20 Bharat Connect terms, mark the ones you know, and review the rest.",
  alternates: { canonical: "/flashcards" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Flashcards</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Learn the terms</h1>
        <p className="mt-4 text-[var(--muted)]">The same 20 terms as the <a className="text-[var(--accent)] hover:underline" href="/glossary">glossary</a>. Flip a card, mark whether you know it, and switch to reviewing only the ones you don&apos;t.</p>
        <div className="mt-8"><Flashcards /></div>
        <p className="mt-6 text-sm text-[var(--muted)]">Ready to test yourself? Try the <a className="text-[var(--accent)] hover:underline" href="/quiz">quiz</a>.</p>
      </main>
      <Footer />
    </>
  );
}
