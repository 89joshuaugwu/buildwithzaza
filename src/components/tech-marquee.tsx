import {
  SiNextdotjs,
  SiTypescript,
  SiFirebase,
  SiCloudinary,
  SiTailwindcss,
  SiPython,
  SiDjango,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface StackItem {
  name: string;
  Icon?: IconType;
}

// Paystack has no entry in react-icons/Simple Icons (smaller regional
// brand, most general icon sets don't carry it) — shown as text only.
// Drop in a custom SVG from Paystack's brand kit later if you want a logo
// here too.
const STACK: StackItem[] = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Cloudinary", Icon: SiCloudinary },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Paystack" },
  { name: "Python", Icon: SiPython },
  { name: "Django", Icon: SiDjango },
];

export function TechMarquee() {
  const items = [...STACK, ...STACK];

  return (
    <div
      className="overflow-hidden border-y border-border bg-surface py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="flex w-max animate-marquee gap-10">
        {items.map((tech, i) => (
          <span
            key={`${tech.name}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-fg-muted transition-colors hover:text-brand"
          >
            {tech.Icon && <tech.Icon size={16} />}
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}
