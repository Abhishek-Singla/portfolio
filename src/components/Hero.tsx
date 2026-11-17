import { ArrowDownRight, Download } from "lucide-react";
import { profile, stats, impact, work, experience, writing, approach, quotes } from "@/data";
import { ReadingTime } from "./PageMeta";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:pt-28">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">{profile.role}</p>
      <h1 className="serif mt-6 text-5xl font-semibold leading-[1.05] sm:text-7xl">
        {profile.headline[0]}
        <br />
        <em className="font-normal italic text-[var(--accent)]">{profile.headline[1]}</em>
      </h1>
      <p className="mt-8 max-w-2xl text-lg text-[var(--muted)]">{profile.intro}</p>
      <div className="mt-9 flex flex-wrap items-center gap-4 text-sm">
        <a href="#impact" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white hover:opacity-90">
          See the impact <ArrowDownRight size={16} />
        </a>
        <a href={profile.resume} className="inline-flex items-center gap-2 rounded-full border border-[var(--ink)] px-6 py-3 font-medium hover:bg-[var(--ink)] hover:text-[var(--paper)]">
          <Download size={16} /> Download resume
        </a>
        <span className="w-full text-[var(--muted)]">{profile.specialty} · {profile.location} · <ReadingTime content={[profile, impact, work, experience, writing, approach, quotes]} className="align-middle" /></span>
      </div>
      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[var(--paper)] p-6">
            <p className="serif text-4xl font-semibold">{s.value}</p>
            <p className="mt-2 text-sm font-medium">{s.label}</p>
            <p className="text-xs text-[var(--muted)]">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
