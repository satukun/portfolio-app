import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name | Frontend Engineer",
  description:
    "フロントエンドエンジニア兼ディレクター。React・Next.jsを軸に、業界15年以上の経験でWebアプリ・サイト制作を提供。",
  openGraph: {
    title: "Your Name | Frontend Engineer",
    description:
      "フロントエンドエンジニア兼ディレクター。React・Next.jsを軸に、業界15年以上の経験でWebアプリ・サイト制作を提供。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
