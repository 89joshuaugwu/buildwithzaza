import { adminDb } from "@/lib/firebase/admin";
import { PROJECTS as STATIC_PROJECTS, type Project } from "./projects";

// Server-only (imports firebase-admin). This is the single source of
// truth the frontend reads from: Firestore if it has data, the hardcoded
// list in ./projects.ts otherwise. That fallback is what makes it safe to
// switch the site over to Firestore *before* the seed scripts have run —
// nothing goes blank in the meantime, and nothing needs to change here
// once you do seed it.

export async function getProjects(): Promise<Project[]> {
  try {
    const snap = await adminDb.collection("projects").orderBy("order").get();
    if (snap.empty) return STATIC_PROJECTS;
    return snap.docs.map((d) => ({ slug: d.id, ...d.data() }) as Project);
  } catch {
    return STATIC_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const snap = await adminDb.collection("projects").doc(slug).get();
    if (snap.exists) {
      return { slug: snap.id, ...snap.data() } as Project;
    }
  } catch {
    // fall through to the static list below
  }
  return STATIC_PROJECTS.find((p) => p.slug === slug) ?? null;
}
