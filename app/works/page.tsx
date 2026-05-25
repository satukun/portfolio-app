import type { Metadata } from "next";
import { ALL_PROJECTS } from "@/lib/data";
import { WorksList } from "@/components/sections/WorksList";

export const metadata: Metadata = {
  title: "Works — YO.TEC Portfolio",
  description:
    "業務委託 / 受託 / 自社 の全実績一覧。Next.js / React / TypeScript を中心としたモダンフロントエンド開発と、HTML / CSS / JS ベースの大規模サイト制作。",
};

export default function WorksPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-32 px-6 lg:px-10">
      <header className="max-w-7xl mx-auto mb-24">
        <span className="eyebrow">/01 · Works · 全実績</span>
        <h1 className="mt-6 display-xl max-w-5xl">
          shipped, <br />
          <span className="serif-accent text-zinc-500">over the years.</span>
        </h1>
        <p className="mt-10 body-jp max-w-xl">
          フリーランスとして参画したプロダクト案件、リードエンジニアとして
          完遂した受託案件、そして自社プロダクトまで。 案件名・期間・体制・
          技術的課題と解決方法を、可能な範囲で公開しています。
        </p>
      </header>

      <div className="max-w-7xl mx-auto">
        <WorksList projects={ALL_PROJECTS} />
      </div>
    </div>
  );
}
