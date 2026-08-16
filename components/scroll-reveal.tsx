"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds, for when several of these sit in sequence. */
  delay?: number;
  /** Use for a group wrapper whose children should stagger in one-by-one. */
  stagger?: boolean;
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const group: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

/**
 * Fade-and-rise on scroll into view, once. Falls back to a plain div with
 * no animation at all when the visitor has prefers-reduced-motion set —
 * not just a faster version of the same motion, genuinely static.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  stagger = false,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger ? group : item}
      transition={!stagger ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

/** Child item for use inside a `stagger` ScrollReveal group. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
