"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

type Props = {
  projects: Project[];
};

const SLUG_TO_THUMB: Record<string, string> = {
  "watch-yoshida-replatform": "/works/watch-yoshida.jpg",
  "tk-marathon-pwa": "/works/tk-marathon.jpg",
  "jishin-hoken": "/works/jishin-hoken.jpg",
  "mobimaru-kitchen-car": "/works/mobimaru.jpg",
  "strap-whiteboard": "/works/strap.jpg",
  "489pro-x-ryokan": "/works/489pro.jpg",
};

export function HomeFeatured({ projects }: Props) {
  // Pad to 4 for layout consistency
  const items = projects.slice(0, 4);

  return (
    <div className="relative">
      {/* Magazine mix grid: hero card (col-span-7 row-span-2) + 3 stack cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-px bg-zinc-900/10 border border-zinc-900/10 min-h-[800px]">
        {items[0] && (
          <FeatureCard
            project={items[0]}
            variant="hero"
            className="lg:col-span-7 lg:row-span-2"
            index={0}
          />
        )}
        {items[1] && (
          <FeatureCard
            project={items[1]}
            variant="row"
            className="lg:col-span-5"
            index={1}
          />
        )}
        {items[2] && (
          <FeatureCard
            project={items[2]}
            variant="row"
            className="lg:col-span-5"
            index={2}
          />
        )}
      </div>

      {/* Side stacked extra (if more) */}
      {items[3] && (
        <div className="mt-px bg-zinc-900/10 border border-zinc-900/10 border-t-0">
          <FeatureCard project={items[3]} variant="band" className="" index={3} />
        </div>
      )}
    </div>
  );
}

function FeatureCard({
  project: p,
  variant,
  className = "",
  index,
}: {
  project: Project;
  variant: "hero" | "row" | "band";
  className?: string;
  index: number;
}) {
  const thumb = SLUG_TO_THUMB[p.slug];
  const isHero = variant === "hero";
  const isBand = variant === "band";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative bg-[#fafaf9] group ${className}`}
    >
      <Link
        href={`/works/${p.slug}`}
        data-cursor="view"
        className="block h-full"
      >
        <div
          className={`relative h-full ${
            isHero
              ? "p-10 lg:p-14 flex flex-col"
              : isBand
              ? "p-8 lg:p-12 grid grid-cols-12 gap-6 items-center"
              : "p-8 lg:p-10 flex flex-col"
          }`}
        >
          {/* Thumb */}
          {thumb && isHero && (
            <div className="relative w-full aspect-[16/10] mb-8 overflow-hidden bg-zinc-100">
              <Image
                src={thumb}
                alt={p.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
              />
              <span className="absolute top-3 left-3 mono text-[0.55rem] tracking-[0.3em] uppercase text-white bg-zinc-900/70 px-2 py-1">
                FEATURED · /{p.number}
              </span>
            </div>
          )}
          {thumb && variant === "row" && (
            <div className="relative w-full aspect-video mb-6 overflow-hidden bg-zinc-100">
              <Image
                src={thumb}
                alt={p.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
              />
            </div>
          )}
          {thumb && isBand && (
            <div className="relative col-span-12 sm:col-span-3 aspect-video overflow-hidden bg-zinc-100">
              <Image
                src={thumb}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
              />
            </div>
          )}

          {/* Meta line */}
          <div
            className={`flex items-baseline justify-between gap-4 mb-3 ${
              isBand ? "col-span-12 sm:col-span-2" : ""
            }`}
          >
            <span className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
              /{p.number} · {p.yearKey}
            </span>
            {!isHero && (
              <span className="mono text-[0.55rem] tracking-[0.25em] uppercase text-zinc-400">
                {p.type}
              </span>
            )}
          </div>

          <h3
            className={`${
              isHero
                ? "display-l"
                : isBand
                ? "display-m col-span-12 sm:col-span-5"
                : "text-2xl lg:text-3xl font-light tracking-tight text-zinc-900 leading-tight"
            }`}
          >
            {p.title}
          </h3>
          <p
            className={`${
              isBand
                ? "col-span-12 sm:col-span-5 serif-accent text-zinc-500 text-sm"
                : "mt-3 serif-accent text-zinc-500 text-sm"
            }`}
          >
            {p.subtitle}
          </p>

          {isHero && (
            <p className="mt-6 body-jp text-zinc-700 max-w-xl flex-1">
              {p.context.slice(0, 120)}…
            </p>
          )}

          <div
            className={`mt-auto pt-6 flex items-end justify-between gap-4 ${
              isBand ? "col-span-12 sm:col-span-2 pt-0" : ""
            }`}
          >
            <div className="flex flex-wrap gap-1.5">
              {(p.stack.libs ?? p.stack.languages ?? [])
                .slice(0, isHero ? 4 : 2)
                .map((t) => (
                  <span
                    key={t}
                    className="mono text-[0.55rem] tracking-[0.15em] uppercase text-zinc-500 border border-zinc-900/15 px-2 py-1"
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
    </motion.div>
  );
}
