import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CAREER_TIMELINE } from "@/lib/data";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "About — YO.TEC Portfolio",
  description:
    "佐藤陽介 / Yosuke Sato — フロントエンドエンジニア兼ディレクター。10年以上のフロントエンド経験、業務委託と受託の二軸、Claude を中核としたAI開発基盤の設計。",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="/02 · About · 自己紹介"
        titleTop="ten years of"
        titleBottom="frontends, shipped."
        description="フロントエンドエンジニア兼ディレクターとして10年以上の経験を積み、2019年よりフリーランスとして活動。2024年11月に株式会社 YO.TEC として法人化しました。"
        bigLabel="ABOUT"
        formation="spiral"
        count={10}
        cycle
      />

      <div className="pt-24 pb-32 px-6 lg:px-10">

      {/* Two-axis explanation */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px border border-zinc-900/10 mb-32">
        <div className="bg-[#fafaf9] p-10 lg:p-14">
          <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
            axis /01
          </p>
          <h2 className="mt-6 display-l">
            modern <br />
            <span className="serif-accent text-zinc-500">frontend.</span>
          </h2>
          <p className="mt-6 body-jp text-zinc-700">
            Next.js / React / TypeScript を中心としたモダンフロントエンド開発に参画。
            Figmaを起点としたデザイン整合性の担保、状態管理・コンポーネント設計の整理、
            UI/UX改善などを担当。
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Next.js", "React", "TypeScript", "Redux", "Storybook", "Tailwind"].map(
              (t) => (
                <span
                  key={t}
                  className="mono text-[0.6rem] tracking-[0.15em] uppercase text-zinc-500 border border-zinc-900/15 px-2 py-1"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>

        <div className="bg-[#f3f3f1] p-10 lg:p-14">
          <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
            axis /02
          </p>
          <h2 className="mt-6 display-l">
            durable <br />
            <span className="serif-accent text-zinc-500">websites.</span>
          </h2>
          <p className="mt-6 body-jp text-zinc-700">
            HTML / CSS / SCSS / JavaScript を用いた中・大規模サイトのリニューアルやLP制作を50件以上担当。
            リードエンジニアとして外部パートナーへの作業分担・進捗管理・レビューを担い、
            クライアントとの直接やり取りを含めて一貫対応。
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Astro", "EJS", "Gulp", "SCSS", "FLOCSS", "Lead"].map((t) => (
              <span
                key={t}
                className="mono text-[0.6rem] tracking-[0.15em] uppercase text-zinc-500 border border-zinc-900/15 px-2 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="eyebrow">Timeline · 経歴</span>
          <h2 className="mt-6 display-xl">
            from 2008 <br />
            <span className="serif-accent text-zinc-500">to present.</span>
          </h2>
        </div>

        <div className="relative pl-6 lg:pl-12 border-l border-zinc-900/15">
          <ul className="space-y-20">
            {CAREER_TIMELINE.map((era) => (
              <li key={era.range} className="relative">
                <span className="absolute -left-[1.55rem] lg:-left-[3.05rem] top-3 w-3 h-3 bg-zinc-900 rounded-full" />
                <p className="mono text-[0.65rem] tracking-[0.25em] uppercase text-zinc-500">
                  {era.range}
                </p>
                <h3 className="mt-3 display-l">{era.company}</h3>
                <p className="mt-3 serif-accent text-zinc-500 text-base">
                  {era.role}
                </p>
                <p className="mt-6 body-jp max-w-3xl text-zinc-800">
                  {era.summary}
                </p>
                {era.highlights.length > 0 && (
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-w-3xl">
                    {era.highlights.map((h) => (
                      <li
                        key={h}
                        className="mono text-[0.7rem] tracking-[0.05em] text-zinc-600 flex gap-3"
                      >
                        <span className="text-zinc-400">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bridge to /approach */}
      <section className="max-w-7xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-zinc-900/10 pt-16">
        <div className="md:col-span-7">
          <span className="eyebrow">Approach · 開発基盤</span>
          <h2 className="mt-6 display-l">
            and now, <br />
            <span className="serif-accent text-zinc-500">ai is part of the toolchain.</span>
          </h2>
        </div>
        <div className="md:col-span-5 flex flex-col justify-end">
          <p className="body-jp text-zinc-700">
            上記キャリアの延長線上で、Claude を中核としたAI開発基盤
            （Skills整備・ハーネス設計・実装フロー組み込み）を運用しています。
          </p>
          <Link
            href="/approach"
            data-cursor="link"
            className="mt-8 view-more"
          >
            See approach <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
