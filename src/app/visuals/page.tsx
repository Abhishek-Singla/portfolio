import type { Metadata } from "next";
import { Download } from "lucide-react";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { visuals } from "@/data";

export const metadata: Metadata = {
  title: "Visuals | Abhishek Singla",
  description: "Diagrams from my writing on Bharat Connect and payments product work.",
  alternates: { canonical: "/visuals" },
};

export default function Page() {
  const shown = visuals.filter((v) => v.published);
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Visuals</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Diagrams from my writing</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">Each diagram accompanies a post. They are simplified illustrations for learning, not official documentation.</p>
        <div className="mt-10 space-y-10">
          {shown.map((v) => (
            <figure key={v.file} className="rounded-3xl border border-[var(--line)] p-5 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/visuals/${v.file}`} alt={v.alt} width={1360} height={830} className="h-auto w-full rounded-2xl" />
              <figcaption className="mt-4">
                <p className="serif text-xl font-semibold">{v.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{v.caption}</p>
                <p className="mt-3 flex flex-wrap gap-4 text-sm">
                  <a href={`/visuals/${v.file}`} download className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"><Download size={14} /> Download PNG</a>
                  {v.svg && <a href={`/visuals/${v.svg}`} download className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"><Download size={14} /> Download SVG</a>}
                  <a href={v.post} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline">Read the post</a>
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
