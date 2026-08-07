import Link from "next/link";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
      <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">
        Got something to build?
      </h2>
      <p className="mt-3 text-fg-muted">
        Freelance work, an internship, or just want to talk about AccomPadi
        or ReelNix — pick whichever fits.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/hire"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.03]"
        >
          Hire me
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent"
        >
          General contact
        </Link>
      </div>
    </section>
  );
}
