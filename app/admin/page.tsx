"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { ArrowUpRight, FolderKanban, Mail, Quote, Settings2, ShoppingBag } from "lucide-react";

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
    <div className="mx-auto max-w-6xl">
      <p className="eyebrow">Admin workspace</p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-[-.06em] text-fg">Your portfolio, in motion.</h1>
          <p className="mt-2 text-sm text-fg-muted">Keep the public site current without touching code.</p>
        </div>
        <Link href="/admin/profile" className="button-secondary min-h-10"><Settings2 size={15} /> Site settings</Link>
      </div>
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
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group rounded-2xl border border-border bg-surface p-5 card-shadow transition hover:-translate-y-1 hover:border-brand"
            >
              <Icon size={20} className="text-brand" />
              <p className="mt-7 font-display text-4xl font-bold tracking-[-.06em] text-fg">
                {c.value}
              </p>
              <div className="mt-1 flex items-center justify-between"><p className="text-sm text-fg-muted">{c.label}</p><ArrowUpRight size={16} className="text-fg-muted group-hover:text-brand" /></div>
            </Link>
          );
        })}
      </div>
      <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <p className="font-display text-xl font-bold text-fg">Quick start</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-fg-muted">Add your website logo and favicon in Site settings, then keep your projects, messages, and proof of work fresh from this workspace.</p>
        <Link href="/admin/profile" className="mt-5 inline-flex items-center text-sm font-bold text-brand hover:underline">Set up brand assets <ArrowUpRight className="ml-1" size={15} /></Link>
      </section>
    </div>
  );
}
