import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-zinc-950 text-[#fafaf9] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-white/40">
              — let&apos;s build something durable
            </p>
            <h2 className="mt-6 display-l text-white">
              the craft behind <br />
              <span className="serif-accent text-white/60">the system.</span>
            </h2>
            <p className="mt-8 body-jp text-white/55 max-w-md">
              プロジェクトのご相談、設計レビュー、技術顧問のご依頼など、
              お気軽にお声がけください。
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                data-cursor="link"
                className="btn-line btn-line-inverted"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:hello@yo-tec.com"
                data-cursor="link"
                className="mono text-[0.7rem] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors py-4 link-underline"
              >
                hello@yo-tec.com
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mb-6">
              Sitemap
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/works" data-cursor="link" className="hover:text-white">Works</Link></li>
              <li><Link href="/about" data-cursor="link" className="hover:text-white">About</Link></li>
              <li><Link href="/approach" data-cursor="link" className="hover:text-white">Approach</Link></li>
              <li><Link href="/contact" data-cursor="link" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mb-6">
              Elsewhere
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a
                  href="https://yo-tec.com"
                  data-cursor="link"
                  className="hover:text-white inline-flex items-center gap-2"
                >
                  YO.TEC Corporate <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/"
                  data-cursor="link"
                  className="hover:text-white inline-flex items-center gap-2"
                >
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-wrap items-end justify-between gap-6">
          <div className="mono text-[0.6rem] tracking-[0.25em] uppercase text-white/50">
            <p>© {year} 株式会社 YO.TEC / Yosuke Sato</p>
            <p className="mt-1 text-white/30">Tokyo · Japan · N 35.6762° E 139.6503°</p>
          </div>
          <p className="mono text-[0.55rem] tracking-[0.25em] uppercase text-white/30">
            v2026.05 — built with next.js / framer-motion
          </p>
        </div>
      </div>
    </footer>
  );
}
