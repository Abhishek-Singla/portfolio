// All content comes from your resume. Edit here to update the site.
export const profile = {
  name: "Abhishek Singla",
  role: "Product Owner · Payments & BBPS",
  specialty: "Biller onboarding, settlement and reconciliation",
  headline: ["I turn payment friction", "into product momentum."],
  intro:
    "Product Owner and Business Analyst with 2+ years inside the BOU layer of Bharat Connect. I run the full lifecycle, from discovery and PRDs to release, and I let the metrics decide what ships next.",
  email: "abhishek.singla014@gmail.com",
  linkedin: "https://linkedin.com/in/abhishek-singla-pm",
  location: "Bhubaneswar, Odisha",
  resume: "/resume.pdf",
  activity: "https://www.linkedin.com/in/abhishek-singla-pm/recent-activity/all/",
  bookingUrl: "", // paste a Cal.com or Calendly link to turn the button into a real booking page
  followers: "5,000+",
  openTo: "Open to Associate Product Manager and Product Owner roles in payments, UPI, lending and banking technology.",
};

// Detailed product work. These are the four portfolio projects on your Upwork profile.
export const work = [
  {
    title: "Cross-functional Product Enablement & Support Ticket Reduction",
    slug: "cross-functional-enablement",
    tag: "Go-to-market · Agent UX",
    role: "Product Manager",
    problem: "Product-related support tickets were high because sales and support teams could not confidently explain new releases and agent-facing errors to non-technical BC agents.",
    did: "Led a cross-functional initiative: a maintained human-readable error classification dictionary, enablement sessions for sales and support, structured agent-facing communication for new releases, and a closed-loop process linking ticket analysis to the product backlog.",
    result: [
      "40% fewer product-related support tickets within one quarter of rollout",
      "Training sessions reaching the full sales and support organisation",
      "Quarterly error dictionary review tied to the top ticket categories",
    ],
    skills: ["Product Development", "Go-to-Market Strategy", "Stakeholder Management", "Agile"],
    lesson: "The surface area of a product is bigger than its feature list. Every string of text is a product decision.",
  },
  {
    title: "Reducing BBPS Transaction Failure Rate by 15%",
    slug: "bbps-failure-rate",
    tag: "Reliability · BBPS BOU",
    role: "Associate Product Manager, BBPS BOU Product",
    problem: "On a high-transaction BOU on Bharat Connect, structural failure patterns drove failures: biller API timeout mismatches, account number format drift and agent-layer UX debt.",
    did: "Found the patterns through transaction log analysis, stakeholder interviews and competitor benchmarking, then turned them into prioritised PRDs with acceptance criteria, working with engineering and QA across several sprints. The solution covered biller reliability tiering, format anomaly detection, the error dictionary and a transaction health dashboard.",
    result: [
      "15% lower transaction failure rate through reliability tiering and adaptive timeout logic",
      "38% fewer bill fetch failures",
      "Format-drift detection lag cut from 2-3 weeks to under 24 hours via automated alerting",
      "80% first-time-right deployment with zero rollbacks",
    ],
    skills: ["Product Analytics", "FinTech", "Sprint Planning", "API Documentation"],
    lesson: "Instrument first. You cannot tier billers you are not measuring.",
  },
  {
    title: "Building a Product Performance Dashboard for Data-Driven Prioritisation",
    slug: "performance-dashboard",
    tag: "Analytics · Product operations",
    role: "Product Manager / Product Operations Lead",
    problem: "With no real-time product visibility, sprint planning was reactive and issues were detected late.",
    did: "Designed a dashboard tracking five core KPIs: transaction failure rate, first-time-right deployment rate, support ticket volume and SLA, uptime and bug reporting rate. Added biller-level drill-down, standard Confluence reporting templates and a weekly review cadence.",
    result: [
      "The primary tool for weekly product and engineering leadership reviews",
      "Biller API degradation caught within hours instead of after incident escalation",
      "30% better documentation retrieval across the team",
    ],
    skills: ["Dashboard Design", "Data Analysis", "Confluence", "Agile"],
    lesson: "A dashboard is an input to investigation, not an output to admire.",
  },
  {
    title: "Agile Product Documentation & Backlog Management",
    slug: "agile-documentation",
    tag: "Delivery · Documentation",
    role: "Business Analyst / Product Owner",
    problem: "Parallel feature workstreams on a B2B fintech platform needed consistent requirements, documentation and delivery workflows across offshore engineering and QA.",
    did: "Set up the requirements intake process, Jira story architecture, a Confluence knowledge base, an offshore coordination process and demo feedback loops. Wrote user stories with precise acceptance criteria, ran backlog grooming and sprint planning, and produced PRDs, release notes and feature specifications.",
    result: [
      "Full BRD-to-delivery traceability across active workstreams with zero sprint-level ambiguity",
      "80% first-time-right build rate with zero rollbacks",
      "30% faster documentation retrieval from a centralised Confluence repository",
      "Higher stakeholder visibility and team velocity from better Agile documentation standards",
    ],
    skills: ["Jira", "User Stories", "Product Backlog", "Scrum"],
    lesson: "",
  },
];

// Writing, taken from your LinkedIn posts. Links go to your activity feed until you add per-post URLs.
export const writing = [
  { title: "Bharat Connect under the hood: a routing and settlement model, not a payment rail", date: "17 Nov 2026", excerpt: "A four-party hub-and-spoke network, signed XML message families, 35-character reference IDs and how settlement really works.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7528291302803808256/" },
  { title: "A prediction for Bharat Connect over the next 12 months", date: "27 Jun 2026", excerpt: "The biggest BBPS news won't be a new category. It will be a network-level reliability standard.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7476492027237429248/" },
  { title: "The Three Lanes: a prioritisation framework for payments", date: "25 Jun 2026", excerpt: "Failure prevention, failure transparency, failure-adjacent growth. Most BOU roadmaps fund the first and third and forget the second.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7475737068531363840/" },
  { title: "The most expensive product debt is in the biller spreadsheet", date: "24 Jun 2026", excerpt: "Why the biller integration tracker is a product surface that nobody owns.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7475382224226263041/" },
  { title: "Things I got wrong as a PM in my first year", date: "20 Jun 2026", excerpt: "Consensus is not correctness, engineers scan PRDs, and the PM job is mostly saying no gracefully.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7473955308084559872/" },
  { title: "Six months ago I shipped an error message change", date: "18 Jun 2026", excerpt: "One sentence cut support tickets and lifted agent satisfaction. Your product is bigger than you think.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7473200326645448704/" },
  { title: "Nobody writes about the agent layer", date: "17 Jun 2026", excerpt: "The BC agent is the highest-volume BBPS user and the most under-designed-for.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7472845524728037378/" },
];

