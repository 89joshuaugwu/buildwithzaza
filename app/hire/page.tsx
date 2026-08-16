"use client";

import { useState, type FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { CheckCircle2 } from "lucide-react";

type ProjectType = "web" | "mobile" | "ai" | "other";
type ContactPref = "whatsapp" | "email" | "phone";

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "web", label: "Web app — website or platform" },
  { value: "mobile", label: "Mobile app — iOS or Android" },
  { value: "ai", label: "AI system — chatbot, automation, AI tool" },
  { value: "other", label: "Other — something different" },
];

const CONTACT_OPTIONS: { value: ContactPref; label: string; hint: string }[] = [
  { value: "whatsapp", label: "WhatsApp", hint: "Fastest — I reply here most" },
  { value: "email", label: "Email", hint: "Good for detail and attachments" },
  { value: "phone", label: "Phone call", hint: "For a quick conversation" },
];

export default function HirePage() {
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [contactPrefs, setContactPrefs] = useState<ContactPref[]>(["whatsapp"]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function toggleContactPref(pref: ContactPref) {
    setContactPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!projectType || !description.trim() || !name.trim() || !email.trim()) {
      setError("Fill in the project type, description, your name, and email.");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "messages"), {
        type: "hire",
        projectType,
        description: description.trim(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        whatsapp: whatsapp.trim() || null,
        contactPrefs,
        read: false,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending that — message me on WhatsApp instead."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center sm:px-6">
        <CheckCircle2 size={40} className="text-ok" />
        <h1 className="mt-4 font-display text-2xl font-bold text-fg">
          Request sent
        </h1>
        <p className="mt-2 text-fg-muted">
          {contactPrefs.includes("whatsapp")
            ? "I'll reach out on WhatsApp first, usually within a day."
            : "I'll get back to you soon."}
        </p>
        <a
          href="/"
          className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent"
        >
          ← Back home
        </a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-gold">
        Let&apos;s work together
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-fg">
        Send a request
      </h1>
      <p className="mt-3 text-fg-muted">
        Tell me about your project and how I can help.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-fg">
            What do you want me to build?
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as ProjectType)}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          >
            <option value="">Choose a project type...</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-fg">
            Describe your project
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Write a brief description of your project..."
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-fg">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-fg">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-fg">
              Phone number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-fg">
              WhatsApp number
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Enter your WhatsApp number"
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-fg">
            How should I reach you?{" "}
            <span className="font-normal text-fg-muted">Pick any that work</span>
          </label>
          <div className="mt-2 space-y-2">
            {CONTACT_OPTIONS.map((opt) => {
              const active = contactPrefs.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleContactPref(opt.value)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                    active ? "border-accent bg-accent/10" : "border-border"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-medium text-fg">
                      {opt.label}
                    </span>
                    <span className="block text-xs text-fg-muted">
                      {opt.hint}
                    </span>
                  </span>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                      active
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-border"
                    }`}
                  >
                    {active && "✓"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send request"}
        </button>
      </form>
    </main>
  );
}
