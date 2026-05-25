"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MagneticChars } from "@/components/effects/MagneticChars";

const TexturedCubes = dynamic(
  () => import("@/components/three/TexturedCubes").then((m) => m.TexturedCubes),
  { ssr: false }
);

const CODE_LINES = [
  "$ git log --since 2008 --author 'yosuke.sato'",
  "→ 14 shipped · 3 contracts · 1 incorporation",
  "→ stack: next.js · react · ts · claude-skills",
  "→ tagline:",
];

export function HomeHero() {
  const [typed, setTyped] = useState<string[]>([]);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i >= CODE_LINES.length) {
        setTimeout(() => setReveal(true), 350);
        return;
      }
      setTyped((prev) => [...prev, CODE_LINES[i]]);
      i += 1;
      setTimeout(tick, 220);
    };
    const t = setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#fafaf9]">
      {/* Background grid + dot composite */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 dot-bg opacity-30" />

      {/* 3D Cubes — right side dominant, formation cycles */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 pointer-events-none">
        <TexturedCubes
          count={14}
          initialFormation="scatter"
          cycle
          cycleMs={5500}
          pointerInfluence={0.22}
          cameraZ={7.5}
        />
      </div>

      {/* Diagonal cross-line accents */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="22" x2="100" y2="22" stroke="rgba(17,17,17,0.08)" strokeWidth="0.1" />
        <line x1="0" y1="78" x2="100" y2="78" stroke="rgba(17,17,17,0.08)" strokeWidth="0.1" />
        <line x1="38" y1="0" x2="38" y2="100" stroke="rgba(17,17,17,0.08)" strokeWidth="0.1" />
      </svg>

      {/* Vertical index (left rail) */}
      <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-6">
        <span className="mono text-[0.55rem] tracking-[0.3em] uppercase text-zinc-500 [writing-mode:vertical-rl] rotate-180">
          portfolio · index · 2026
        </span>
        <span className="block w-px h-24 bg-zinc-900/30" />
        <span className="mono text-[0.55rem] tracking-[0.3em] uppercase text-zinc-500">
          /00
        </span>
      </div>

      <div className="relative min-h-screen flex flex-col px-6 lg:px-16 pt-32 pb-12">
        {/* Top row: eyebrow + coords */}
        <div className="flex justify-between items-start mb-12">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mono text-[0.65rem] tracking-[0.25em] uppercase text-zinc-700"
          >
            [ frontend · direction · ai-native ]
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mono text-[0.6rem] tracking-[0.2em] uppercase text-zinc-700 text-right"
          >
            <p>14 / shipped</p>
            <p className="text-zinc-400">since 2008.01</p>
          </motion.div>
        </div>

        {/* Big numeric overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          aria-hidden
          className="pointer-events-none absolute left-6 lg:left-16 top-[20vh] mono text-zinc-900/[0.05] font-light leading-none select-none"
          style={{ fontSize: "clamp(15rem, 38vw, 38rem)" }}
        >
          <span className="block">14</span>
        </motion.div>

        {/* Code rail */}
        <div className="mono text-[0.7rem] text-zinc-500 leading-[2] max-w-xl mb-auto">
          {typed.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: reveal ? 0.35 : 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-zinc-300 mr-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              {line}
            </motion.div>
          ))}
          {!reveal && (
            <span className="inline-block">
              <span className="text-zinc-300 mr-3">
                {String(typed.length + 1).padStart(2, "0")}
              </span>
              <span className="blink">▌</span>
            </span>
          )}
        </div>

        {/* Tagline — anchored bottom-left, asymmetric */}
        <div className="mt-12 lg:mt-0 max-w-[min(56rem,55vw)]">
          {reveal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h1
                className="display-mega whitespace-nowrap"
                style={{ fontSize: "clamp(2.75rem, 7.4vw, 8rem)" }}
              >
                <span className="block">
                  <MagneticChars text="the craft" />
                </span>
                <span className="block pl-[10%]">
                  <MagneticChars text="behind" />
                </span>
                <span className="block serif-accent text-zinc-500 pl-[22%]">
                  <MagneticChars text="the system." />
                </span>
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="mt-10 flex items-start gap-10 flex-wrap"
              >
                <p className="body-jp max-w-xs">
                  システムの裏側に、クラフトがある。
                  <br />
                  10年以上のフロントエンドと、AIを前提とした開発基盤の設計。
                </p>
                <div className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500 leading-[2]">
                  <p>株式会社 YO.TEC</p>
                  <p>Yosuke Sato</p>
                  <p className="text-zinc-400">portfolio_v2026.05</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Bottom rail: stat strip + scroll */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-6 border-t border-zinc-900/10 pt-8">
          <Stat label="Contracts" value="09" />
          <Stat label="Outsourcing" value="50+" />
          <Stat label="In-house" value="02" />
          <Stat label="Career" value="18yr" />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="hidden lg:flex flex-col items-end justify-self-end gap-3"
          >
            <span className="mono text-[0.55rem] tracking-[0.3em] uppercase text-zinc-700">
              scroll ↓
            </span>
            <span className="block w-px h-10 relative overflow-hidden bg-zinc-900/30">
              <span className="absolute top-0 left-0 w-full h-3 scroll-hint bg-zinc-900" />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="display-l text-zinc-900" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
        {value}
      </p>
      <p className="mt-1 mono text-[0.55rem] tracking-[0.3em] uppercase text-zinc-500">
        {label}
      </p>
    </div>
  );
}
