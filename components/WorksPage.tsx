"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ALL_PROJECTS, FREELANCE_PROJECTS, type Project } from "@/lib/data";
import NewsSection from "./NewsSection";

function useRevealObserver(ref: React.RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal:not(.visible)").forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const INITIAL_COUNT = 6;

const TECH_MARQUEE = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js",
  "Node.js", "GraphQL", "Figma", "Storybook", "Jest", "Webpack",
];


/* ------------------------------------------------------------------ */
/* Modal                                                                 */
/* ------------------------------------------------------------------ */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="flex min-h-full items-center justify-center p-4 md:p-8">
      <div
        className="relative w-full max-w-2xl bg-canvas shadow-2xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-sm rounded-full"
          aria-label="閉じる"
        >
          <svg className="w-4 h-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="p-7">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div>
              <p className="text-xs text-zinc-400 tracking-wide mb-1 flex items-center gap-1.5">
                <span aria-hidden="true">•</span>
                {project.client}
                <span className="text-zinc-300" aria-hidden="true">|</span>
                {project.type}
              </p>
              <h3 className="font-heading font-bold text-xl text-zinc-900">{project.title}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:justify-end">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-xs border border-zinc-200 text-zinc-500 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-600 leading-relaxed mb-5 pb-5 border-b border-zinc-100">
            {project.description}
          </p>

          {/* Detail list */}
          <ul className="flex flex-col gap-2.5 mb-7">
            {project.detail.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                <span className="mt-[7px] w-1 h-1 rounded-full bg-zinc-400 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          {/* Footer: 詳細ページへ */}
          <div className="flex justify-end border-t border-zinc-100 pt-5">
            <Link
              href={`/works/${project.id}`}
              onClick={onClose}
              className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-xs font-medium tracking-widest uppercase hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
            >
              詳細ページへ
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WorksPage                                                             */
/* ------------------------------------------------------------------ */

export default function WorksPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const [previewProject, setPreviewProject] = useState<Project>(ALL_PROJECTS[0]);
  const visibleProjects = showAll ? ALL_PROJECTS : ALL_PROJECTS.slice(0, INITIAL_COUNT);
  const handleClose = useCallback(() => setSelectedProject(null), []);

  useRevealObserver(sectionRef, [showAll]);

  return (
    <>
      <section ref={sectionRef} className="pt-16 pb-16">
        <div className="max-w-5xl mx-auto px-8">

          {/* Hero heading */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <h1
                className="font-display uppercase leading-none text-zinc-900"
                style={{ fontSize: "clamp(72px, 11vw, 136px)" }}
              >
                HELLO!
              </h1>
              <h2
                className="font-display uppercase leading-none text-zinc-900"
                style={{ fontSize: "clamp(48px, 7.5vw, 96px)" }}
              >
                YO.Tec PORTFOLIO.
              </h2>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed lg:mb-2 lg:text-right">
              フロントエンドエンジニア兼ディレクターとして
              業界15年以上の経験を持ちます。
              React・Next.jsを軸に設計からデプロイまで一気通貫で対応。
            </p>
          </div>

          {/* Hero images */}
          <div
            className="grid gap-3 mb-8"
            style={{ gridTemplateColumns: "5fr 7fr", height: "340px" }}
          >
            <div className="reveal relative overflow-hidden skeleton">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/hero-aa/500/700" alt="制作実績" className="w-full h-full object-cover" onLoad={(e) => (e.currentTarget.parentElement as HTMLElement).classList.remove("skeleton")} />
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1.5 tracking-[0.2em] uppercase">
                  Design
                </span>
              </div>
            </div>
            <div className="reveal reveal-delay-1 relative overflow-hidden skeleton">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/hero-bb/800/400" alt="制作実績" className="w-full h-full object-cover" onLoad={(e) => (e.currentTarget.parentElement as HTMLElement).classList.remove("skeleton")} />
              <div className="absolute bottom-4 right-4">
                <span className="text-[10px] text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1.5 tracking-[0.2em] uppercase">
                  Development
                </span>
              </div>
            </div>
          </div>

          {/* Tech marquee strip */}
          <div className="overflow-hidden mb-14 border-y border-zinc-200 py-3">
            <div className="flex gap-0 animate-marquee whitespace-nowrap">
              {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
                <span key={i} className="shrink-0 text-[11px] font-medium text-zinc-400 tracking-[0.18em] uppercase">
                  {tech}
                  <span className="mx-5 text-zinc-300" aria-hidden="true">·</span>
                </span>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Device Preview Section                                          */}
          {/* ---------------------------------------------------------------- */}
          <div className="reveal mb-20">
            {/* Section heading */}
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-heading font-bold text-sm tracking-widest uppercase text-zinc-400 shrink-0">
                DEVICE PREVIEW
              </h2>
              <div className="flex-1 h-px bg-zinc-200" />
              <p className="text-xs text-zinc-300 shrink-0 tracking-wider">Responsive Design</p>
            </div>

            {/* Mockup container */}
            <div className="relative flex items-end">

              {/* Desktop Mockup */}
              <div className="flex-1 min-w-0 z-10">
                {/* Browser chrome */}
                <div className="border border-zinc-300 rounded-lg overflow-hidden">
                  {/* Browser header bar */}
                  <div className="bg-zinc-800 h-7 flex items-center px-3 gap-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-zinc-700/80 rounded-full px-4 py-0.5 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                        <span className="text-[9px] text-zinc-400 tracking-wider">portfolio.dev/{previewProject.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Browser screen: actual project image */}
                  <div className="aspect-[16/9] overflow-hidden relative skeleton">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={`desktop-${previewProject.id}`}
                      src={previewProject.image}
                      alt={previewProject.title}
                      className="w-full h-full object-cover animate-fade-in"
                    />
                    {/* Overlay info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white/60 text-[10px] tracking-widest uppercase mb-0.5">{previewProject.client}</p>
                          <p className="text-white text-sm font-semibold font-heading leading-tight">{previewProject.title}</p>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-end max-w-[140px]">
                          {previewProject.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[9px] text-white/60 border border-white/20 px-1.5 py-0.5 tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Simulated browser UI overlay */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Mobile Mockup */}
              <div className="absolute -right-4 bottom-0 z-20 translate-y-3">
                <div
                  className="bg-zinc-800 rounded-[2.2rem] border-[3px] border-zinc-700 overflow-hidden flex flex-col"
                  style={{ width: "130px", height: "280px" }}
                >
                  {/* Notch */}
                  <div className="flex justify-center pt-2 pb-1 shrink-0">
                    <div className="w-12 h-2.5 bg-zinc-700 rounded-full" />
                  </div>

                  {/* Screen */}
                  <div className="flex-1 mx-0.5 rounded-[1.4rem] overflow-hidden relative bg-zinc-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={`mobile-${previewProject.id}`}
                      src={previewProject.image}
                      alt={previewProject.title}
                      className="w-full h-full object-cover animate-fade-in"
                      style={{ objectPosition: "center top" }}
                    />
                    {/* Mobile overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-[9px] font-medium leading-tight line-clamp-2">{previewProject.title}</p>
                      <p className="text-white/50 text-[8px] mt-0.5">{previewProject.type}</p>
                    </div>
                    {/* Simulated mobile status bar */}
                    <div className="absolute top-1.5 left-2 right-2 flex justify-between items-center">
                      <span className="text-white/60 text-[7px] font-medium">9:41</span>
                      <div className="flex items-center gap-0.5">
                        <div className="w-3 h-1.5 border border-white/40 rounded-sm">
                          <div className="w-2/3 h-full bg-white/60 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="flex justify-center py-1.5 shrink-0">
                    <div className="w-7 h-0.5 bg-zinc-500 rounded-full" />
                  </div>
                </div>
              </div>

            </div>

            {/* Project info bar below mockup */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100 pr-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-zinc-200 text-2xl leading-none">{previewProject.id}</span>
                <div>
                  <p className="text-xs font-medium text-zinc-700">{previewProject.title}</p>
                  <p className="text-[10px] text-zinc-400">{previewProject.client} · {previewProject.type}</p>
                </div>
              </div>
              <p className="text-[10px] text-zinc-300 tracking-widest uppercase">Hover to preview</p>
            </div>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {visibleProjects.map((project, i) => (
              <button
                key={project.id}
                className={`reveal reveal-delay-${Math.min((i % 6) + 1, 5)} group cursor-pointer text-left`}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setPreviewProject(project)}
                aria-label={`${project.title} の詳細を見る`}
              >
                {/* Card image with overlays */}
                <div className="relative overflow-hidden aspect-[4/3] mb-3 skeleton">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    onLoad={(e) => (e.currentTarget.parentElement as HTMLElement).classList.remove("skeleton")}
                  />

                  {/* Project number — visible always, fades on hover */}
                  <span
                    className="absolute top-3 left-4 font-display text-white/20 leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                    style={{ fontSize: "clamp(36px, 4.5vw, 52px)" }}
                    aria-hidden="true"
                  >
                    {project.id}
                  </span>

                  {/* Slide-up info overlay */}
                  <div className="card-overlay absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px] flex flex-col justify-end p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-white/60 border border-white/20 px-2 py-0.5 tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-white leading-snug">{project.title}</p>
                    <p className="text-xs text-white/50 mt-1">{project.client} · {project.type}</p>
                  </div>
                </div>

                {/* Below card: title + id */}
                <div className="flex items-center justify-between px-0.5">
                  <p className="text-xs font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors duration-200">
                    {project.title}
                  </p>
                  <span className="text-[10px] text-zinc-300 tracking-widest font-display">
                    {project.id}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* View more */}
          <div className="mt-12 text-center border-t border-zinc-200 pt-8 mb-16">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer tracking-[0.2em] uppercase group"
            >
              <span className="transition-transform duration-200 group-hover:rotate-90 text-base leading-none">
                {showAll ? "−" : "+"}
              </span>
              {showAll ? "View Less" : `View More (${ALL_PROJECTS.length - INITIAL_COUNT})`}
            </button>
          </div>
        </div>

        {/* ── CLIENT WORKS ── */}
        <div className="max-w-5xl mx-auto px-8 mb-16">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-heading font-bold text-xl tracking-widest uppercase shrink-0">CLIENT WORKS</h2>
              <div className="flex-1 h-px bg-zinc-200" aria-hidden="true" />
            </div>
            <p className="text-xs text-zinc-400 mb-8 tracking-wide">フリーランス期間の主な受託案件</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FREELANCE_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="group border border-zinc-200 p-6 hover:border-zinc-900 transition-colors duration-300 cursor-default"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="font-display text-5xl text-zinc-100 group-hover:text-zinc-900 leading-none transition-colors duration-300"
                      aria-hidden="true"
                    >
                      {project.id}
                    </span>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase bg-zinc-100 px-2 py-0.5">
                        {project.type}
                      </span>
                      <p className="text-[10px] text-zinc-400 mt-1 font-mono">{project.period}</p>
                    </div>
                  </div>
                  <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-2">
                    {project.category}
                  </p>
                  <p className="font-heading font-semibold text-sm text-zinc-900 leading-snug mb-2">
                    {project.title}
                  </p>
                  <p className="text-[11px] text-zinc-400 mb-3 font-mono">{project.client}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 bg-zinc-50 border border-zinc-200 text-zinc-500 group-hover:border-zinc-900 group-hover:text-zinc-900 transition-colors duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* News section */}
        <NewsSection />
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleClose} />
      )}
    </>
  );
}
