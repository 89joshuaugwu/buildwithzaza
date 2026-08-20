import { SiCloudinary, SiFirebase, SiNextdotjs, SiPython, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import type { IconType } from "react-icons";

const STACK: { name: string; Icon: IconType }[] = [
  { name: "Next.js", Icon: SiNextdotjs }, { name: "TypeScript", Icon: SiTypescript }, { name: "Firebase", Icon: SiFirebase }, { name: "React", Icon: SiReact }, { name: "Cloudinary", Icon: SiCloudinary }, { name: "Tailwind CSS", Icon: SiTailwindcss }, { name: "Python", Icon: SiPython },
];

function Track({ reverse = false }: { reverse?: boolean }) { const items = [...STACK, ...STACK]; return <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"><div className={`tech-track flex w-max gap-3 ${reverse ? "tech-track-reverse" : ""}`}>{items.map(({ name, Icon }, index) => <span key={`${name}-${index}`} className="flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3.5 font-mono text-xs font-semibold text-fg-muted shadow-sm"><Icon className="text-brand" size={15} />{name}</span>)}</div></div>; }
export function TechMarquee() { return <section aria-label="Technology stack" className="border-b border-border bg-surface/55 py-5"><div className="space-y-3"><Track /><Track reverse /></div></section>; }
