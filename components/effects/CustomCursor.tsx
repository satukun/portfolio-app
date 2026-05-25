"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  const [variant, setVariant] = useState<"default" | "link" | "view">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!finePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor="view"], [data-cursor="link"]'
      ) as HTMLElement | null;
      if (!interactive) {
        setVariant("default");
        return;
      }
      const tag = interactive.dataset.cursor;
      if (tag === "view") setVariant("view");
      else setVariant("link");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
      >
        <motion.div
          animate={{
            scale: variant === "default" ? 1 : variant === "link" ? 2.2 : 3,
            opacity: variant === "default" ? 1 : 0.8,
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white"
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[91] mix-blend-difference"
      >
        <motion.div
          animate={{ scale: variant === "default" ? 1 : 0 }}
          className="-translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
        />
      </motion.div>

      {/* Label */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[92]"
      >
        <motion.span
          animate={{
            opacity: variant === "view" ? 1 : 0,
            y: variant === "view" ? 20 : 12,
          }}
          transition={{ duration: 0.2 }}
          className="absolute -translate-x-1/2 mono text-[0.6rem] tracking-[0.3em] uppercase text-white mix-blend-difference"
        >
          view ↗
        </motion.span>
      </motion.div>
    </>
  );
}
