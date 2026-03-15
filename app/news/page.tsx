import Link from "next/link";
import { ALL_NEWS } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News | YO.Tec Portfolio",
  description: "YO.Tecのお知らせ・実績一覧",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-3xl mx-auto px-8 pt-16 pb-32">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer tracking-wider mb-10"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          BACK
        </Link>

        {/* Heading */}
        <div className="mb-12">
          <h1
            className="font-display uppercase leading-none text-zinc-900"
            style={{ fontSize: "clamp(64px, 11vw, 120px)" }}
          >
            NEWS
          </h1>
          <p className="text-sm text-zinc-400 mt-1 tracking-wide">お知らせ</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-0 mb-8 border-b border-zinc-200">
          {["すべて", "お知らせ", "実績"].map((label, i) => (
            <span
              key={label}
              className={`px-5 py-2 text-xs font-medium tracking-wider cursor-default ${
                i === 0
                  ? "border-b-2 border-zinc-900 text-zinc-900"
                  : "text-zinc-400"
              }`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* News list */}
        <ul>
          {ALL_NEWS.map((item, i) => (
            <li
              key={item.id}
              className={`flex items-center gap-5 py-5 hover:bg-zinc-50 -mx-4 px-4 transition-colors duration-150 cursor-default ${
                i < ALL_NEWS.length - 1 ? "border-b border-zinc-100" : ""
              }`}
            >
              <time className="text-xs text-zinc-400 shrink-0 w-24">{item.date}</time>
              <span
                className={`text-xs px-2.5 py-0.5 shrink-0 border ${
                  item.category === "お知らせ"
                    ? "border-zinc-300 text-zinc-500"
                    : "bg-zinc-900 text-white border-zinc-900"
                }`}
              >
                {item.category}
              </span>
              <p className="text-sm text-zinc-700">{item.title}</p>
              <svg
                className="w-3.5 h-3.5 text-zinc-300 ml-auto shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
          ))}
        </ul>

        {/* Total count */}
        <p className="mt-8 text-xs text-zinc-400 text-right">
          {ALL_NEWS.length} 件
        </p>
      </div>
    </div>
  );
}