// Verbatim pull-quotes from your LinkedIn posts, with the post date.
export const quotes = [
  { text: "Lane 2 is what customers and agents are actually screaming about, but no one is listening because Lane 2 work doesn't show up in revenue dashboards.", post: "The Three Lanes", date: "25 Jun 2026", url: "https://www.linkedin.com/feed/update/urn:li:activity:7475737068531363840/" },
  { text: "Every string of text the user sees is a product decision.", post: "Six months ago I shipped an error message change", date: "18 Jun 2026", url: "https://www.linkedin.com/feed/update/urn:li:activity:7473200326645448704/" },
  { text: "The spreadsheet is a product — it just doesn't have a PM.", post: "The biller spreadsheet", date: "24 Jun 2026", url: "https://www.linkedin.com/feed/update/urn:li:activity:7475382224226263041/" },
  { text: "The agent is the highest-volume user of BBPS in India.", post: "The agent layer", date: "17 Jun 2026", url: "https://www.linkedin.com/feed/update/urn:li:activity:7472845524728037378/" },
  { text: "The PM job is mostly saying no, gracefully, with reasons.", post: "Things I got wrong in my first year", date: "20 Jun 2026", url: "https://www.linkedin.com/feed/update/urn:li:activity:7473955308084559872/" },
  { text: "The next chapter of Bharat Connect isn't about more billers. It's about reliability becoming a network-level product, not a BOU-level afterthought.", post: "A prediction for the next 12 months", date: "27 Jun 2026", url: "https://www.linkedin.com/feed/update/urn:li:activity:7476492027237429248/" },
];

export const resumes = [
  { name: "Full resume", file: "/resume.pdf", web: "/resume", note: "Every role, including the early research internship and content work." },
  { name: "Product-focused resume", file: "/resume-relevant.pdf", web: "/resume/relevant", note: "Product, payments and banking roles only. The same bullets and numbers, one page shorter on the early roles." },
];

export const approach = [
  ["Fund all three lanes", "Prevent failures, make the unavoidable ones understandable, then grow. A roadmap with no failure-transparency column buys a support problem two quarters later."],
  ["Design for the agent, not the imagined user", "Most BBPS volume runs through assisted channels on cheap devices and patchy networks. Speed, plain language and visible status are features."],
  ["Instrument before you argue", "Failure rates by biller, response-time distributions and reconciliation exceptions already sit in the logs. Evidence beats ticket volume."],
  ["PRDs serve the three Slack messages", "Write for scanning. Acceptance criteria carry the weight; the PRD exists to make follow-up questions shorter."],
  ["Say no, gracefully, with reasons", "Shipping twelve small things is not progress. One high-leverage change usually beats them."],
];

export const templates = [
  ["PRD", "prd.md", "Problem, users, scope, requirements and success metrics"],
  ["BRD", "brd.md", "Business needs and approvals before a PRD"],
  ["User story", "user-story.md", "One story with acceptance criteria and edge cases"],
  ["UAT test cases", "uat-test-cases.md", "Business sign-off tests before release"],
  ["Release notes", "release-notes.md", "What changed, for users and support teams"],
  ["Gherkin spec", "gherkin-template.md", "Behaviour specs frontend and backend can build against"],
];

// Bharat Connect flow, from your LinkedIn article and architecture post.
export const bbpsFlow = [
  { id: "customer", name: "Customer", role: "Initiates a bill payment through an app, bank or agent.", failures: [["Duplicate payment anxiety", "A pending payment gets retried, and the original later succeeds.", "Proactive duplicate detection with intelligent retry logic."]] },
  { id: "cou", name: "COU", role: "Customer Operating Unit: the app, bank or BC agent network. Builds requests and presents bills.", failures: [["Agent usability debt", "Engineering codes like TXN_FAIL_BILLER_TIMEOUT reach agents who cannot explain them.", "A maintained error dictionary with plain-language messages and a next action."]] },
  { id: "bbpcu", name: "BBPCU (NPCI)", role: "The central unit. Routes by biller, tracks transaction state, runs clearing and net settlement, hosts complaints.", failures: [["Pending states", "Unconfirmed payments depend on status polling and reversal rules.", "Reliable status handling at the BOU, so polling resolves quickly."]] },
  { id: "bou", name: "BOU", role: "Biller Operating Unit. Maps network messages to each biller's system and owns onboarding, bill fetch and payment confirmation.", failures: [["Bill fetch timeouts", "Billers breach the usual 5-7 second SLA and the consumer sees a failure.", "Biller reliability tiers with adaptive timeouts and cached-bill fallback."], ["Account format drift", "Billers change account number formats and the BOU finds out after failures spike.", "Per-biller validation-failure alerts and a quick rule-update interface."], ["Reconciliation gaps", "Duplicate IDs, inconsistent timestamps and delayed settlement files.", "Design reconciliation into the product instead of leaving it to ops."]] },
  { id: "biller", name: "Biller", role: "The system of record for the consumer's bill, such as a utility or insurer.", failures: [["Unreliable APIs", "State-owned and legacy billers vary widely in response time and stability.", "Profile every biller over a rolling 30 days and tier them."]] },
];

export const metricsTree = {
  goal: "Transactions that complete reliably and are understandable when they don't",
  branches: [
    { name: "Delivery quality", metrics: ["First-time-right deployment rate", "Rollback incidents"] },
    { name: "Reliability", metrics: ["Transaction failure rate", "Uptime", "Failure rate by biller tier"] },
    { name: "Support load", metrics: ["Support ticket volume", "Agent-initiated tickets"] },
    { name: "Sentiment", metrics: ["NPS", "CSAT"] },
  ],
};

// Illustrative PRD written for this site, based on the error-message work. Names and figures are generic.
export const prdExample = {
  title: "Plain-language error dictionary for agent-facing screens",
  note: "Illustrative PRD. It shows how I structure one, using the error-message work as the subject.",
  sections: [
    ["Problem", "Agent screens show internal error codes. Agents cannot explain them to customers, so they raise tickets or retry blindly, which also risks duplicate payments."],
    ["Users", "BC agents and CSPs on low-cost Android devices and patchy networks, handling many financial products per day."],
    ["Goals", "Every failure shows a plain-language reason and one clear next action. Support tickets about unclear failures fall."],
    ["Non-goals", "Changing the underlying failure rate, redesigning the whole agent app, or adding new languages in this release."],
    ["Requirements", "R1. Map every internal error code to a message and an action. R2. Show the message on the transaction result and history screens. R3. Keep the dictionary in the product system, owned by product, not hard-coded. R4. Review it quarterly against the top ticket categories."],
    ["Acceptance criteria", "Given a bill fetch times out, when the agent sees the result, then the message says the biller did not respond in time and tells them to wait 30 seconds and retry. Given an unmapped code, then a safe generic message is shown and the code is logged for review."],
    ["Success metrics", "Agent-initiated tickets (primary), total support ticket volume, repeat attempts after a failure, agent satisfaction. Transaction success rate is tracked as a guardrail and expected not to move."],
    ["Rollout and risks", "Release behind a flag to a small agent cohort first. Risk: a wrong message sends agents in the wrong direction, so each message is reviewed with support before launch."],
  ] as [string, string][],
};

