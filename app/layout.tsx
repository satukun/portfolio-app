import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BootSequence } from "@/components/effects/BootSequence";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { IdleGlitch } from "@/components/effects/IdleGlitch";
import { ConsoleEgg } from "@/components/effects/ConsoleEgg";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YO.TEC PORTFOLIO — Yosuke Sato",
  description:
    "the craft behind the system. — フロントエンドエンジニア兼ディレクター。Next.js / React / TypeScript を中心としたモダンフロントエンド開発と、Claude を中核としたAI開発基盤の設計。",
  openGraph: {
    title: "YO.TEC PORTFOLIO — Yosuke Sato",
    description: "the craft behind the system.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <BootSequence />
        <CustomCursor />
        <IdleGlitch />
        <ConsoleEgg />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
