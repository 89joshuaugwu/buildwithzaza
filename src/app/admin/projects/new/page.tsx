"use client";

import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase/client";
import { ProjectForm } from "@/components/admin/project-form";
import type { Project } from "@/lib/data/projects";

export default function NewProjectPage() {
  const router = useRouter();

  async function handleSubmit(data: Project) {
    const { slug, ...rest } = data;
    await setDoc(doc(db, "projects", slug), rest);
    router.push("/admin/projects");
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-fg">
        New project
      </h1>
      <div className="mt-6">
        <ProjectForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