export const roleFit = {
  roles: ["Associate Product Manager", "Product Owner"],
  domains: ["Payments", "UPI", "Lending", "Banking technology"],
  strengths: ["PRDs, BRDs and user stories with acceptance criteria", "Backlog prioritisation and release management", "Product analytics with SQL and KPI dashboards", "Working with offshore engineering and QA"],
};

export const now = [
  "Writing about Bharat Connect architecture and BOU product strategy on LinkedIn.",
  "Working through Tutedude courses in Data Analytics (SQL), Power BI and Financial Modelling.",
  "Applying generative AI tools to PRD, BRD and reporting workflows.",
];

export const certifications = [
  { name: "Risk Management", issuer: "Tutedude", status: "Completed" },
  { name: "Data Analytics (SQL)", issuer: "Tutedude", status: "In progress" },
  { name: "Power BI", issuer: "Tutedude", status: "In progress" },
  { name: "Financial Modelling & Financial Risk Management", issuer: "Tutedude", status: "In progress" },
];

export const stats = [
  { value: "80%", label: "First-time-right deployments", note: "zero rollback incidents" },
  { value: "40%", label: "Fewer support tickets", note: "cross-functional training" },
  { value: "15%", label: "Lower transaction failures", note: "competitor benchmarking" },
  { value: "20%", label: "Lower UAT failure rates", note: "across BBPS releases" },
];

export const impact = [
  ["Deployment quality", "80% First-Time-Right rate with zero rollback incidents, coordinating offshore engineering and QA."],
  ["Support load", "40% fewer product-related support tickets after cross-functional training for sales and support teams."],
  ["Release quality", "20% lower UAT failure rates across BBPS releases."],
  ["Transaction reliability", "15% reduction in failure rate from competitor benchmarking and prioritised fixes."],
  ["Decision dashboard", "Real-time dashboard tracking 5+ KPIs, used daily by product and engineering leadership."],
  ["Knowledge base", "Standardised PRD, BRD and sprint templates in Confluence, lifting retrieval by 30%."],
];

export const experience = [
  {
    role: "Associate Product Manager, Payments & BBPS Infrastructure",
    org: "iServeU",
    meta: "Full-time · On-site · Bhubaneswar",
    period: "Aug 2024 – Present",
    points: [
      "Worked on BBPS (Bharat Connect) infrastructure as a BOU, owning product specifications across bill fetch flows, transaction lifecycle management, agent UX and reconciliation.",
      "Achieved an 80% First-Time-Right build rate with zero rollback incidents by coordinating structured requirements delivery with offshore engineering and QA.",
      "Reduced transaction failure rates by 15% through tier-based timeout logic, validation monitoring and competitor benchmarking.",
      "Cut product-related support tickets by 40% after cross-functional training for sales and support teams.",
      "Authored PRDs and BRDs across BBPS integrations, API flows and recurring payments architecture, with full traceability to deployment in Jira.",
      "Maintained working knowledge of NPCI BBPS operational guidelines, RBI payment system directives and PMLA compliance requirements.",
      "Built a real-time KPI dashboard tracking 5+ metrics (FTR, uptime, ticket volume, NPS) used by product and engineering leadership for sprint prioritisation.",
      "Standardised PRDs, BRDs and sprint templates in Confluence, improving cross-team knowledge retrieval by 30%.",
      "Applied generative AI tools to PRD/BRD writing and reporting workflows, reducing documentation turnaround by 40%.",
    ],
  },
  {
    role: "Management Trainee",
    org: "iServeU",
    meta: "Internship · Bhubaneswar",
    period: "May 2024 – Aug 2024",
    points: [
      "Supported roadmap development and sprint backlog prioritisation alongside senior PMs.",
      "Conducted user feedback analysis and customer journey evaluations to surface enhancement opportunities.",
      "Facilitated alignment between business, engineering and QA to resolve dependencies and keep sprints moving.",
    ],
  },
  {
    role: "Summer Intern",
    org: "India Post Payments Bank",
    meta: "Internship · Rourkela",
    period: "May 2023 – Jul 2023",
    points: [
      "Collected and analysed customer insights to improve digital banking adoption.",
      "Contributed to campaigns impacting 2,000+ users and supported product communication strategies using customer data.",
    ],
  },
];

export const caseStudies = [
  {
    tag: "Notion · Product thinking",
    title: "AI-Augmented Product Management",
    desc: "How I use AI to ship faster, decide smarter, and document better, with three areas of the product loop where it produced measurable impact.",
    url: "https://abhishek-singla-pm.notion.site/AI-Augmented-Product-Management-36f8f771bb7d818fb945c22e925cdabb",
  },
  {
    tag: "Notion · Case study · April 2026",
    title: "BBPS Last-Mile Failures: A Product Teardown",
    desc: "Why bill payments fail at India's last mile: the structural failure patterns, root causes, and product-led interventions inside Biller Operating Units.",
    url: "https://abhishek-singla-pm.notion.site/BBPS-Last-Mile-Failures-A-Product-Teardown-34e8f771bb7d8111a9efea7f778a9917",
  },
  {
    tag: "LinkedIn · Article · April 2026",
    title: "Bharat Connect Is Evolving Fast. Here's What Every BOU Product Team Needs to Know",
    desc: "The rebrand, the scale, five BOU-fixable failure patterns, three product interventions, and what UPMS, new biller categories and cross-border payments mean for BOU roadmaps.",
    url: "https://www.linkedin.com/pulse/bharat-connect-evolving-fast-heres-what-every-bou-product-singla-rvb7c/",
  },
];

export const skills = [
  ["Product Management", ["Product Lifecycle", "PRD & BRD Writing", "User Story Mapping", "Backlog Prioritisation", "Feature Roadmapping", "Feature Rollouts", "Go-to-Market Support", "Release Management"]],
  ["Business Analysis", ["Requirements Gathering", "Acceptance Criteria", "Process Optimisation", "As-Is / To-Be Modelling", "Gap Analysis", "UAT Support", "Stakeholder Workshops"]],
  ["Product Analytics", ["KPI Definition & Tracking", "Dashboard Design", "Feature Performance", "Customer Journey Mapping", "User Feedback Analysis", "Competitor Benchmarking", "NPS & CSAT"]],
  ["Agile & Delivery", ["Agile & Scrum", "Sprint Planning & Grooming", "Cross-functional Collaboration", "Stakeholder Management", "SLA & KPI Monitoring", "SDLC", "Offshore Coordination"]],
  ["Tools", ["Jira", "Confluence", "Figma", "SQL", "Advanced Excel", "Zoho"]],
] as [string, string[]][];

