"use client";

import { useActionState } from "react";
import { sendContact, type ContactState, RESPONSE_DAYS } from "@/app/actions/contact";

const initial: ContactState = {};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initial);

  if (state.success) {
    return (
      <div className="border border-zinc-900/15 p-10 lg:p-14 bg-[#fafaf9]">
        <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
          / message sent
        </p>
        <h3 className="mt-6 display-l">
          thanks, <br />
          <span className="serif-accent text-zinc-500">talk soon.</span>
        </h3>
        <p className="mt-6 body-jp text-zinc-700 max-w-xl">
          メッセージを受け取りました。{RESPONSE_DAYS}営業日以内にご返信します。
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <Field
        label="Name"
        sub="お名前"
        name="name"
        type="text"
        error={state.fieldErrors?.name}
      />
      <Field
        label="Email"
        sub="メールアドレス"
        name="email"
        type="email"
        error={state.fieldErrors?.email}
      />

      <div>
        <Label label="Message" sub="ご依頼内容 / 相談内容" />
        <textarea
          name="message"
          rows={6}
          className="mt-3 w-full bg-transparent border-b border-zinc-900/30 focus:border-zinc-900 outline-none py-3 text-zinc-900 font-light resize-none transition-colors"
          placeholder="プロジェクト概要、期間、想定スコープなどお書きください。"
        />
        {state.fieldErrors?.message && (
          <p className="mt-2 mono text-[0.65rem] text-red-600">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          name="privacy"
          id="privacy"
          className="mt-1 accent-zinc-900"
        />
        <label
          htmlFor="privacy"
          className="text-[0.85rem] text-zinc-600 leading-relaxed"
        >
          個人情報の取り扱いに同意します（取得した情報はご返信のためのみに使用します）。
        </label>
      </div>
      {state.fieldErrors?.privacy && (
        <p className="mono text-[0.65rem] text-red-600">{state.fieldErrors.privacy}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        data-cursor="link"
        className="btn-line disabled:opacity-50"
      >
        <span>{pending ? "sending..." : "send message"}</span>
        <span>↗</span>
      </button>
    </form>
  );
}

function Label({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="mono text-[0.65rem] tracking-[0.3em] uppercase text-zinc-500">
        {label}
      </span>
      <span className="serif-accent text-zinc-400 text-[0.85rem]">{sub}</span>
    </div>
  );
}

function Field({
  label,
  sub,
  name,
  type,
  error,
}: {
  label: string;
  sub: string;
  name: string;
  type: string;
  error?: string;
}) {
  return (
    <div>
      <Label label={label} sub={sub} />
      <input
        type={type}
        name={name}
        className="mt-3 w-full bg-transparent border-b border-zinc-900/30 focus:border-zinc-900 outline-none py-3 text-zinc-900 font-light transition-colors"
      />
      {error && <p className="mt-2 mono text-[0.65rem] text-red-600">{error}</p>}
    </div>
  );
}
