import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { work, workDetails } from "@/data";
import { ReadingTime, Toc } from "@/components/PageMeta";
import { Glossed } from "@/components/Glossed";

type Params = { slug: string };

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const w = work.find((x) => x.slug === slug);
  if (!w) return {};
  return { title: `${w.title} | Abhishek Singla`, description: workDetails[slug]?.context ?? w.problem, alternates: { canonical: `/work/${slug}` }, openGraph: { images: [{ url: `/og-work-${slug}.png`, width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", images: [`/og-work-${slug}.png`] } };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = work.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const w = work[i];
  const d = workDetails[slug];
  const next = work[(i + 1) % work.length];
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <a href="/#work" className="text-sm text-[var(--accent)] hover:underline">← All selected work</a>
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">{w.tag}</p>
        <h1 className="serif mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{w.title}</h1>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 text-[var(--muted)]">
          <span>My role: {w.role}</span>
          <ReadingTime content={[w, d]} />
        </p>
        <Toc items={[
          ["The problem", "problem"], ["How I approached it", "approach"],
          ...(d ? ([["What I built", "built"]] as [string, string][]) : []),
          ["Results", "results"],
          ...(w.lesson ? ([["What I took from it", "lesson"]] as [string, string][]) : []),
        ]} />

        <section id="problem" className="mt-12 scroll-mt-24">
          <h2 className="serif text-2xl font-semibold">The problem</h2>
          <p className="mt-3 text-[var(--muted)]"><Glossed text={d?.context ?? w.problem} /></p>
        </section>

        <section id="approach" className="mt-10 scroll-mt-24">
          <h2 className="serif text-2xl font-semibold">How I approached it</h2>
          <p className="mt-3 text-[var(--muted)]"><Glossed text={w.did} /></p>
          {d && <ol className="mt-4 list-decimal space-y-2 pl-5 text-[var(--muted)]">{d.approach.map((a) => <li key={a}><Glossed text={a} /></li>)}</ol>}
        </section>

        {d && (
          <section id="built" className="mt-10 scroll-mt-24">
            <h2 className="serif text-2xl font-semibold">What I built</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {d.built.map((b) => <li key={b} className="rounded-2xl border border-[var(--line)] p-4 text-sm">{b}</li>)}
            </ul>
          </section>
        )}

        <section id="results" className="mt-10 scroll-mt-24">
          <h2 className="serif text-2xl font-semibold">Results</h2>
          <ul className="mt-4 space-y-3">
            {w.result.map((r) => <li key={r} className="flex gap-3 text-[var(--muted)]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />{r}</li>)}
          </ul>
        </section>

        {w.lesson && (
          <section id="lesson" className="mt-10 scroll-mt-24">
            <h2 className="serif text-2xl font-semibold">What I took from it</h2>
            <p className="serif mt-3 border-l-2 border-[var(--accent)] pl-4 text-lg italic text-[var(--muted)]">{w.lesson}</p>
          </section>
        )}
        {d?.different && (
          <section className="mt-10">
            <h2 className="serif text-2xl font-semibold">What I would do differently</h2>
            <p className="mt-3 text-[var(--muted)]">{d.different}</p>
          </section>
        )}

        <div className="mt-10 flex flex-wrap gap-2">
          {w.skills.map((s) => <span key={s} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">{s}</span>)}
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "CreativeWork", name: w.title, description: d?.context ?? w.problem,
          creator: { "@type": "Person", name: "Abhishek Singla", sameAs: ["https://github.com/Abhishek-Singla"] },
          keywords: w.skills.join(", "), about: w.tag, inLanguage: "en",
        }) }} />
        <a href={`/work/${next.slug}`} className="mt-14 block rounded-3xl bg-[var(--ink)] p-6 text-[var(--paper)]">
          <p className="text-xs uppercase tracking-[0.18em] opacity-70">Next project</p>
          <p className="serif mt-2 text-xl font-semibold">{next.title}</p>
        </a>
      </main>
      <Footer />
    </>
  );
}