export const education = [
  { degree: "MBA, Finance & Marketing", school: "NIT Rourkela", note: "Institute of National Importance", period: "Jul 2022 – May 2024", score: "CGPA 7.94" },
  { degree: "B.E., Computer Science & Engineering", school: "Chitkara University, Rajpura", note: "", period: "Aug 2017 – Jun 2021", score: "CGPA 7.51" },
];

export const learning = "In progress: Data Analytics (SQL), Power BI, Financial Modelling & Risk Management.";

// Deep-dive detail for each project, keyed by slug. Drawn from your Upwork portfolio write-ups.
export const workDetails: Record<string, { context: string; approach: string[]; built: string[]; different?: string }> = {
  "cross-functional-enablement": {
    context: "Sales and support teams had to explain new releases and raw engineering error codes to non-technical BC agents, and many product-related support tickets came from that gap. Cross-functional training closed it: product-related tickets fell by 40%.",
    approach: [
      "Analysed ticket categories and found agent-facing UX was the largest single source.",
      "Built a maintained, human-readable error classification dictionary.",
      "Ran enablement sessions so sales and support could explain new features themselves.",
      "Designed structured agent-facing communication for each release.",
      "Closed the loop: ticket analysis feeds directly into backlog items.",
    ],
    built: [
      "Error classification dictionary, reviewed quarterly against the top ticket categories",
      "Training sessions reaching the full sales and support organisation",
      "Release communication format for agent-facing changes",
      "Feedback intake process linking support tickets to the backlog",
    ],
  },
  "bbps-failure-rate": {
    context: "As a Biller Operating Unit on Bharat Connect, the platform lost transactions to structural patterns: biller API timeout mismatches, account number format drift and agent-layer UX debt.",
    approach: [
      "Mined transaction logs for failure patterns by biller.",
      "Interviewed stakeholders and benchmarked competing payment platforms.",
      "Turned findings into prioritised PRDs with acceptance criteria.",
      "Delivered with engineering and QA across several sprint cycles.",
    ],
    built: [
      "Biller reliability tiering with adaptive timeout logic",
      "Automated anomaly alerting for account-format drift",
      "Plain-language error dictionary",
      "Transaction health dashboard",
    ],
  },
  "performance-dashboard": {
    context: "Without real-time product visibility, sprint planning was reactive and problems surfaced only after incidents escalated.",
    approach: [
      "Named the missing visibility as the root cause of reactive planning.",
      "Defined five core KPIs and agreed their meaning with leadership.",
      "Added biller-level drill-down so a dip could be traced to its source.",
      "Standardised Confluence reporting templates and set a weekly review cadence.",
    ],
    built: [
      "KPI framework: failure rate, first-time-right, ticket volume and SLA, uptime, bug reporting rate",
      "Biller-level drill-down",
      "Confluence reporting templates",
      "Weekly product and engineering review cadence",
    ],
  },
  "agile-documentation": {
    context: "Parallel feature workstreams on a B2B fintech platform needed consistent requirements, documentation and delivery workflows across offshore engineering and QA.",
    approach: [
      "Set up a requirements intake process so every request arrived in the same shape.",
      "Designed the Jira story architecture and managed sprint-level backlogs.",
      "Ran backlog grooming and sprint planning with acceptance criteria on every story.",
      "Built an offshore coordination process and demo feedback loops.",
    ],
    built: [
      "Jira story architecture and sprint backlogs",
      "Confluence knowledge base of PRDs, release notes and feature specs",
      "Offshore coordination process",
      "Demo feedback loop",
    ],
  },
};

// Plain-language glossary, from your Bharat Connect posts and article.
export const glossary: [string, string][] = [
  ["Bharat Connect (BBPS)", "The national platform for bill payments in India, formerly the Bharat Bill Payment System. It is run by NPCI Bharat BillPay Limited (NBBL), which now operates under the Bharat Connect name. RBI announced the rebrand at Global Fintech Fest 2024."],
  ["NPCI and NBBL", "NPCI is the National Payments Corporation of India. NBBL, its subsidiary, operates Bharat Connect and sets its standards."],
  ["BBPCU", "The central unit run by NPCI. It routes transactions by biller, tracks their state, runs clearing and net settlement, and hosts complaint management."],
  ["BOU (Biller Operating Unit)", "The operating unit that connects billers to the network. It maps the network's standard messages to each biller's own system and owns biller onboarding, bill fetch and payment confirmation."],
  ["COU (Customer Operating Unit)", "The customer-facing operating unit: an app, bank or agent network. It builds payment requests and presents bills to customers."],
  ["Biller", "The organisation owed the payment, such as an electricity board or an insurer. It holds the system of record for the customer's bill."],
  ["BC agent and CSP", "Business correspondent agents and customer service points. Assisted-channel agents who handle bill payments for customers, often on low-cost devices and patchy networks."],
  ["Bill fetch", "Pulling a real-time or cached bill from the biller's system when a customer starts a payment. Per biller, fetch can be mandatory, optional or not supported."],
  ["Ad-hoc payment", "Paying without a fetched bill. Each biller either accepts it or not. For billers that require a fetch, an amount rule applies: exact, exact and above, or exact and below the fetched bill."],
  ["MDM (master data)", "The shared reference data that keeps every operating unit's view of billers and plans in sync: Biller MDM, Agent MDM, Plan MDM and Biller Status APIs."],
  ["Reference ID", "A 35-character alphanumeric ID: 27 random characters, a 4-character Julian date (YDDD) and a 4-character time (HHMM). One ID chains the request and response and follows the transaction end to end."],
  ["Deemed success", "A per-biller setting. If the BOU times out or sends a malformed response, the central unit marks the transaction as deemed success and settles it as a success."],
  ["Reversal and force closure", "The rules that apply to an unconfirmed payment for billers without deemed success enabled."],
  ["Status messages (401 and 402)", "Message types for checking a transaction's state. 402 lets the central unit poll the BOU about pending payments. 401 lets an operating unit query a transaction's status."],
  ["Nodal or sponsor bank account", "Bharat Connect does not carry funds itself. Funds go straight into the acquiring COU's nodal or sponsor bank account, with no intermediate hop."],
  ["Settlement guarantee fund", "A fund that backs the system if a participant defaults."],
  ["UPMS", "The Unified Presentment Management System launched by NPCI for recurring payments. Customers set standing instructions for any payment mode, which moves part of the payment logic from one-time flows to standing-instruction flows."],
  ["Biller reliability tier", "A grouping of billers (high, medium, low) based on their API response-time history over a rolling window. Each tier gets its own timeout and fallback rules."],
  ["First-time-right (FTR)", "The share of deployments that work at the first attempt, with no rework or rollback."],
  ["PRD and BRD", "A product requirements document describes what to build and why, with acceptance criteria. A business requirements document captures the business need and approvals before that."],
];

