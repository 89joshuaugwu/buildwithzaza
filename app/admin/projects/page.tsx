"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Plus } from "lucide-react";
import type { Project } from "@/lib/data/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setProjects(
          snap.docs.map((d) => ({ slug: d.id, ...d.data() }) as Project)
        );
        setLoaded(true);
      },
      () => setLoaded(true)
    );
    return unsub;
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-fg">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-fg"
        >
          <Plus size={16} /> New
        </Link>
      </div>

      {loaded && projects.length === 0 && (
        <p className="mt-8 text-sm text-fg-muted">
          Nothing here yet — the live site is still showing the built-in
          project list. Run <code className="rounded bg-surface px-1.5 py-0.5 text-xs">scripts/seed-projects.mjs</code>{" "}
          to bring all 13 in at once, or add one below to start from
          scratch.
        </p>
      )}

      <div className="mt-6 space-y-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/projects/${p.slug}`}
            className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-accent"
          >
            <div>
              <p className="text-sm font-semibold text-fg">{p.title}</p>
              <p className="text-xs text-fg-muted">
                {p.category} · order {p.order}
                {p.featured ? " · featured" : ""}
                {p.ventureSpotlight ? " · venture" : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
