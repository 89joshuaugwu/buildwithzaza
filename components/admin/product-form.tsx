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
  pricing: "paid" | "free";
  externalUrl?: string;
  restricted: boolean;
  accessCode?: string;
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
  const [pricing, setPricing] = useState<"paid" | "free">(initial?.pricing ?? (initial?.price === 0 ? "free" : "paid"));
  const [externalUrl, setExternalUrl] = useState(initial?.externalUrl ?? "");
  const [restricted, setRestricted] = useState(initial?.restricted ?? false);
  const [accessCode, setAccessCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !description.trim() || (pricing === "paid" && !price) || (!fileUrl && !externalUrl.trim())) {
      setError("Title, description, and either a download file or external link are required. Paid products also need a price.");
      return;
    }
    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        price: pricing === "free" ? 0 : Number(price),
        previewImages,
        fileUrl,
        fileName,
        published,
        pricing,
        externalUrl: externalUrl.trim() || undefined,
        restricted,
        accessCode: accessCode.trim() || undefined,
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
        label="Download file (optional when using an external link)"
      />

      <div><label className="block text-sm font-semibold text-fg">External resource link <span className="font-normal text-fg-muted">optional</span></label><input type="url" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="https://example.com/tool" className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-brand" /><p className="mt-1 text-xs text-fg-muted">Use this for a tool, course, template, or project hosted elsewhere. It can replace a download file.</p></div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface-raised p-4">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-[var(--color-brand)]" />
        <span><span className="block text-sm font-semibold text-fg">Show this product in the public shop</span><span className="mt-1 block text-xs leading-5 text-fg-muted">Turn this off to keep the product saved as a private draft. Unpublished products cannot be purchased.</span></span>
      </label>
      <div className="rounded-xl border border-border bg-surface p-4">
        <label className="flex cursor-pointer items-start gap-3"><input type="checkbox" checked={restricted} onChange={(e) => setRestricted(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-[var(--color-brand)]" /><span><span className="block text-sm font-semibold text-fg">Restricted product access</span><span className="mt-1 block text-xs leading-5 text-fg-muted">Only people with your private access code can begin checkout.</span></span></label>
        {restricted && <div className="mt-4"><label className="block text-sm font-semibold text-fg">Access code {initial?.restricted && <span className="font-normal text-fg-muted">(leave blank to keep the current code)</span>}</label><input type="password" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="Create a private code" className="mt-2 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none focus:border-brand" />{!initial?.restricted && !accessCode && <p className="mt-2 text-xs text-red-500">A code is required for a restricted product.</p>}</div>}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(["paid", "free"] as const).map((option) => <button key={option} type="button" onClick={() => setPricing(option)} className={`rounded-xl border p-4 text-left ${pricing === option ? "border-brand bg-brand/5" : "border-border"}`}><span className="block text-sm font-bold text-fg">{option === "paid" ? "Paid product" : "Free resource"}</span><span className="mt-1 block text-xs text-fg-muted">{option === "paid" ? "Checkout through Paystack before delivery." : "Visitors can access it without payment."}</span></button>)}
      </div>

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
