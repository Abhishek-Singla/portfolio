import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowUpRight, Mail, Linkedin, Download, Calendar, Github } from "lucide-react";
import Reveal from "./Reveal";
import { BbpsExplorer, FailureCalculator } from "./Playground";
import { Glossed } from "./Glossed";
import ContactForm from "./ContactForm";
import Subscribe from "./Subscribe";
import { profile, impact, experience, caseStudies, skills, education, certifications, work, writing, approach, templates, metricsTree, prdExample, roleFit, now, quotes, resumes, about, projects, restrictedExplainersLive } from "@/data";

function Head({ id, kicker, title }: { id: string; kicker: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <p id={id} className="scroll-mt-24 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">{kicker}</p>
      <h2 className="serif mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
    </Reveal>
  );
}
const wrap = "mx-auto max-w-5xl px-5 py-20";

export function About() {
  // Drop a photo at public/portrait.jpg to show it here; a monogram is used until then.
  const hasPortrait = existsSync(join(process.cwd(), "public", about.portrait.replace(/^\//, "")));
  return (
    <section className={wrap}>
      <Head id="about" kicker="About" title="The person behind the payments" />
      <div className="grid items-start gap-10 md:grid-cols-[220px_1fr]">
        <Reveal>
          {hasPortrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={about.portrait} alt={`Portrait of ${profile.name}`} width={220} height={260} className="h-auto w-full max-w-[220px] rounded-3xl border border-[var(--line)] object-cover" />
          ) : (
            <div aria-hidden className="serif flex aspect-[11/13] w-full max-w-[220px] items-center justify-center rounded-3xl border border-[var(--line)] bg-[var(--accent)]/10 text-6xl font-semibold text-[var(--accent)]">AS</div>
          )}
          <ol className="mt-5 space-y-3 border-l border-[var(--line)] pl-4 text-sm">
            {about.path.map(([t, d]) => <li key={t}><span className="font-semibold">{t}</span><span className="block text-[var(--muted)]">{d}</span></li>)}
          </ol>
        </Reveal>
        <Reveal>
          <p className="serif text-2xl leading-snug sm:text-3xl">{about.lead}</p>
          <div className="mt-6 space-y-4 text-[var(--muted)]">
            {about.paragraphs.map((p) => <p key={p}><Glossed text={p} /></p>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className={wrap}>
      <Head id="projects" kicker="Side projects" title="Things I build in the open" />
      <p className="-mt-6 mb-10 max-w-2xl text-sm text-[var(--muted)]">Public repositories on GitHub. All data in them is synthetic, with no company or customer information.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Reveal key={p.name}>
            <a href={`https://github.com/Abhishek-Singla/${p.repo}`} target="_blank" rel="noreferrer"
              className="flex h-full flex-col rounded-2xl border border-[var(--line)] p-6 transition hover:-translate-y-1 hover:border-[var(--accent)]">
              <p className="flex items-center gap-2 font-mono text-sm font-semibold"><Github size={16} className="text-[var(--accent)]" />{p.name}</p>
              <p className="mt-3 flex-1 text-sm text-[var(--muted)]">{p.blurb}</p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-[var(--muted)]">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full border border-[var(--line)] px-2.5 py-0.5 text-xs">{t}</span>)}</div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Impact() {
  return (
    <section className={wrap}>
      <Head id="impact" kicker="Impact" title="What changed because I was in the room" />
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {impact.map(([t, d], i) => (
          <Reveal key={t} className="flex gap-5 border-t border-[var(--line)] pt-5">
            <span className="serif text-2xl text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className={wrap}>
      <Head id="experience" kicker="Experience" title="Where I've done the work" />
      <div>
        {experience.map((e) => (
          <Reveal key={e.role + e.period} className="grid gap-4 border-t border-[var(--line)] py-8 md:grid-cols-[200px_1fr]">
            <p className="text-sm text-[var(--muted)]">{e.period}</p>
            <div>
              <h3 className="serif text-xl font-semibold">{e.role}</h3>
              <p className="text-sm text-[var(--accent)]">{e.org}{e.meta && <span className="text-[var(--muted)]"> · {e.meta}</span>}</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                {e.points.map((p) => <li key={p} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />{p}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function CaseStudy() {
  return (
    <section className={wrap}>
      <Head id="case-study" kicker="Case study" title="Thinking in public" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((c) => {
          const Tag = c.url ? "a" : "div";
          return (
            <Reveal key={c.title} className="h-full">
              <Tag
                {...(c.url ? { href: c.url, target: "_blank", rel: "noreferrer" } : {})}
                className="flex h-full flex-col rounded-3xl bg-[var(--ink)] p-8 text-[var(--paper)] transition hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-[0.18em] opacity-70">{c.tag}</p>
                <h3 className="serif mt-4 text-2xl font-semibold sm:text-3xl">{c.title}</h3>
                <p className="mt-4 flex-1 text-sm opacity-80">{c.desc}</p>
                {c.url && <p className="mt-8 inline-flex items-center gap-2 text-sm font-medium">{c.url.includes("linkedin") ? "Read on LinkedIn" : "Read on Notion"} <ArrowUpRight size={16} /></p>}
              </Tag>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className={wrap}>
      <Head id="skills" kicker="Toolkit" title="Skills & tools" />
      <div className="space-y-8">
        {skills.map(([g, items]) => (
          <Reveal key={g} className="grid gap-3 border-t border-[var(--line)] pt-5 md:grid-cols-[200px_1fr]">
            <h3 className="font-semibold">{g}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => <span key={s} className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)]">{s}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section className={wrap}>
      <Head id="education" kicker="Education" title="Learning, formally and otherwise" />
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((e) => (
          <Reveal key={e.degree} className="rounded-2xl border border-[var(--line)] p-6">
            <p className="text-sm text-[var(--muted)]">{e.period}</p>
            <h3 className="serif mt-2 text-xl font-semibold">{e.degree}</h3>
            <p className="mt-1 text-sm">{e.school}{e.note && <span className="text-[var(--muted)]"> · {e.note}</span>}</p>
            <p className="mt-4 inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm font-medium text-[var(--accent)]">{e.score}</p>
          </Reveal>
        ))}
      </div>
      <h3 className="mt-12 font-semibold">Certifications</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {certifications.map((c) => (
          <Reveal key={c.name} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] px-4 py-3 text-sm">
            <span>{c.name} <span className="text-[var(--muted)]">· {c.issuer}</span></span>
            <span className={c.status === "Completed" ? "text-[var(--accent)]" : "text-[var(--muted)]"}>{c.status}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-24 text-center">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Contact</p>
        <h2 className="serif mx-auto mt-4 max-w-2xl text-4xl font-semibold sm:text-6xl">Have a product problem worth solving?</h2>
        <p className="mx-auto mt-6 max-w-xl text-[var(--muted)]">{profile.openTo}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={profile.bookingUrl || `mailto:${profile.email}?subject=${encodeURIComponent("15-minute chat")}&body=${encodeURIComponent("Hi Abhishek, I'd like to set up a 15-minute chat. A few times that work for me:")}`}
            {...(profile.bookingUrl ? { target: "_blank", rel: "noreferrer" } : {})}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-4 font-medium text-white hover:opacity-90"
          >
            <Calendar size={18} /> Book a 15-minute chat
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--ink)] px-7 py-4 font-medium hover:bg-[var(--ink)] hover:text-[var(--paper)]">
            <Mail size={18} /> {profile.email}
          </a>
        </div>
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-[var(--muted)]">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[var(--ink)]">
            <Linkedin size={16} /> LinkedIn
          </a>
          {resumes.map((r) => (
            <a key={r.file} href={r.file} className="inline-flex items-center gap-2 hover:text-[var(--ink)]">
              <Download size={16} /> {r.name} (PDF)
            </a>
          ))}
        </div>
        <ContactForm />
      </Reveal>
    </section>
  );
}

export function Work() {
  return (
    <section className={wrap}>
      <Head id="work" kicker="Selected work" title="Problems I took from symptom to fix" />
      <div className="space-y-8">
        {work.map((w) => (
          <Reveal key={w.title} className="rounded-3xl border border-[var(--line)] p-6 sm:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">{w.tag}</p>
            <h3 className="serif mt-3 text-2xl font-semibold sm:text-3xl">{w.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">My role: {w.role}</p>
            <div className="mt-6 grid gap-6 text-sm md:grid-cols-3">
              <div><p className="font-semibold">Problem</p><p className="mt-2 text-[var(--muted)]"><Glossed text={w.problem} /></p></div>
              <div><p className="font-semibold">What I did</p><p className="mt-2 text-[var(--muted)]"><Glossed text={w.did} /></p></div>
              <div>
                <p className="font-semibold">Result</p>
                <ul className="mt-2 space-y-1 text-[var(--muted)]">{w.result.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {w.skills.map((s) => <span key={s} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">{s}</span>)}
            </div>
            {w.lesson && <p className="serif mt-6 border-l-2 border-[var(--accent)] pl-4 italic text-[var(--muted)]">{w.lesson}</p>}
            <a href={`/work/${w.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline">
              Read the deep-dive <ArrowUpRight size={16} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Writing() {
  return (
    <section className={wrap}>
      <Head id="writing" kicker="Writing" title="What I write about on LinkedIn" />
      <div className="grid gap-x-10 sm:grid-cols-2">
        {writing.map((p) => (
          <Reveal key={p.title} className="border-t border-[var(--line)] py-6">
            <p className="text-xs text-[var(--muted)]">{p.date}</p>
            <h3 className="serif mt-1 text-lg font-semibold">
              <a href={p.url} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">{p.title}</a>
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]"><Glossed text={p.excerpt} /></p>
          </Reveal>
        ))}
      </div>
      <Subscribe />
      <Reveal className="mt-6">
        <a href={profile.activity} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline">
          Read the posts on LinkedIn <ArrowUpRight size={16} />
        </a>
      </Reveal>
    </section>
  );
}

export function Quotes() {
  return (
    <section className={wrap}>
      <Head id="quotes" kicker="In my words" title="Lines from my posts" />
      <div className="grid gap-6 md:grid-cols-2">
        {quotes.map((q) => (
          <Reveal key={q.text}>
            <figure className="flex h-full flex-col rounded-2xl border border-[var(--line)] p-6">
              <blockquote className="serif flex-1 text-lg leading-snug">&ldquo;{q.text}&rdquo;</blockquote>
              <figcaption className="mt-4 text-xs text-[var(--muted)]">
                <a href={q.url} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">{q.post}</a> · {q.date}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Approach() {
  return (
    <section className={wrap}>
      <Head id="approach" kicker="How I work" title="Principles I build roadmaps on" />
      <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
        {approach.map(([t, d]) => (
          <Reveal key={t} className="border-t border-[var(--line)] pt-5">
            <h3 className="font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Templates() {
  return (
    <section className={wrap}>
      <Head id="templates" kicker="Free templates" title="PM templates you can copy" />
      <p className="-mt-6 mb-10 max-w-xl text-sm text-[var(--muted)]">Blank and generic, with no company or customer data. Fill in the placeholders and delete the guidance lines.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map(([n, f, d]) => (
          <Reveal key={f}>
            <a href={`/templates/${f}`} download className="block h-full rounded-2xl border border-[var(--line)] p-5 transition hover:border-[var(--accent)]">
              <p className="flex items-center justify-between font-semibold">{n}<Download size={16} className="text-[var(--accent)]" /></p>
              <p className="mt-2 text-sm text-[var(--muted)]">{d}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Explore() {
  return (
    <section className={wrap}>
      <Head id="explore" kicker="Explore" title="Bharat Connect, hands on" />
      <div className="space-y-8">
        <Reveal><BbpsExplorer /></Reveal>
        <Reveal><FailureCalculator /></Reveal>
        <Reveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["/lab", "Product lab", "Roadmap lane checker, error-code translator, lifecycle stepper, settlement timeline and SQL practice."],
            ["/learn", "Bharat Connect explained", "Plain-language chapters on how Bharat Connect works, with official sources and my own notes kept apart."],
            ["/learn/payment-rails", "NEFT, RTGS, IMPS and UPI", "How India's four transfer rails are built, and which fits which job."],
            ["/sql", "SQL playground", "Run real SQL on a synthetic payments database, with 13 graded questions."],
            ["/dashboard", "Dashboard demo", "A product dashboard on synthetic data: biller tiers, channels, settlement lag."],
            ["/prd-builder", "PRD builder", "Answer a few prompts and get a draft PRD in markdown."],
            ["/ai", "How I use AI", "The workflows and the rules that keep them honest."],
            ...(restrictedExplainersLive ? [
              ["/billers", "Six journeys in biller settings", "How a few settings decide a biller's payment journey."],
              ["/settlement-history", "One settlement a day to ten", "How settlement cycles grew from 2017 to 2026."],
            ] : []),
            ["/glossary", "Glossary", "Bharat Connect terms in plain language."],
            ["/watch", "Watch", "Ecosystem and regulatory changes, with the product angle."],
            ["/ask", "Ask about my work", "A small assistant that answers from this site's content."],
          ].map(([href, t, d]) => (
            <a key={href} href={href} className="rounded-2xl border border-[var(--line)] p-5 transition hover:border-[var(--accent)]">
              <p className="flex items-center justify-between font-semibold">{t}<ArrowUpRight size={16} className="text-[var(--accent)]" /></p>
              <p className="mt-2 text-sm text-[var(--muted)]">{d}</p>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Metrics() {
  return (
    <section className={wrap}>
      <Head id="metrics" kicker="Measurement" title="How my KPIs connect" />
      <Reveal className="rounded-3xl border border-[var(--line)] p-6 sm:p-9">
        <p className="serif text-center text-xl font-semibold sm:text-2xl">{metricsTree.goal}</p>
        <div className="mx-auto my-5 h-6 w-px bg-[var(--line)]" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricsTree.branches.map((b) => (
            <div key={b.name} className="rounded-2xl border border-[var(--line)] p-5">
              <p className="font-semibold text-[var(--accent)]">{b.name}</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">{b.metrics.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--muted)]">These are the dimensions behind the dashboard I built: leadership watches the four branches, and the metrics underneath explain why a branch moved.</p>
      </Reveal>
    </section>
  );
}

export function PrdExample() {
  return (
    <section className={wrap}>
      <Head id="prd" kicker="Worked example" title={prdExample.title} />
      <Reveal>
        <p className="-mt-6 mb-6 text-sm italic text-[var(--muted)]">{prdExample.note}</p>
        <div className="divide-y divide-[var(--line)] rounded-3xl border border-[var(--line)]">
          {prdExample.sections.map(([h, t], i) => (
            <details key={h} open={i < 2} className="group p-5 sm:px-8">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {h}<span className="text-[var(--accent)] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--muted)]">{t}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function RoleFit() {
  return (
    <section className={wrap}>
      <Head id="fit" kicker="What I'm looking for" title="Where I'd be most useful" />
      <div className="grid gap-6 md:grid-cols-3">
        {[["Roles", roleFit.roles], ["Domains", roleFit.domains], ["What I bring", roleFit.strengths]].map(([t, items]) => (
          <Reveal key={t as string} className="rounded-2xl border border-[var(--line)] p-6">
            <h3 className="font-semibold text-[var(--accent)]">{t as string}</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">{(items as string[]).map((i) => <li key={i}>{i}</li>)}</ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 rounded-2xl bg-[var(--accent)]/10 p-6">
        <h3 className="font-semibold">Now</h3>
        <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">{now.map((n) => <li key={n}>{n}</li>)}</ul>
        <p className="mt-4 text-sm text-[var(--muted)]">{profile.followers} followers on LinkedIn, where I write about Bharat Connect and payments product work.</p>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-8 text-center text-sm text-[var(--muted)]">
      <nav aria-label="Site" className="mb-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
        <a href="/lab" className="hover:text-[var(--ink)]">Lab</a>
        <a href="/glossary" className="hover:text-[var(--ink)]">Glossary</a>
        <a href="/watch" className="hover:text-[var(--ink)]">Watch</a>
        <a href="/learn" className="hover:text-[var(--ink)]">Learn</a>
        <a href="/sql" className="hover:text-[var(--ink)]">SQL playground</a>
        <a href="/dashboard" className="hover:text-[var(--ink)]">Dashboard</a>
        <a href="/updates" className="hover:text-[var(--ink)]">Updates</a>
        <a href="/press" className="hover:text-[var(--ink)]">Press kit</a>
        <a href="/ask" className="hover:text-[var(--ink)]">Ask</a>
        <a href="/hire" className="hover:text-[var(--ink)]">One-page summary</a>
        <a href="/resume" className="hover:text-[var(--ink)]">Resume</a>
        <a href="/corrections" className="hover:text-[var(--ink)]">Corrections</a>
        <a href="/privacy" className="hover:text-[var(--ink)]">Privacy</a>
      </nav>
      © {new Date().getFullYear()} {profile.name}
    </footer>
  );
}