// Regulatory and ecosystem watch, compiled from your LinkedIn posts and article.
export const watch = [
  { when: "Apr 2026", title: "Postal Life Insurance goes live on Bharat Connect", body: "PLI, with over 1.25 crore policyholders, went live with State Bank of India as the BOU. The insurance category now has 65 billers.", why: "A single biller with this reach changes the stakes: a failed premium can lapse cover." },
  { when: "2026", title: "National Pension System added as a biller category", body: "NBBL partnered with PFRDA to bring NPS onto the platform.", why: "Every new category brings its own API behaviour, account formats and reconciliation quirks." },
  { when: "Recent", title: "UPMS launched for recurring payments", body: "NPCI's Unified Presentment Management System lets customers set standing instructions for any payment mode.", why: "BOUs must handle registration, presentment scheduling and auto-debit state, not only on-demand fetch and pay." },
  { when: "Jun 2026", title: "Viyona Fintech certified as a BOU", body: "The Hyderabad firm received NPCI certification as a Biller Operating Unit, its fifth NPCI certification.", why: "More BOUs means more on-ramps for the same billers, so keeping presentment data consistent gets harder." },
  { when: "Jun 2026", title: "jUMPP live on BBPS bill payments", body: "jUMPP went live on bill payments through a YES Bank tie-up, alongside its NPCI approval as a UPI third-party app provider.", why: "Another wealth-management app turning into a payments super-app." },
  { when: "Jun 2026", title: "Cross-border corridors plateau", body: "Live markets are Kuwait, Oman, UAE, Bahrain and Canada. The UK and Singapore, flagged as next in 2023, were still pending.", why: "Cross-border billers run across several time zones and settlement clocks, so they need their own reliability tier." },
  { when: "2024", title: "RBI Master Directions 2024", body: "RBI updated the regulatory framework for Bharat Connect. For non-bank BOUs it reinforces escrow governance, uptime requirements and dispute-resolution integration.", why: "Compliance reviews should include a fresh read of the directions." },
  { when: "2024", title: "BBPS becomes Bharat Connect", body: "The rebrand was announced at Global Fintech Fest 2024 and signals a shift from utility bills to a full recurring-payments platform.", why: "The new name is appearing in regulatory documents and partner agreements." },
];

// About story, adapted from your Notion portfolio draft.
export const about = {
  lead: "Most people don't know what happens after they tap Pay on their electricity bill. I do.",
  paragraphs: [
    "I work on the infrastructure that makes that tap work: Bharat Connect (formerly BBPS), the platform that processes billions of bill payments across 22,000+ billers and 25+ categories in India. Inside it, I work at the BOU layer, the integration tier that absorbs biller-side instability before it reaches the customer.",
    "I came to this from an unusual angle: an engineering undergrad, a fintech-focused MBA at NIT Rourkela, and an India Post Payments Bank internship that made me realise how much of payments product work is about failure recovery, not feature shipping. Two-plus years at iServeU later, I have spent most of my time in the messy middle of BBPS, where bill fetch timeouts, format drift, agent UX and reconciliation all collide.",
    "I write about how Bharat Connect actually works at the BOU layer, the failure patterns product teams miss, and what it takes to build payments products for the agent layer, not just the consumer.",
  ],
  path: [
    ["B.E., Computer Science", "Chitkara University, 2017–2021"],
    ["MBA, Finance & Marketing", "NIT Rourkela, 2022–2024"],
    ["Payments product", "iServeU, 2024–now"],
  ] as [string, string][],
  portrait: "/portrait.jpg",
};

// Public GitHub repositories (all checked as publicly reachable).
export const projects = [
  { name: "bbps-explained", repo: "bbps-explained", blurb: "Plain-language notes on how Bharat Connect works, written from a product manager's point of view and checked against official sources.", points: ["Ecosystem, bill fetch and pay, biller onboarding, settlement and reconciliation", "Glossary and a sources file"], tags: ["Documentation", "BBPS"] },
  { name: "reconciliation-demo", repo: "reconciliation-demo", blurb: "A runnable demo of merging daily files, removing duplicates, proving the result is right and reconciling against a second source. Synthetic data only.", points: ["Tests against injected duplicates and four kinds of settlement break", "Independent deep check; a failed check leaves a marker file"], tags: ["Python", "Reconciliation"] },
  { name: "payments-sql-practice", repo: "payments-sql-practice", blurb: "Thirteen graded SQL questions on a synthetic payments database, from basic grouping to reconciliation and window functions.", points: ["5,000 transactions, 12 billers, settlements and complaints", "Every solution checked against an independent calculation"], tags: ["SQL", "Analytics"] },
  { name: "pm-templates", repo: "pm-templates", blurb: "Blank, reusable templates for day-to-day product work: PRD, BRD, user story, UAT test cases, release notes and a Gherkin spec.", points: ["No company or customer data", "The same templates you can download on this site"], tags: ["Product", "Templates"] },
  { name: "job-hunt-toolkit", repo: "job-hunt-toolkit", blurb: "The generic, reusable parts of a structured job search: a fit-scoring rubric, a ledger schema, tracker columns and a check that a short resume only uses lines from the full master.", points: ["Tailoring selects and reorders; it never invents", "Drafts stop at drafts: a human sends everything"], tags: ["Workflow", "Python"] },
  { name: "claude-code-windows-patterns", repo: "claude-code-windows-patterns", blurb: "Four small, reusable patterns for recurring, Claude-assisted work on a Windows machine with Task Scheduler.", points: ["Skip, don't destroy; scan before you publish", "Leave evidence; keep steps idempotent"], tags: ["Automation", "AI"] },
  { name: "linkedin-activity-audit", repo: "linkedin-activity-audit", blurb: "A Claude skill that audits a LinkedIn account through the Claude in Chrome extension and writes a dated report.", points: ["Read-only by default", "Shows what will be affected before any change you ask for"], tags: ["AI skill", "Automation"] },
];

