import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { Quiz } from "@/components/Practice";
import { quiz } from "@/content/quiz";

export const metadata: Metadata = {
  title: "Bharat Connect quiz | Abhishek Singla",
  description: `${quiz.length} questions on how Bharat Connect (BBPS) works, with an explanation after each answer and a link to the chapter.`,
  alternates: { canonical: "/quiz" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Quiz</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">How well do you know Bharat Connect?</h1>
        <p className="mt-4 text-[var(--muted)]">{quiz.length} questions drawn from the <a className="text-[var(--accent)] hover:underline" href="/learn">Learn chapters</a>. After each answer you get the reason and a link to read more. Nothing is stored or sent.</p>
        <div className="mt-8"><Quiz /></div>
      </main>
      <Footer />
    </>
  );
}
