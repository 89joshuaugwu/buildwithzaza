// Run with: node --env-file=.env.local scripts/seed-projects.mjs
//
// One-time import of the project data that used to be hardcoded in
// src/lib/data/projects.ts. Each project's slug becomes its Firestore
// document ID. Safe to re-run — it overwrites matching docs by slug,
// doesn't duplicate them. After this, edit everything from
// /admin/projects instead — this script doesn't need to run again unless
// you want to bulk-reset the collection back to these defaults.

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});
const db = getFirestore(app);

const projects = [
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
    problem:
      "Nigerian students calculate CGPA by hand or in spreadsheets that don't match the real 5.0 grading scale, and get no early warning when a semester is drifting off target.",
    approach:
      "A multi-provider AI pipeline: Gemini reads uploaded result PDFs via OCR, Groq powers instant what-if simulations, DeepSeek handles forecasting and insights. Smart Firestore caching means switching tabs never re-triggers an API call.",
    outcome:
      "Submitted as a CSC 499 final year project and running as a real, live tool students use today — not a demo.",
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
    problem:
      "Attendance in large lecture halls is either slow manual roll call, or a QR code a student photographs and sends to a friend who isn't even on campus.",
    approach:
      "Codes rotate every 60 seconds and are tied to a geofenced session, so a screenshot is useless a minute later or from off-campus. Lecturers get a live dashboard per session.",
    outcome:
      "Live and in use, supervised by Dr. Ekene Ozioko, with a full technical documentation set most student projects skip entirely.",
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
    problem:
      "The chapel and its student fellowship needed a real web presence — service info, giving, event sign-ups — not just a Facebook page, and staff with no technical background needed to be able to run it.",
    approach:
      "One Next.js platform, two visual identities (chapel blue/gold, fellowship crimson), a 34-route admin dashboard non-technical staff can actually use day to day, and Paystack wired in for giving.",
    outcome: "Live, in production, and still maintained — my first paid client.",
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
    problem:
      "Freelance pentesters and small Nigerian security teams get raw scanner output, not something a client will actually sit down and read.",
    approach:
      "Scan output goes through Gemini and comes out as a structured, client-ready report, exportable to PDF. A Paystack-gated Pro tier covers the ongoing cost.",
    outcome:
      "Live, targeting freelance pentesters, fintech, and enterprise IT in the Nigerian market.",
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
    problem:
      "students hunting for off-campus housing in Nigeria rely on word-of-mouth and unverified agent listings — no trustworthy marketplace exists yet.",
    outcome:
      "live and actively growing — my main business focus right now, pitched to Founders Smith Accelerator for scaling.",
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
    problem:
      "content discovery for movies, series, and educational material in Nigeria is scattered across too many separate apps and sites.",
    outcome:
      "live, positioned as both entertainment and a learning hub, and being considered for further investment.",
  },
  {
    slug: "inkognito",
    title: "Inkognito",
    summary:
      "Anonymous messaging platform with 10 distinct message types and shareable, auto-generated message and profile cards.",
    category: "product",
    stack: ["Next.js", "Firebase", "Framer Motion"],
    liveUrl: "https://inkog.vercel.app",
    featured: false,
    ventureSpotlight: false,
    order: 7,
  },
  {
    slug: "penwork4me",
    title: "PenWork4Me",
    summary:
      "Niche freelance marketplace for document and writing services, connecting Nigerian clients with agents.",
    category: "product",
    stack: ["Next.js", "Firebase", "Cloudinary"],
    liveUrl: "https://penwork4me.vercel.app",
    featured: false,
    ventureSpotlight: false,
    order: 8,
  },
  {
    slug: "donordrop",
    title: "DonorDrop",
    summary: "Mobile app connecting blood donors with requesters across Nigeria.",
    category: "product",
    stack: ["React Native", "Expo", "Firebase"],
    featured: false,
    ventureSpotlight: false,
    order: 9,
  },
  {
    slug: "votenaija",
    title: "VoteNaija",
    summary:
      "Real-time polling platform with free and paid tiers and email-based anti-fraud duplicate-vote prevention.",
    category: "product",
    stack: ["Firebase", "Paystack", "Cloudinary"],
    featured: false,
    ventureSpotlight: false,
    order: 10,
  },
  {
    slug: "thinksync",
    title: "ThinkSync",
    summary: "Real-time collaborative whiteboard with built-in voice chat.",
    category: "product",
    stack: ["Next.js", "React Konva", "Agora.io"],
    featured: false,
    ventureSpotlight: false,
    order: 11,
  },
  {
    slug: "payrollpadi",
    title: "PayrollPadi",
    summary: "Payroll management application for handling employee payslips.",
    category: "product",
    stack: ["Next.js", "Firebase"],
    featured: false,
    ventureSpotlight: false,
    order: 12,
  },
  {
    slug: "gradebot",
    title: "JoshuaZaza GradeBot",
    summary: "Telegram bot for AI-assisted grading and assignment handling.",
    category: "product",
    stack: ["Telegram Bot API", "AI grading backend"],
    featured: false,
    ventureSpotlight: false,
    order: 13,
  },
];

async function run() {
  console.log(`Seeding ${projects.length} projects...`);
  const batch = db.batch();
  for (const project of projects) {
    const { slug, ...data } = project;
    batch.set(db.collection("projects").doc(slug), data);
  }
  await batch.commit();
  console.log("Done. Check Firebase Console → Firestore → projects.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
