import type { Metadata } from "next";
import { Download, Mail, Linkedin } from "lucide-react";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { profile, stats, roleFit, experience, resumes } from "@/data";

export const metadata: Metadata = {
  title: `Hire ${profile.name} | One-page summary`,
  description: `${profile.name}, ${profile.role}. Headline numbers, what I'm looking for, and how to reach me.`,
  alternates: { canonical: "/hire" },
  openGraph: { images: [{ url: "/og-hire.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/og-hire.png"] },
};

export default function Hire() {
  const current = experience[0];
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">One-page summary</p>
        <h1 className="serif mt-3 text-4xl font-semibold sm:text-5xl">{profile.name}</h1>
        <p className="mt-2 text-lg text-[var(--muted)]">{profile.role} · {profile.location}</p>
        <p className="mt-6 text-[var(--muted)]">{profile.intro}</p>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[var(--paper)] p-5">
              <p className="serif text-3xl font-semibold">{s.value}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{s.label}</p>
            </div>
          ))}
        </div>

        <h2 className="serif mt-12 text-2xl font-semibold">Currently</h2>
        <p className="mt-2 font-medium">{current.role}, {current.org}</p>
        <p className="text-sm text-[var(--muted)]">{current.period}</p>

        <h2 className="serif mt-12 text-2xl font-semibold">Looking for</h2>
        <p className="mt-2 text-[var(--muted)]">{roleFit.roles.join(" or ")} roles in {roleFit.domains.join(", ").toLowerCase()}.</p>
        <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">{roleFit.strengths.map((s) => <li key={s}>• {s}</li>)}</ul>

        <h2 className="serif mt-12 text-2xl font-semibold">Resume versions</h2>
        <ul className="mt-4 space-y-3">
          {resumes.map((r) => (
            <li key={r.file} className="rounded-2xl border border-[var(--line)] p-4 text-sm">
              <p className="font-semibold">{r.name}</p>
              <p className="mt-1 text-[var(--muted)]">{r.note}</p>
              <p className="no-print mt-2 flex gap-4">
                <a href={r.file} className="text-[var(--accent)] hover:underline">Download PDF</a>
                <a href={r.web} className="text-[var(--accent)] hover:underline">Print-friendly page</a>
              </p>
            </li>
          ))}
        </ul>

        <div className="no-print mt-12 flex flex-wrap gap-4">
          <a href={profile.resume} className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white"><Download size={16} /> Full resume (PDF)</a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--ink)] px-6 py-3 font-medium"><Mail size={16} /> {profile.email}</a>
          <a href={profile.linkedin} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-6 py-3 font-medium"><Linkedin size={16} /> LinkedIn</a>
        </div>
        <p className="mt-10 text-sm"><a href="/" className="text-[var(--accent)] hover:underline">See the full portfolio →</a></p>
      </main>
      <Footer />
    </>
  );
}
