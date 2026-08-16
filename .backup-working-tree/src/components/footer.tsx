import { Github, Linkedin, Facebook, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// TikTok has no lucide icon — inline brand-accurate SVG kept at the same
// 16px/stroke-free treatment as the lucide icons around it, so the row
// doesn't look mismatched.
function TiktokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.6 5.82c-.9-.98-1.39-2.26-1.39-3.62h-3.16v13.9c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1 0-5.8c.29 0 .58.04.85.12V9.9a6.06 6.06 0 0 0-.85-.06 6.06 6.06 0 1 0 6.06 6.06V8.53a8.86 8.86 0 0 0 5.19 1.66V7.02a5.6 5.6 0 0 1-3.8-1.2z" />
    </svg>
  );
}

const SOCIALS: {
  label: string;
  href: string;
  Icon: LucideIcon | typeof TiktokIcon;
}[] = [
  { label: "GitHub", href: "https://github.com/89joshuaugwu", Icon: Github },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/joshua-ugwu-63b2b0283",
    Icon: Linkedin,
  },
  { label: "TikTok", href: "https://tiktok.com/@joshuazaza89", Icon: TiktokIcon },
  {
    label: "Facebook",
    href: "https://facebook.com/iamjoshuazaza",
    Icon: Facebook,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@joshuaugwu89",
    Icon: Youtube,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <p className="font-display text-sm font-bold text-fg">
          build<span className="text-gold">with</span>zaza
        </p>
        <nav className="flex flex-wrap justify-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <s.Icon size={16} />
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