// Payments SQL practice: questions and solutions from your payments-sql-practice repo.
export const sqlPractice = {
  repo: "payments-sql-practice",
  intro: "Thirteen graded questions on a synthetic payments database: 12 billers, 500 customers and 5,000 transactions over 90 days. Amounts are in paise. Try each query before revealing the solution.",
  levels: [
    ["Level 1: filtering, grouping, joins", ["Count transactions in each status, most common first", "Total successful amount in rupees per biller category", "Failure rate (percent, 2 decimals) per channel"]],
    ["Level 2: rates, subqueries, windows", ["Top 3 billers (at least 100 transactions) by failure rate", "Successful transactions per day with a running total", "Failure reasons for the biller with the highest failure rate", "Customers with at least 3 failed transactions"]],
    ["Level 3: reconciliation and product analytics", ["Successful transactions with no settlement, by date", "Settled transactions whose amount differs from the transaction", "Average settlement lag in days per category", "Top 5 billers by complaints per 1,000 transactions", "Highest successful amount per biller in each category", "Monthly active customers and first-time transactors"]],
  ] as [string, string[]][],
  questions: [
    { n: 3, q: "What is the failure rate (percent, 2 decimals) per channel?", skills: "Conditional aggregation", sql: "SELECT channel,\n       ROUND(100.0 * SUM(status = 'FAILED') / COUNT(*), 2) AS failure_pct\nFROM transactions\nGROUP BY channel\nORDER BY failure_pct DESC;", note: "In the data, outlet transactions fail more than app transactions. That is a planted pattern, and the point of the question." },
    { n: 5, q: "Show successful transactions per day with a running total.", skills: "Window function: SUM() OVER", sql: "SELECT d, n, SUM(n) OVER (ORDER BY d) AS running_total\nFROM (\n    SELECT date(txn_ts) AS d, COUNT(*) AS n\n    FROM transactions\n    WHERE status = 'SUCCESS'\n    GROUP BY date(txn_ts)\n)\nORDER BY d;", note: "Aggregate to one row per day first, then run the window over those rows." },
    { n: 8, q: "How many successful transactions have no settlement, by transaction date?", skills: "Anti-join", sql: "SELECT date(t.txn_ts) AS txn_date, COUNT(*) AS unsettled\nFROM transactions t\nLEFT JOIN settlements s USING (txn_id)\nWHERE t.status = 'SUCCESS' AND s.txn_id IS NULL\nGROUP BY date(t.txn_ts)\nORDER BY txn_date;", note: "The most recent days look unsettled because settlement runs a day or two behind, not because anything is broken. A good analyst separates \"not yet due\" from \"missing\"." },
    { n: 12, q: "Which biller has the highest successful amount in each category?", skills: "CTE and RANK()", sql: "WITH per_biller AS (\n    SELECT b.category, b.biller_id, SUM(t.amount_paise) AS success_paise\n    FROM transactions t\n    JOIN billers b USING (biller_id)\n    WHERE t.status = 'SUCCESS'\n    GROUP BY b.category, b.biller_id\n),\nranked AS (\n    SELECT *, RANK() OVER (PARTITION BY category ORDER BY success_paise DESC) AS rk\n    FROM per_biller\n)\nSELECT category, biller_id, success_paise\nFROM ranked\nWHERE rk = 1\nORDER BY category;", note: "RANK() keeps ties, so a category can return more than one biller." },
  ],
};

// Payment rails: a plain-language comparison. Numeric limits are left out on purpose because they change.
export const rails = {
  intro: "Four ways money moves between bank accounts in India, and how each one is built. The differences explain why a product feels instant, scheduled or final.",
  rows: [
    { name: "NEFT", operator: "RBI", model: "Deferred net settlement in batches", feel: "Reaches the beneficiary after the next batch settles", best: "Routine transfers where a short wait is fine", architecture: "Banks send payment files. RBI settles the net positions between banks at the end of each batch." },
    { name: "RTGS", operator: "RBI", model: "Real-time gross settlement, one payment at a time", feel: "Final and irrevocable as soon as it settles", best: "Large-value, time-critical transfers", architecture: "Each payment settles individually, in real time, between banks' accounts at RBI. There is no netting." },
    { name: "IMPS", operator: "NPCI", model: "Real-time interbank switch with net settlement afterwards", feel: "Instant, around the clock, including holidays", best: "Instant account-to-account transfers", architecture: "The payment goes through NPCI's switch between banks in real time. The money between banks settles later on a net basis." },
    { name: "UPI", operator: "NPCI", model: "Real-time switch with a payment address layer on top", feel: "Instant, using a virtual payment address or QR instead of account details", best: "Everyday consumer and merchant payments", architecture: "Built on the same real-time switch idea as IMPS, with an addressing layer (virtual payment addresses, QR), request-to-pay flows and app-based authorisation." },
  ],
  chooser: [
    ["I need it to settle instantly, day or night, to another account", "IMPS or UPI"],
    ["I am paying a shop or a person from my phone", "UPI"],
    ["It is a large payment and finality matters", "RTGS"],
    ["It is a routine transfer and a short delay is fine", "NEFT"],
  ] as [string, string][],
  caveat: "Limits, charges and operating hours are set by RBI and NPCI and change over time. Check the current circulars before relying on any figure.",
  bharatConnect: "Bharat Connect sits above these rails. It does not carry the money: the payment mode (UPI, cards, net banking, IMPS, NEFT and others) records how the customer paid, and Bharat Connect answers which bill it was, who owes whom and whether the biller acknowledged it.",
};

// Terms that get a hover definition wherever they appear in page text. Longer terms first.
export const hoverTerms: [string, string][] = [
  ["deemed success", "A per-biller setting: if the BOU times out or sends a bad response, the central unit marks the transaction a success and settles it."],
  ["first-time-right", "The share of deployments that work at the first attempt, with no rework or rollback."],
  ["BBPCU", "The central unit run by NPCI. It routes transactions by biller, tracks their state, and runs clearing and net settlement."],
  ["BOU", "Biller Operating Unit: connects billers to the network and maps standard messages to each biller's own system."],
  ["COU", "Customer Operating Unit: the app, bank or agent network that presents bills and takes payments from customers."],
  ["BBPS", "Bharat Bill Payment System, now branded Bharat Connect: India's national bill payment platform."],
  ["UPMS", "NPCI's Unified Presentment Management System for recurring payments and standing instructions."],
  ["NBBL", "NPCI Bharat BillPay Limited, which operates Bharat Connect."],
  ["MDM", "Master data: the shared reference data about billers, agents and plans that keeps every operating unit in sync."],
];

