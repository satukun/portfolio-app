"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Pillar = {
  key: string;
  label: string;
  summary: string;
  detail: string;
};

type Props = {
  pillars: readonly Pillar[];
};

// Node positions (percentages, on a 100x60 canvas)
const POSITIONS = {
  claude: { x: 50, y: 12 },
  skills: { x: 18, y: 50 },
  harness: { x: 50, y: 56 },
  workflow: { x: 82, y: 50 },
} as const;

export function SkillDiagram({ pillars }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const activeData = pillars.find((p) => p.key === active);

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
      <div className="lg:col-span-7 relative aspect-[5/3] border border-zinc-900/15 bg-[#fafaf9] noise overflow-hidden">
        {/* grid */}
        <div className="absolute inset-0 grid-bg opacity-40" />

        <svg
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          {(["skills", "harness", "workflow"] as const).map((key) => {
            const from = POSITIONS.claude;
            const to = POSITIONS[key];
            const isActive = active === key;
            return (
              <motion.line
                key={key}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? "#111" : "rgba(17,17,17,0.25)"}
                strokeWidth={isActive ? 0.3 : 0.15}
                strokeDasharray={isActive ? "0" : "0.4 0.4"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}
        </svg>

        {/* Claude node */}
        <Node
          x={POSITIONS.claude.x}
          y={POSITIONS.claude.y}
          label="claude"
          sub="agent runtime"
          variant="primary"
        />

        {pillars.map((p) => {
          const pos = POSITIONS[p.key as keyof typeof POSITIONS];
          if (!pos) return null;
          return (
            <Node
              key={p.key}
              x={pos.x}
              y={pos.y}
              label={p.key}
              sub={shortLabel(p.label)}
              active={active === p.key}
              onClick={() => setActive(active === p.key ? null : p.key)}
            />
          );
        })}

        {/* corner labels */}
        <div className="absolute top-3 left-3 mono text-[0.55rem] tracking-[0.3em] uppercase text-zinc-500">
          [ runtime topology ]
        </div>
        <div className="absolute bottom-3 right-3 mono text-[0.55rem] tracking-[0.25em] uppercase text-zinc-500">
          click nodes →
        </div>
      </div>

      {/* Detail panel */}
      <div className="lg:col-span-5 border border-zinc-900/15 p-8 lg:p-10 bg-[#fafaf9] min-h-[18rem]">
        {activeData ? (
          <motion.div
            key={activeData.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
              / {activeData.key}
            </p>
            <h3 className="mt-4 display-m">{activeData.label}</h3>
            <p className="mt-6 body-jp text-zinc-700">{activeData.summary}</p>
            <p className="mt-4 body-jp text-zinc-500 text-[0.85rem]">
              {activeData.detail}
            </p>
          </motion.div>
        ) : (
          <div className="h-full flex flex-col justify-between">
            <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
              select a node
            </p>
            <div>
              <p className="display-m text-zinc-800">
                three pillars,
                <br />
                <span className="serif-accent text-zinc-500">one toolchain.</span>
              </p>
              <p className="mt-6 body-jp text-zinc-500 text-[0.85rem]">
                Claude を中核とした開発基盤を、Skills / Harness / Workflow の3軸で構成しています。
                各ノードをクリックすると詳細が表示されます。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function shortLabel(label: string) {
  return label.split("（")[0].replace("の整備", "").replace("の設計", "").replace("への組み込み", "");
}

function Node({
  x,
  y,
  label,
  sub,
  active,
  variant,
  onClick,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  active?: boolean;
  variant?: "primary";
  onClick?: () => void;
}) {
  const isPrimary = variant === "primary";
  return (
    <button
      type="button"
      data-cursor="link"
      onClick={onClick}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
    >
      <motion.div
        animate={{
          scale: active ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`flex flex-col items-center gap-2 px-4 py-3 border transition-all ${
          isPrimary
            ? "bg-zinc-900 text-[#fafaf9] border-zinc-900"
            : active
            ? "bg-zinc-900 text-[#fafaf9] border-zinc-900"
            : "bg-[#fafaf9] text-zinc-900 border-zinc-900/40 group-hover:border-zinc-900"
        }`}
      >
        <span className="mono text-[0.55rem] tracking-[0.25em] uppercase">{label}</span>
        <span
          className={`mono text-[0.5rem] tracking-[0.2em] uppercase ${
            isPrimary || active ? "text-white/50" : "text-zinc-500"
          }`}
        >
          {sub}
        </span>
      </motion.div>
      {/* pulse ring */}
      {isPrimary && (
        <motion.span
          className="absolute inset-0 border border-zinc-900/30"
          animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}
    </button>
  );
}
