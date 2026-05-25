import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeFeatured } from "@/components/sections/HomeFeatured";
import { HomeCapabilities } from "@/components/sections/HomeCapabilities";
import { HomeTrajectory } from "@/components/sections/HomeTrajectory";
import { StackMarquee } from "@/components/effects/StackMarquee";
import {
  ALL_PROJECTS,
  CAPABILITIES,
  CAREER_TIMELINE,
  FEATURED_PROJECTS,
} from "@/lib/data";

const STACK_TICKERS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Zustand",
  "Redux Toolkit",
  "Storybook",
  "Supabase",
  "Cloudflare Workers",
  "Vercel",
  "Vitest",
  "Cypress",
  "Claude",
  "Cursor",
  "Figma",
  "PWA",
  "WebRTC",
];

export default function HomePage() {
  const featured = FEATURED_PROJECTS.length > 0 ? FEATURED_PROJECTS : ALL_PROJECTS.slice(0, 4);

  return (
    <>
      <HomeHero />

      <StackMarquee items={STACK_TICKERS} />

      {/* Featured Works */}
      <section className="relative py-32 px-6 lg:px-10 border-b border-zinc-900/10 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <span className="eyebrow">Works · 開発実績</span>
              <h2 className="mt-6 display-xl">
                selected <span className="serif-accent text-zinc-500">projects.</span>
              </h2>
            </div>
            <p className="md:col-span-5 text-zinc-600 text-sm leading-[1.9]">
              業務委託でのプロダクト参画から、受託で一人称完遂した大規模案件まで。
              NDA等で非公開の案件も多数あります。
            </p>
          </div>
          <HomeFeatured projects={featured} />
          <div className="mt-12 flex justify-end">
            <Link
              href="/works"
              data-cursor="link"
              className="view-more"
            >
              View all works <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trajectory */}
      <section className="relative py-32 px-6 lg:px-10 border-b border-zinc-900/10 bg-[#f3f3f1]">
        <div className="relative max-w-7xl mx-auto">
          <HomeTrajectory eras={CAREER_TIMELINE} />
          <div className="mt-12 flex justify-end">
            <Link
              href="/about"
              data-cursor="link"
              className="view-more"
            >
              Full timeline <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative py-32 px-6 lg:px-10 border-b border-zinc-900/10 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-20 flex items-end justify-between flex-wrap gap-6">
            <div>
              <span className="eyebrow">Capabilities · 提供できる役割</span>
              <h2 className="mt-6 display-xl">
                what i <span className="serif-accent text-zinc-500">bring.</span>
              </h2>
            </div>
            <p className="text-zinc-600 text-sm max-w-sm leading-[1.9]">
              モダンフロント実装 / 状態管理 / 移行 / リード /
              そしてAI開発基盤の設計まで。
            </p>
          </div>
          <HomeCapabilities items={CAPABILITIES} />
          <div className="mt-12 flex justify-end">
            <Link
              href="/approach"
              data-cursor="link"
              className="view-more"
            >
              AI-native workflow <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
