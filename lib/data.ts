export type Project = {
  id: string;
  title: string;
  client: string;
  type: string;
  image: string;
  tags: string[];
  description: string;
  detail: string[];
};

export type NewsItem = {
  id: string;
  date: string;
  category: string;
  title: string;
  href?: string;
};

export const ALL_PROJECTS: Project[] = [
  {
    id: "01",
    title: "ECサイト フロントエンド",
    client: "BEAUTY CORP.",
    type: "Webアプリ開発",
    image: "https://picsum.photos/seed/proj-ec/800/600",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    description:
      "大手ビューティブランドのECサイトフロントエンド全般を担当。Next.js App Router と Server Components で高速な商品一覧・カートを実装。",
    detail: [
      "Next.js App Router によるページ設計・実装",
      "商品一覧・詳細・カート・決済フローのUI実装",
      "Server Components を活用したパフォーマンス最適化",
      "Tailwind CSS によるデザインシステム構築",
    ],
  },
  {
    id: "02",
    title: "SaaSダッシュボード",
    client: "TECH STARTUP",
    type: "Webアプリ開発",
    image: "https://picsum.photos/seed/proj-saas/800/600",
    tags: ["React", "Redux", "TypeScript"],
    description:
      "SaaS プロダクトの管理ダッシュボード UI 設計・実装。Recharts によるインタラクティブなデータ可視化と複雑な状態管理を実現。",
    detail: [
      "Redux Toolkit による複雑な状態管理",
      "Recharts を用いたリアルタイムグラフ実装",
      "Role-based アクセス制御の UI 実装",
      "Storybook によるコンポーネント管理",
    ],
  },
  {
    id: "03",
    title: "医療系ランディングページ",
    client: "MEDICAL Co.",
    type: "Web制作",
    image: "https://picsum.photos/seed/proj-med/800/600",
    tags: ["Next.js", "Figma", "CSS"],
    description:
      "医療系スタートアップの LP をデザインから実装まで一人で担当。Core Web Vitals 全指標で 90 点以上を達成し、コンバージョン率 30% 改善。",
    detail: [
      "Figma デザインからの 1:1 ピクセル実装",
      "Core Web Vitals 全指標 90 点以上達成",
      "スクロールアニメーション・パララックス実装",
      "お問い合わせフォームのバリデーション実装",
    ],
  },
  {
    id: "04",
    title: "モバイルアプリ WebView",
    client: "APP STARTUP",
    type: "Webアプリ開発",
    image: "https://picsum.photos/seed/proj-app/800/600",
    tags: ["React", "TypeScript", "API"],
    description:
      "toC 向けモバイルアプリの WebView 部分を設計・実装。React Native との密な連携を意識したコンポーネント設計と URL スキーム実装。",
    detail: [
      "React Native との URL スキーム連携",
      "モバイル最適化 UI コンポーネント実装",
      "REST API（axios）によるデータ取得・更新",
      "多言語対応（i18n）の実装",
    ],
  },
  {
    id: "05",
    title: "コーポレートサイト リニューアル",
    client: "SIMPLE INC.",
    type: "Web制作",
    image: "https://picsum.photos/seed/proj-corp/800/600",
    tags: ["Astro", "Tailwind", "Gulp"],
    description:
      "コーポレートサイトのフルリニューアル。Astro + Tailwind CSS で超高速な静的サイトを構築。LCP 0.8 秒、PageSpeed Insights モバイル 96 点を実現。",
    detail: [
      "Astro による静的サイト生成",
      "LCP 0.8 秒・PageSpeed 96 点達成",
      "FLOCSS に基づく CSS 設計",
      "Gulp によるビルド環境整備",
    ],
  },
  {
    id: "06",
    title: "社内管理ツール",
    client: "ENTERPRISE Co.",
    type: "Webアプリ開発",
    image: "https://picsum.photos/seed/proj-adm/800/600",
    tags: ["React", "Node.js", "TypeScript"],
    description:
      "社内向け管理ツールのフロントエンドをゼロから構築。複雑なテーブル操作・権限管理 UI と、Jest/Cypress による自動テストを整備。",
    detail: [
      "大量データ対応の仮想スクロールテーブル実装",
      "権限管理（RBAC）UI コンポーネント設計",
      "Jest によるスナップショット・ユニットテスト",
      "Cypress による E2E テスト整備",
    ],
  },
  {
    id: "07",
    title: "金融系 Webアプリ",
    client: "FINANCE Corp.",
    type: "Webアプリ開発",
    image: "https://picsum.photos/seed/proj-fin/800/600",
    tags: ["React", "TypeScript", "Redux"],
    description:
      "複雑な外貨計算・金利計算ロジックを含む金融系 Web アプリを担当。高精度な計算処理と直感的な UI を両立し、ユーザビリティを大幅に改善。",
    detail: [
      "外貨・金利計算エンジンの フロントエンド実装",
      "Redux Toolkit による複雑な状態管理",
      "バリデーション処理の設計・実装",
      "Visual Regression Test (BackstopJS) 導入",
    ],
  },
  {
    id: "08",
    title: "多言語対応 Webサービス",
    client: "GLOBAL SERVICE",
    type: "Webアプリ開発",
    image: "https://picsum.photos/seed/proj-i18n/800/600",
    tags: ["Next.js", "TypeScript", "i18n"],
    description:
      "日英中 3 言語対応の Web サービスを担当。next-intl による動的ルーティングと SEO 対応の多言語実装を行い、海外展開をサポート。",
    detail: [
      "next-intl による多言語動的ルーティング",
      "言語ごとの SEO メタデータ設定",
      "RTL 対応 CSS の実装",
      "ローカライズ品質チェックフロー構築",
    ],
  },
  {
    id: "09",
    title: "スタイルガイドライン整備",
    client: "WEB AGENCY",
    type: "Web制作",
    image: "https://picsum.photos/seed/proj-style/800/600",
    tags: ["Storybook", "FLOCSS", "Atomic Design"],
    description:
      "大規模 Web サイトのフロントエンド品質向上のため、FLOCSS ベースのスタイルガイドラインと Storybook によるコンポーネントカタログを整備。",
    detail: [
      "FLOCSS に基づくコンポーネント設計ガイドライン策定",
      "Storybook によるコンポーネントカタログ構築",
      "Atomic Design を用いた再利用可能コンポーネント設計",
      "新卒・中途向けコーディング規約ドキュメント作成",
    ],
  },
];

