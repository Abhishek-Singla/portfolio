import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";
import { Download } from "lucide-react";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { ReadingTime } from "@/components/PageMeta";

export const metadata: Metadata = {
  title: "Worked examples: user stories, Gherkin and UAT | Abhishek Singla",
  description: "Finished examples of user stories with acceptance criteria, a Gherkin spec and UAT test cases for a bill fetch and pay flow, each downloadable as markdown.",
  alternates: { canonical: "/examples" },
};

const files = [
  { file: "user-stories-fetch-and-pay.md", id: "stories", label: "User stories" },
  { file: "gherkin-fetch-and-pay.md", id: "gherkin", label: "Gherkin spec" },
  { file: "uat-test-cases-fetch-and-pay.md", id: "uat", label: "UAT test cases" },
];

function load(file: string) {
  const raw = readFileSync(join(process.cwd(), "public", "templates", "examples", file), "utf8");
  const title = raw.split("\n")[0].replace(/^#\s*/, "");
  let html = marked.parse(raw.replace(/^#.*\n/, ""), { gfm: true, async: false }) as string;
  // Task-list boxes from markdown have no labels, so they become plain symbols.
  html = html.replace(/<input[^>]*type="checkbox"[^>]*>/g, (m) => (/checked/.test(m) ? "☑ " : "☐ "));
  html = html.replace(/<table>/g, '<div class="doc-table"><table>').replace(/<\/table>/g, "</table></div>");
  return { title, html, words: raw.split(/\s+/).length };
}

export default function Page() {
  const docs = files.map((f) => ({ ...f, ...load(f.file) }));
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Worked examples</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">What finished looks like</h1>
        <p className="mt-4 text-[var(--muted)]">
          My <a className="text-[var(--accent)] hover:underline" href="/#templates">templates</a> are blank. These are filled in for one flow, fetching and paying a bill, so you can see the level of detail I aim for. They are illustrative, use a made-up biller, and are not tied to any real system.
        </p>
        <ReadingTime words={docs.reduce((n, d) => n + d.words, 0)} className="mt-3" />
        <nav aria-label="Examples" className="mt-6 flex flex-wrap gap-3 text-sm">
          {docs.map((d) => <a key={d.id} href={`#${d.id}`} className="rounded-full border border-[var(--line)] px-4 py-1.5 hover:border-[var(--accent)]">{d.label}</a>)}
        </nav>
        {docs.map((d) => (
          <section key={d.id} id={d.id} className="mt-14 scroll-mt-24">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="serif text-2xl font-semibold">{d.title}</h2>
              <a href={`/templates/examples/${d.file}`} download className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"><Download size={14} /> Download .md</a>
            </div>
            <article className="doc mt-4" dangerouslySetInnerHTML={{ __html: d.html }} />
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
