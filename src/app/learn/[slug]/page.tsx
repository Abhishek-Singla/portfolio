import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { ReadingTime, Toc } from "@/components/PageMeta";
import UpdatedStamp from "@/components/UpdatedStamp";
import { renderDoc, type LearnSlug } from "@/lib/learn";
import { learnDocs } from "@/lib/learn-index";

type Params = { slug: string };
const valid = (s: string): s is LearnSlug => learnDocs.some((d) => d.slug === s);

export function generateStaticParams() {
  return learnDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  if (!valid(slug)) return {};
  const d = learnDocs.find((x) => x.slug === slug)!;
  const doc = renderDoc(slug);
  return { title: `${doc.title} | Bharat Connect explained`, description: d.blurb, alternates: { canonical: `/learn/${slug}` } };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!valid(slug)) notFound();
  const i = learnDocs.findIndex((d) => d.slug === slug);
  const doc = renderDoc(slug);
  const prev = learnDocs[i - 1];
  const next = learnDocs[i + 1];
  const title = (s: LearnSlug) => renderDoc(s).title;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: doc.title,
    author: { "@type": "Person", name: "Abhishek Singla" }, isPartOf: { "@type": "CreativeWorkSeries", name: "Bharat Connect (BBPS) explained" },
  };
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]">
          <a href="/learn" className="text-[var(--accent)] hover:underline">Learn</a> <span aria-hidden>/</span> Chapter {i + 1}
        </nav>
        <h1 className="serif mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{doc.title}</h1>
        <p className="mt-3"><ReadingTime words={doc.words} /></p>
        <UpdatedStamp date={learnDocs[i].updated} className="mt-1" />
        {doc.headings.length > 1 && <Toc items={doc.headings} />}

        <article className="doc mt-10" dangerouslySetInnerHTML={{ __html: doc.html }} />

        <p className="mt-10 rounded-2xl bg-[var(--line)]/40 p-4 text-sm text-[var(--muted)]">
          Not official documentation. Found a mistake? Open an issue with a link to the official document at{" "}
          <a className="text-[var(--accent)] hover:underline" href="https://github.com/Abhishek-Singla/bbps-explained/issues" target="_blank" rel="noreferrer">github.com/Abhishek-Singla/bbps-explained</a>. Official documents win over these notes.
        </p>

        <nav aria-label="Chapters" className="mt-10 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <a href={`/learn/${prev.slug}`} className="rounded-2xl border border-[var(--line)] p-4 hover:border-[var(--accent)]"><span className="text-xs text-[var(--muted)]">Previous</span><span className="serif mt-1 block font-semibold">{title(prev.slug)}</span></a>
          ) : <span />}
          {next ? (
            <a href={`/learn/${next.slug}`} className="rounded-2xl border border-[var(--line)] p-4 text-right hover:border-[var(--accent)]"><span className="text-xs text-[var(--muted)]">Next</span><span className="serif mt-1 block font-semibold">{title(next.slug)}</span></a>
          ) : <span />}
        </nav>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </main>
      <Footer />
    </>
  );
}
