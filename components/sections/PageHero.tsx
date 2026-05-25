"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { Formation } from "@/components/three/TexturedCubes";

const TexturedCubes = dynamic(
  () => import("@/components/three/TexturedCubes").then((m) => m.TexturedCubes),
  { ssr: false }
);

type Props = {
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  bigLabel: string; // huge background number/label e.g. "WORKS", "14"
  formation: Formation;
  count?: number;
  cycle?: boolean;
  accentColor?: string;
};

export function PageHero({
  eyebrow,
  titleTop,
  titleBottom,
  description,
  bigLabel,
  formation,
  count = 8,
  cycle = false,
  accentColor = "rgba(17,17,17,0.05)",
}: Props) {
  return (
    <header className="relative min-h-[78vh] lg:min-h-[88vh] flex items-end overflow-hidden border-b border-zinc-900/10 bg-[#fafaf9]">
      {/* grid + dot bg */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 dot-bg opacity-30" />

      {/* 3D cubes (right ~half) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 pointer-events-none">
        <TexturedCubes
          count={count}
          initialFormation={formation}
          cycle={cycle}
          cycleMs={6000}
          pointerInfluence={0.16}
          cameraZ={8}
        />
      </div>

      {/* huge background label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
        className="pointer-events-none absolute left-6 lg:left-16 bottom-4 mono font-light leading-none select-none"
        style={{
          color: accentColor,
          fontSize: "clamp(8rem, 22vw, 22rem)",
          letterSpacing: "-0.03em",
        }}
      >
        {bigLabel}
      </motion.div>

      {/* Vertical left rail */}
      <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-10">
        <span className="mono text-[0.55rem] tracking-[0.3em] uppercase text-zinc-500 [writing-mode:vertical-rl] rotate-180">
          {eyebrow}
        </span>
        <span className="block w-px h-20 bg-zinc-900/30" />
      </div>

      {/* Corner marks */}
      <div className="pointer-events-none absolute inset-0">
        {[
          "top-6 left-6 border-l border-t",
          "top-6 right-6 border-r border-t",
          "bottom-6 left-6 border-l border-b",
          "bottom-6 right-6 border-r border-b",
        ].map((p) => (
          <span
            key={p}
            className={`absolute w-4 h-4 ${p} border-zinc-900/30`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative w-full px-6 lg:px-16 pt-40 pb-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">{eyebrow}</span>
          <h1
            className="mt-6 display-xl max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            <span className="block">{titleTop}</span>
            <span className="block serif-accent text-zinc-500 pl-[14%]">
              {titleBottom}
            </span>
          </h1>
          <p className="mt-10 body-jp max-w-xl">{description}</p>
        </motion.div>
      </div>
    </header>
  );
}
