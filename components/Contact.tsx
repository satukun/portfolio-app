"use client";

import { useEffect, useRef, useActionState } from "react";
import { sendContact, type ContactState, RESPONSE_DAYS } from "@/app/actions/contact";

const initialState: ContactState = {};

export default function Contact() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-8 bg-canvas border-t border-zinc-200">
      <div className="max-w-2xl mx-auto">

        {/* Heading */}
        <div className="reveal mb-3">
          <h2
            className="font-display uppercase leading-none text-zinc-900"
            style={{ fontSize: "clamp(56px, 9vw, 100px)" }}
          >
            CONTACT
          </h2>
        </div>
        <div className="reveal reveal-delay-1 flex items-center gap-3 mb-8">
          <p className="text-xs text-zinc-400 tracking-widest uppercase shrink-0">Get in touch</p>
          <div className="flex-1 h-px bg-zinc-200" aria-hidden="true" />
        </div>

        {/* Intro text */}
        <div className="reveal reveal-delay-2 text-sm text-zinc-600 leading-relaxed mb-8 space-y-1">
          <p>お仕事のご依頼やご相談は以下のフォームよりお気軽にご連絡ください。</p>
          <p>
            {RESPONSE_DAYS}営業日以内にお返事申し上げます。{RESPONSE_DAYS}営業日を過ぎても返事がない場合は、
            お手数ですが再度フォームよりお問い合わせください。
          </p>
        </div>

        {/* Success */}
        {state.success ? (
          <div className="reveal py-16 text-center">
            <p className="font-heading font-semibold text-xl text-zinc-900 mb-2">
              送信完了しました
            </p>
            <p className="text-sm text-zinc-500">{RESPONSE_DAYS}営業日以内にご連絡します。</p>
          </div>
        ) : (
          <form action={formAction} className="reveal reveal-delay-2 flex flex-col gap-6">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                お名前 <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="姓　名"
                className={`w-full px-0 py-3 bg-transparent border-b text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none transition-colors duration-200 ${
                  state.fieldErrors?.name ? "border-red-400" : "border-zinc-200 focus:border-zinc-900"
                }`}
              />
              {state.fieldErrors?.name && (
                <p className="mt-1 text-xs text-red-500" role="alert">
                  {state.fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                メールアドレス <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="○○@example.com"
                className={`w-full px-0 py-3 bg-transparent border-b text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none transition-colors duration-200 ${
                  state.fieldErrors?.email ? "border-red-400" : "border-zinc-200 focus:border-zinc-900"
                }`}
              />
              {state.fieldErrors?.email && (
                <p className="mt-1 text-xs text-red-500" role="alert">
                  {state.fieldErrors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">
                ご依頼内容 <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="具体的な制作物や詳細をご記入ください"
                className={`w-full px-0 py-3 bg-transparent border-b text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none transition-colors duration-200 resize-none ${
                  state.fieldErrors?.message ? "border-red-400" : "border-zinc-200 focus:border-zinc-900"
                }`}
              />
              {state.fieldErrors?.message && (
                <p className="mt-1 text-xs text-red-500" role="alert">
                  {state.fieldErrors.message}
                </p>
              )}
            </div>

            {/* Privacy checkbox */}
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  value="1"
                  required
                  className="w-4 h-4 border-zinc-400 cursor-pointer accent-zinc-900"
                />
                <label htmlFor="privacy" className="text-xs text-zinc-500 cursor-pointer">
                  個人情報の取り扱いについて同意する
                </label>
              </div>
              {state.fieldErrors?.privacy && (
                <p className="mt-1 text-xs text-red-500" role="alert">
                  {state.fieldErrors.privacy}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="btn-shimmer w-full py-4 bg-zinc-900 text-white font-medium text-sm tracking-widest uppercase hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer flex items-center justify-center gap-3"
            >
              {pending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  SENDING...
                </>
              ) : (
                <>
                  SEND A MESSAGE
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
