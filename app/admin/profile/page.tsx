"use client";

import { useEffect, useState, type FormEvent } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { FileUpload } from "@/components/admin/file-upload";
import { ImageUpload } from "@/components/admin/image-upload";
import { CheckCircle2, Plus, X } from "lucide-react";

interface BuildLogLine {
  cmd: string;
  status: "live" | "shipping";
  detail: string;
}

export default function AdminProfilePage() {
  const [bio, setBio] = useState("");
  const [currentlyBuilding, setCurrentlyBuilding] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [logoScale, setLogoScale] = useState(100);
  const [logoRadius, setLogoRadius] = useState(10);
  const [faviconScale, setFaviconScale] = useState(100);
  const [faviconRadius, setFaviconRadius] = useState(16);
  const [buildLog, setBuildLog] = useState<BuildLogLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "profile", "main"));
      const data = snap.data();
      if (data) {
        setBio(data.bio ?? "");
        setCurrentlyBuilding(data.currentlyBuilding ?? "");
        setResumeUrl(data.resumeUrl ?? "");
        setResumeName(data.resumeName ?? "");
        setLogoUrl(data.logoUrl ?? "");
        setFaviconUrl(data.faviconUrl ?? "");
        setLogoScale(data.logoScale ?? 100);
        setLogoRadius(data.logoRadius ?? 10);
        setFaviconScale(data.faviconScale ?? 100);
        setFaviconRadius(data.faviconRadius ?? 16);
        setBuildLog(data.buildLog ?? []);
      }
      setLoading(false);
    }
    load();
  }, []);

  function updateLine(i: number, field: keyof BuildLogLine, value: string) {
    setBuildLog((prev) =>
      prev.map((line, idx) => (idx === i ? { ...line, [field]: value } : line))
    );
  }

  function addLine() {
    setBuildLog((prev) => [...prev, { cmd: "", status: "live", detail: "" }]);
  }

  function removeLine(i: number) {
    setBuildLog((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(
        doc(db, "profile", "main"),
        {
          bio: bio.trim(),
          currentlyBuilding: currentlyBuilding.trim(),
          resumeUrl,
          resumeName,
          logoUrl,
          faviconUrl,
          logoScale,
          logoRadius,
          faviconScale,
          faviconRadius,
          buildLog,
        },
        { merge: true }
      );
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-fg-muted">Loading…</p>;

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Site settings</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-[-.06em] text-fg">Profile &amp; brand</h1>
      <p className="mt-2 text-sm text-fg-muted">
        Manage the site identity and the content used throughout your portfolio.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-display text-xl font-bold text-fg">Brand assets</h2>
          <p className="mt-1 text-sm text-fg-muted">These update the public navigation logo and browser tab icon after deployment/cache refresh.</p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <ImageUpload urls={logoUrl ? [logoUrl] : []} onChange={(urls) => setLogoUrl(urls[0] ?? "")} multiple={false} label="Website logo" />
            <ImageUpload urls={faviconUrl ? [faviconUrl] : []} onChange={(urls) => setFaviconUrl(urls[0] ?? "")} multiple={false} label="Favicon (square PNG recommended)" />
          </div>
          <div className="mt-6 grid gap-5 rounded-xl bg-surface-raised p-4 sm:grid-cols-[160px_1fr_1fr] sm:items-center">
            <div className="flex justify-center"><span className="grid h-20 w-20 overflow-hidden bg-fg p-1" style={{ borderRadius: `${logoRadius}px` }}>{logoUrl ? <img src={logoUrl} alt="Logo preview" className="h-full w-full object-contain" style={{ transform: `scale(${logoScale / 100})` }} /> : <span className="grid h-full w-full place-items-center text-xs font-bold text-bg">JZ</span>}</span></div>
            <label className="text-sm font-semibold text-fg">Logo size <span className="float-right font-mono text-xs text-fg-muted">{logoScale}%</span><input type="range" min="60" max="140" value={logoScale} onChange={(e) => setLogoScale(Number(e.target.value))} className="mt-3 w-full accent-[var(--color-brand)]" /></label>
            <label className="text-sm font-semibold text-fg">Corner roundness <span className="float-right font-mono text-xs text-fg-muted">{logoRadius}px</span><input type="range" min="0" max="28" value={logoRadius} onChange={(e) => setLogoRadius(Number(e.target.value))} className="mt-3 w-full accent-[var(--color-brand)]" /></label>
          </div>
          <div className="mt-4 grid gap-5 rounded-xl bg-surface-raised p-4 sm:grid-cols-[160px_1fr_1fr] sm:items-center">
            <div className="flex justify-center"><span className="grid h-20 w-20 overflow-hidden bg-fg p-1" style={{ borderRadius: `${faviconRadius}px` }}>{faviconUrl ? <img src={faviconUrl} alt="Favicon preview" className="h-full w-full object-cover" style={{ transform: `scale(${faviconScale / 100})` }} /> : <span className="grid h-full w-full place-items-center text-xs font-bold text-bg">JZ</span>}</span></div>
            <label className="text-sm font-semibold text-fg">Favicon crop / zoom <span className="float-right font-mono text-xs text-fg-muted">{faviconScale}%</span><input type="range" min="60" max="140" value={faviconScale} onChange={(e) => setFaviconScale(Number(e.target.value))} className="mt-3 w-full accent-[var(--color-brand)]" /></label>
            <label className="text-sm font-semibold text-fg">Favicon roundness <span className="float-right font-mono text-xs text-fg-muted">{faviconRadius}px</span><input type="range" min="0" max="64" value={faviconRadius} onChange={(e) => setFaviconRadius(Number(e.target.value))} className="mt-3 w-full accent-[var(--color-brand)]" /></label>
          </div>
        </section>
        <div>
          <label className="block text-sm font-semibold text-fg">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-fg">
            Currently building
          </label>
          <input
            type="text"
            value={currentlyBuilding}
            onChange={(e) => setCurrentlyBuilding(e.target.value)}
            placeholder="final year, ESUT — Aug 2026"
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>

        <FileUpload
          url={resumeUrl}
          fileName={resumeName}
          onChange={(url, name) => { setResumeUrl(url); setResumeName(name ?? ""); }}
          label="Resume (PDF)"
          accept="application/pdf"
        />

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-fg">
              Deploy log lines
            </label>
            <button
              type="button"
              onClick={addLine}
              className="flex items-center gap-1 text-xs font-semibold text-accent"
            >
              <Plus size={14} /> Add line
            </button>
          </div>
          <div className="mt-2 space-y-3">
            {buildLog.map((line, i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-2 rounded-xl border border-border p-3 sm:grid-cols-[1fr_1fr_auto_auto]"
              >
                <input
                  value={line.cmd}
                  onChange={(e) => updateLine(i, "cmd", e.target.value)}
                  placeholder="deploy project-x"
                  className="rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-fg outline-none focus:border-accent"
                />
                <input
                  value={line.detail}
                  onChange={(e) => updateLine(i, "detail", e.target.value)}
                  placeholder="short detail"
                  className="rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-fg outline-none focus:border-accent"
                />
                <select
                  value={line.status}
                  onChange={(e) => updateLine(i, "status", e.target.value)}
                  className="rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-fg outline-none focus:border-accent"
                >
                  <option value="live">live</option>
                  <option value="shipping">shipping</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeLine(i)}
                  className="flex items-center justify-center rounded-lg border border-border px-2 text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save profile"}
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1 text-sm text-ok">
              <CheckCircle2 size={14} /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
