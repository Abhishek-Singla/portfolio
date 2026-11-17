import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { glossary } from "@/data";
import { ReadingTime } from "@/components/PageMeta";
import UpdatedStamp from "@/components/UpdatedStamp";

export const metadata: Metadata = {
  title: "Bharat Connect glossary | Abhishek Singla",
  description: "Plain-language definitions of Bharat Connect (BBPS), BOU, COU, BBPCU, MDM, UPMS, deemed success and more.",
  alternates: { canonical: "/glossary" },
  openGraph: { images: [{ url: "/og-glossary.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/og-glossary.png"] },
};

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Glossary() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Bharat Connect glossary",
    hasDefinedTerm: glossary.map(([term, def]) => ({ "@type": "DefinedTerm", name: term, description: def })),
  };
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Glossary</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Bharat Connect in plain language</h1>
        <p className="mt-4 text-[var(--muted)]">The terms I use most when writing about bill payments in India, explained for people outside payments.</p>
        <ReadingTime content={glossary} className="mt-3" />
        <UpdatedStamp date="18 Nov 2026" className="mt-1" />
        <nav aria-label="Terms" className="mt-6 flex flex-wrap gap-2 text-xs">
          {glossary.map(([t]) => <a key={t} href={`#${slug(t)}`} className="rounded-full border border-[var(--line)] px-3 py-1 hover:border-[var(--accent)]">{t}</a>)}
        </nav>
        <dl className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {glossary.map(([t, d]) => (
            <div key={t} id={slug(t)} className="scroll-mt-24 py-5">
              <dt className="serif text-xl font-semibold">{t}</dt>
              <dd className="mt-2 text-[var(--muted)]">{d}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm text-[var(--muted)]">Written from my own work and posts. For authoritative wording, check NPCI and RBI documents.</p>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </main>
      <Footer />
    </>
  );
}
