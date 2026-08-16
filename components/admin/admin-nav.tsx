"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Quote,
  ShoppingBag,
  UserCircle,
  LogOut,
} from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/messages", label: "Inbox", icon: MessageSquare },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/products", label: "Shop", icon: ShoppingBag },
  { href: "/admin/profile", label: "Profile", icon: UserCircle },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: sticky top icon strip */}
      <div className="sticky top-0 z-40 flex items-center justify-around border-b border-border bg-surface px-1 py-2 sm:hidden">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium ${
                active ? "text-accent" : "text-fg-muted"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Desktop: sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-border px-4 py-8 sm:block">
        <Link href="/" className="font-display text-sm font-bold text-fg">
          build<span className="text-gold">with</span>zaza
          <span className="ml-1 text-fg-muted">/admin</span>
        </Link>
        <nav className="mt-8 space-y-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-accent-fg"
                    : "text-fg-muted hover:bg-bg hover:text-fg"
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => signOut(auth)}
          className="mt-8 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-bg hover:text-fg"
        >
          <LogOut size={16} /> Sign out
        </button>
      </aside>
    </>
  );
}
