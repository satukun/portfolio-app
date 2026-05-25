"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  strength?: number;
  radius?: number;
};

function Char({
  ch,
  index,
  strength,
  radius,
  totalChars,
}: {
  ch: string;
  index: number;
  strength: number;
  radius: number;
  totalChars: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 220, mass: 0.35 });
  const sy = useSpring(y, { damping: 18, stiffness: 220, mass: 0.35 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        const k = (1 - dist / radius) * strength;
        x.set(dx * k * 0.04);
        y.set(dy * k * 0.04);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y, strength, radius]);

  if (ch === " ") return <span>{" "}</span>;
  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4 + index * (0.6 / Math.max(totalChars, 1)),
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {ch}
    </motion.span>
  );
}

export function MagneticChars({
  text,
  className,
  strength = 1,
  radius = 140,
}: Props) {
  const chars = Array.from(text);
  return (
    <span className={className}>
      {chars.map((ch, i) => (
        <Char
          key={`${ch}-${i}`}
          ch={ch}
          index={i}
          strength={strength}
          radius={radius}
          totalChars={chars.length}
        />
      ))}
    </span>
  );
}
