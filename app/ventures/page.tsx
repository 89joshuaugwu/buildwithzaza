import Link from "next/link";
import { VENTURES } from "@/lib/data/projects";

export default function VenturesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-gold">
        Ventures
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-fg sm:text-5xl">
        What I&apos;m building to grow on its own.
      </h1>
      <p className="mt-4 max-w-xl text-fg-muted">
        Everything else on this site is either client work or a tool I built
        and shipped. These two are different — they&apos;re mine,
        they&apos;re live, and I&apos;m actively looking for the right
        partners, early users, and investors to help them grow.
      </p>

      <div className="mt-14 space-y-10">
        {VENTURES.map((venture) => (
          <article
            key={venture.slug}
            className="overflow-hidden rounded-3xl bg-ink p-8 text-paper sm:p-10"
          >
            <h2 className="font-display text-3xl font-bold">
              {venture.title}
            </h2>
            <p className="mt-4 max-w-xl text-white/70">{venture.summary}</p>

            {venture.problem && (
              <p className="mt-6 max-w-xl text-sm text-white/60">
                <span className="font-semibold text-gold">The gap: </span>
                {venture.problem}
              </p>
            )}
            {venture.outcome && (
              <p className="mt-3 max-w-xl text-sm text-white/60">
                <span className="font-semibold text-gold">Right now: </span>
                {venture.outcome}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {venture.liveUrl && (
                <a
                  href={venture.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/90 transition-colors hover:border-white/50"
                >
                  View live
                </a>
              )}
              <Link
                href="/hire"
                className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
              >
                Let&apos;s talk
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
