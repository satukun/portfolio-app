"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MagneticChars } from "@/components/effects/MagneticChars";

const CODE_LINES = [
  "const portfolio = {",
  "  by: 'Yosuke Sato',",
  "  for: 'YO.TEC',",
  "  since: 2008,",
  "  craft: 'the craft behind the system.',",
  "};",
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
    const t = setTimeout(tick, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#fafaf9]">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-50" />

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
            className={`absolute w-4 h-4 ${p} border-zinc-900/40`}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex flex-col px-6 lg:px-10 pt-32 pb-12">
        {/* Top meta */}
        <div className="flex justify-between items-start">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mono text-[0.65rem] tracking-[0.25em] uppercase text-zinc-700"
          >
            [ frontend / direction / ai-native workflow ]
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mono text-[0.65rem] tracking-[0.25em] uppercase text-zinc-700 text-right hidden sm:block"
          >
            <p>N 35.6762°</p>
            <p>E 139.6503°</p>
          </motion.div>
        </div>

        {/* Code typing */}
        <div className="mt-12 lg:mt-16 mono text-[0.7rem] lg:text-xs text-zinc-500 leading-[2] max-w-2xl">
          {typed.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: reveal ? 0.25 : 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-zinc-300 mr-4">{String(i + 1).padStart(2, "0")}</span>
              {line}
            </motion.div>
          ))}
          {!reveal && (
            <span className="inline-block">
              <span className="text-zinc-300 mr-4">{String(typed.length + 1).padStart(2, "0")}</span>
              <span className="blink">▌</span>
            </span>
          )}
        </div>

        {/* Hero tagline */}
        <div className="flex-1 flex items-center mt-8">
          {reveal && (
            <div className="max-w-5xl">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="display-mega"
              >
                <span className="block">
                  <MagneticChars text="the craft" />
                </span>
                <span className="block">
                  <MagneticChars text="behind the" />
                </span>
                <span className="block serif-accent text-zinc-500">
                  <MagneticChars text="system." />
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-10 max-w-md body-jp"
              >
                システムの裏側に、クラフトがある。
                <br />
                10年以上のフロントエンドと、AIを前提とした開発基盤の設計。
              </motion.p>
            </div>
          )}
        </div>

        {/* Bottom meta */}
        <div className="flex justify-between items-end mt-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mono text-[0.65rem] tracking-[0.25em] uppercase text-zinc-700"
          >
            <p>株式会社 YO.TEC / Yosuke Sato</p>
            <p className="mt-1 text-zinc-500">portfolio_v2026.05</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="mono text-[0.65rem] tracking-[0.3em] uppercase text-zinc-700">
              Scroll
            </span>
            <span className="block w-px h-12 relative overflow-hidden bg-zinc-900/30">
              <span className="absolute top-0 left-0 w-full h-4 scroll-hint bg-zinc-900" />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
