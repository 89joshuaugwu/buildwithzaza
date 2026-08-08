"use client";

import { useState, type FormEvent } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Either sign-in method lands here. AdminLayout's onAuthStateChanged
  // listener does the actual redirect once it sees a valid session — this
  // just catches the "signed in, wrong account" case with a clear message
  // instead of a silent bounce.
  async function guardAndFinish() {
    const user = auth.currentUser;
    if (user && user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      setError("This account isn't authorized for admin access.");
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      await guardAndFinish();
    } catch {
      setError("Google sign-in failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSignIn(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      await guardAndFinish();
    } catch {
      setError("Wrong email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-gold">
          Admin
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-fg">
          Sign in
        </h1>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent disabled:opacity-60"
        >
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-fg-muted">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-fg">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-fg">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none focus:border-accent"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
