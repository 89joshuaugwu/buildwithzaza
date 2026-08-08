import { getProjects } from "@/lib/data/get-projects";
import { ProjectsGrid } from "@/components/projects-grid";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-gold">
        My work
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-fg sm:text-5xl">
        All projects
      </h1>
      <p className="mt-3 max-w-xl text-fg-muted">
        {projects.length} shipped — client work, my own builds, and the two
        ventures I&apos;m actively growing.
      </p>

      <ProjectsGrid projects={projects} />
    </main>
  );
}
