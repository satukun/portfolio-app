"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

type Props = {
  projects: Project[];
};

export function HomeFeatured({ projects }: Props) {
  return (
    <ul className="divide-y divide-zinc-900/10 border-y border-zinc-900/10">
      {projects.map((p, i) => (
        <motion.li
          key={p.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="group"
        >
          <Link
            href={`/works/${p.slug}`}
            data-cursor="view"
            className="block"
          >
            <div className="grid grid-cols-12 gap-4 py-10 lg:py-14 items-center transition-colors duration-300 hover:bg-zinc-900/[0.02] -mx-6 px-6 lg:-mx-10 lg:px-10">
              <span className="col-span-2 sm:col-span-1 mono text-[0.65rem] tracking-[0.25em] text-zinc-500 self-start pt-2">
                /{p.number}
              </span>

              <div className="col-span-10 sm:col-span-5">
                <h3 className="text-2xl lg:text-4xl font-light tracking-tight text-zinc-900 leading-none">
                  {p.title}
                </h3>
                <p className="mt-3 serif-accent text-zinc-500 text-sm">
                  {p.subtitle}
                </p>
              </div>

              <div className="col-span-12 sm:col-span-3 text-zinc-600 text-sm leading-[1.8]">
                {p.client}
                <div className="mt-2 mono text-[0.6rem] tracking-[0.2em] uppercase text-zinc-400">
                  {p.period} · {p.type}
                </div>
              </div>

              <div className="col-span-12 sm:col-span-3 flex items-center justify-between sm:justify-end gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {(p.stack.libs ?? p.stack.languages ?? []).slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="mono text-[0.6rem] tracking-[0.15em] uppercase text-zinc-500 border border-zinc-900/15 px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="w-10 h-10 border border-zinc-900/20 flex items-center justify-center transition-all duration-500 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-[#fafaf9] text-zinc-900 shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