// ---------- Reconciliation playground sample (synthetic) ----------
export const reconSample = {
  transactions: "txn_id,txn_date,amount_paise,status\nTXN1000,2026-11-01,9900,SUCCESS\nTXN1001,2026-11-01,50000,SUCCESS\nTXN1002,2026-11-01,32000,SUCCESS\nTXN1003,2026-11-01,15000,FAILED\nTXN1004,2026-11-01,24950,SUCCESS\nTXN1005,2026-11-01,24950,SUCCESS\nTXN1006,2026-11-02,9900,SUCCESS\nTXN1007,2026-11-02,15000,SUCCESS\nTXN1008,2026-11-02,78000,SUCCESS\nTXN1009,2026-11-02,15000,SUCCESS\nTXN1010,2026-11-02,24950,FAILED\nTXN1011,2026-11-02,32000,SUCCESS\nTXN1012,2026-11-03,32000,SUCCESS\nTXN1013,2026-11-03,24950,SUCCESS\nTXN1014,2026-11-03,78000,SUCCESS\nTXN1015,2026-11-03,24950,SUCCESS\nTXN1016,2026-11-03,32000,SUCCESS\nTXN1017,2026-11-03,15000,FAILED\nTXN1018,2026-11-04,24950,SUCCESS\nTXN1019,2026-11-04,78000,SUCCESS\nTXN1020,2026-11-04,15000,SUCCESS\nTXN1021,2026-11-04,32000,SUCCESS\nTXN1022,2026-11-04,15000,SUCCESS\nTXN1023,2026-11-04,78000,SUCCESS\nTXN1024,2026-11-05,15000,FAILED\nTXN1025,2026-11-05,50000,SUCCESS\nTXN1026,2026-11-05,120000,SUCCESS\nTXN1027,2026-11-05,32000,SUCCESS\nTXN1028,2026-11-05,50000,SUCCESS\nTXN1029,2026-11-05,24950,SUCCESS\nTXN1005,2026-11-01,24950,SUCCESS\nTXN1011,2026-11-02,32500,SUCCESS",
  settlements: "txn_id,settle_date,amount_paise,status\nTXN1001,2026-11-01,50000,SETTLED\nTXN1002,2026-11-01,32000,SETTLED\nTXN1004,2026-11-01,24950,SETTLED\nTXN1005,2026-11-01,24950,SETTLED\nTXN1006,2026-11-02,9900,SETTLED\nTXN1007,2026-11-02,15000,SETTLED\nTXN1008,2026-11-02,78000,SETTLED\nTXN1011,2026-11-02,32000,SETTLED\nTXN1012,2026-11-03,32000,SETTLED\nTXN1013,2026-11-03,24950,SETTLED\nTXN1014,2026-11-03,78250,SETTLED\nTXN1015,2026-11-03,24950,SETTLED\nTXN1016,2026-11-03,32000,SETTLED\nTXN1018,2026-11-04,24950,SETTLED\nTXN1019,2026-11-04,78000,SETTLED\nTXN1020,2026-11-04,15000,HELD\nTXN1021,2026-11-04,32000,SETTLED\nTXN1022,2026-11-04,15000,SETTLED\nTXN1023,2026-11-04,78000,SETTLED\nTXN1025,2026-11-05,50000,SETTLED\nTXN1026,2026-11-05,120000,SETTLED\nTXN1027,2026-11-05,32000,SETTLED\nTXN1028,2026-11-05,50000,SETTLED\nTXN1029,2026-11-05,24950,SETTLED\nTXN9999,2026-11-05,31000,SETTLED",
};

// ---------- Press kit ----------
export const press = {
  bios: [
    ["Short", "Abhishek Singla is a product manager working on Bharat Connect (formerly BBPS), India's national bill payment platform, at iServeU. He owns biller onboarding, settlement and reconciliation work and writes about how bill payments fail and how product teams can fix them. He holds an MBA from NIT Rourkela."],
    ["Medium", "Abhishek Singla is a product manager working on Bharat Connect (formerly BBPS), India's national bill payment platform, at iServeU in Bhubaneswar. He owns biller onboarding, settlement and reconciliation product work, from requirements and PRDs through UAT to release. His results include an 80% first-time-right deployment rate, 40% fewer product-related support tickets and a 15% lower transaction failure rate. He writes on LinkedIn about how bill payments fail at the last mile and what product teams can do about it, and publishes open-source teaching material on GitHub. He holds an MBA from NIT Rourkela and a B.E. in Computer Science from Chitkara University."],
    ["Long", "Abhishek Singla is a product manager working on Bharat Connect (formerly BBPS), India's national bill payment platform, at iServeU in Bhubaneswar. He owns biller onboarding, settlement and reconciliation product work for billers and partners, from requirements and PRDs through UAT to release, with NPCI and RBI compliance in view. His results include an 80% first-time-right deployment rate with zero rollbacks, 40% fewer product-related support tickets, a 15% lower transaction failure rate and 20% lower UAT failure rates. He came to payments from an unusual angle: a B.E. in Computer Science from Chitkara University, an MBA in Finance and Marketing from NIT Rourkela, and an India Post Payments Bank internship that showed him how much payments product work is about recovering from failure, not shipping features. He writes on LinkedIn about how Bharat Connect works at the operating-unit layer, the failure patterns product teams miss, and designing for the agents who serve most customers. He also publishes open-source teaching material on GitHub, including plain-language BBPS notes, a reconciliation demo and a payments SQL practice set, and uses AI tools in product delivery with a named human owner for every draft."],
  ] as [string, string][],
  topics: [
    ["How Bharat Connect works at the BOU layer", "The four-party network, message families, reference IDs and where a biller operating unit's product surface sits."],
    ["Why payments fail at the last mile, and the product fixes", "Fetch timeouts, account-format drift, duplicate-payment anxiety, agent usability debt and reconciliation gaps."],
    ["Designing for the agent layer, not just the consumer", "Why most assisted-channel volume needs plain language, speed and visible status."],
    ["Reconciliation is a product problem", "Designing to prevent breaks, and why the unit of reconciliation is the settlement cycle."],
    ["Prioritising a payments roadmap: the Three Lanes", "Failure prevention, failure transparency and failure-adjacent growth."],
    ["Using AI in product delivery with a human owner", "Drafting PRDs, user stories and reports with AI, and checking every draft against source files."],
  ] as [string, string][],
  facts: [
    ["Name", "Abhishek Singla (he/him)"],
    ["Role", "Product Owner, Payments & BBPS"],
    ["Organisation", "iServeU"],
    ["Based in", "Bhubaneswar, Odisha, India"],
    ["Education", "MBA, NIT Rourkela; B.E. Computer Science, Chitkara University"],
    ["Languages", "English, Hindi, Punjabi"],
  ] as [string, string][],
};

