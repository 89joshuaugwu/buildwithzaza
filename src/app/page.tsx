import { BuildLog } from "@/components/build-log";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 text-center sm:px-6 md:flex-row md:gap-10 md:py-24 md:text-left">
      <div className="flex-1">
        <p className="font-mono text-xs uppercase tracking-widest text-gold">
          Final-year builder · Enugu, NG
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-fg sm:text-5xl lg:text-6xl">
          I ship production software for Nigerian problems.
        </h1>
        <p className="mt-5 max-w-xl text-base text-fg-muted sm:text-lg">
          9+ live apps — client work, AI-assisted tools, and a couple of
          things I&apos;m building to grow on their own. AcadeGrade, RollMark,
          AccomPadi, and more.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
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
        </div>
      </div>

      <div className="flex-1">
        <BuildLog />
      </div>
    </main>
  );
}
