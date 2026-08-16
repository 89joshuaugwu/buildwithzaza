"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Loader2, FileText, X } from "lucide-react";

interface FileUploadProps {
  url: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
}

export function FileUpload({ url, onChange, label = "File", accept }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const result = await uploadToCloudinary(file);
      onChange(result.url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-fg">{label}</label>
      {url ? (
        <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-bg px-4 py-3">
          <span className="flex min-w-0 items-center gap-2 truncate text-sm text-fg">
            <FileText size={16} className="shrink-0" />
            <span className="truncate">{url.split("/").pop()}</span>
          </span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 text-fg-muted hover:text-red-500"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-6 text-sm text-fg-muted hover:border-accent">
          {uploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <FileText size={16} />
          )}
          {uploading ? "Uploading..." : "Click to upload"}
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => handleFile(e.target.files)}
          />
        </label>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
