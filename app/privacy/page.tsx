import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Your Name Portfolio",
  description: "プライバシーポリシー",
};

export default function PrivacyPage() {
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
            style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
          >
            PRIVACY
            <br />
            POLICY
          </h1>
          <p className="text-sm text-zinc-400 mt-1 tracking-wide">プライバシーポリシー</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm text-zinc-600 leading-relaxed">

          <section>
            <h2 className="font-heading font-bold text-xs tracking-widest uppercase text-zinc-400 mb-4">
              個人情報の取り扱いについて
            </h2>
            <p>
              本サイトでは、お問い合わせいただいた際に氏名・メールアドレス等の個人情報をご入力いただく場合があります。
              取得した個人情報は、お問い合わせへの回答・連絡のみに使用し、第三者への提供は行いません。
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xs tracking-widest uppercase text-zinc-400 mb-4">
              アクセス解析について
            </h2>
            <p>
              本サイトでは、アクセス状況を把握するためにアクセス解析ツールを使用する場合があります。
              収集されるデータは匿名であり、個人を特定するものではありません。
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xs tracking-widest uppercase text-zinc-400 mb-4">
              免責事項
            </h2>
            <p>
              本サイトに掲載している情報の正確性には万全を期していますが、
              利用者が本サイトの情報を用いて行う一切の行為について、いかなる責任も負いません。
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xs tracking-widest uppercase text-zinc-400 mb-4">
              プライバシーポリシーの変更
            </h2>
            <p>
              本ポリシーの内容は、予告なく変更する場合があります。
              変更後のポリシーは、本ページに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <div className="pt-8 border-t border-zinc-100">
            <p className="text-xs text-zinc-400">最終更新：2025年1月</p>
          </div>
        </div>
      </div>
    </div>
  );
}
