import { ProjectsGrid } from "@/components/projects-grid";
import { Footer } from "@/components/footer";
import { getProjects } from "@/lib/data/get-projects";
export const revalidate = 60;
export default async function ProjectsPage() { const projects = await getProjects(); return <div className="site-grain"><main className="page-glow"><section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><p className="eyebrow">Work archive</p><h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[.9] tracking-[-.075em] sm:text-7xl">A record of things I&apos;ve made work.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-fg-muted">{projects.length} projects across client operations, student systems, AI tools, and independent ventures. Browse the decisions behind each one.</p><ProjectsGrid projects={projects} /></section></main><Footer /></div>; }
