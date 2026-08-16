"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Loader2, Upload, X } from "lucide-react";

interface ImageUploadProps {
  urls: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  label?: string;
}

export function ImageUpload({
  urls,
  onChange,
  multiple = true,
  label = "Images",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const result = await uploadToCloudinary(file);
        uploaded.push(result.url);
      }
      onChange(multiple ? [...urls, ...uploaded] : uploaded);
    } catch {
      setError("Upload failed — check your Cloudinary preset and try again.");
    } finally {
      setUploading(false);
    }
  }

  function removeAt(index: number) {
    onChange(urls.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-fg">{label}</label>
      <div className="mt-2 flex flex-wrap gap-3">
        {urls.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <div
            key={url}
            className="relative h-20 w-20 overflow-hidden rounded-lg border border-border"
          >
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink/80 text-white"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border text-fg-muted hover:border-accent">
          {uploading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Upload size={18} />
          )}
          <span className="text-[10px]">{uploading ? "..." : "Add"}</span>
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
