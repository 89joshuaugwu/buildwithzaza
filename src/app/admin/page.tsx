"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { FolderKanban, Mail, Quote, ShoppingBag } from "lucide-react";

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState({
    projects: 0,
    unread: 0,
    testimonials: 0,
    products: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const [projects, unread, testimonials, products] = await Promise.all([
          getCountFromServer(collection(db, "projects")),
          getCountFromServer(
            query(collection(db, "messages"), where("read", "==", false))
          ),
          getCountFromServer(collection(db, "testimonials")),
          getCountFromServer(collection(db, "products")),
        ]);
        setCounts({
          projects: projects.data().count,
          unread: unread.data().count,
          testimonials: testimonials.data().count,
          products: products.data().count,
        });
      } catch {
        // Firestore not configured yet, or rules not published.
      }
    }
    load();
  }, []);

  const cards = [
    { label: "Projects", value: counts.projects, href: "/admin/projects", icon: FolderKanban },
    { label: "Unread messages", value: counts.unread, href: "/admin/messages", icon: Mail },
    { label: "Testimonials", value: counts.testimonials, href: "/admin/testimonials", icon: Quote },
    { label: "Products", value: counts.products, href: "/admin/products", icon: ShoppingBag },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-fg">Overview</h1>
      {counts.projects === 0 && (
        <p className="mt-2 text-sm text-fg-muted">
          Projects showing 0 here just means Firestore hasn&apos;t been seeded
          yet — the live site is still fine, it&apos;s using the built-in
          fallback data. Run the seed scripts when you&apos;re ready (see{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 text-xs">
            scripts/README.md
          </code>
          ).
        </p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
            >
              <Icon size={20} className="text-gold" />
              <p className="mt-3 font-display text-2xl font-bold text-fg">
                {c.value}
              </p>
              <p className="text-sm text-fg-muted">{c.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
