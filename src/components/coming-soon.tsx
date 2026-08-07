interface ComingSoonProps {
  title: string;
  phase: string;
}

export function ComingSoon({ title, phase }: ComingSoonProps) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-gold">
        {phase}
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-fg sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-fg-muted">
        This page is next in the build queue — for now, back to the home
        page.
      </p>
      <a
        href="/"
        className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent"
      >
        ← Back home
      </a>
    </main>
  );
}
