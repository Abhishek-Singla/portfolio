import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import AskWidget from "@/components/AskWidget";

export const metadata: Metadata = {
  title: "Ask about my work | Abhishek Singla",
  description: "Ask questions about Abhishek Singla's projects, writing and Bharat Connect. Answers come from the content of this site.",
  alternates: { canonical: "/ask" },
  robots: { index: false, follow: true },
};

export default function Ask() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Ask</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Ask about my work</h1>
        <p className="mt-4 text-[var(--muted)]">A small assistant that answers from this site&apos;s content: projects, results, writing and the Bharat Connect glossary. If it doesn&apos;t know, it says so.</p>
        <div className="mt-8"><AskWidget /></div>
      </main>
      <Footer />
    </>
  );
}
