"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  value: string;
  className?: string;
  durationMs?: number;
};

// Animates digits and special chars (→, /, +, %, k) by morphing through a short character cycle.
export function Odometer({ value, className, durationMs = 900 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30% 0px" });
  const [display, setDisplay] = useState(() => value.replace(/[0-9]/g, "0"));

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const target = value;
    const cycle = "0123456789";

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 4);
      const out = Array.from(target)
        .map((ch, i) => {
          if (!/[0-9]/.test(ch)) return ch;
          const lockedAt = (i + 1) / target.length;
          if (eased >= lockedAt) return ch;
          return cycle[Math.floor(Math.random() * cycle.length)];
        })
        .join("");
      setDisplay(out);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
