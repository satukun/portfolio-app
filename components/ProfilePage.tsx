"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Data                                                                  */
/* ------------------------------------------------------------------ */


const TOOL_CATEGORIES = [
  {
    label: "Framework",
    tools: ["React", "Next.js", "Vue.js / Nuxt.js", "React Router", "Redux / Redux Toolkit"],
  },
  {
    label: "Language / Markup",
    tools: ["TypeScript", "HTML5 / CSS3", "EJS / Pug"],
  },
  {
    label: "Styling",
    tools: ["Tailwind CSS", "styled-components", "SCSS / Sass", "FLOCSS", "Atomic Design"],
  },
  {
    label: "Testing",
    tools: ["Jest", "Cypress", "Storybook", "BackstopJS"],
  },
  {
    label: "Build / Version",
    tools: ["Webpack", "Gulp", "Git / GitHub", "Docker", "Vercel"],
  },
  {
    label: "Design / PM",
    tools: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Backlog", "Notion", "Slack"],
  },
];

const SKILL_CATEGORIES = [
  {
    name: "FRONTEND DEVELOPMENT",
    skills: [
      { name: "React / React Hooks", level: 95, years: "5年+", tag: "Expert" },
      { name: "Next.js", level: 92, years: "4年+", tag: "Expert" },
      { name: "TypeScript", level: 88, years: "4年+", tag: "Expert" },
      { name: "HTML5 / CSS3", level: 98, years: "17年+", tag: "Expert" },
      { name: "Vue.js / Nuxt.js", level: 76, years: "3年+", tag: "Upper" },
      { name: "Redux / Redux Toolkit", level: 82, years: "3年+", tag: "Expert" },
    ],
  },
  {
    name: "UI IMPLEMENTATION",
    skills: [
      { name: "Tailwind CSS", level: 90, tag: "Expert" },
      { name: "CSS Animation / Parallax", level: 88, tag: "Expert" },
      { name: "SCSS / FLOCSS / Atomic Design", level: 87, tag: "Expert" },
      { name: "styled-components", level: 85, tag: "Expert" },
      { name: "Intersection Observer / PWA", level: 88, tag: "Expert" },
    ],
  },
  {
    name: "TESTING & QUALITY",
    skills: [
      { name: "Storybook", level: 80, tag: "Upper" },
      { name: "Jest / Snapshot Test", level: 78, tag: "Upper" },
      { name: "Cypress (E2E)", level: 72, tag: "Middle" },
      { name: "Visual Regression (BackstopJS)", level: 70, tag: "Middle" },
    ],
  },
  {
    name: "BUILD & TOOLS",
    skills: [
      { name: "Git / GitHub", level: 93, years: "10年+", tag: "Expert" },
      { name: "Webpack / Gulp", level: 88, years: "8年+", tag: "Expert" },
      { name: "Figma / Adobe XD", level: 78, tag: "Upper" },
      { name: "Photoshop / Illustrator", level: 75, tag: "Upper" },
    ],
  },
];

const TAG_STYLE: Record<string, { badge: string }> = {
  Expert: { badge: "bg-zinc-900 text-white" },
  Upper:  { badge: "bg-zinc-200 text-zinc-600" },
  Middle: { badge: "bg-zinc-100 text-zinc-400" },
};

