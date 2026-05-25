"use client";

import { motion } from "framer-motion";
import type { CareerEra } from "@/lib/data";

type Props = {
  eras: CareerEra[];
};

export function HomeTrajectory({ eras }: Props) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-3">
        <span className="eyebrow">Trajectory · 軌跡</span>
        <h2 className="mt-6 display-l">
          three companies, <br />
          <span className="serif-accent text-zinc-500">eighteen years.</span>
        </h2>
      </div>

      <div className="md:col-span-9 relative">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-zinc-900/15" />
        <ul className="space-y-12">
          {eras.map((era, i) => (
            <motion.li
              key={era.range}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
              className="pl-8 relative"
            >
              <span className="absolute left-[-4px] top-3 w-2 h-2 bg-zinc-900 rounded-full" />
              <p className="mono text-[0.65rem] tracking-[0.25em] uppercase text-zinc-500">
                {era.range}
              </p>
              <h3 className="mt-3 display-m">
                {era.company}
              </h3>
              <p className="mt-2 serif-accent text-zinc-500 text-sm">{era.role}</p>
              <p className="mt-4 body-jp max-w-2xl">{era.summary}</p>
              {era.highlights.length > 0 && (
                <ul className="mt-4 space-y-1">
                  {era.highlights.map((h) => (
                    <li
                      key={h}
                      className="mono text-[0.7rem] tracking-[0.1em] text-zinc-500 flex gap-2"
                    >
                      <span className="text-zinc-400">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
