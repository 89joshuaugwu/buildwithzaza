"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function MediaCarousel({ images, title, className = "" }: { images: string[]; title: string; className?: string }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => { if (images.length < 2 || reduceMotion) return; const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), 3800); return () => window.clearInterval(timer); }, [images.length, reduceMotion]);
  if (!images.length) return null;
  return <div className={`group relative overflow-hidden ${className}`}><AnimatePresence mode="wait">{images.map((image, index) => index === active && <motion.img key={image} initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: .45, ease: [0.16, 1, .3, 1] }} src={image} alt={`${title} preview ${index + 1}`} className="h-full w-full object-cover object-top" />)}</AnimatePresence>{images.length > 1 && <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-ink/55 px-2 py-1.5 backdrop-blur"><span className="sr-only">Image {active + 1} of {images.length}</span>{images.map((image, index) => <button key={image} type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); setActive(index); }} aria-label={`View image ${index + 1}`} className={`h-1.5 rounded-full transition-all ${active === index ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />)}</div>}</div>;
}
