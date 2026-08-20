import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return <footer className="border-t border-border bg-surface/40">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.35fr_.7fr_.7fr] lg:px-8">
      <div><p className="font-display text-xl font-bold tracking-[-.05em]">buildwith<span className="text-brand">zaza</span></p><p className="mt-3 max-w-sm text-sm leading-6 text-fg-muted">Joshua Ugwu — a product-minded engineer building useful software from Enugu, Nigeria.</p><a href="mailto:joshuaugwu89@gmail.com" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-fg hover:text-brand"><Mail size={15} /> joshuaugwu89@gmail.com</a></div>
      <div><p className="text-xs font-bold uppercase tracking-[.15em] text-fg-muted">Explore</p><div className="mt-4 flex flex-col gap-3 text-sm font-semibold"><Link href="/projects">Selected work</Link><Link href="/ventures">Ventures</Link><Link href="/about">About Joshua</Link></div></div>
      <div><p className="text-xs font-bold uppercase tracking-[.15em] text-fg-muted">Elsewhere</p><div className="mt-4 flex flex-col gap-3 text-sm font-semibold"><a href="https://github.com/89joshuaugwu" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a><a href="https://linkedin.com/in/joshua-ugwu-63b2b0283" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} /></a><Link href="/hire" className="inline-flex items-center gap-2 hover:text-brand">Start a project <ArrowUpRight size={13} /></Link></div></div>
    </div>
    <div className="border-t border-border px-4 py-5 text-center text-xs text-fg-muted">© {new Date().getFullYear()} Joshua Ugwu. Built with intent.</div>
  </footer>;
}
