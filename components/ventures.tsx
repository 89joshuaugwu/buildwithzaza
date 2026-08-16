import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

export function Ventures({ projects }: { projects: Project[] }) {
  return (
    <section className="border-y border-border bg-surface/50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <span className="log-eyebrow">ventures --status=growing</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-fg sm:text-4xl">
            What I&apos;m building to grow on its own.
          </h2>
          <p className="mt-3 max-w-xl text-fg-muted">
            Not client work — these are mine. Open to partners, early users,
            and investors.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((venture) => (
            <RevealItem key={venture.slug}>
              <div className="relative h-full overflow-hidden rounded-2xl bg-ink p-8 text-paper">
                <div
                  className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.06]"
                  aria-hidden="true"
                  style={{ ["--grid-dot" as string]: "rgba(245,166,35,0.9)" }}
                />
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10"
                  aria-hidden="true"
                />
                <div className="relative">
                  <h3 className="font-display text-2xl font-bold">
                    {venture.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-white/70">
                    {venture.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {venture.liveUrl && (
                      <a
                        href={venture.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/50"
                      >
                        View live
                      </a>
                    )}
                    <Link
                      href="/hire"
                      className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
                    >
                      Let&apos;s talk
                    </Link>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
