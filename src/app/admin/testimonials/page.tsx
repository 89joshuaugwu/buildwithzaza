"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Plus } from "lucide-react";
import type { TestimonialData } from "@/components/admin/testimonial-form";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<(TestimonialData & { id: string })[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "testimonials"),
      (snap) => {
        setItems(
          snap.docs.map(
            (d) => ({ id: d.id, ...d.data() }) as TestimonialData & { id: string }
          )
        );
        setLoaded(true);
      },
      () => setLoaded(true)
    );
    return unsub;
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-fg">
          Testimonials
        </h1>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-fg"
        >
          <Plus size={16} /> New
        </Link>
      </div>

      {loaded && items.length === 0 && (
        <p className="mt-8 text-sm text-fg-muted">
          None yet — the site hides this section entirely until there&apos;s
          a real one. Add your first when you have it; nothing&apos;s
          fabricated here on purpose.
        </p>
      )}

      <div className="mt-6 space-y-2">
        {items.map((t) => (
          <Link
            key={t.id}
            href={`/admin/testimonials/${t.id}`}
            className="block rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-accent"
          >
            <p className="text-sm font-semibold text-fg">{t.name}</p>
            <p className="mt-1 truncate text-xs text-fg-muted">{t.quote}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
