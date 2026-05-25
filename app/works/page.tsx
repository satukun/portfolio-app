import type { Metadata } from "next";
import { ALL_PROJECTS } from "@/lib/data";
import { WorksList } from "@/components/sections/WorksList";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Works — YO.TEC Portfolio",
  description:
    "業務委託 / 受託 / 自社 の全実績一覧。Next.js / React / TypeScript を中心としたモダンフロントエンド開発と、HTML / CSS / JS ベースの大規模サイト制作。",
};

export default function WorksPage() {
  return (
    <>
      <PageHero
        eyebrow="/01 · Works · 全実績"
        titleTop="shipped,"
        titleBottom="over the years."
        description="フリーランスとして参画したプロダクト案件、リードエンジニアとして完遂した受託案件、そして自社プロダクトまで。案件名・期間・体制・技術的課題と解決方法を、可能な範囲で公開しています。"
        bigLabel="WORKS"
        formation="grid"
        count={9}
        cycle
      />

      <div className="pt-24 pb-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <WorksList projects={ALL_PROJECTS} />
        </div>
      </div>
    </>
  );
}
