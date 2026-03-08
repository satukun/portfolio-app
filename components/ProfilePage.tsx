"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Data                                                                  */
/* ------------------------------------------------------------------ */

const TOOLS = [
  "React", "Next.js", "TypeScript", "Vue.js / Nuxt.js",
  "Redux / Redux Toolkit", "React Router", "HTML5 / CSS3",
  "Tailwind CSS", "styled-components", "FLOCSS", "Atomic Design",
  "Jest", "Cypress", "Storybook", "BackstopJS",
  "Webpack", "Gulp", "Git / GitHub", "Figma", "Adobe XD",
  "Photoshop", "Illustrator", "STUDIO", "Backlog", "Slack",
];

const SKILL_CATEGORIES = [
  {
    name: "FRONTEND DEVELOPMENT",
    accent: "bg-zinc-900",
    skills: [
      { name: "React / React Hooks", level: 95, years: "5年+", tag: "Expert" },
      { name: "Next.js", level: 92, years: "4年+", tag: "Expert" },
      { name: "TypeScript", level: 88, years: "4年+", tag: "Expert" },
      { name: "Vue.js / Nuxt.js", level: 76, years: "3年+", tag: "Upper" },
      { name: "Redux / Redux Toolkit", level: 82, years: "3年+", tag: "Expert" },
      { name: "HTML5 / CSS3", level: 98, years: "15年+", tag: "Expert" },
    ],
  },
  {
    name: "UI IMPLEMENTATION",
    accent: "bg-zinc-700",
    skills: [
      { name: "Tailwind CSS", level: 90, years: "", tag: "Expert" },
      { name: "styled-components", level: 85, years: "", tag: "Expert" },
      { name: "FLOCSS / Atomic Design", level: 87, years: "", tag: "Expert" },
      { name: "CSS Animation / Parallax", level: 88, years: "", tag: "Expert" },
      { name: "Intersection Observer", level: 90, years: "", tag: "Expert" },
    ],
  },
  {
    name: "TESTING & QUALITY",
    accent: "bg-zinc-500",
    skills: [
      { name: "Jest / Snapshot Test", level: 78, years: "", tag: "Upper" },
      { name: "Cypress (E2E)", level: 72, years: "", tag: "Middle" },
      { name: "Storybook", level: 80, years: "", tag: "Upper" },
      { name: "Visual Regression (BackstopJS)", level: 70, years: "", tag: "Middle" },
    ],
  },
  {
    name: "BUILD & TOOLS",
    accent: "bg-zinc-400",
    skills: [
      { name: "Git / GitHub", level: 93, years: "10年+", tag: "Expert" },
      { name: "Webpack / Gulp", level: 88, years: "8年+", tag: "Expert" },
      { name: "Figma / Adobe XD", level: 78, years: "", tag: "Upper" },
      { name: "Photoshop / Illustrator", level: 75, years: "", tag: "Upper" },
    ],
  },
];

const TAG_STYLE: Record<string, string> = {
  Expert: "bg-zinc-900 text-white",
  Upper: "bg-zinc-200 text-zinc-600",
  Middle: "bg-zinc-100 text-zinc-400",
};