const CAREER = [
  {
    period: "2019.8",
    periodEnd: "現在",
    company: "フリーランス",
    title: "フロントエンドエンジニア / ディレクター",
    description:
      "WebアプリとWebサイト開発の2ライン稼働。Next.js / React / TypeScriptを中心としたWebアプリ開発と、HTML/CSS/JSベースの大規模受託制作を並走。要件定義から設計・実装・レビューまでを一貫して担当。クライアントとの直接折衝、チームリードもこなすなど技術力とマネジメント力を両立。",
    highlights: ["Next.js / React / TypeScript", "リードエンジニア", "クライアント直接折衝"],
  },
  {
    period: "2013.5",
    periodEnd: "2019.7",
    company: "インターリンク株式会社",
    title: "フロントエンドエンジニア / ディレクター",
    description:
      "6年間在籍。Webサイトの画面設計・コーディング・制作ディレクションを担当。スタイルガイドラインの整備、コードレビュー体制の構築、新卒エンジニアの育成を推進。2017年上期総会にて社内MVPを受賞。",
    highlights: ["社内MVP 2017", "新卒教育担当", "SES常駐経験"],
  },
  {
    period: "2008.1",
    periodEnd: "2013.2",
    company: "株式会社大空出版",
    title: "Webデザイナー / コーダー",
    description:
      "未経験でWebデザイナーとして入社。サイトのデザインから実装・運用まで一人で担当。HTML/CSS・Photoshop・Illustratorを習得し、エンジニアキャリアの土台を構築。",
    highlights: ["デザイン → 実装まで一貫", "HTML / CSS", "Photoshop / Illustrator"],
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export default function ProfilePage() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [skillsActive, setSkillsActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.06 }
    );
    el.querySelectorAll(".reveal").forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSkillsActive(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pt-16 pb-32 overflow-hidden">

      {/* ── PAGE HEADER ── */}
      <div className="max-w-6xl mx-auto px-8 mb-0">
        <div className="reveal">
          <h1
            className="font-display uppercase leading-none text-zinc-900"
            style={{ fontSize: "clamp(72px, 11vw, 136px)" }}
          >
            PROFILE
          </h1>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div className="max-w-6xl mx-auto px-8 mt-6 mb-20">
        <div className="reveal grid md:grid-cols-[1fr_auto] gap-12 items-start">

          {/* Left: bio */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-zinc-400 tracking-widest uppercase">About</span>
              <div className="flex-1 h-px bg-zinc-200" aria-hidden="true" />
            </div>

            <div className="mb-6">
              <p
                className="font-heading font-bold text-zinc-900 leading-tight"
                style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
              >
                YOUR NAME
              </p>
              <p className="text-xs text-zinc-400 mt-1 tracking-widest">ユアネーム</p>
              <p className="text-sm text-zinc-500 mt-2">
                フリーランス　フロントエンドエンジニア / ディレクター
              </p>
            </div>

            <p className="text-sm text-zinc-600 leading-loose max-w-xl mb-4">
              フロントエンドエンジニア兼ディレクターとして17年以上の経験を積み、2019年よりフリーランスとして活動。
              これまでの案件はWebアプリ開発とWebサイト開発の2軸に分かれます。
            </p>
            <p className="text-sm text-zinc-600 leading-loose max-w-xl mb-8">
              Next.js / React / TypeScript を中心としたモダンフロントエンド開発から、EJS / Gulp / SCSSを軸にした大規模受託制作まで幅広く対応。
              要件定義から設計・実装・レビューを一貫して担い、リードエンジニアとして技術力とマネジメント力を両立しています。
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-0 border-t border-zinc-200">
              {[
                { value: "17+", unit: "years", label: "業界経験" },
                { value: "300+", unit: "pages", label: "制作ページ数" },
                { value: "MVP", unit: "2017", label: "社内表彰受賞" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex-1 min-w-[110px] py-6 ${i > 0 ? "border-l border-zinc-200 pl-8" : "pr-8"}`}
                >
                  <p className="font-display text-3xl text-zinc-900 leading-none">
                    {stat.value}
                    <span className="text-sm font-body font-normal text-zinc-400 ml-1">{stat.unit}</span>
                  </p>
                  <p className="text-xs text-zinc-400 mt-1 tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <div className="shrink-0 w-52 hidden md:block">
            <div className="w-52 aspect-[3/4] bg-zinc-100 flex flex-col items-center justify-center text-zinc-300 relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="diag" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#e4e4e7" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diag)" />
              </svg>
              <svg
                className="relative w-12 h-12 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="relative text-xs tracking-widest text-zinc-400">PHOTO</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TOOLS ── */}
      <div className="max-w-6xl mx-auto px-8 mb-20">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-heading font-bold text-xl tracking-widest uppercase shrink-0">TOOLS & TECH</h2>
            <div className="flex-1 h-px bg-zinc-200" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8">
            {TOOL_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-3">
                  {cat.label}
                </p>
                <div className="flex flex-col gap-1.5">
                  {cat.tools.map((tool) => (
                    <div key={tool} className="group flex items-center gap-2 cursor-default">
                      <span
                        className="w-1 h-1 rounded-full bg-zinc-300 group-hover:bg-zinc-900 transition-colors duration-200 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors duration-200">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SKILLS (dark band) ── */}
      <div ref={skillsRef} className="reveal py-16 bg-zinc-900 mb-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2
                className="font-display uppercase leading-none text-white"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                SKILLS
              </h2>
              <p className="text-xs text-zinc-500 mt-2 tracking-widest uppercase">技術スキル・習熟度</p>
            </div>
            <div className="hidden md:flex items-center gap-6 pb-1">
              {[
                { label: "Expert", color: "bg-white" },
                { label: "Upper",  color: "bg-zinc-500" },
                { label: "Middle", color: "bg-zinc-700" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${l.color}`} aria-hidden="true" />
                  <span className="text-xs text-zinc-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {SKILL_CATEGORIES.map((category) => (
              <div key={category.name}>
                <p className="text-[10px] font-semibold tracking-widest text-zinc-600 uppercase mb-6 border-b border-zinc-800 pb-3">
                  {category.name}
                </p>
                <div className="flex flex-col gap-5">
                  {category.skills.map((skill, idx) => {
                    const style = TAG_STYLE[skill.tag];
                    return (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-200">{skill.name}</span>
                            {"years" in skill && skill.years && (
                              <span className="text-xs text-zinc-600">{skill.years}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-zinc-600">{skill.level}</span>
                            <span className={`text-[10px] px-2 py-0.5 font-medium tracking-wider ${style.badge}`}>
                              {skill.tag}
                            </span>
                          </div>
                        </div>
                        <div
                          className="h-[2px] bg-zinc-800 overflow-hidden"
                          role="meter"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} 習熟度 ${skill.level}%`}
                        >
                          <div
                            className="h-full transition-all duration-1000 ease-out"
                            style={{
                              width: skillsActive ? `${skill.level}%` : "0%",
                              transitionDelay: skillsActive ? `${idx * 80}ms` : "0ms",
                              backgroundColor:
                                skill.tag === "Expert" ? "#ffffff"
                                : skill.tag === "Upper" ? "#a1a1aa"
                                : "#52525b",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CAREER ── */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-12">
            <h2 className="font-heading font-bold text-xl tracking-widest uppercase shrink-0">CAREER</h2>
            <div className="flex-1 h-px bg-zinc-200" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-0">
            {CAREER.map((item, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 py-10 ${
                  i < CAREER.length - 1 ? "border-b border-zinc-100" : ""
                }`}
              >
                {/* Left: year + period + company */}
                <div className="md:pt-1">
                  <p className="font-display text-4xl text-zinc-900 leading-none mb-1 tabular-nums">
                    {item.period.split(".")[0]}
                  </p>
                  <p className="text-xs text-zinc-400 tracking-widest mb-3 uppercase font-mono">
                    {item.period.split(".").slice(1).join(".")} — {item.periodEnd}
                  </p>
                  <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.company}</p>
                </div>

                {/* Right: details */}
                <div>
                  <p className="font-heading font-semibold text-base text-zinc-900 mb-3 leading-snug">
                    {item.title}
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4 max-w-xl">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-3 py-1 border border-zinc-200 text-zinc-500 hover:bg-zinc-900 hover:border-zinc-900 hover:text-white transition-all duration-200 cursor-default"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
