export type ProjectCategory = "client" | "product" | "venture";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  stack: string[];
  liveUrl?: string;
  featured: boolean;
  ventureSpotlight: boolean;
  order: number;
}

// Static seed for Phase 2 — same shape as the `projects` Firestore
// collection (see docs/firestore-schema.md). Swapping this for a live
// Firestore query later is a drop-in change, not a rewrite.
export const PROJECTS: Project[] = [
  {
    slug: "acadegrade-v2",
    title: "AcadeGrade v2",
    summary:
      "AI-assisted CGPA calculator and grading system for Nigerian universities — OCR result parsing, forecasting, and what-if simulation.",
    category: "product",
    stack: ["Next.js", "Firebase", "Gemini", "TypeScript"],
    liveUrl: "https://acadegrade.vercel.app",
    featured: true,
    ventureSpotlight: false,
    order: 1,
  },
  {
    slug: "rollmark",
    title: "RollMark",
    summary:
      "QR-code attendance system for lecture halls — 60-second rotating codes, geofenced sessions, lecturer dashboards.",
    category: "product",
    stack: ["Next.js", "Firebase", "TypeScript"],
    liveUrl: "https://rollmark.vercel.app",
    featured: true,
    ventureSpotlight: false,
    order: 2,
  },
  {
    slug: "holy-spirit-chapel-esut",
    title: "Holy Spirit Chapel ESUT",
    summary:
      "First paid client project — a dual-identity platform for the chapel and its Anglican Students' Fellowship, 34 routes, full admin dashboard.",
    category: "client",
    stack: ["Next.js", "Firebase", "Framer Motion", "Paystack"],
    liveUrl: "https://hscesut.vercel.app",
    featured: true,
    ventureSpotlight: false,
    order: 3,
  },
  {
    slug: "vulnai",
    title: "VulnAI",
    summary:
      "AI-powered cybersecurity SaaS — turns raw vulnerability scan output into client-ready pentest reports.",
    category: "product",
    stack: ["Next.js", "Gemini", "Firebase", "jsPDF"],
    featured: true,
    ventureSpotlight: false,
    order: 4,
  },
  {
    slug: "accompadi",
    title: "AccomPadi",
    summary:
      "Accommodation marketplace connecting Nigerian university students with verified housing agents.",
    category: "venture",
    stack: ["Next.js", "Firebase"],
    liveUrl: "https://accompadi.vercel.app",
    featured: false,
    ventureSpotlight: true,
    order: 5,
  },
  {
    slug: "reelnix",
    title: "ReelNix",
    summary:
      "Content discovery and download platform — movies, series, and educational material in one place.",
    category: "venture",
    stack: ["Next.js", "Firebase"],
    liveUrl: "https://reelnix.vercel.app",
    featured: false,
    ventureSpotlight: true,
    order: 6,
  },
];

export const SELECTED_WORK = PROJECTS.filter((p) => p.featured).sort(
  (a, b) => a.order - b.order
);

export const VENTURES = PROJECTS.filter((p) => p.ventureSpotlight).sort(
  (a, b) => a.order - b.order
);
