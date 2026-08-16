"use client";

import { useEffect, useState, type FormEvent } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { FileUpload } from "@/components/admin/file-upload";
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
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-fg">Profile</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Powers the hero deploy log and (later) the About page.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
          onChange={setResumeUrl}
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
