const SOCIALS = [
  { label: "GitHub", href: "https://github.com/89joshuaugwu" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/joshua-ugwu-63b2b0283",
  },
  { label: "TikTok", href: "https://tiktok.com/@joshuazaza89" },
  { label: "Facebook", href: "https://facebook.com/iamjoshuazaza" },
  { label: "YouTube", href: "https://youtube.com/@joshuaugwu89" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <p className="font-display text-sm font-bold text-fg">
          build<span className="text-gold">with</span>zaza
        </p>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-fg-muted transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-fg-muted">
          © {new Date().getFullYear()} Joshua Ugwu.
        </p>
      </div>
    </footer>
  );
}
