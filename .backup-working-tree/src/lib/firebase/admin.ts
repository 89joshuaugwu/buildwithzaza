import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Server-only. Never import this from a client component — it holds a
// service account key with full Firestore/Auth access.
//
// firebase-admin is pinned to ^13.0.0 in package.json. v14 has a known
// ERR_REQUIRE_ESM conflict with Next.js — the same issue you already hit
// on AcadeGrade v2 and RollMark. Don't bump the major version without a
// clean `npm run build` first.

function getAdminApp(): App {
  if (getApps().length) return getApps()[0];

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // Vercel stores multi-line env vars with literal "\n" sequences —
      // swap them back to real newlines or cert() fails to parse the key.
      // This bit RollMark before; fixed here by default.
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ),
    }),
  });
}

export const adminDb = getFirestore(getAdminApp());
export const adminAuth = getAuth(getAdminApp());
