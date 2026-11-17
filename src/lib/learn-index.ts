// Chapter list that is safe to import from client components (no file-system access).
// `updated` is the date the chapter text was last changed. Change it when you edit a chapter.
export const learnDocs = [
  { slug: "ecosystem", title: "The ecosystem: who is who", updated: "18 Nov 2026", blurb: "Who is who in Bharat Connect: the central unit, operating units, agents, billers and sponsor banks." },
  { slug: "fetch-and-pay", title: "Bill fetch and bill pay", updated: "18 Nov 2026", blurb: "What the rules say about fetching a bill and paying it, with a simplified sequence and design points." },
  { slug: "onboarding", title: "Biller onboarding", updated: "18 Nov 2026", blurb: "How a biller joins the network, the stated timelines, and the due diligence required of a BOU." },
  { slug: "settlement-and-reconciliation", title: "Settlement and reconciliation", updated: "18 Nov 2026", blurb: "Clearing, settlement, escrow rules, disputes, and reconciliation as a practice." },
  { slug: "complaints", title: "Complaints and disputes", updated: "18 Nov 2026", blurb: "The official complaint framework, the complaint message family, and design points for agents." },
  { slug: "failure-patterns", title: "Failure patterns at the BOU layer", updated: "18 Nov 2026", blurb: "Five ways transactions fail at the last mile and three product interventions, from my April 2026 article." },
  { slug: "payment-rails", title: "Payment rails: NEFT, RTGS, IMPS and UPI", updated: "18 Nov 2026", blurb: "How India's four main bank-transfer rails are built, and which fits which job." },
  { slug: "glossary", title: "Glossary", updated: "18 Nov 2026", blurb: "The terms used in the notes, marked by whether they come from RBI, NBBL or industry usage." },
  { slug: "sources", title: "Sources and limits", updated: "18 Nov 2026", blurb: "What was read, what could not be read, and where the notes are my own explanation." },
] as const;
