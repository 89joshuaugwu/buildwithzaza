import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";

const CATEGORY_LABEL: Record<string, string> = {
  client: "Client work",
  product: "Own build",
  venture: "Venture",
};

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-gold">
            Selected work
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-fg sm:text-4xl">
            Shipped, not simulated.
          </h2>
        </div>
        <Link
          href="/projects"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-fg-muted transition-colors hover:text-accent sm:inline-flex"
        >
          All projects <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group [perspective:1000px]"
          >
            <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-transform duration-300 [transform-style:preserve-3d] group-hover:-translate-y-1 group-hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-bg px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-fg-muted">
                  {CATEGORY_LABEL[project.category]}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-fg-muted transition-colors group-hover:text-accent"
                />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-fg">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/projects"
        className="mt-8 flex items-center justify-center gap-1 text-sm font-medium text-fg-muted transition-colors hover:text-accent sm:hidden"
      >
        All projects <ArrowUpRight size={14} />
      </Link>
    </section>
  );
}
