import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

export function AboutPreview() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <ScrollReveal>
        <span className="log-eyebrow">whoami --verbose</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-fg sm:text-4xl">
          Final year at ESUT. Shipping since before that.
        </h2>
        <p className="mt-5 text-fg-muted">
          I&apos;m Joshua — Computer Science, Enugu State University of Science
          and Technology, graduating August 2026. Somewhere between coursework
          and deadlines I started shipping real apps for real problems around
          me, and never really stopped. Now I split time between client work,
          my own ventures, and helping other Nigerian students build the same
          way — by doing it, not just reading about it.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
        >
          More about me →
        </Link>
      </ScrollReveal>
    </section>
  );
}
