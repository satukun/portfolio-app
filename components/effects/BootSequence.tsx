"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "$ init // YO.TEC / PORTFOLIO_v2026",
  "$ load fonts: inter[200,300,400] / jetbrains-mono",
  "$ load tokens: #fafaf9 #111111 #71717a",
  "$ mount: header / hero / works / approach",
  "$ resolve: the craft behind the system.",
  "$ ready ✓",
];

export function BootSequence() {
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const skip = sessionStorage.getItem("yotec_boot") === "done";
    if (skip) {
      setDone(true);
      return;
    }
    let i = 0;
    const tick = () => {
      i += 1;
      if (i >= LINES.length) {
        setStep(LINES.length);
        setTimeout(() => {
          sessionStorage.setItem("yotec_boot", "done");
          setDone(true);
        }, 350);
        return;
      }
      setStep(i);
      setTimeout(tick, 180);
    };
    const t = setTimeout(tick, 220);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#fafaf9] flex items-end px-8 lg:px-12 pb-10 pointer-events-none"
        >
          <div className="mono text-[0.7rem] leading-[1.9] text-zinc-700 max-w-xl">
            {LINES.slice(0, step).map((line) => (
              <div key={line}>{line}</div>
            ))}
            <div className="inline-flex items-center gap-1 text-zinc-900">
              <span className="opacity-60">$</span>
              <span className="blink">▌</span>
            </div>
          </div>

          {/* Corner marks */}
          {[
            "top-4 left-4 border-l border-t",
            "top-4 right-4 border-r border-t",
            "bottom-4 left-4 border-l border-b",
            "bottom-4 right-4 border-r border-b",
          ].map((p) => (
            <span
              key={p}
              className={`absolute w-3 h-3 ${p} border-zinc-900/30`}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
