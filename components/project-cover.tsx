"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/data/projects";
import { MediaCarousel } from "./media-carousel";

const PALETTES = [
  ["#5147ee", "#a69fff"], ["#d27831", "#f2bc55"], ["#157a69", "#70d8b8"], ["#a83c63", "#ff9a8e"], ["#2765bd", "#75b7ff"], ["#5842a3", "#bd9cff"],
];

export function ProjectCover({ project, index = 0, large = false }: { project: Project; index?: number; large?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [base, bright] = PALETTES[index % PALETTES.length];
  const initials = project.title.split(" ").map((word) => word[0]).slice(0, 2).join("");
  if (project.images?.length) return <MediaCarousel images={project.images} title={project.title} className={`rounded-[1.15rem] ${large ? "aspect-[16/8]" : "aspect-[16/10]"}`} />;
  return <div className={`relative overflow-hidden rounded-[1.15rem] ${large ? "aspect-[16/8]" : "aspect-[16/10]"}`} style={{ background: `linear-gradient(135deg, ${base}, #121722 75%)` }}>
    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
    <motion.div animate={reduceMotion ? undefined : { x: [0, 18, 0], y: [0, -12, 0], rotate: [0, 4, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-[12%] -top-[30%] h-[78%] w-[58%] rounded-full blur-2xl" style={{ background: bright, opacity: .62 }} />
    <motion.div animate={reduceMotion ? undefined : { y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[12%] left-[10%] right-[10%] rounded-xl border border-white/25 bg-[#11141d]/80 p-3 shadow-2xl backdrop-blur-md sm:p-4">
      <div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-white/15 font-display text-xs font-bold text-white">{initials}</span><span className="h-1.5 w-16 rounded-full bg-white/40" /><span className="ml-auto h-2 w-2 rounded-full bg-[#6bd3b0]" /></div>
      <div className="mt-5 grid grid-cols-[1.1fr_.9fr] gap-3"><div className="h-14 rounded-lg bg-white/12" /><div className="space-y-2"><div className="h-2 rounded-full bg-white/30" /><div className="h-2 w-3/4 rounded-full bg-white/15" /><div className="h-2 w-1/2 rounded-full bg-white/15" /></div></div>
    </motion.div>
    <p className="absolute left-[10%] top-[10%] max-w-[65%] font-display text-xl font-bold tracking-[-.05em] text-white sm:text-2xl">{project.title}</p>
  </div>;
}
