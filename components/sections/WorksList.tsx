"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectCategory } from "@/lib/data";

type Props = {
  projects: Project[];
};

const FILTERS: { key: ProjectCategory | "all"; label: string; sub: string }[] = [
  { key: "all", label: "All", sub: "全件" },
  { key: "contract", label: "Contract", sub: "業務委託" },
  { key: "outsourcing", label: "Outsourcing", sub: "受託開発" },
  { key: "in-house", label: "In-house", sub: "自社" },
];

export function WorksList({ projects }: Props) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const visible = useMemo(
    () => projects.filter((p) => active === "all" || p.category === active),
    [projects, active]
  );

  // Group by yearKey desc
  const groups = useMemo(() => {
    const map = new Map<number, Project[]>();
    visible.forEach((p) => {
      const list = map.get(p.yearKey) ?? [];
      list.push(p);
      map.set(p.yearKey, list);
    });
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [visible]);

  return (
    <div className="space-y-20">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 border-y border-zinc-900/10 py-6 -mx-6 px-6 lg:-mx-10 lg:px-10 sticky top-20 bg-[#fafaf9]/85 backdrop-blur z-20">
        <span className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-400 mr-2">
          filter →
        </span>
        {FILTERS.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              data-cursor="link"
              onClick={() => setActive(f.key)}
              className={`group inline-flex items-center gap-2 px-3 py-1.5 border transition-colors ${
                isActive
                  ? "border-zinc-900 bg-zinc-900 text-[#fafaf9]"
                  : "border-zinc-900/15 text-zinc-700 hover:border-zinc-900"
              }`}
            >
              <span className="mono text-[0.6rem] tracking-[0.25em] uppercase">
                {f.label}
              </span>
              <span className="mono text-[0.55rem] tracking-[0.15em] opacity-60">
                {f.sub}
              </span>
            </button>
          );
        })}
        <span className="ml-auto mono text-[0.6rem] tracking-[0.2em] uppercase text-zinc-500">
          {visible.length} / {projects.length}
        </span>
      </div>

      {/* Year groups */}
      {groups.map(([year, items]) => (
        <div key={year} className="relative">
          {/* Year mile marker */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="absolute -left-2 top-0 hidden lg:block pointer-events-none select-none"
          >
            <span
              className="block text-zinc-900/[0.04] font-light leading-none"
              style={{ fontSize: "clamp(8rem, 18vw, 18rem)" }}
            >
              {year}
            </span>
          </motion.div>

          <div className="relative">
            <div className="flex items-baseline gap-6 mb-8 pl-0 lg:pl-4">
              <span className="mono text-[0.65rem] tracking-[0.3em] uppercase text-zinc-500">
                year · {year}
              </span>
              <span className="flex-1 h-px bg-zinc-900/10" />
              <span className="mono text-[0.6rem] tracking-[0.2em] uppercase text-zinc-400">
                {items.length} project{items.length !== 1 ? "s" : ""}
              </span>
            </div>

            <ul className="divide-y divide-zinc-900/10 border-y border-zinc-900/10">
              {items.map((p, i) => (
                <motion.li
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true, margin: "-30px" }}
                  className="group"
                >
                  <Link
                    href={`/works/${p.slug}`}
                    data-cursor="view"
                    className="block"
                  >
                    <div className="grid grid-cols-12 gap-4 py-8 items-center transition-colors duration-300 hover:bg-zinc-900/[0.02] -mx-6 px-6 lg:-mx-10 lg:px-10">
                      <span className="col-span-2 sm:col-span-1 mono text-[0.65rem] tracking-[0.25em] text-zinc-500">
                        /{p.number}
                      </span>
                      <div className="col-span-10 sm:col-span-5">
                        <h3 className="text-xl lg:text-2xl font-light tracking-tight text-zinc-900">
                          {p.title}
                        </h3>
                        <p className="mt-2 serif-accent text-zinc-500 text-sm">
                          {p.subtitle}
                        </p>
                      </div>
                      <div className="col-span-7 sm:col-span-3 mono text-[0.65rem] tracking-[0.15em] text-zinc-500 uppercase">
                        {p.client}
                      </div>
                      <div className="col-span-3 sm:col-span-2 mono text-[0.6rem] tracking-[0.2em] uppercase text-zinc-400">
                        {p.period}
                      </div>
                      <span className="col-span-2 sm:col-span-1 ml-auto w-9 h-9 border border-zinc-900/20 flex items-center justify-center transition-all duration-500 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-[#fafaf9] text-zinc-900">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
