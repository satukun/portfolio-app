"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ALL_PROJECTS, type Project } from "@/lib/data";
import NewsSection from "./NewsSection";

const INITIAL_COUNT = 6;

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-canvas shadow-2xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-sm"
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
                <span key={tag} className="px-2.5 py-1 text-xs border border-zinc-300 text-zinc-600">
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
          <ul className="flex flex-col gap-2 mb-7">
            {project.detail.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          {/* Footer: 詳細ページへ */}
          <div className="flex justify-end border-t border-zinc-100 pt-5">
            <Link
              href={`/works/${project.id}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-xs font-medium tracking-widest uppercase hover:bg-zinc-700 transition-colors duration-200 cursor-pointer"
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
  );
}

/* ------------------------------------------------------------------ */
/* WorksPage                                                             */
/* ------------------------------------------------------------------ */

export default function WorksPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? ALL_PROJECTS : ALL_PROJECTS.slice(0, INITIAL_COUNT);
  const handleClose = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showAll) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal:not(.visible)").forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, [showAll]);

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
                PORTFOLIO.
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
            className="grid gap-3 mb-14"
            style={{ gridTemplateColumns: "5fr 7fr", height: "340px" }}
          >
            <div className="reveal overflow-hidden bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/hero-aa/500/700" alt="制作実績" className="w-full h-full object-cover" />
            </div>
            <div className="reveal reveal-delay-1 overflow-hidden bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/hero-bb/800/400" alt="制作実績" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {visibleProjects.map((project, i) => (
              <button
                key={project.id}
                className={`reveal reveal-delay-${Math.min((i % 6) + 1, 5)} group cursor-pointer text-left`}
                onClick={() => setSelectedProject(project)}
                aria-label={`${project.title} の詳細を見る`}
              >
                <div className="relative overflow-hidden bg-zinc-200 aspect-[4/3] mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 flex items-start justify-end p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-3.5 h-3.5 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-zinc-400 mb-0.5 flex items-center gap-1">
                      <span aria-hidden="true">•</span> {project.client}
                    </p>
                    <p className="text-xs text-zinc-500 font-medium group-hover:text-zinc-900 transition-colors duration-200">
                      {project.title}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-zinc-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* View more */}
          <div className="mt-12 text-center border-t border-zinc-200 pt-8 mb-16">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer tracking-wider"
            >
              {showAll
                ? "− VIEW LESS"
                : `+ VIEW MORE (${ALL_PROJECTS.length - INITIAL_COUNT})`}
            </button>
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
