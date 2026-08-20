"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./image-upload";
import { FileUpload } from "./file-upload";

export interface ProductData {
  title: string;
  description: string;
  price: number;
  previewImages: string[];
  fileUrl: string;
  fileName?: string;
  published: boolean;
}

interface ProductFormProps {
  initial?: ProductData;
  onSubmit: (data: ProductData) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export function ProductForm({ initial, onSubmit, onDelete }: ProductFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [previewImages, setPreviewImages] = useState<string[]>(
    initial?.previewImages ?? []
  );
  const [fileUrl, setFileUrl] = useState(initial?.fileUrl ?? "");
  const [fileName, setFileName] = useState(initial?.fileName ?? "");
  const [published, setPublished] = useState(initial?.published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !description.trim() || !price || !fileUrl) {
      setError("Title, description, price, and the deliverable file are all required.");
      return;
    }
    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        previewImages,
        fileUrl,
        fileName,
        published,
      });
    } catch {
      setError("Save failed — try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-fg">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-fg">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-fg">
          Price{" "}
          <span className="font-normal text-fg-muted">₦, no commas</span>
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-2 w-full max-w-[160px] rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
        />
      </div>

      <ImageUpload
        urls={previewImages}
        onChange={setPreviewImages}
        label="Preview images"
      />

      <FileUpload
        url={fileUrl}
        fileName={fileName}
        onChange={(url, name) => { setFileUrl(url); setFileName(name ?? ""); }}
        label="Deliverable file (what buyers download)"
      />

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface-raised p-4">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-[var(--color-brand)]" />
        <span><span className="block text-sm font-semibold text-fg">Show this product in the public shop</span><span className="mt-1 block text-xs leading-5 text-fg-muted">Turn this off to keep the product saved as a private draft. Unpublished products cannot be purchased.</span></span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
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
