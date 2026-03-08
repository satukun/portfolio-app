import Link from "next/link";
import { ALL_NEWS } from "@/lib/data";

const PREVIEW_COUNT = 3;

export default function NewsSection() {
  const preview = ALL_NEWS.slice(0, PREVIEW_COUNT);

  return (
    <section className="max-w-5xl mx-auto px-8 mb-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 pb-4 border-b border-zinc-200">
        <h2 className="font-heading font-bold text-xl tracking-widest uppercase text-zinc-900">
          NEWS
        </h2>
        <Link
          href="/news"
          className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors duration-200 tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          一覧を見る
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* News list */}
      <ul>
        {preview.map((item, i) => (
          <li
            key={item.id}
            className={`flex items-center gap-5 py-4 ${
              i < preview.length - 1 ? "border-b border-zinc-100" : ""
            }`}
          >
            <time className="text-xs text-zinc-400 shrink-0 w-24">{item.date}</time>
            <span
              className={`text-xs px-2 py-0.5 shrink-0 border ${
                item.category === "お知らせ"
                  ? "border-zinc-400 text-zinc-500"
                  : "bg-zinc-900 text-white border-zinc-900"
              }`}
            >
              {item.category}
            </span>
            <p className="text-sm text-zinc-700 line-clamp-1">{item.title}</p>
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
    </section>
  );
}
