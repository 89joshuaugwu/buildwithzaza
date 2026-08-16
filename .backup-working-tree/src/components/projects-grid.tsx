"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import type { Project, ProjectCategory } from "@/lib/data/projects";

const FILTERS: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Client work", value: "client" },
  { label: "Own builds", value: "product" },
  { label: "Ventures", value: "venture" },
];

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  client: "Client work",
  product: "Own build",
  venture: "Venture",
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects
      .filter((p) => {
        const matchesCategory = filter === "all" || p.category === filter;
        const matchesQuery =
          query === "" ||
          p.title.toLowerCase().includes(query) ||
          p.stack.some((s) => s.toLowerCase().includes(query));
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => a.order - b.order);
  }, [projects, filter, q]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-accent text-accent-fg"
                  : "border border-border text-fg-muted hover:text-fg"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted"
          />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects or stack..."
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-fg outline-none focus:border-accent sm:w-64"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-fg-muted">
          Nothing matches that search.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-bg px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-fg-muted">
                  {CATEGORY_LABEL[project.category]}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-fg-muted transition-colors group-hover:text-accent"
                />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-fg">
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-fg-muted">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
