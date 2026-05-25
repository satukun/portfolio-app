import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact — YO.TEC Portfolio",
  description: "プロジェクトのご相談、設計レビュー、技術顧問のご依頼。",
};

export default function ContactPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-32 px-6 lg:px-10">
      <header className="max-w-7xl mx-auto mb-20">
        <span className="eyebrow">/04 · Contact · お問い合わせ</span>
        <h1 className="mt-6 display-xl">
          let&apos;s build <br />
          <span className="serif-accent text-zinc-500">something durable.</span>
        </h1>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="body-jp text-zinc-800 max-w-md">
            プロジェクトのご相談、設計レビュー、技術顧問のご依頼など、
            お気軽にお声がけください。返信は3営業日以内を目安にしています。
          </p>

          <div className="mt-12 space-y-6 border-t border-zinc-900/10 pt-8">
            <Row label="Email" value="hello@yo-tec.com" href="mailto:hello@yo-tec.com" />
            <Row label="Company" value="株式会社 YO.TEC" />
            <Row label="Location" value="Tokyo · Japan" />
            <Row label="Corporate" value="yo-tec.com" href="https://yo-tec.com" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="grid grid-cols-3 items-baseline gap-4">
      <span className="mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          data-cursor="link"
          className="col-span-2 text-zinc-900 link-underline"
        >
          {value}
        </a>
      ) : (
        <span className="col-span-2 text-zinc-900">{value}</span>
      )}
    </div>
  );
}
