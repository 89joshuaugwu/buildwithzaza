"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Plus } from "lucide-react";
import type { ProductData } from "@/components/admin/product-form";

export default function AdminProductsPage() {
  const [items, setItems] = useState<(ProductData & { id: string })[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snap) => {
        setItems(
          snap.docs.map(
            (d) => ({ id: d.id, ...d.data() }) as ProductData & { id: string }
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
        <h1 className="font-display text-2xl font-bold text-fg">Shop</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-fg"
        >
          <Plus size={16} /> New
        </Link>
      </div>

      {loaded && items.length === 0 && (
        <p className="mt-8 text-sm text-fg-muted">
          Nothing listed yet — <code className="rounded bg-surface px-1.5 py-0.5 text-xs">/shop</code>{" "}
          shows an &quot;opening soon&quot; message until you add one here.
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((p) => (
          <Link
            key={p.id}
            href={`/admin/products/${p.id}`}
            className="rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-accent"
          >
            <p className="text-sm font-semibold text-fg">{p.title}</p>
            <p className="mt-1 font-mono text-xs text-fg-muted">
              ₦{Number(p.price).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
