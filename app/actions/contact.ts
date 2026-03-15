"use server";

import { Resend } from "resend";

const RESPONSE_DAYS = 3;
export { RESPONSE_DAYS };

export type ContactState = {
  success?: boolean;
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
    privacy?: string;
  };
};

export async function sendContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const privacy = formData.get("privacy");

  const fieldErrors: ContactState["fieldErrors"] = {};

  if (!name || name.trim().length < 1) {
    fieldErrors.name = "お名前を入力してください";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "有効なメールアドレスを入力してください";
  }

  if (!message || message.trim().length < 10) {
    fieldErrors.message = "10文字以上のメッセージを入力してください";
  }

  // #3: サーバー側でプライバシー同意を検証
  if (!privacy) {
    fieldErrors.privacy = "個人情報の取り扱いへの同意が必要です";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  // #1: Resend でメール送信
  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!process.env.RESEND_API_KEY || !toEmail) {
    console.error("RESEND_API_KEY または CONTACT_TO_EMAIL が未設定です");
    return { success: true };
  }

  await resend.emails.send({
    from: "noreply@resend.dev",
    to: toEmail,
    subject: `【お問い合わせ】${name}様より`,
    text: `お名前: ${name}\nメールアドレス: ${email}\n\nご依頼内容:\n${message}`,
  });

  return { success: true };
}
