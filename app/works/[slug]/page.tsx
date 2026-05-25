import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { ALL_PROJECTS, getProjectBySlug } from "@/lib/data";
import { StageProgress } from "@/components/sections/StageProgress";
import { StackMarquee } from "@/components/effects/StackMarquee";
import { Odometer } from "@/components/effects/Odometer";

type Params = { slug: string };
type Props = { params: Promise<Params> };

export async function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} — YO.TEC Works`,
    description: project.context.slice(0, 120),
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  contract: "Contract · 業務委託",
  outsourcing: "Outsourcing · 受託開発",
  "in-house": "In-house · 自社",
};

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const idx = ALL_PROJECTS.findIndex((p) => p.slug === slug);
  const prev = ALL_PROJECTS[idx - 1] ?? null;
  const next = ALL_PROJECTS[idx + 1] ?? null;

  const stackItems = [
    ...(project.stack.languages ?? []),
    ...(project.stack.libs ?? []),
    ...(project.stack.backend ?? []),
    ...(project.stack.tools ?? []),
    ...(project.stack.infra ?? []),
    ...(project.stack.design ?? []),
  ];

  return (
    <article className="pt-32 lg:pt-40 pb-24">
      {/* Header */}
      <header className="px-6 lg:px-10 max-w-7xl mx-auto mb-20">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-12">
          <span className="mono text-[0.65rem] tracking-[0.25em] uppercase text-zinc-500">
            project /{project.number} · {CATEGORY_LABEL[project.category]}
          </span>
          <span className="mono text-[0.65rem] tracking-[0.25em] uppercase text-zinc-500">
            {project.period} · {project.type}
          </span>
        </div>

        <h1 className="display-xl">{project.title}</h1>
        <p className="mt-6 serif-accent text-zinc-500 text-lg">{project.subtitle}</p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-y border-zinc-900/10 py-8">
          <Meta label="Client" value={project.client} />
          <Meta label="Role" value={project.role} />
          <Meta label="Team" value={project.team} />
          <Meta
            label="Phase"
            value={project.phases.join(" / ")}
          />
        </div>

        {project.url && (
          <div className="mt-8">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="btn-line"
            >
              <span>visit live</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </header>

      {/* Stack marquee */}
      <div className="mb-24">
        <StackMarquee items={stackItems} />
      </div>

      {/* Case study */}
      <div className="px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
            <StageProgress />
          </div>

          <div className="col-span-12 lg:col-span-9 space-y-32">
            {/* Context */}
            <section data-stage="context" className="scroll-mt-32">
              <Eyebrow code="00" label="Context" />
              <p className="mt-8 body-jp max-w-3xl text-zinc-800 text-base leading-[2]">
                {project.context}
              </p>
            </section>

            {/* Challenge */}
            <section data-stage="challenge" className="scroll-mt-32">
              <Eyebrow code="01" label="Challenge" />
              <ul className="mt-8 space-y-6 max-w-3xl">
                {project.challenges.map((c, i) => (
                  <li key={i} className="border-l-2 border-zinc-900/15 pl-6">
                    <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500 mb-2">
                      / Issue {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-lg font-light text-zinc-900 leading-snug">
                      {c.title}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Solution */}
            <section data-stage="solution" className="scroll-mt-32">
              <Eyebrow code="02" label="Solution" />
              <ul className="mt-8 space-y-10 max-w-3xl">
                {project.challenges.map((c, i) => (
                  <li key={i}>
                    <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500 mb-3">
                      → answers Issue {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="body-jp text-zinc-800 leading-[2]">{c.solution}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Outcome */}
            <section data-stage="outcome" className="scroll-mt-32">
              <Eyebrow code="03" label="Outcome" />

              {project.metrics && project.metrics.length > 0 && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-zinc-900/10 py-10">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="display-l">
                        <Odometer value={m.value} />
                        {m.suffix && (
                          <span className="text-zinc-400">{m.suffix}</span>
                        )}
                      </p>
                      <p className="mt-2 mono text-[0.6rem] tracking-[0.25em] uppercase text-zinc-500">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <ul className="mt-8 space-y-3 max-w-3xl">
                {project.outcomes.map((o, i) => (
                  <li
                    key={i}
                    className="flex gap-4 body-jp text-zinc-800"
                  >
                    <span className="mono text-[0.65rem] tracking-[0.2em] text-zinc-400 pt-1">
                      ━━
                    </span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <nav className="mt-32 px-6 lg:px-10 max-w-7xl mx-auto grid grid-cols-2 gap-6 border-t border-zinc-900/10 pt-12">
        {prev ? (
          <Link
            href={`/works/${prev.slug}`}
            data-cursor="view"
            className="group"
          >
            <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-2">
              <ArrowLeft className="w-3 h-3" /> prev /{prev.number}
            </p>
            <p className="mt-3 display-m group-hover:opacity-60 transition-opacity">
              {prev.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/works/${next.slug}`}
            data-cursor="view"
            className="group text-right"
          >
            <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-2 justify-end">
              next /{next.number} <ArrowRight className="w-3 h-3" />
            </p>
            <p className="mt-3 display-m group-hover:opacity-60 transition-opacity">
              {next.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mono text-[0.55rem] tracking-[0.3em] uppercase text-zinc-400 mb-2">
        {label}
      </p>
      <p className="text-sm text-zinc-800 leading-snug">{value}</p>
    </div>
  );
}

function Eyebrow({ code, label }: { code: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="mono text-[0.7rem] tracking-[0.3em] text-zinc-400">
        /{code}
      </span>
      <h2 className="display-l">
        [ <span className="italic-accent">{label.toLowerCase()}</span> ]
      </h2>
    </div>
  );
}
