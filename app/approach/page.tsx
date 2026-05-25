import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AI_APPROACH } from "@/lib/data";
import { SkillDiagram } from "@/components/sections/SkillDiagram";
import { ProcessSequencer } from "@/components/sections/ProcessSequencer";

export const metadata: Metadata = {
  title: "Approach — YO.TEC Portfolio",
  description:
    "Claude を中核としたAI開発基盤の設計。Skills の整備 / ハーネス設計 / 実装フローへの組み込みを通じ、「設計→実装→検証」の一連の流れに AI を組み込む。",
};

export default function ApproachPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-32 px-6 lg:px-10">
      {/* Hero */}
      <header className="max-w-7xl mx-auto mb-24">
        <span className="eyebrow">/03 · Approach · AI-Native Workflow</span>
        <h1 className="mt-6 display-xl max-w-5xl">
          claude, <br />
          <span className="serif-accent text-zinc-500">as part of the toolchain.</span>
        </h1>
        <p className="mt-10 body-jp max-w-2xl">
          {AI_APPROACH.intro}
          <br />
          Skills / Harness / Workflow の3軸で、属人化しがちな暗黙知を再現性のある開発基盤に変換しています。
        </p>
      </header>

      {/* Diagram */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-12">
          <span className="eyebrow">Topology · 構成</span>
          <span className="mono text-[0.6rem] tracking-[0.25em] uppercase text-zinc-400">
            interactive →
          </span>
        </div>
        <SkillDiagram pillars={[...AI_APPROACH.pillars]} />
      </section>

      {/* Pillars detail */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="mb-16">
          <span className="eyebrow">Pillars · 3つの柱</span>
          <h2 className="mt-6 display-xl">
            three pillars, <br />
            <span className="serif-accent text-zinc-500">explained.</span>
          </h2>
        </div>

        <ul className="divide-y divide-zinc-900/10 border-y border-zinc-900/10">
          {AI_APPROACH.pillars.map((p, i) => (
            <li key={p.key} className="grid grid-cols-12 gap-6 py-12 lg:py-16">
              <div className="col-span-2 sm:col-span-1">
                <span className="mono text-[0.65rem] tracking-[0.25em] text-zinc-500">
                  /0{i + 1}
                </span>
              </div>
              <div className="col-span-10 sm:col-span-4">
                <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
                  {p.key}
                </p>
                <h3 className="mt-4 display-m">{p.label.split("（")[0]}</h3>
              </div>
              <div className="col-span-12 sm:col-span-7 space-y-5">
                <p className="body-jp text-zinc-800">{p.summary}</p>
                <p className="body-jp text-zinc-500 text-[0.85rem]">{p.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Process Sequencer */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="mb-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7">
            <span className="eyebrow">Process · 開発フロー</span>
            <h2 className="mt-6 display-xl">
              design → implement <br />
              <span className="serif-accent text-zinc-500">→ validate.</span>
            </h2>
          </div>
          <p className="md:col-span-5 body-jp text-zinc-600">
            各ステップにおける AI の役割を明確化し、人とエージェントの作業境界を設計しています。
          </p>
        </div>
        <ProcessSequencer />
      </section>

      {/* Bridge */}
      <section className="max-w-7xl mx-auto border-t border-zinc-900/10 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <span className="eyebrow">Works · 適用実績</span>
          <h2 className="mt-6 display-l">
            see how it lands <br />
            <span className="serif-accent text-zinc-500">in production.</span>
          </h2>
        </div>
        <div className="md:col-span-5 flex flex-col justify-end">
          <p className="body-jp text-zinc-700">
            この開発基盤は、watch-yoshida.co.jp の Next.js 移行や受託案件のレビュー体制など、
            実案件で運用されています。
          </p>
          <Link href="/works" data-cursor="link" className="mt-8 view-more">
            See works <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