const CAREER = [
  {
    period: "2019.8 — 現在",
    company: "フリーランス",
    title: "フロントエンドエンジニア / ディレクター",
    description:
      "2ラインで稼働。Webサイト受託制作 + Webアプリ開発案件（準委任契約）。React/Next.jsを使用した大規模アプリ開発、300ページ以上のWeb制作を担当。クライアントとの直接折衝からテックリードまで対応。",
    highlights: ["Next.js / React / TypeScript", "300ページ+ 新規開発", "クライアント直接折衝"],
  },
  {
    period: "2013.5 — 2019.5",
    company: "都内Web制作会社（受託）",
    title: "フロントエンドエンジニア / ディレクター",
    description:
      "6年間在籍。画面構成からコーディング、制作ディレクションを経験。スタイルガイドラインの作成、コードレビュー、新卒教育を担当。2017年上期総会にて社内MVPを受賞。",
    highlights: ["社内MVP 2017", "新卒教育担当", "SES常駐経験"],
  },
  {
    period: "2009.12 — 2013.3",
    company: "都内出版社",
    title: "Webデザイナー / コーダー",
    description:
      "未経験でWebデザイナーとして入社。サイトのデザインから実装・運用まで一人で担当。HTML/CSS・Photoshop・Illustratorを習得し、以後のエンジニアキャリアの基礎を築く。",
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

  // Scroll reveal for general sections
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    el.querySelectorAll(".reveal").forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  // Trigger skill bar animation when skills section enters view
  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSkillsActive(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pt-16 pb-32">
      <div className="max-w-5xl mx-auto px-8">

        {/* Page title */}
        <div className="mb-10">
          <h1
            className="font-display uppercase leading-none text-zinc-900"
            style={{ fontSize: "clamp(72px, 11vw, 136px)" }}
          >
            PROFILE
          </h1>
          <p className="text-sm text-zinc-400 mt-1 tracking-wide">プロフィール</p>
        </div>

        {/* ---- ABOUT ---- */}
        <div className="reveal flex flex-col md:flex-row gap-10 mb-16 pb-14 border-b border-zinc-200">
          {/* Photo */}
          <div className="shrink-0 w-full md:w-52">
            <div className="w-full md:w-52 aspect-[3/4] bg-zinc-200 flex flex-col items-center justify-center text-zinc-400 relative overflow-hidden">
              <svg
                className="w-14 h-14 mb-2"
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
              <span className="text-xs tracking-wider">PHOTO HERE</span>
            </div>
          </div>

          {/* About content */}
          <div className="flex-1">
            <h2 className="font-heading font-bold text-xl tracking-widest uppercase mb-6">
              ABOUT
            </h2>

            <div className="flex gap-8 items-start mb-5">
              <div className="shrink-0">
                <p className="text-sm font-semibold text-zinc-900">YOUR NAME</p>
                <p className="text-xs text-zinc-400 mt-0.5 tracking-wide">ユアネーム</p>
              </div>
              <div className="text-sm text-zinc-600 leading-relaxed">
                <p>フリーランス　フロントエンドエンジニア</p>
                <p>ディレクター</p>
              </div>
            </div>

            <p className="text-sm text-zinc-600 leading-loose max-w-lg mb-6">
              フロントエンドエンジニア兼ディレクターとして、業界15年以上の経験があります。
              大規模サイトの運用・設計・実装に関わり、受託制作にて全工程を経験。
              ここ数年はReact/Next.jsを使用したWebアプリ開発にも注力し、
              現在フリーランスとして活動しております。
            </p>

            {/* Stats */}
            <div className="flex gap-8 pt-5 border-t border-zinc-100">
              {[
                { value: "15年+", label: "業界経験" },
                { value: "300+", label: "制作ページ数" },
                { value: "MVP", label: "2017年上期受賞" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading font-bold text-xl text-zinc-900">{stat.value}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- TOOLS ---- */}
        <div className="reveal mb-14 pb-14 border-b border-zinc-200">
          <h2 className="font-heading font-bold text-xl tracking-widest uppercase mb-6">
            TOOLS
          </h2>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 text-sm border border-zinc-300 text-zinc-600 hover:border-zinc-800 hover:text-zinc-900 transition-colors duration-200 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* ---- SKILLS (Enhanced) ---- */}
        <div ref={skillsRef} className="reveal mb-14 pb-14 border-b border-zinc-200">
          <h2 className="font-heading font-bold text-xl tracking-widest uppercase mb-1">
            SKILLS
          </h2>
          <p className="text-xs text-zinc-400 mb-8 tracking-wide">技術スキル・習熟度</p>

          <div className="grid md:grid-cols-2 gap-10">
            {SKILL_CATEGORIES.map((category) => (
              <div key={category.name}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-2 h-2 rounded-full ${category.accent}`} aria-hidden="true" />
                  <h3 className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                    {category.name}
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-zinc-800">{skill.name}</span>
                          {skill.years && (
                            <span className="text-xs text-zinc-400">{skill.years}</span>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 font-medium ${TAG_STYLE[skill.tag]}`}
                        >
                          {skill.tag}
                        </span>
                      </div>
                      {/* Animated skill bar */}
                      <div className="h-[3px] bg-zinc-100 overflow-hidden" role="meter" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} 習熟度 ${skill.level}%`}>
                        <div
                          className="h-full bg-zinc-900 transition-all duration-1000 ease-out"
                          style={{
                            width: skillsActive ? `${skill.level}%` : "0%",
                            transitionDelay: skillsActive ? "0.2s" : "0s",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skill summary tags */}
          <div className="mt-10 pt-8 border-t border-zinc-100">
            <p className="text-xs text-zinc-400 tracking-widest uppercase mb-4">SKILL TAGS</p>
            <div className="flex flex-wrap gap-2">
              {[
                "#React", "#Next.js", "#TypeScript", "#Vue.js",
                "#Redux", "#HTML/CSS", "#Tailwind", "#FLOCSS",
                "#AtomicDesign", "#Jest", "#Cypress", "#Storybook",
                "#Webpack", "#Git", "#Figma", "#ディレクション",
                "#コードレビュー", "#大規模Web", "#パフォーマンス改善",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs border border-zinc-300 text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---- CAREER ---- */}
        <div className="reveal">
          <h2 className="font-heading font-bold text-xl tracking-widest uppercase mb-8">
            CAREER
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute top-2 bottom-2 w-px bg-zinc-200"
              style={{ left: "7px" }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-10">
              {CAREER.map((item, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i + 1} flex gap-6 relative`}
                >
                  {/* Timeline dot */}
                  <div
                    className="mt-1.5 w-3.5 h-3.5 rounded-full bg-zinc-900 border-[3px] border-canvas shrink-0 z-10"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="text-xs text-zinc-400 tracking-wide mb-0.5">{item.period}</p>
                    <p className="text-xs font-medium text-zinc-500 mb-1">{item.company}</p>
                    <p className="font-heading font-semibold text-base text-zinc-900 mb-2">
                      {item.title}
                    </p>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-3 max-w-lg">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs px-3 py-1 bg-zinc-100 text-zinc-600 border border-zinc-200"
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
      </div>
    </section>
  );
}
