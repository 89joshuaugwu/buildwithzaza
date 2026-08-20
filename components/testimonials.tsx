"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  avatarUrl?: string;
}

// Renders nothing until there's real testimonial data in Firestore — no
// placeholder quotes here on purpose. Add your first one once you have it
// (via /admin once that's built, or directly in the Firestore console for
// now) and this section switches itself on.
export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(
          query(collection(db, "testimonials"), limit(6))
        );
        setItems(
          snap.docs.map(
            (d) => ({ id: d.id, ...d.data() }) as Testimonial
          )
        );
      } catch {
        // Firestore not configured yet, or rules not published — fail quiet.
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  if (!loaded || items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-center font-mono text-xs uppercase tracking-widest text-gold">
        What people say
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.id}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <blockquote className="text-sm text-fg">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-sm font-semibold text-fg">
              {t.avatarUrl ? <img src={t.avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover" /> : <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-raised font-mono text-xs text-fg-muted">{t.name.slice(0, 1)}</span>}
              <span>{t.name}{t.role && <span className="mt-0.5 block font-normal text-fg-muted">{t.role}</span>}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
