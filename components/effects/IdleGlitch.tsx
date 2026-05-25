"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function IdleGlitch() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let timer: ReturnType<typeof setTimeout>;
    let burst: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timer);
      setShow(false);
      timer = setTimeout(() => {
        setShow(true);
        burst = setTimeout(() => setShow(false), 1200);
      }, 30_000);
    };
    const events = ["mousemove", "scroll", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      clearTimeout(timer);
      clearTimeout(burst);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none fixed inset-0 z-[80]"
        >
          {/* Scan line */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: "100vh" }}
            transition={{ duration: 1.1, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-zinc-900/30"
          />
          {/* Glitch tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.06, 0, 0.04, 0] }}
            transition={{ duration: 1.0, times: [0, 0.2, 0.4, 0.6, 1] }}
            className="absolute inset-0 bg-zinc-900"
          />
          {/* Status mono */}
          <div className="absolute bottom-6 left-6 mono text-[0.6rem] tracking-[0.25em] uppercase text-zinc-500 opacity-70">
            sys.idle — pulse
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
