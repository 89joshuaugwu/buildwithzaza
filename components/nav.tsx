"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "/projects", label: "Work" },
  { href: "/ventures", label: "Ventures" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav({ logoUrl, logoScale = 100, logoRadius = 10 }: { logoUrl?: string; logoScale?: number; logoRadius?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-bg/85 backdrop-blur-xl" : "bg-bg/65 backdrop-blur-md"}`}>
      <div className="mx-auto flex h-[4.7rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring group flex items-center gap-2 font-display text-base font-bold tracking-[-0.04em] text-fg">
          {logoUrl ? <span className="grid h-7 w-7 overflow-hidden" style={{ borderRadius: `${logoRadius}px` }}><img src={logoUrl} alt="Joshua Ugwu" className="h-full w-full object-contain" style={{ transform: `scale(${logoScale / 100})` }} /></span> : <span className="grid h-7 w-7 place-items-center rounded-lg bg-fg text-xs text-bg transition-transform group-hover:rotate-6">JZ</span>}
          buildwith<span className="text-brand">zaza</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {LINKS.map((link) => {
            const active = pathname === link.href || (link.href === "/projects" && pathname.startsWith("/projects/"));
            return <Link key={link.href} href={link.href} className={`focus-ring relative text-sm font-semibold transition-colors ${active ? "text-fg" : "text-fg-muted hover:text-fg"}`}>
              {link.label}
              {active && <motion.span layoutId="active-nav" className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-brand" />}
            </Link>;
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/hire" className="button-primary hidden min-h-10 px-4 md:inline-flex">Let&apos;s work <ArrowUpRight size={15} /></Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-fg md:hidden">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .18 }} className="border-t border-border bg-bg px-4 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            {LINKS.map((link) => <Link key={link.href} href={link.href} className={`rounded-xl px-4 py-3 text-base font-semibold ${pathname === link.href ? "bg-surface-raised text-fg" : "text-fg-muted"}`}>{link.label}</Link>)}
            <Link href="/hire" className="button-primary mt-3">Start a project <ArrowUpRight size={16} /></Link>
          </nav>
        </motion.div>}
      </AnimatePresence>
    </header>
  );
}
