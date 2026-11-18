import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import UpdatedStamp from "@/components/UpdatedStamp";
import { profile } from "@/data";

export const metadata: Metadata = {
  title: "Accessibility statement | Abhishek Singla",
  description: "What was tested for accessibility on this site, what is known to fall short, and how to report a problem.",
  alternates: { canonical: "/accessibility" },
};

const tested: [string, string][] = [
  ["Keyboard use", "Every link, button, form field, tab, menu and tool can be reached and used with a keyboard. A visible focus ring is shown, and a skip-to-content link is the first stop on each page."],
  ["Structure", "Each page has one main heading, headings that do not skip levels, labelled landmarks (header, main, footer and navigation regions) and no duplicate element IDs. I checked this with a script on the pages I built."],
  ["Forms", "Every field has a visible or hidden label. Errors and results are announced politely so screen readers hear them."],
  ["Colour contrast", "Light theme: body text 16.1 to 1, secondary text 5.0 to 1, the orange accent 5.0 to 1 on the page background, and white text on orange buttons 5.7 to 1. Dark theme: secondary text 7.1 to 1 and the accent 7.3 to 1. All meet the 4.5 to 1 minimum for normal text."],
  ["Colour is not the only signal", "In charts, each biller's reliability tier is written next to it. Quiz answers are marked with words as well as colour."],
  ["Motion and themes", "Animations stop if your system asks for reduced motion. Light and dark themes follow your system setting and can be switched by hand."],
  ["Charts and diagrams", "Charts have text equivalents: lists with the numbers, and a data table for the daily chart. The diagrams in the Learn notes are plain lists. The image on the visuals page has a full text description."],
  ["Print", "The resume pages print in black on white, on A4."],
];

const gaps: [string, string][] = [
  ["Not audited by a third party", "This is my own assessment against WCAG 2.1 level AA, not a formal audit."],
  ["Limited screen reader testing", "I tested the page structure and labels with scripts. I have not yet tested with a range of screen readers and devices."],
  ["Hover definitions", "Glossary terms show a definition on hover or keyboard focus. The definition does not close with the Escape key; moving the pointer or focus away closes it."],
  ["Resume PDFs", "The PDF resumes may not be fully tagged for screen readers. The print-friendly web versions at /resume are the accessible alternative."],
  ["Other people's content", "Links to LinkedIn, Notion, GitHub and Upwork lead to sites I do not control."],
];

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Accessibility</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Accessibility statement</h1>
        <p className="mt-4 text-[var(--muted)]">I want everyone to be able to use this site. I aim for WCAG 2.1 level AA. Here is what I checked and where it falls short.</p>
        <UpdatedStamp date="18 Nov 2026" className="mt-2" />

        <section className="mt-10" aria-labelledby="tested">
          <h2 id="tested" className="serif text-2xl font-semibold">What I tested</h2>
          <dl className="mt-4 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)]">
            {tested.map(([t, d]) => <div key={t} className="px-5 py-4"><dt className="font-semibold">{t}</dt><dd className="mt-1 text-sm text-[var(--muted)]">{d}</dd></div>)}
          </dl>
        </section>

        <section className="mt-10" aria-labelledby="gaps">
          <h2 id="gaps" className="serif text-2xl font-semibold">Known gaps</h2>
          <dl className="mt-4 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)]">
            {gaps.map(([t, d]) => <div key={t} className="px-5 py-4"><dt className="font-semibold">{t}</dt><dd className="mt-1 text-sm text-[var(--muted)]">{d}</dd></div>)}
          </dl>
        </section>

        <section className="mt-10" aria-labelledby="report">
          <h2 id="report" className="serif text-2xl font-semibold">Report a problem</h2>
          <p className="mt-3 text-[var(--muted)]">
            If something is hard to use, email <a className="text-[var(--accent)] hover:underline" href={`mailto:${profile.email}?subject=${encodeURIComponent("Accessibility problem")}`}>{profile.email}</a> with the page and what went wrong. I will reply and fix it, and list it on the <a className="text-[var(--accent)] hover:underline" href="/corrections">corrections page</a> if it changes content.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