export const ALL_NEWS: NewsItem[] = [
  {
    id: "001",
    date: "2026.03.01",
    category: "お知らせ",
    title: "2026年度の新規案件受付を開始しました",
  },
  {
    id: "002",
    date: "2026.01.10",
    category: "お知らせ",
    title: "ポートフォリオサイトをリニューアルしました",
  },
  {
    id: "003",
    date: "2025.11.20",
    category: "実績",
    title: "大規模ECサイトのリニューアルプロジェクトが完了しました",
  },
  {
    id: "004",
    date: "2025.09.05",
    category: "実績",
    title: "React・Next.js を用いた SaaS ダッシュボード開発が完了しました",
  },
  {
    id: "005",
    date: "2025.06.15",
    category: "実績",
    title: "医療系スタートアップのランディングページを公開しました",
  },
  {
    id: "006",
    date: "2025.03.01",
    category: "お知らせ",
    title: "フリーランス活動7年目を迎えました",
  },
  {
    id: "007",
    date: "2024.12.20",
    category: "実績",
    title: "金融系 Web アプリの外貨計算機能を実装しました",
  },
  {
    id: "008",
    date: "2024.09.10",
    category: "実績",
    title: "多言語対応（日英中）Web サービスのフロントエンドを担当しました",
  },
  {
    id: "009",
    date: "2024.06.01",
    category: "お知らせ",
    title: "社内勉強会にて Next.js App Router の発表を行いました",
  },
  {
    id: "010",
    date: "2024.03.15",
    category: "実績",
    title: "コーポレートサイトリニューアル、PageSpeed 96点を達成しました",
  },
];
