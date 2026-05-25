"use client";

import { motion } from "framer-motion";
import type { CareerEra } from "@/lib/data";

type Props = {
  eras: CareerEra[];
};

export function HomeTrajectory({ eras }: Props) {
  // Reverse so timeline reads left (old) → right (now)
  const ordered = [...eras].reverse();

  return (
    <div>
      {/* Heading row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
        <div className="lg:col-span-7">
          <span className="eyebrow">Trajectory · 軌跡</span>
          <h2 className="mt-6 display-xl">
            <span className="block">three companies,</span>
            <span className="block serif-accent text-zinc-500 pl-[8%]">
              eighteen years.
            </span>
          </h2>
        </div>
        <p className="lg:col-span-5 body-jp text-zinc-600">
          時系列に並んだ4つのフェーズ。 出版社で「作る喜び」を覚え、
          インターリンクで「届け方」を学び、独立で「設計と運用」を磨き、
          法人化で「基盤の設計」へ。
        </p>
      </div>

      {/* Horizontal axis with snapped cards */}
      <div className="relative">
        {/* axis line */}
        <div className="absolute left-0 right-0 top-12 h-px bg-zinc-900/15" />

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900/10 border border-zinc-900/10">
          {ordered.map((era, i) => (
            <motion.li
              key={era.range}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative bg-[#fafaf9] p-8 lg:p-10"
            >
              {/* dot */}
              <span className="absolute left-8 lg:left-10 top-12 -translate-y-1/2 w-3 h-3 bg-zinc-900 rounded-full ring-4 ring-[#fafaf9]" />

              <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500 mb-6 pl-6">
                phase /0{i + 1}
              </p>

              <p className="mono text-[0.65rem] tracking-[0.25em] uppercase text-zinc-700">
                {era.range}
              </p>
              <h3 className="mt-4 display-m">{era.company.replace("株式会社 ", "")}</h3>
              <p className="mt-2 serif-accent text-zinc-500 text-sm">
                {era.role.split(" / ")[0]}
              </p>

              <p className="mt-6 body-jp text-zinc-700 text-[0.85rem] leading-[2]">
                {era.summary.slice(0, 100)}…
              </p>

              {era.highlights.length > 0 && (
                <ul className="mt-6 pt-5 border-t border-zinc-900/10 space-y-1.5">
                  {era.highlights.slice(0, 3).map((h) => (
                    <li
                      key={h}
                      className="mono text-[0.6rem] tracking-[0.05em] text-zinc-500 flex gap-2 leading-snug"
                    >
                      <span className="text-zinc-400 shrink-0">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* corner mark */}
              <span className="absolute bottom-3 right-3 mono text-[0.5rem] tracking-[0.25em] uppercase text-zinc-300">
                {era.startYear}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
