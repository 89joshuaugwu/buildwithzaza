import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { ProjectCover } from "./project-cover";
import { ScrollReveal, RevealItem } from "./scroll-reveal";
import { TechMarquee } from "./tech-marquee";

export function SelectedWork({ projects }: { projects: Project[] }) {
  return <><TechMarquee /><section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
    <ScrollReveal className="flex items-end justify-between gap-6"><div><span className="eyebrow">Selected work</span><h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[.95] tracking-[-.06em] sm:text-5xl">Useful products, shipped into the real world.</h2></div><Link href="/projects" className="button-secondary hidden sm:inline-flex">See every project <ArrowUpRight size={16} /></Link></ScrollReveal>
    <ScrollReveal stagger className="mt-12 grid gap-6 md:grid-cols-2">
      {projects.map((project, index) => <RevealItem key={project.slug}><Link href={`/projects/${project.slug}`} className="group block"><article className="rounded-[1.4rem] border border-border bg-surface p-3 card-shadow transition duration-300 hover:-translate-y-1 hover:border-brand"><ProjectCover project={project} index={index} /><div className="px-2 pb-2 pt-5"><div className="flex items-center justify-between gap-4"><span className="font-mono text-[.65rem] font-semibold uppercase tracking-[.14em] text-fg-muted">{project.category === "client" ? "Client platform" : "Independent product"}</span><ArrowUpRight size={18} className="text-fg-muted transition group-hover:text-brand" /></div><h3 className="mt-2 font-display text-2xl font-bold tracking-[-.045em]">{project.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-fg-muted">{project.summary}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.slice(0, 3).map((tech) => <span key={tech} className="rounded-md bg-surface-raised px-2.5 py-1 font-mono text-[.66rem] text-fg-muted">{tech}</span>)}</div></div></article></Link></RevealItem>)}
    </ScrollReveal>
    <Link href="/projects" className="button-secondary mt-8 w-full sm:hidden">See every project <ArrowUpRight size={16} /></Link>
  </section></>;
}
