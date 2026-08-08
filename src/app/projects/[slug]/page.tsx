import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "@/lib/data/projects";
import { getProjectBySlug } from "@/lib/data/get-projects";

export const revalidate = 60;

export function generateStaticParams() {
  // Static list only — safe at build time, no dependency on Firestore
  // being reachable during `next build`. dynamicParams stays on by
  // default, so slugs added later in Firestore still render fine on
  // request, they just aren't pre-built.
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const categoryLabel =
    project.category === "client"
      ? "Client work"
      : project.category === "venture"
        ? "Venture"
        : "Own build";

  const hasCaseStudy = project.problem || project.approach || project.outcome;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} /> All projects
      </Link>

      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-gold">
        {categoryLabel}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-fg sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 text-lg text-fg-muted">{project.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-fg-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.03]"
          >
            View live <ArrowUpRight size={14} />
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent"
          >
            <Github size={14} /> Source
          </a>
        )}
      </div>

      {hasCaseStudy && (
        <div className="mt-14 space-y-10 border-t border-border pt-10">
          {project.problem && (
            <section>
              <h2 className="font-display text-xl font-bold text-fg">
                The problem
              </h2>
              <p className="mt-3 text-fg-muted">{project.problem}</p>
            </section>
          )}
          {project.approach && (
            <section>
              <h2 className="font-display text-xl font-bold text-fg">
                The approach
              </h2>
              <p className="mt-3 text-fg-muted">{project.approach}</p>
            </section>
          )}
          {project.outcome && (
            <section>
              <h2 className="font-display text-xl font-bold text-fg">
                Where it stands
              </h2>
              <p className="mt-3 text-fg-muted">{project.outcome}</p>
            </section>
          )}
        </div>
      )}

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} /> Back to all projects
        </Link>
        <Link
          href="/hire"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.03]"
        >
          Build something like this
        </Link>
      </div>
    </main>
  );
}
