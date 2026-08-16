// Run with: node --env-file=.env.local scripts/seed-profile.mjs
//
// Seeds profile/main — the doc that powers the hero deploy log. Safe to
// re-run; it overwrites the doc each time. After this, edit everything
// from /admin/profile instead.

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

const profile = {
  bio: "Final year Computer Science at Enugu State University of Science and Technology, graduating August 2026. I build production software for Nigerian problems — client work, my own ventures, and tools other students actually use.",
  currentlyBuilding: "final year, ESUT — Aug 2026",
  resumeUrl: "",
  buildLog: [
    {
      cmd: "deploy acadegrade-v2",
      status: "live",
      detail: "27 routes · AI-assisted grading",
    },
    {
      cmd: "deploy rollmark",
      status: "live",
      detail: "QR attendance · geofenced sessions",
    },
    {
      cmd: "deploy hscesut",
      status: "live",
      detail: "church platform · first paid client",
    },
    {
      cmd: "deploy vulnai",
      status: "live",
      detail: "scan output to pentest report",
    },
    {
      cmd: "status",
      status: "shipping",
      detail: "final year, ESUT — Aug 2026",
    },
  ],
};

async function run() {
  await db.collection("profile").doc("main").set(profile, { merge: true });
  console.log("Done. Check Firebase Console → Firestore → profile/main.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
