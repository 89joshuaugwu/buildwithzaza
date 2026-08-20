"use client";

import { useState, type FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { CheckCircle2, Clock, Mail } from "lucide-react";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Fill in your name, email, and a message.");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "messages"), {
        type: "contact",
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || null,
        description: message.trim(),
        read: false,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending that — email me directly instead."
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
          Message sent
        </h1>
        <p className="mt-2 text-fg-muted">
          I&apos;ll get back to you within 24 hours.
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
    <div className="site-grain"><main className="page-glow mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-28">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-6 font-display text-5xl font-bold leading-[.9] tracking-[-.07em] sm:text-6xl">
        Let&apos;s make something useful.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-fg-muted">
        Have a project, a question, or an idea in mind? Send a message and
        I&apos;ll get back to you.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-muted">
        <a
          href="mailto:joshuaugwu89@gmail.com"
          className="inline-flex items-center gap-1.5 hover:text-accent"
        >
          <Mail size={14} /> joshuaugwu89@gmail.com
        </a>
        <span className="inline-flex items-center gap-1.5">
          <Clock size={14} /> Replies within 24 hours
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 rounded-[1.5rem] border border-border bg-surface p-5 card-shadow sm:p-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-fg">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
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
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg">
            Subject <span className="font-normal text-fg-muted">Optional</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What is this about?"
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Tell me a bit about it..."
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none focus:border-accent"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </main><Footer /></div>
  );
}
