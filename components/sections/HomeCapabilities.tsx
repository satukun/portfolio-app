"use client";

import { motion } from "framer-motion";
import type { Capability } from "@/lib/data";

type Props = {
  items: Capability[];
};

export function HomeCapabilities({ items }: Props) {
  return (
    <ul className="divide-y divide-zinc-900/10 border-t border-zinc-900/10">
      {items.map((c, i) => (
        <motion.li
          key={c.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-30px" }}
          className="group cursor-default"
        >
          <div className="grid grid-cols-12 gap-4 py-10 items-baseline transition-colors duration-300 hover:bg-zinc-900/[0.02] -mx-6 px-6 lg:-mx-10 lg:px-10">
            <span className="col-span-2 sm:col-span-1 mono text-[0.65rem] tracking-[0.25em] text-zinc-500 pt-2">
              /{c.number}
            </span>
            <div className="col-span-10 sm:col-span-4">
              <h3 className="text-xl lg:text-3xl font-light tracking-tight text-zinc-900">
                {c.title}
              </h3>
              <p className="mt-2 serif-accent text-zinc-500 text-sm">{c.subtitle}</p>
            </div>
            <p className="col-span-12 sm:col-span-5 text-zinc-600 text-sm leading-[1.9]">
              {c.description}
            </p>
            <div className="col-span-12 sm:col-span-2 flex flex-wrap gap-1.5 justify-end">
              {c.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="mono text-[0.55rem] tracking-[0.15em] uppercase text-zinc-500 border border-zinc-900/15 px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
