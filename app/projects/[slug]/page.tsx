import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "@/lib/data/projects";
import { getProjectBySlug } from "@/lib/data/get-projects";
import { ProjectCover } from "@/components/project-cover";
import { Footer } from "@/components/footer";

export const revalidate = 60;
export function generateStaticParams() { return PROJECTS.map(({ slug }) => ({ slug })); }

function categoryLabel(category: string) {
  return category === "client" ? "Client platform" : category === "venture" ? "Independent venture" : category === "collaboration" ? "Collaboration" : "Independent product";
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const hasStory = project.problem || project.approach || project.outcome;
  const gallery = project.images?.slice(1) ?? [];

  return <div className="site-grain"><main className="page-glow"><article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
    <Link href="/projects" className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-fg-muted hover:text-brand"><ArrowLeft size={16} /> All work</Link>
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-end">
      <div><p className="eyebrow">{categoryLabel(project.category)}</p><h1 className="mt-5 font-display text-5xl font-bold leading-[.9] tracking-[-.07em] sm:text-6xl">{project.title}</h1><p className="mt-6 text-lg leading-8 text-fg-muted">{project.summary}</p><div className="mt-7 flex flex-wrap gap-3">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button-primary">Visit product <ArrowUpRight size={16} /></a>}{project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="button-secondary"><Github size={16} /> Source code</a>}</div></div>
      <ProjectCover project={project} index={project.order - 1} large />
    </div>
    <div className="mt-12 flex flex-wrap gap-2 border-y border-border py-5">{project.stack.map((tech) => <span key={tech} className="rounded-lg bg-surface-raised px-3 py-2 font-mono text-xs text-fg-muted">{tech}</span>)}</div>
    {gallery.length > 0 && <section className="mt-14"><p className="eyebrow">Product gallery</p><h2 className="mt-4 font-display text-3xl font-bold tracking-[-.055em]">A closer look at the product.</h2><div className="mt-7 grid gap-4 sm:grid-cols-2">{gallery.map((image, index) => <a key={image} href={image} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl border border-border bg-surface"><img src={image} alt={`${project.title} interface screen ${index + 2}`} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" /></a>)}</div></section>}
    {hasStory && <section className="mt-16 grid gap-6 md:grid-cols-3">{[["The challenge", project.problem], ["The approach", project.approach], ["The result", project.outcome]].map(([title, copy]) => copy && <div key={title as string} className="rounded-2xl border border-border bg-surface p-6"><p className="font-mono text-[.65rem] font-bold uppercase tracking-[.14em] text-brand">{title}</p><p className="mt-5 text-sm leading-7 text-fg-muted">{copy}</p></div>)}</section>}
    <section className="mt-16 rounded-[1.5rem] bg-fg p-8 text-bg sm:p-10"><p className="font-display text-3xl font-bold tracking-[-.055em]">Have a product idea worth making real?</p><p className="mt-3 max-w-xl text-bg/65">I take on a focused number of projects — product thinking, design systems, and engineering in one engaged partnership.</p><Link href="/hire" className="mt-7 inline-flex rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-fg">Start a conversation <ArrowUpRight className="ml-2" size={16} /></Link></section>
  </article></main><Footer /></div>;
}
