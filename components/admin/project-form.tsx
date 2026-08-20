"use client";

import { useState, type FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./image-upload";
import type { Project, ProjectCategory } from "@/lib/data/projects";

interface ProjectFormProps {
  initial?: Project;
  slugLocked?: boolean;
  onSubmit: (data: Project) => Promise<void>;
  onDelete?: () => Promise<void>;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProjectForm({
  initial,
  slugLocked,
  onSubmit,
  onDelete,
}: ProjectFormProps) {
  const router = useRouter();
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [category, setCategory] = useState<ProjectCategory>(
    initial?.category ?? "product"
  );
  const [stack, setStack] = useState(initial?.stack?.join(", ") ?? "");
  const [liveUrl, setLiveUrl] = useState(initial?.liveUrl ?? "");
  const [repoUrl, setRepoUrl] = useState(initial?.repoUrl ?? "");
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [ventureSpotlight, setVentureSpotlight] = useState(
    initial?.ventureSpotlight ?? false
  );
  const [order, setOrder] = useState(initial?.order ?? 1);
  const [problem, setProblem] = useState(initial?.problem ?? "");
  const [approach, setApproach] = useState(initial?.approach ?? "");
  const [outcome, setOutcome] = useState(initial?.outcome ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const finalSlug = slugify(slug);
    if (!finalSlug || !title.trim() || !summary.trim()) {
      setError("Slug, title, and summary are required.");
      return;
    }

    setSaving(true);
    try {
      const project = {
        slug: finalSlug,
        title: title.trim(),
        summary: summary.trim(),
        category,
        stack: stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        liveUrl: liveUrl.trim() || undefined,
        repoUrl: repoUrl.trim() || undefined,
        images,
        featured,
        ventureSpotlight,
        order: Number(order) || 1,
        problem: problem.trim() || undefined,
        approach: approach.trim() || undefined,
        outcome: outcome.trim() || undefined,
      };
      const cleanProject = Object.fromEntries(Object.entries(project).filter(([, value]) => value !== undefined)) as unknown as Project;
      await onSubmit(cleanProject);
    } catch (err) {
      console.error("Project save failed", err);
      setError("Save failed — check your connection and try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-fg">Title</label>
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg">
            Slug{" "}
            {slugLocked && (
              <span className="font-normal text-fg-muted">
                (locked — this is the URL, delete + recreate to change it)
              </span>
            )}
          </label>
          <input
            value={slug}
            disabled={slugLocked}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent disabled:opacity-60"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-fg">Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={2}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-semibold text-fg">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProjectCategory)}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          >
            <option value="product">Own build</option>
            <option value="client">Client work</option>
            <option value="venture">Venture</option>
            <option value="collaboration">Collaboration</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg">
            Order
          </label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>
        <div className="flex items-end gap-4 pb-3">
          <label className="flex items-center gap-2 text-sm text-fg">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-[var(--color-accent)]"
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-fg">
            <input
              type="checkbox"
              checked={ventureSpotlight}
              onChange={(e) => setVentureSpotlight(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-[var(--color-accent)]"
            />
            Venture
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-fg">
          Stack{" "}
          <span className="font-normal text-fg-muted">comma-separated</span>
        </label>
        <input
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          placeholder="Next.js, Firebase, TypeScript"
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-fg">
            Live URL
          </label>
          <input
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg">
            Repo URL
          </label>
          <input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>
      </div>

      <ImageUpload urls={images} onChange={setImages} label="Screenshots" />

      <div>
        <label className="block text-sm font-semibold text-fg">
          The problem{" "}
          <span className="font-normal text-fg-muted">
            optional — case study depth
          </span>
        </label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={2}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-fg">
          The approach
        </label>
        <textarea
          value={approach}
          onChange={(e) => setApproach(e.target.value)}
          rows={2}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-fg">
          Where it stands
        </label>
        <textarea
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          rows={2}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg hover:border-accent"
        >
          Cancel
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="ml-auto text-sm font-semibold text-red-500 hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
