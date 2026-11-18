import { profile, stats, work, projects } from "@/data";
import { learnDocs } from "@/lib/learn-index";

export const dynamic = "force-static";

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

// A plain-text summary of the site for AI search tools and assistants.
export function GET() {
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.role}. ${profile.intro}`,
    "",
    "Personal portfolio and learning site about payments product work, with a focus on Bharat Connect (BBPS), India's national bill payment platform.",
    "Learn pages are the author's own explanations and not official documentation. Official RBI and NPCI documents take precedence.",
    "",
    "## Key results",
    ...stats.map((s) => `- ${s.value} ${s.label} (${s.note})`),
    "",
    "## Start here",
    `- [About and selected work](${site}/): overview, experience, writing, projects`,
    `- [One-page summary](${site}/hire): results, what the author is looking for, how to reach them`,
    `- [Press and speaker kit](${site}/press): bios and speaking topics`,
    `- [AI in product work](${site}/ai): the workflows and rules the author uses`,
    "",
    "## Learn: Bharat Connect (BBPS) explained",
    ...learnDocs.map((d) => `- [${d.title}](${site}/learn/${d.slug}): ${d.blurb}`),
    `- [Glossary](${site}/glossary): plain-language Bharat Connect terms`,
    "",
    "## Project deep-dives",
    ...work.map((w) => `- [${w.title}](${site}/work/${w.slug}): ${w.problem}`),
    "",
    "## Hands-on",
    `- [Product lab](${site}/lab): roadmap lane check, error-code translator, lifecycle, settlement, reconciliation playground`,
    `- [SQL playground](${site}/sql): run SQL against a synthetic payments database`,
    `- [Dashboard demo](${site}/dashboard): a product dashboard on synthetic data`,
    `- [PRD builder](${site}/prd-builder): draft a product requirements document in markdown`,
    `- [Worked examples](${site}/examples): finished user stories, a Gherkin spec and UAT test cases for a bill fetch and pay flow`,
    `- [Quiz](${site}/quiz) and [flashcards](${site}/flashcards): test yourself on Bharat Connect`,
    "",
    "## Open-source repositories",
    ...projects.map((p) => `- [${p.name}](https://github.com/Abhishek-Singla/${p.repo}): ${p.blurb}`),
    "",
    "## Contact",
    `- Email: ${profile.email}`,
    `- LinkedIn: ${profile.linkedin}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
