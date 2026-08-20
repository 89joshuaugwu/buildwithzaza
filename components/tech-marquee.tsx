import { SiCloudinary, SiFirebase, SiNextdotjs, SiPython, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import type { IconType } from "react-icons";

const STACK: { name: string; Icon: IconType; color: string }[] = [
  { name: "Next.js", Icon: SiNextdotjs, color: "currentColor" }, { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" }, { name: "Firebase", Icon: SiFirebase, color: "#ffca28" }, { name: "React", Icon: SiReact, color: "#61dafb" }, { name: "Cloudinary", Icon: SiCloudinary, color: "#3448c5" }, { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" }, { name: "Python", Icon: SiPython, color: "#3776ab" },
];

function Track({ reverse = false }: { reverse?: boolean }) { const items = [...STACK, ...STACK]; return <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"><div className={`tech-track flex w-max gap-3 ${reverse ? "tech-track-reverse" : ""}`}>{items.map(({ name, Icon, color }, index) => <span key={`${name}-${index}`} className="flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3.5 font-mono text-xs font-semibold text-fg-muted shadow-sm"><Icon style={{ color }} size={15} />{name}</span>)}</div></div>; }
export function TechMarquee() { return <section aria-label="Technology stack" className="border-b border-border bg-surface/55 py-5"><div className="space-y-3"><Track /><Track reverse /></div></section>; }
