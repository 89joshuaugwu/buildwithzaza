"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const baseRotation = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, [count]);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    baseRotation.current += delta * 0.03;
    ref.current.rotation.y = baseRotation.current + pointer.current.x * 0.2;
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      pointer.current.y * 0.15,
      0.05
    );
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#F5A623"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

// Ambient depth layer for the hero. Deliberately simple — a drifting
// particle field, not a modeled scene — so it stays cheap on mobile.
// Un-mounts entirely (no canvas, no GPU cost) if the visitor has
// prefers-reduced-motion set, and runs a lighter particle count on
// small screens.
export function HeroScene() {
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(80);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    setCount(window.innerWidth < 640 ? 60 : 160);
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ParticleField count={count} />
      </Canvas>
    </div>
  );
}