// ---------- Updates ----------
// iso is the sort key. exact is false when only the month is known (kept out of the RSS feed).
export const updates = [
  { iso: "2026-11-18", when: "18 Nov 2026", kind: "Site", title: "Learn hub, reconciliation playground, press kit, billers and settlement-history explainers", body: "Added plain-language Bharat Connect notes, an in-browser reconciliation demo, a press and speaker kit, and two explainers on biller types and settlement cycles.", url: "/learn", exact: true },
  { iso: "2026-11-17", when: "17 Nov 2026", kind: "Site", title: "Product lab, glossary, watch feed and project deep-dives", body: "Interactive tools (roadmap lanes, error-code translator, lifecycle, settlement, SQL practice), a Bharat Connect glossary, an ecosystem watch and four project deep-dives.", url: "/lab", exact: true },
  { iso: "2026-11-17", when: "17 Nov 2026", kind: "Post", title: "Bharat Connect under the hood: a routing and settlement model, not a payment rail", body: "A four-party hub-and-spoke network, signed XML message families and how settlement works.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7528291302803808256/", exact: true },
  { iso: "2026-11-12", when: "12 Nov 2026", kind: "Learning", title: "Completed a risk management course on Tutedude", body: "Announced a new Tutedude certification. SQL and Power BI courses continue.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7526507714953314304/", exact: true },
  { iso: "2026-06-27", when: "27 Jun 2026", kind: "Post", title: "A prediction for Bharat Connect over the next 12 months", body: "Reliability becoming a network-level product.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7476492027237429248/", exact: true },
  { iso: "2026-06-25", when: "25 Jun 2026", kind: "Post", title: "The Three Lanes: a prioritisation framework for payments", body: "Failure prevention, failure transparency and failure-adjacent growth.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7475737068531363840/", exact: true },
  { iso: "2026-06-24", when: "24 Jun 2026", kind: "Post", title: "The most expensive product debt is in the biller spreadsheet", body: "Why the biller integration tracker is a product surface nobody owns.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7475382224226263041/", exact: true },
  { iso: "2026-06-20", when: "20 Jun 2026", kind: "Post", title: "Things I got wrong as a PM in my first year", body: "Consensus is not correctness, and the PM job is mostly saying no gracefully.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7473955308084559872/", exact: true },
  { iso: "2026-06-18", when: "18 Jun 2026", kind: "Post", title: "Six months ago I shipped an error message change", body: "One sentence cut support tickets and lifted agent satisfaction.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7473200326645448704/", exact: true },
  { iso: "2026-06-17", when: "17 Jun 2026", kind: "Post", title: "Nobody writes about the agent layer", body: "The BC agent is the highest-volume BBPS user and the most under-designed-for.", url: "https://www.linkedin.com/feed/update/urn:li:activity:7472845524728037378/", exact: true },
  { iso: "2026-04-27", when: "27 Apr 2026", kind: "Article", title: "Bharat Connect Is Evolving Fast. Here's What Every BOU Product Team Needs to Know", body: "The rebrand, the scale, five BOU-fixable failure patterns and three product interventions.", url: "https://www.linkedin.com/pulse/bharat-connect-evolving-fast-heres-what-every-bou-product-singla-rvb7c/", exact: true },
  { iso: "2026-04-01", when: "Apr 2026", kind: "Case study", title: "BBPS Last-Mile Failures: A Product Teardown", body: "Structural transaction-failure patterns across BBPS BOUs, with three data-driven interventions.", url: "https://abhishek-singla-pm.notion.site/BBPS-Last-Mile-Failures-A-Product-Teardown-34e8f771bb7d8111a9efea7f778a9917", exact: false },
];

export const nowWorking = [
  "Writing weekly notes on Bharat Connect architecture and BOU product strategy.",
  "Working through Tutedude courses in Data Analytics (SQL) and Power BI.",
  "Applying generative AI to PRD, BRD and reporting workflows, with a named human owner for every draft.",
];

// ---------- Restricted explainers ----------
// The biller-types and settlement-history pages draw on NPCI circulars and specifications that may be
// shared only with participants. Set this to false to hide both pages everywhere until you have confirmed.
export const restrictedExplainersLive = true;

export const billerJourneys = {
  intro: "Every biller on Bharat Connect is configured in master data, and a few settings decide what its payment journey looks like. Pick the settings to see the journey a biller gets.",
  fetch: ["Mandatory", "Optional", "Not supported"],
  validation: ["Mandatory", "Optional", "Not supported"],
  settings: [
    ["Fetch", "Mandatory, optional or not supported"],
    ["Validation", "Mandatory, optional or not supported"],
    ["Ad-hoc payment", "Accepted or not"],
    ["QuickPay", "Whether a payment can start without the fetch step"],
  ] as [string, string][],
  journeys: [
    ["Fetch optional", "Pay any amount, with or without a fetched bill."],
    ["No fetch, validation optional", "Ad-hoc payment, or pay after validating the account."],
    ["No fetch, validation mandatory", "Validate the account first, then pay."],
    ["No fetch, no validation", "Ad-hoc payment only."],
    ["Fetch mandatory", "Pay against the fetched bill, for any amount."],
    ["Fetch mandatory, ad-hoc off", "The amount rule applies: Exact, Exact and above, or Exact and below the fetched bill."],
  ] as [string, string][],
  why: "Each setting arrives as a field in biller master data. If a customer app or biller operating unit hardcodes one journey, the other five show up as failed transactions. That is also why a biller sheet with many columns and no search cannot keep up: biller configuration is a product, not a spreadsheet.",
};

export const settlementHistory = {
  intro: "NPCI has steadily added settlement cycles for Bharat Connect, from one a day in 2017 to ten a day in 2026.",
  events: [
    ["2017", 1, "One settlement a day, with a cut-off at 12:00 am."],
    ["Aug 2019", 2, "A second settlement, with a cut-off at 1:00 pm."],
    ["Dec 2020", 3, "A third settlement cycle."],
    ["Jan 2023", 4, "A fourth cycle. The circular was issued in December 2022 and the cycle started on 1 January 2023."],
    ["Dec 2023", 6, "Six cycles a day."],
    ["Aug 2024", 8, "Eight cycles a day."],
    ["Jun 2026", 10, "Ten cycles a day."],
  ] as [string, number, string][],
  why: "NPCI's January 2023 circular gives the reason: volumes are growing exponentially, with new categories and international bill payments. So settle sooner and spread transactions more evenly to reduce settlement risk.",
  changes: [
    ["Billers get their money faster", "Most cycles carry an expected RTGS posting time about two hours after they close."],
    ["The exposure window shrinks", "Net positions build for hours, not a full day, and the Net Debit Cap resets after each settlement, except on bank holidays."],
    ["Reconciliation changes shape", "The central unit sends the raw settlement file and reports with every cycle, so matching your records once a day no longer fits. The unit of reconciliation is the cycle."],
  ] as [string, string][],
  caveat: "These figures come from NPCI circulars I read, the latest dated June 2026. NBBL's public pages are not consistent on the current number of cycles, so check the latest circular or ask your operating unit before relying on it.",
};

// Diagrams for the visuals page. Only items with published: true are shown.
// Keep published false until the post that the diagram belongs to is live on LinkedIn.
export const visuals = [
  {
    file: "bharat-connect-flow.png", svg: "bharat-connect-flow.svg", published: true,
    title: "Bharat Connect: how a bill payment flows",
    caption: "The customer pays through a customer operating unit. The request travels through the central unit to the biller operating unit and on to the biller, while funds move over payment rails. The message sequence runs fetch, payment, a pending check and net settlement.",
    alt: "Diagram of a bill payment: Customer, then COU (customer side), then BBPCU (NPCI central unit), then BOU (biller side), then Biller. A biller-generated QR or payment link can start the payment at the COU. Below, funds move over payment rails such as UPI, cards, net banking and IMPS. A final box reads: message sequence, fetch, payment, pending check (402), net settlement by BBPCU.",
    post: "https://www.linkedin.com/feed/update/urn:li:activity:7528291302803808256/",
  },
];

// Public log of corrections. Add an item here when a reader reports a mistake you fix.
export const corrections: { when: string; page: string; change: string }[] = [];
