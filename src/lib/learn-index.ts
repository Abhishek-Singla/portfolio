// Chapter list that is safe to import from client components (no file-system access).
export const learnDocs = [
  { slug: "ecosystem", title: "The ecosystem: who is who", blurb: "Who is who in Bharat Connect: the central unit, operating units, agents, billers and sponsor banks." },
  { slug: "fetch-and-pay", title: "Bill fetch and bill pay", blurb: "What the rules say about fetching a bill and paying it, with a simplified sequence and design points." },
  { slug: "onboarding", title: "Biller onboarding", blurb: "How a biller joins the network, the stated timelines, and the due diligence required of a BOU." },
  { slug: "settlement-and-reconciliation", title: "Settlement and reconciliation", blurb: "Clearing, settlement, escrow rules, disputes, and reconciliation as a practice." },
  { slug: "glossary", title: "Glossary", blurb: "The terms used in the notes, marked by whether they come from RBI, NBBL or industry usage." },
  { slug: "sources", title: "Sources and limits", blurb: "What was read, what could not be read, and where the notes are my own explanation." },
] as const;
