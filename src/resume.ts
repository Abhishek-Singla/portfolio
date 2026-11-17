// Web version of the master resume. Keep in sync with Abhishek_Singla_Master_Resume.docx.
// The phone number is left out of the web version on purpose.
export const resume = {
  name: "Abhishek Singla",
  email: "abhishek.singla014@gmail.com",
  linkedin: "linkedin.com/in/abhishek-singla-pm",
  summary:
    "Associate Product Manager with 2+ years in BBPS and B2B payments at iServeU, owning biller onboarding, settlement and reconciliation for billers and partners, with NPCI and RBI compliance exposure. Delivered an 80% first-time-right deployment rate, 40% fewer product-related support tickets and a 20% reduction in UAT failure rates. Skilled in PRDs and user stories, backlog prioritisation, product analytics with SQL, Figma prototyping and AI-assisted product workflows. Holds an MBA in Finance and Marketing from NIT Rourkela (CGPA 7.94) and a B.E. in Computer Science and Engineering from Chitkara University. Seeking an Associate Product Manager or Product Owner role in payments, UPI, lending or banking technology.",
  skills: [
    ["Soft skills", "Product Lifecycle Management, Product Discovery, Roadmap Planning, Feature Prioritisation, Business Requirements, Customer Journey Analysis, Documentation, Agile and Scrum Methodologies, Competitor Research, PRD Writing, User Story Mapping, Backlog Prioritisation, Go-to-Market Support, Product Analytics and Metrics, Release Management, Feature Rollouts, Requirement Workshops, UAT Coordination, Usability Testing, Personas and Prototyping, Stakeholder Communication, Prompt Design, AI Workflows."],
    ["Software skills", "Jira, Figma, Confluence, SQL, Postman, Advanced MS Excel, PowerPoint, Claude, ChatGPT, Microsoft Copilot"],
  ] as [string, string][],
  experience: [
    {
      org: "iServeU", role: "Associate Product Manager", period: "Aug 2024 – Present", place: "Bhubaneswar, Odisha", full: false,
      bullets: [
        "Own BBPS product work across two sides: B2B (billers and partners: onboarding, settlement, reconciliation) and B2C (end-customer bill fetch and pay journeys, failure and refund handling, including through partner apps). Managed end-to-end feature rollouts from requirements through UAT to release, with product documentation on Confluence.",
        "Designed the biller onboarding flow from setup and configuration through to go-live, and notifications for biller end customers covering bill generation and bill payment reminders.",
        "Ran requirement workshops and built phased (MVP-style) implementation plans for billers and partners, acting as their main contact through onboarding, settlement and reconciliation; triaged issues with engineering and support.",
        "Wrote PRDs and user stories with acceptance criteria, and prioritised the backlog in Jira; ran sprint planning, stand-ups, reviews and retrospectives with engineering and QA.",
        "Used user personas, Figma prototypes and usability tests to inform roadmap priorities and product decisions, and competitor benchmarking to recommend efficiency improvements.",
        "Worked with Tech and QA to align requirements, review code outputs and keep decisions feasible; tracked defects and coordinated UAT with internal and external stakeholders before each release.",
        "Outcomes across BBPS releases: 80% first-time-right deployment rate; 40% fewer product-related support tickets after rewriting agent-facing error messages into plain language; 20% lower UAT failure rates.",
        "Presented PowerPoint decks to senior stakeholders in monthly leadership meetings, quarterly partner reviews and bimonthly biller reviews; escalated risks and blockers to the right owners early.",
        "Wrote user guides, release notes and Confluence documentation for internal teams, clients and partners.",
        "After a data loss, rebuilt and verified BBPS data for 8 data sets across Oct 2025 to Jul 2026, with 70 deep checks passed and no failures.",
        "Ensure NPCI and RBI compliance, including regulatory reporting. Tracked fraud risk management checks on credit card and NCMC card bill payments (KYC, AML and fraud detection controls) over the past 1.5 years, and worked on the annual ML/TF risk assessment, KYC/AML policy ownership and quarterly KYC/AML returns to RBI for banking and NBFC clients.",
        "Since Jan 2026, handled accounts receivable, collections and billing follow-up, including invoice processing and reconciliation.",
      ],
    },
    {
      org: "iServeU", role: "Management Trainee", period: "May 2024 – Aug 2024", place: "Bhubaneswar, Odisha", full: false,
      bullets: [
        "Assisted in product roadmap development and backlog prioritisation, working with product managers to define sprint goals and delivery timelines.",
        "Conducted user feedback analysis and customer journey evaluation to identify product usability improvements and potential feature enhancements.",
        "Supported user story mapping and sprint backlog grooming in Jira to maintain clarity of product requirements for engineering teams.",
        "Improved Agile documentation workflows in Jira and Confluence, enabling better visibility into feature development progress and stakeholder updates.",
      ],
    },
    {
      org: "India Post Payments Bank", role: "Summer Intern", period: "May 2023 – Jul 2023", place: "Rourkela, Odisha", full: false,
      bullets: [
        "Designed and executed customer awareness campaigns promoting digital banking services, reaching 2,000+ participants.",
        "Collected and analysed customer insights to improve product communication and adoption strategies.",
      ],
    },
    {
      org: "NIT Rourkela", role: "Research Intern", period: "Dec 2022 – Feb 2023", place: "Rourkela, Odisha", full: true,
      bullets: [
        "Conducted research on Intellectual Property Rights and product innovation strategies.",
        "Presented findings supporting the integration of IP awareness into business model planning.",
      ],
    },
    {
      org: "Zee Entertainment Enterprises", role: "Content Strategist & Structured Communication Specialist", period: "Aug 2021 – Jan 2022", place: "Remote, India", full: true,
      bullets: ["Produced content synopses for entertainment programs; contributed to digital marketing campaigns."],
    },
  ],
  aiWork: [
    "Built agentic workflows for BBPS operations covering daily file download, merge, verification, alerts and a morning exception digest, turning recurring daily checks into one chained workflow.",
    "Used AI in product delivery: prompts and templates draft user stories with acceptance criteria and edge cases, BRDs/PRDs and release notes from Jira tickets, and generate UAT test cases and test data for biller fetch and pay flows.",
    "Use Claude to speed up ops and strategy work: drafting product requirements, documentation and analyses for BBPS daily catch-up and reconciliation routines, NEFT/RTGS/IMPS/UPI architecture comparisons, and offline biller onboarding (MDM, JSON, templates, configuration and UAT).",
    "Maintain an AI knowledge base of BBPS rules (NPCI and RBI requirements, fee slabs, onboarding steps, past decisions) and summarise each weekly NPCI MDM release into its impact on our billers, to support product decisions.",
    "Used AI for data and KPI work: SQL drafting and review, success and failure trends by biller, error-code summaries and fee-slab scenario checks in Excel.",
    "Every AI draft has a named human owner and is checked against source files before use.",
  ],
  achievements: [
    ["Documentation Excellence", "Built a unified internal documentation repository that improved cross-team knowledge retrieval."],
    ["Product Quality", "Built and maintained a dashboard tracking bug reporting rates, support ticket resolution times and system uptime."],
    ["Customer Satisfaction", "Turned user feedback and usability tests into merchant-facing workflow improvements."],
  ] as [string, string][],
  education: [
    { school: "National Institute of Technology, Rourkela", period: "Jul 2022 – May 2024", degree: "Master of Business Administration, Finance and Marketing, CGPA: 7.94", place: "Rourkela, Odisha", courses: "Financial and Cost Accounting, Marketing Management, Management Information Systems, Commercial Banking, International Finance, Services Marketing" },
    { school: "Chitkara University, Rajpura", period: "Aug 2017 – Jun 2021", degree: "Bachelor of Engineering, Computer Science and Engineering, CGPA: 7.51", place: "Rajpura, Punjab", courses: "Data Structures and Algorithms, Operating Systems, Computer Networking, Database Management System, Computer System Architecture, Software Engineering" },
  ],
  certifications: "Completed: Financial Modelling; Financial Risk Management (Tutedude). In progress: Data Analytics (SQL), Power BI (Tutedude).",
};
