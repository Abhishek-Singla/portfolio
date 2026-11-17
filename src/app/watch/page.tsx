import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { watch, profile } from "@/data";
import { ReadingTime } from "@/components/PageMeta";
import { Glossed } from "@/components/Glossed";

export const metadata: Metadata = {
  title: "Bharat Connect watch | Abhishek Singla",
  description: "A short feed of Bharat Connect, NPCI and RBI developments that matter to biller operating units, with the product angle on each.",
  alternates: { canonical: "/watch" },
  openGraph: { images: [{ url: "/og-watch.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/og-watch.png"] },
};

export default function Watch() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Watch</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">What is changing on Bharat Connect</h1>
        <p className="mt-4 text-[var(--muted)]">
          Developments I have followed in my LinkedIn posts and articles, each with the question it raises for a biller operating unit. Dates are as of my posts; for the official text, read the NPCI and RBI circulars.
        </p>
        <ReadingTime content={watch} className="mt-3" />
        <ol className="mt-10 space-y-8 border-l border-[var(--line)] pl-6">
          {watch.map((w) => (
            <li key={w.title} className="relative">
              <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-[var(--accent)]" />
              <p className="text-sm text-[var(--muted)]">{w.when}</p>
              <h2 className="serif mt-1 text-xl font-semibold">{w.title}</h2>
              <p className="mt-2 text-[var(--muted)]"><Glossed text={w.body} /></p>
              <p className="mt-2 text-sm"><span className="font-semibold text-[var(--accent)]">Product angle: </span><Glossed text={w.why} /></p>
            </li>
          ))}
        </ol>
        <p className="mt-12 text-sm"><a href={profile.activity} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline">Follow the weekly notes on LinkedIn →</a></p>
      </main>
      <Footer />
    </>
  );
}
