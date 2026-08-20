import { getProjects } from "@/lib/data/get-projects";
import { Ventures } from "@/components/ventures";
import { Footer } from "@/components/footer";
export const revalidate = 60;
export default async function VenturesPage() { const projects = await getProjects(); return <div className="site-grain"><main className="page-glow"><section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8"><p className="eyebrow">Independent ventures</p><h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[.9] tracking-[-.075em] sm:text-7xl">Products I&apos;m building for the long game.</h1></section><Ventures projects={projects.filter((project) => project.ventureSpotlight).sort((a,b) => a.order - b.order)} /></main><Footer /></div>; }
