import { BuildLog } from "@/components/build-log";
import { TechMarquee } from "@/components/tech-marquee";
import { SelectedWork } from "@/components/selected-work";
import { Ventures } from "@/components/ventures";
import { AboutPreview } from "@/components/about-preview";
import { Testimonials } from "@/components/testimonials";
import { ContactCta } from "@/components/contact-cta";
import { Footer } from "@/components/footer";
import { HeroSceneLoader } from "@/components/three/hero-scene-loader";
import { getProjects } from "@/lib/data/get-projects";
import { Download } from "lucide-react";

// Re-checks Firestore at most once a minute, so admin edits show up on the
// live site without a redeploy — without hitting the database on every
// single request either.
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();
  const selectedWork = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
  const ventures = projects
    .filter((p) => p.ventureSpotlight)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <main className="relative overflow-hidden bg-dot-grid">
        {/* Fades the dot-grid texture out toward the bottom of the hero so
            it reads as atmosphere, not a repeating pattern with a hard edge. */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/85 to-bg"
          aria-hidden="true"
        />
        <HeroSceneLoader />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 pb-16 pt-14 text-center sm:px-6 md:flex-row md:gap-10 md:py-24 md:text-left">
          <div className="flex-1">
            <span className="log-eyebrow">
              status: shipping · Enugu, NG
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl">
              I ship production
              <br />
              software for{" "}
              <span className="text-brand">Nigerian</span> problems.
            </h1>
            <p className="mt-6 max-w-xl text-base text-fg-muted sm:text-lg">
              9+ live apps — client work, AI-assisted tools, and a couple of
              things I&apos;m building to grow on their own. AcadeGrade,
              RollMark, AccomPadi, and more.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="/hire"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Hire me
              </a>
              <a
                href="/projects"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                See the work
              </a>
              <a
                href="/resume.pdf"
                download
                aria-label="Download resume"
                title="Download resume"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Download size={18} />
              </a>
            </div>
          </div>

          <div className="flex-1">
            <BuildLog />
          </div>
        </div>
      </main>

      <TechMarquee />
      <SelectedWork projects={selectedWork} />
      <Ventures projects={ventures} />
      <AboutPreview />
      <Testimonials />
      <ContactCta />
      <Footer />
    </>
  );
}
