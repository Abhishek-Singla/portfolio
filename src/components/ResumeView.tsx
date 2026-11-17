import { Download } from "lucide-react";
import { resume } from "@/resume";
import { resumes } from "@/data";
import PrintButton from "./PrintButton";
import { ReadingTime } from "./PageMeta";

export default function ResumeView({ variant }: { variant: "full" | "relevant" }) {
  const roles = resume.experience.filter((e) => variant === "full" || !e.full);
  const pdf = variant === "full" ? resumes[0].file : resumes[1].file;
  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-12 print:max-w-none print:p-0">
      <div className="no-print mb-8 flex flex-wrap items-center gap-3">
        {resumes.map((r, i) => {
          const active = (i === 0) === (variant === "full");
          return (
            <a key={r.web} href={r.web} aria-current={active ? "page" : undefined}
              className={`rounded-full border px-4 py-2 text-sm ${active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)] hover:border-[var(--accent)]"}`}>
              {r.name}
            </a>
          );
        })}
        <span className="flex-1" />
        <ReadingTime content={[resume.summary, roles]} />
        <PrintButton />
        <a href={pdf} className="inline-flex items-center gap-2 rounded-full border border-[var(--ink)] px-4 py-2 text-sm font-medium hover:bg-[var(--ink)] hover:text-[var(--paper)]">
          <Download size={14} /> PDF
        </a>
      </div>

      <article className="resume text-sm leading-relaxed">
        <header className="border-b border-[var(--ink)] pb-3">
          <h1 className="serif text-3xl font-semibold">{resume.name}</h1>
          <p className="mt-1 text-[var(--muted)]">{resume.email} · {resume.linkedin}</p>
        </header>

        <Block title="Summary"><p>{resume.summary}</p></Block>

        <Block title="Skills">
          {resume.skills.map(([k, v]) => <p key={k} className="mt-1"><strong>{k}: </strong>{v}</p>)}
        </Block>

        <Block title="Work experience">
          {roles.map((e) => (
            <section key={e.org + e.role} className="resume-role mt-4 first:mt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{e.org}</h3>
                <p className="text-[var(--muted)]">{e.period}</p>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="italic">{e.role}</p>
                <p className="text-[var(--muted)]">{e.place}</p>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </section>
          ))}
        </Block>

        <Block title="AI-enabled product work (Claude, ChatGPT, Microsoft Copilot)">
          <ul className="list-disc space-y-1 pl-5">{resume.aiWork.map((b) => <li key={b}>{b}</li>)}</ul>
        </Block>

        <Block title="Key achievements">
          <ul className="list-disc space-y-1 pl-5">{resume.achievements.map(([k, v]) => <li key={k}><strong>{k}: </strong>{v}</li>)}</ul>
        </Block>

        <Block title="Education">
          {resume.education.map((e) => (
            <section key={e.school} className="resume-role mt-3 first:mt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{e.school}</h3>
                <p className="text-[var(--muted)]">{e.period}</p>
              </div>
              <p>{e.degree} · {e.place}</p>
              <p className="text-[var(--muted)]"><em>Relevant courses: </em>{e.courses}</p>
            </section>
          ))}
        </Block>

        <Block title="Certifications"><p>{resume.certifications}</p></Block>
      </article>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 print:mt-4">
      <h2 className="border-b border-[var(--line)] pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)] print:text-black">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
