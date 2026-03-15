import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PROJECTS } from "@/lib/data";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = ALL_PROJECTS.find((p) => p.id === id);
  return {
    title: project ? `${project.title} | YO.Tec Portfolio` : "Not Found",
    description: project ? project.description : undefined,
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { id } = await params;
  const project = ALL_PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  // Prev / Next navigation
  const currentIndex = ALL_PROJECTS.findIndex((p) => p.id === id);
  const prev = ALL_PROJECTS[currentIndex - 1] ?? null;
  const next = ALL_PROJECTS[currentIndex + 1] ?? null;

  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-4xl mx-auto px-8 pt-16 pb-32">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer tracking-wider mb-10"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          WORKS
        </Link>

        {/* Hero image */}
        <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-200 mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-10 pb-10 border-b border-zinc-200">
          <div>
            <p className="text-xs text-zinc-400 tracking-widest mb-2">
              No.{project.id}
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-zinc-900 mb-3">
              {project.title}
            </h1>
            <p className="text-sm text-zinc-500 flex items-center gap-2">
              <span>{project.client}</span>
              <span className="text-zinc-300" aria-hidden="true">|</span>
              <span>{project.type}</span>
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 md:justify-end md:max-w-xs">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs border border-zinc-300 text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-10 pb-10 border-b border-zinc-200">
          <h2 className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-4">
            OVERVIEW
          </h2>
          <p className="text-base text-zinc-700 leading-loose">{project.description}</p>
        </div>

        {/* Work detail */}
        <div className="mb-16">
          <h2 className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-6">
            WORK DETAIL
          </h2>
          <ul className="flex flex-col gap-4">
            {project.detail.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" aria-hidden="true" />
                <p className="text-sm text-zinc-700 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Prev / Next */}
        <div className="flex justify-between gap-4 pt-10 border-t border-zinc-200">
          {prev ? (
            <Link
              href={`/works/${prev.id}`}
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <p className="text-[10px] text-zinc-300 tracking-wider mb-0.5">PREV</p>
                <p className="text-xs text-zinc-600 group-hover:text-zinc-900 transition-colors">{prev.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/works/${next.id}`}
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer group text-right"
            >
              <div>
                <p className="text-[10px] text-zinc-300 tracking-wider mb-0.5">NEXT</p>
                <p className="text-xs text-zinc-600 group-hover:text-zinc-900 transition-colors">{next.title}</p>
              </div>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
