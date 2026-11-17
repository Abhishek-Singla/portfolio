import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Download, Mail, Linkedin } from "lucide-react";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import CopyButton from "@/components/CopyButton";
import { ReadingTime } from "@/components/PageMeta";
import { press, profile, about, resumes } from "@/data";

export const metadata: Metadata = {
  title: "Press and speaker kit | Abhishek Singla",
  description: "Short, medium and long bios, speaking topics, a headshot and contact details for Abhishek Singla.",
  alternates: { canonical: "/press" },
};

export default function Press() {
  const hasPhoto = existsSync(join(process.cwd(), "public", about.portrait.replace(/^\//, "")));
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Press and speaker kit</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">Everything you need to introduce me</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">For podcasts, panels, meetups and articles. Copy a bio, pick a topic, and get in touch.</p>
        <ReadingTime content={press} className="mt-3" />

        <div className="mt-10 grid gap-10 md:grid-cols-[240px_1fr]">
          <div>
            {hasPhoto ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={about.portrait} alt={`Headshot of ${profile.name}`} width={240} height={240} className="h-auto w-full rounded-3xl border border-[var(--line)] object-cover" />
                <a href={about.portrait} download="abhishek-singla-headshot.jpg" className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"><Download size={14} /> Download headshot</a>
              </>
            ) : (
              <div className="serif flex aspect-square w-full items-center justify-center rounded-3xl border border-[var(--line)] bg-[var(--accent)]/10 text-6xl font-semibold text-[var(--accent)]" aria-label="Headshot placeholder">AS</div>
            )}
            <dl className="mt-6 space-y-3 text-sm">
              {press.facts.map(([k, v]) => <div key={k}><dt className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>

          <div className="space-y-10">
            <section aria-labelledby="bios">
              <h2 id="bios" className="serif text-2xl font-semibold">Bios</h2>
              <div className="mt-4 space-y-4">
                {press.bios.map(([name, text]) => (
                  <article key={name} className="rounded-2xl border border-[var(--line)] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold">{name} <span className="font-normal text-[var(--muted)]">· {text.split(/\s+/).length} words</span></h3>
                      <CopyButton text={text} label="Copy bio" />
                    </div>
                    <p className="mt-3 text-sm text-[var(--muted)]">{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="topics">
              <h2 id="topics" className="serif text-2xl font-semibold">Speaking topics</h2>
              <ul className="mt-4 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)]">
                {press.topics.map(([t, d]) => <li key={t} className="px-5 py-4"><p className="font-semibold">{t}</p><p className="mt-1 text-sm text-[var(--muted)]">{d}</p></li>)}
              </ul>
            </section>

            <section aria-labelledby="contact">
              <h2 id="contact" className="serif text-2xl font-semibold">Get in touch</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">Email is the quickest way. Please say the event, the audience, the date and the format.</p>
              <div className="no-print mt-4 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}?subject=${encodeURIComponent("Speaking or press request")}`} className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"><Mail size={16} /> {profile.email}</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm hover:border-[var(--accent)]"><Linkedin size={16} /> LinkedIn</a>
                {resumes.map((r) => <a key={r.file} href={r.file} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm hover:border-[var(--accent)]"><Download size={16} /> {r.name}</a>)}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
