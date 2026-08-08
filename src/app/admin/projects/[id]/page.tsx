"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { ProjectForm } from "@/components/admin/project-form";
import type { Project } from "@/lib/data/projects";

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "projects", params.id));
      if (snap.exists()) {
        setProject({ slug: snap.id, ...snap.data() } as Project);
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  async function handleSubmit(data: Project) {
    const { slug, ...rest } = data;
    await setDoc(doc(db, "projects", slug), rest);
    router.push("/admin/projects");
  }

  async function handleDelete() {
    if (!confirm(`Delete "${project?.title}"? This can't be undone.`)) return;
    await deleteDoc(doc(db, "projects", params.id));
    router.push("/admin/projects");
  }

  if (loading) return <p className="text-fg-muted">Loading…</p>;
  if (!project) return <p className="text-fg-muted">Not found.</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-fg">
        Edit project
      </h1>
      <div className="mt-6">
        <ProjectForm
          initial={project}
          slugLocked
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
