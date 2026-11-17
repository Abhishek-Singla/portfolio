import type { MetadataRoute } from "next";
import { work, restrictedExplainersLive } from "@/data";
import { learnDocs } from "@/lib/learn-index";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/hire", priority: 0.8 },
    { path: "/press", priority: 0.6 },
    { path: "/updates", priority: 0.6 },
    { path: "/lab", priority: 0.7 },
    { path: "/learn", priority: 0.8 },
    { path: "/glossary", priority: 0.7 },
    { path: "/watch", priority: 0.6 },
    { path: "/rails", priority: 0.7 },
    ...(restrictedExplainersLive ? [{ path: "/billers", priority: 0.6 }, { path: "/settlement-history", priority: 0.6 }] : []),
    ...learnDocs.map((d) => ({ path: `/learn/${d.slug}`, priority: 0.7 })),
    ...work.map((w) => ({ path: `/work/${w.slug}`, priority: 0.7 })),
  ];
  return pages.map((p) => ({ url: `${base}${p.path || "/"}`, changeFrequency: "monthly", priority: p.priority }));
}
