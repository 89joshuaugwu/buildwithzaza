"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./image-upload";

export interface TestimonialData {
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

interface TestimonialFormProps {
  initial?: TestimonialData;
  onSubmit: (data: TestimonialData) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export function TestimonialForm({
  initial,
  onSubmit,
  onDelete,
}: TestimonialFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatarUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !quote.trim()) {
      setError("Name and quote are required.");
      return;
    }
    setSaving(true);
    try {
      await onSubmit({
        name: name.trim(),
        role: role.trim(),
        quote: quote.trim(),
        avatarUrl,
      });
    } catch {
      setError("Save failed — try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-fg">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg">
            Role{" "}
            <span className="font-normal text-fg-muted">optional</span>
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Chapel administrator"
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-fg">Quote</label>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
        />
      </div>

      <ImageUpload
        urls={avatarUrl ? [avatarUrl] : []}
        onChange={(urls) => setAvatarUrl(urls[0] ?? "")}
        multiple={false}
        label="Photo (optional)"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save testimonial"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/testimonials")}
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
