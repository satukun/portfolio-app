"use client";

import { motion } from "framer-motion";
import type { Capability } from "@/lib/data";

type Props = {
  items: Capability[];
};

// Magazine-style 5-cell matrix: 2 stacked left + 3 across right (or layout responsive)
export function HomeCapabilities({ items }: Props) {
  const [a, b, c, d, e] = items;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-px bg-zinc-900/10 border border-zinc-900/10 min-h-[640px]">
      {a && <Cell c={a} className="lg:col-span-5 lg:row-span-2" variant="tall" />}
      {b && <Cell c={b} className="lg:col-span-4" />}
      {c && <Cell c={c} className="lg:col-span-3" />}
      {d && <Cell c={d} className="lg:col-span-3" />}
      {e && <Cell c={e} className="lg:col-span-4" variant="signature" />}
    </div>
  );
}

function Cell({
  c,
  className = "",
  variant,
}: {
  c: Capability;
  className?: string;
  variant?: "tall" | "signature";
}) {
  const isTall = variant === "tall";
  const isSignature = variant === "signature";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: parseInt(c.number) * 0.05 }}
      viewport={{ once: true, margin: "-30px" }}
      className={`relative bg-[#fafaf9] p-8 lg:p-10 flex flex-col group hover:bg-zinc-900 hover:text-[#fafaf9] transition-colors duration-500 ${className} ${
        isSignature ? "bg-zinc-900 text-[#fafaf9]" : ""
      }`}
    >
      <div className="flex items-baseline justify-between mb-8">
        <span
          className={`mono text-[0.6rem] tracking-[0.3em] uppercase ${
            isSignature
              ? "text-white/50 group-hover:text-zinc-500"
              : "text-zinc-500 group-hover:text-white/50"
          }`}
        >
          /{c.number}
        </span>
        <span
          className={`w-10 h-10 border flex items-center justify-center mono text-[0.65rem] transition-colors ${
            isSignature
              ? "border-white/40 group-hover:border-zinc-900/30"
              : "border-zinc-900/30 group-hover:border-white/40"
          }`}
        >
          {c.number}
        </span>
      </div>

      <h3
        className={`${
          isTall ? "display-l" : "display-m"
        } transition-colors duration-500 ${
          isSignature
            ? "[color:#fafaf9!important] group-hover:[color:#111!important]"
            : "group-hover:[color:#fafaf9!important]"
        }`}
      >
        {c.title}
      </h3>
      <p
        className={`mt-2 serif-accent text-sm ${
          isSignature
            ? "text-white/60 group-hover:text-zinc-500"
            : "text-zinc-500 group-hover:text-white/60"
        }`}
      >
        {c.subtitle}
      </p>

      <p
        className={`mt-6 body-jp text-[0.85rem] leading-[2] flex-1 ${
          isSignature
            ? "text-white/70 group-hover:text-zinc-700"
            : "text-zinc-700 group-hover:text-white/70"
        }`}
      >
        {c.description}
      </p>

      <div className="mt-8 pt-6 border-t border-current/10 flex flex-wrap gap-1.5">
        {c.tags.slice(0, isTall ? 4 : 3).map((t) => (
          <span
            key={t}
            className={`mono text-[0.55rem] tracking-[0.15em] uppercase px-2 py-1 border transition-colors ${
              isSignature
                ? "border-white/30 text-white/70 group-hover:border-zinc-900/30 group-hover:text-zinc-700"
                : "border-zinc-900/15 text-zinc-500 group-hover:border-white/30 group-hover:text-white/80"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {isSignature && (
        <span className="mt-6 mono text-[0.55rem] tracking-[0.3em] uppercase opacity-60">
          → see /approach for details
        </span>
      )}
    </motion.div>
  );
}
