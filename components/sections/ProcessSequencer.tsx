"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    code: "01",
    label: "Design",
    en: "design",
    desc: "要件定義 / Figma仕様確認 / 影響範囲分析",
    aiRole: "Claude で初稿ドキュメントを高速生成、Skillsで案件文脈を提示",
  },
  {
    code: "02",
    label: "Implementation",
    en: "implement",
    desc: "コンポーネント設計 / 状態管理 / API連携",
    aiRole: "Cursor + Claude で雛形生成、複雑ロジックの壁打ち",
  },
  {
    code: "03",
    label: "Validation",
    en: "validate",
    desc: "テスト / レビュー / ビジュアルリグレッション",
    aiRole: "テストコード自動生成 / レビューコメント骨子の事前作成",
  },
];

export function ProcessSequencer() {
  return (
    <div className="relative">
      {/* connecting line */}
      <div className="absolute left-0 right-0 top-12 h-px bg-zinc-900/15 hidden md:block" />

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900/10 border border-zinc-900/10">
        {STEPS.map((s, i) => (
          <motion.li
            key={s.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-[#fafaf9] p-8 lg:p-10 relative"
          >
            <div className="flex items-baseline justify-between mb-8">
              <span className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
                step /{s.code}
              </span>
              <span className="w-10 h-10 border border-zinc-900/30 flex items-center justify-center mono text-[0.65rem]">
                {s.code}
              </span>
            </div>

            <h3 className="display-m">
              {s.label.split("").map((ch, ci) => (
                <motion.span
                  key={ci}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 + ci * 0.03 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
            </h3>
            <p className="mt-2 serif-accent text-zinc-500 text-sm">
              {s.en}
            </p>

            <p className="mt-6 body-jp text-zinc-700">{s.desc}</p>

            <div className="mt-8 pt-6 border-t border-zinc-900/10">
              <p className="mono text-[0.55rem] tracking-[0.3em] uppercase text-zinc-400 mb-2">
                ai role
              </p>
              <p className="text-[0.8rem] leading-[1.9] text-zinc-600">{s.aiRole}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
