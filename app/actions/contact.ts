"use server";

export type ContactState = {
  success?: boolean;
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

export async function sendContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

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

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  // TODO: メール送信処理を実装（Resend / NodeMailer 等）
  console.log("Contact form submission:", { name, email, message });

  return { success: true };
}
