"use client";

import dynamic from "next/dynamic";

// next/dynamic's `ssr: false` is only allowed inside a Client Component —
// Next.js throws a build error if it's called directly from a Server
// Component (which page.tsx is, by default). This file IS that Client
// Component boundary; page.tsx just renders <HeroSceneLoader /> and never
// touches `dynamic` itself.
export const HeroSceneLoader = dynamic(
  () => import("./hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);
