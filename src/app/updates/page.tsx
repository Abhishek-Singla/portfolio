import type { Metadata } from "next";
import { Rss } from "lucide-react";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { updates, nowWorking } from "@/data";

export const metadata: Metadata = {
  title: "What I'm working on | Abhishek Singla",
  description: "A dated log of new posts, projects and site additions, with an RSS feed.",
  alternates: { canonical: "/updates", types: { "application/rss+xml": "/feed.xml" } },
};

export default function Updates() {
  const items = [...updates].sort((a, b) => b.iso.localeCompare(a.iso));
  const years = [...new Set(items.map((u) => u.iso.slice(0, 4)))];
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Updates</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">What I&apos;m working on</h1>
        <p className="mt-4 text-[var(--muted)]">New posts, projects and changes to this site, newest first.</p>
        <p className="mt-3"><a href="/feed.xml" className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"><Rss size={14} /> Subscribe with RSS</a></p>

        <section className="mt-10 rounded-3xl bg-[var(--accent)]/10 p-6" aria-labelledby="now">
          <h2 id="now" className="serif text-xl font-semibold">Right now</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">{nowWorking.map((n) => <li key={n}>{n}</li>)}</ul>
        </section>

        {years.map((y) => (
          <section key={y} className="mt-12" aria-labelledby={`y${y}`}>
            <h2 id={`y${y}`} className="serif text-2xl font-semibold">{y}</h2>
            <ol className="mt-4 space-y-6 border-l border-[var(--line)] pl-6">
              {items.filter((u) => u.iso.startsWith(y)).map((u) => {
                const ext = u.url.startsWith("http");
                return (
                  <li key={u.iso + u.title} className="relative">
                    <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-[var(--accent)]" />
                    <p className="text-sm text-[var(--muted)]"><time dateTime={u.iso}>{u.when}</time> · <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-xs">{u.kind}</span></p>
                    <h3 className="serif mt-1 text-lg font-semibold">
                      <a href={u.url} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})} className="hover:text-[var(--accent)]">{u.title}</a>
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{u.body}</p>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
