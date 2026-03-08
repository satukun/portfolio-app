"use client";

import { useEffect, useRef } from "react";

const PROJECTS = [
  {
    title: "プロジェクト名 A",
    description:
      "ECサイトのフロントエンド全般を担当。Next.js App RouterとServer Componentsで高速な商品一覧・カートを実装。",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "#",
    color: "from-blue-50 to-indigo-50",
  },
  {
    title: "プロジェクト名 B",
    description:
      "SaaSダッシュボードのUI設計・実装。Rechartsを用いたインタラクティブなデータ可視化と複雑なフォーム管理。",
    tags: ["React", "TypeScript", "Recharts"],
    link: "#",
    color: "from-violet-50 to-purple-50",
  },
  {
    title: "プロジェクト名 C",
    description:
      "医療系スタートアップのLPをデザインから実装まで一人で担当。Core Web Vitals全指標で90点以上を達成。",
    tags: ["Next.js", "Figma", "Tailwind"],
    link: "#",
    color: "from-emerald-50 to-teal-50",
  },
  {
    title: "プロジェクト名 D",
    description:
      "toC向けモバイルアプリのWebView部分の設計・実装。React Nativeとの密な連携を意識したコンポーネント設計。",
    tags: ["React", "TypeScript", "API"],
    link: "#",
    color: "from-amber-50 to-orange-50",
  },
  {
    title: "プロジェクト名 E",
    description:
      "コーポレートサイトのリニューアル。Astro + Tailwind CSSで超高速な静的サイトを構築、LCP 0.8秒を実現。",
    tags: ["Astro", "Tailwind", "CSS"],
    link: "#",
    color: "from-rose-50 to-pink-50",
  },
  {
    title: "プロジェクト名 F",
    description:
      "社内向け管理ツールのフロントエンドをゼロから構築。複雑なテーブル操作と権限管理UIを実装。",
    tags: ["React", "Node.js", "TypeScript"],
    link: "#",
    color: "from-sky-50 to-cyan-50",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    el.querySelectorAll(".reveal").forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 px-6 bg-zinc-50/50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="reveal text-xs font-semibold text-blue-600 tracking-widest uppercase mb-3">
            Works
          </p>
          <h2 className="reveal reveal-delay-1 font-heading font-bold text-4xl md:text-5xl text-zinc-900 tracking-tight">
            制作実績
          </h2>
          <p className="reveal reveal-delay-2 text-zinc-500 mt-4 max-w-lg leading-relaxed">
            これまでに手がけた主なプロジェクトの一部をご紹介します。
            詳細はお問い合わせください。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} group flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br ${project.color} border border-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
            >
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 bg-white/80 text-zinc-600 rounded-lg border border-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex-1">
                <h3 className="font-heading font-semibold text-zinc-900 text-lg mb-2 group-hover:text-blue-700 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{project.description}</p>
              </div>

              <div className="flex items-center gap-1 text-sm font-medium text-zinc-400 group-hover:text-blue-600 transition-colors duration-200">
                <span>詳細を見る</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
