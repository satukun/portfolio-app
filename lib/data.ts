// ============================================================
// YO.TEC Portfolio data
// Source: 最新スキルシート2025.xlsx (Google Drive)
// ============================================================

export type ProjectCategory = "contract" | "outsourcing" | "in-house";

export type Project = {
  slug: string;
  number: string; // /01, /02 ...
  title: string;
  subtitle: string; // English subtitle
  client: string;
  url?: string;
  category: ProjectCategory;
  type: "toB" | "toC" | "toB/toC";
  period: string; // "2025.10 — 2026.04"
  yearKey: number; // for grouping
  team: string;
  role: string;
  phases: string[];
  context: string;
  challenges: { title: string; solution: string }[];
  outcomes: string[];
  metrics?: { label: string; value: string; suffix?: string }[];
  stack: {
    languages?: string[];
    libs?: string[];
    backend?: string[];
    tools?: string[];
    infra?: string[];
    design?: string[];
  };
  featured?: boolean;
};

// ------------------------------------------------------------
// 業務委託（Next.js / React 中心の参画案件）
// ------------------------------------------------------------
export const CONTRACT_PROJECTS: Project[] = [
  {
    slug: "shigyo-form-system",
    number: "01",
    title: "士業サイト運用・社内フォームシステム",
    subtitle: "ops & internal form system",
    client: "非公開（複数士業事務所）",
    category: "contract",
    type: "toB",
    period: "2025.10 — 2026.04",
    yearKey: 2025,
    team: "フロントエンド5名 + マーケ / ディレクター",
    role: "フロントエンド",
    phases: ["要件定義", "技術調査", "設計", "実装", "テスト", "運用移行"],
    context:
      "複数の士業事務所向けWebサイトの日々の運用業務（CMS改修・コンテンツ更新・機能追加）と並行して、社内向け「LP複製・タグ設置依頼フォーム」の新規開発を担当。要件定義から運用移行まで一貫対応。",
    challenges: [
      {
        title: "複数サイトの運用と新規開発を並行する中での品質担保",
        solution:
          "ESLint / Biome による静的解析と Vitest によるユニットテストを CI に組み込み、運用作業と開発作業の双方でデグレを防止。Storybook で UI 仕様を可視化し、ディレクターとの認識合わせを効率化。",
      },
      {
        title: "依頼フォーム項目の複雑さと入力ミス",
        solution:
          "Zod でフロント・バックエンド共通のスキーマを定義し、型安全かつ一貫したバリデーションを実現。入力エラーをリアルタイムにUIへ反映することで差し戻しを削減。",
      },
      {
        title: "長文・多項目フォームでの離脱リスク",
        solution:
          "Zustand の永続化機能で入力状態を localStorage に自動保存し、ブラウザを閉じても入力途中から再開可能に。",
      },
    ],
    outcomes: [
      "LP複製・タグ設置依頼の業務フローを標準化し、システム担当者の差し戻し工数を削減",
      "要件定義から運用移行まで一貫担当することで、関係者間の認識齟齬を最小化",
    ],
    stack: {
      languages: ["HTML5", "CSS3", "TypeScript"],
      libs: ["React", "React Router", "Hono", "UnoCSS", "Zustand", "Zod", "Vitest", "Storybook"],
      tools: ["ESLint", "Biome", "Git", "GitLab", "GitHub", "Vite"],
      infra: ["Cloudflare Workers"],
    },
    featured: false,
  },
  {
    slug: "watch-yoshida-replatform",
    number: "02",
    title: "高級時計販売店 Next.js 移行・統合システム",
    subtitle: "high-end watch e-commerce, replatformed",
    client: "watch-yoshida.co.jp",
    url: "https://watch-yoshida.co.jp/",
    category: "contract",
    type: "toB",
    period: "2025.04 — 2025.07",
    yearKey: 2025,
    team: "フロントエンド1名",
    role: "フロントエンド",
    phases: ["要件定義", "技術調査", "設計", "実装", "テスト", "運用移行"],
    context:
      "PHP/HTML 基盤のレガシーサイトを Next.js / TypeScript へ全面移行。再利用可能な React コンポーネント30個以上、CSS Modules 44モジュールを新規実装。1,300個超のファイルを効率処理する自動移行システムを構築し、サービス無停止で段階的リプレイスを完了。",
    challenges: [
      {
        title: "既存HTML構造の複雑さでコンポーネント化が困難",
        solution:
          "HTMLをパース処理し、構造を保ったままJSXへ変換するスクリプトを自作。装飾要素はpropsで受け取る設計とし、既存の見た目を保持しつつ再利用可能な形に分割。",
      },
      {
        title: "1,300個超の大量ファイルを手作業で移行するのは非現実的",
        solution:
          "Node.jsでディレクトリを再帰探索し、HTML/CSS/画像を分類・リネーム・配置する自動移行スクリプトを実装。旧パス→新パスの一括置換も自動化し、手作業を約95%削減。",
      },
      {
        title: "移行時のデータ整合性の担保",
        solution:
          "移行を「基盤構築 → CSS刷新 → ページ移行 → 動作確認」の4ステップに分割。各段階で差分チェックを実施し、ステージング環境で全ページの表示比較を行ったうえで本番反映。",
      },
    ],
    outcomes: [
      "210ページのコラムを統合システムへ移行し、運用工数を大幅削減",
      "HTML配置のみでページが自動生成される仕組みを構築",
      "ページ読み込み速度の改善によりUX向上",
      "表示崩れゼロを達成",
    ],
    metrics: [
      { label: "migrated files", value: "1,300", suffix: "+" },
      { label: "columns moved", value: "210", suffix: " pages" },
      { label: "manual work reduced", value: "95", suffix: "%" },
      { label: "components built", value: "30", suffix: "+" },
    ],
    stack: {
      languages: ["HTML5", "CSS3", "TypeScript"],
      libs: ["React", "Next.js", "Node.js", "CSS Modules"],
      tools: ["Git", "GitHub"],
      infra: ["Vercel"],
    },
    featured: true,
  },
  {
    slug: "tk-marathon-pwa",
    number: "03",
    title: "マラソンイベント リアルタイム撮影PWA",
    subtitle: "marathon photo capture PWA",
    client: "個人開発（クライアント提案ベース）",
    url: "https://tk-marathon.vercel.app/runner",
    category: "contract",
    type: "toB",
    period: "2024.12 — 2025.02",
    yearKey: 2024,
    team: "フロントエンド1名（個人開発）",
    role: "フロントエンド",
    phases: ["要件定義", "技術調査", "設計", "実装", "テスト", "運用移行"],
    context:
      "参加者登録からカメラ撮影まで一体化した PWA。next-pwa で iPad 運用に最適化し、WebRTC によるリアルタイム撮影、Supabase での参加者情報管理、react-i18next による日英多言語対応を実装。",
    challenges: [
      {
        title: "WebRTC API のブラウザ間互換性とデバイス検出の不安定さ",
        solution:
          "navigator.mediaDevices.enumerateDevices() でデバイス一覧を取得後、getUserMedia の制約をブラウザ別に動的切替。Safari/Chrome/Firefox で実機検証し、失敗時は別デバイスへ自動フォールバックする多段リトライ機構を実装。",
      },
      {
        title: "会場のネットワーク不安定時にアプリが停止するリスク",
        solution:
          "next-pwa + Workbox で静的アセットをプリキャッシュし、IndexedDB に撮影データを一時保存。オンライン復帰時に Supabase へ自動同期する仕組みを実装。",
      },
      {
        title: "iPad での長時間撮影によるパフォーマンス劣化",
        solution:
          "Canvas API で取得した画像を WebWorker 側でリサイズ・JPEG 圧縮（quality:0.8）してから Supabase Storage へアップロード。メインスレッドのブロッキングを回避。",
      },
    ],
    outcomes: [
      "参加者検索時間を 30秒 → 3秒 に短縮（紙ベース運用からデジタル化で90%削減）",
      "PWA化により会場のネットワーク不安定時でも安定動作",
      "撮影〜確認までの所要時間を従来の1/3に短縮",
      "多言語対応で国際大会での利用が可能に",
    ],
    metrics: [
      { label: "search time", value: "30→3", suffix: "s" },
      { label: "reduction", value: "90", suffix: "%" },
      { label: "capture cycle", value: "1/3", suffix: "" },
    ],
    stack: {
      languages: ["HTML5", "CSS3", "TypeScript"],
      libs: [
        "React",
        "Next.js",
        "react-i18next",
        "Framer Motion",
        "React Hook Form",
        "next-pwa",
        "WebRTC API",
        "Canvas API",
      ],
      backend: ["Supabase", "PostgreSQL"],
      tools: ["Git", "GitHub"],
      infra: ["Vercel"],
    },
    featured: true,
  },
  {
    slug: "mobimaru-kitchen-car",
    number: "04",
    title: "キッチンカープラットフォーム コンポーネント基盤",
    subtitle: "kitchen-car platform · components",
    client: "mobimaru.com",
    url: "https://mobimaru.com/",
    category: "contract",
    type: "toB",
    period: "2023.10 — 2024.03",
    yearKey: 2023,
    team: "フロント2名 + バックエンド1名 + デザイナー1名",
    role: "フロントエンド",
    phases: ["要件定義", "技術調査", "設計", "実装", "テスト", "運用移行"],
    context:
      "兄弟サイトを横断して再利用可能なコンポーネントを Storybook で一元管理する仕組みを提案・導入。esa でドキュメント整備し、週次レビュー文化を立ち上げ。週2日稼働。",
    challenges: [
      {
        title: "コンポーネント管理の仕組みがなく、新規ページで同じUIが乱立",
        solution:
          "使用頻度の高いUIを洗い出し、Atomic Design（Atoms/Molecules）粒度で Storybook にカタログ化。命名規則と適用基準を esa に明文化し、新規実装は必ず Storybook 起点に統一。",
      },
      {
        title: "コンポーネント設計を意識した実装は初期工数が増える",
        solution:
          "中長期での保守・拡張コストが下がることをチームに共有し、教育とレビューで段階的に浸透させた。",
      },
      {
        title: "属人化していたコンポーネント知識をチーム資産化",
        solution:
          "esa にカタログ + 「使用例・NG例・適用シーン」をセットでドキュメント化。新規メンバーが参照するだけで実装方針が掴める状態を整備。",
      },
    ],
    outcomes: [
      "新規ページのコンポーネント再利用率が向上、コード重複削減",
      "兄弟サイト間で共通コンポーネントの流用が可能になり、横展開工数を圧縮",
      "レビュー文化の定着でチーム全体のフロントエンドスキルが底上げ",
      "ドキュメント化で新規メンバーのオンボーディング工数を削減",
    ],
    stack: {
      languages: ["HTML5", "CSS3", "SCSS", "JavaScript"],
      libs: ["Ruby on Rails", "Storybook"],
      tools: ["Docker", "GitHub", "esa"],
      design: ["Figma"],
    },
  },
  {
    slug: "mercoin-crypto-dashboard",
    number: "05",
    title: "暗号資産サービス CSダッシュボード",
    subtitle: "crypto service · CS dashboard",
    client: "about.mercoin.com",
    url: "https://about.mercoin.com/",
    category: "contract",
    type: "toB",
    period: "2023.06 — 2023.10",
    yearKey: 2023,
    team: "フロント6名 + バックエンド1名",
    role: "フロントエンド",
    phases: ["詳細設計", "製造・構築", "テスト"],
    context:
      "カスタマーサポート向けダッシュボードの改修。Cypress による E2E テストを CircleCI で自動実行する仕組みを構築し、リファクタリングを安全に進める基盤を整備。週3日稼働。",
    challenges: [
      {
        title: "複数の機能改修・リファクタリング並行でデグレ防止が必要",
        solution:
          "Cypress で主要フロー（ログイン／チケット作成／顧客検索／サポートドキュメント参照）に段階的に E2E テストを追加。CircleCI に組み込みPR時に自動実行する体制を構築。",
      },
      {
        title: "フロント6名の大規模チームでコードベースの整合性確保",
        solution:
          "PRレビューに継続参加し、共通コンポーネント使い回し・命名規則を指摘。レビュー観点をチーム共有化し属人化を防止。",
      },
    ],
    outcomes: [
      "E2E自動実行体制を構築し、ダッシュボードのリファクタリングを安全に実施",
      "リグレッション検知が高速化し、リリース品質が向上",
      "コードレビュー参加でチーム全体のコード品質と知識共有がレベルアップ",
    ],
    stack: {
      languages: ["TypeScript"],
      libs: ["React", "Next.js", "Cypress", "Storybook"],
      tools: ["CircleCI", "GitHub", "Backlog"],
    },
  },
  {
    slug: "489pro-x-ryokan",
    number: "06",
    title: "ホテル・旅館宿泊予約サービス",
    subtitle: "ryokan booking platform",
    client: "489pro-x",
    url: "https://info.489pro-x.com/",
    category: "contract",
    type: "toC",
    period: "2022.05 — 2023.05",
    yearKey: 2022,
    team: "フロント2名 + バックエンド1名",
    role: "フロントエンド",
    phases: ["基本設計", "詳細設計", "製造・構築"],
    context:
      "新規画面開発・既存機能改修・多言語対応を担当。Next.js による高速化、SEO、SSR/Skeleton Loading によるUX改善、状態管理の useReducer/Redux ハイブリッド設計を実施。",
    challenges: [
      {
        title: "API通信のレスポンス待ちで白画面を見せていた",
        solution:
          "getServerSideProps を使った SSR で初回描画を高速化。クライアント側追加通信は Skeleton Loading でプレースホルダ先出しし、体感速度を改善。",
      },
      {
        title: "複数画面で共有する状態が複雑化し可読性が低下",
        solution:
          "単純な状態は useReducer/useContext で一元管理、横断的に使う複雑な状態のみ Redux を採用するハイブリッド構成に整理。",
      },
      {
        title: "多言語対応で表示崩れ・SEO評価の分散が懸念",
        solution:
          "Next.js の i18n routing で URL に言語コード（/ja, /en）を含める設計。hreflang を自動付与し、CSS は固定幅を避けフレックス／グリッドで構成。",
      },
    ],
    outcomes: [
      "直感的な操作が可能な画面でユーザビリティ向上",
      "コードの可読性・メンテナンス性が向上、リリーススピード改善",
      "Skeleton Loading で API通信時のUXが大幅改善",
    ],
    stack: {
      languages: ["HTML5", "CSS3"],
      libs: ["React", "Next.js", "Redux", "axios", "Storybook"],
      tools: ["Git", "Backlog", "ChatWork"],
    },
  },
  {
    slug: "strap-whiteboard",
    number: "07",
    title: "オンラインホワイトボード Strap",
    subtitle: "online whiteboard product",
    client: "Strap",
    url: "https://product.strap.app/",
    category: "contract",
    type: "toB",
    period: "2021.12 — 2022.03",
    yearKey: 2021,
    team: "フロント5名 + バックエンド1名 + デザイナー1名",
    role: "フロントエンド",
    phases: ["要件定義", "基本設計", "詳細設計", "製造・構築", "保守・運用"],
    context:
      "ダッシュボードの新規画面開発・既存画面改修・機能追加。Redux + TypeScript で状態管理を一元化、スクラム開発でデモ・FB対応、ノーコード STUDIO によるLP制作も担当。",
    challenges: [
      {
        title: "ユーザーロールに応じた表示要素の出し分けが必要",
        solution:
          "認可ロジックを Redux 側で一元管理し、各コンポーネントは「現在のロール」をセレクタ経由で参照する設計を採用。表示の出し分けはコンポーネントツリー上位で判定。",
      },
      {
        title: "複数コンポーネント間で共有される状態が複雑化",
        solution:
          "Redux で状態を一元管理し、TypeScript で型定義を厳格化。Action / Reducer / Selector のレイヤを明確に分け、チーム全員が同じルールで状態を扱える基盤を整備。",
      },
      {
        title: "グラフ／チャートが複数画面に散在し同じ実装が重複",
        solution:
          "チャート表示部を共通コンポーネント化し、データソースと表示オプションを props で受け取る設計に統一。新規画面追加時の実装コストを削減。",
      },
    ],
    outcomes: [
      "ダッシュボード新規画面開発でユーザー利便性とビジネス価値が向上",
      "Redux + TypeScript の状態管理基盤で開発効率と品質が向上",
      "スプリントレビューでステークホルダーとの密なコミュニケーションを実現",
      "STUDIO 活用で LP制作期間を短縮",
    ],
    stack: {
      languages: ["HTML5", "CSS3", "TypeScript"],
      libs: ["React", "Redux", "React Router", "webpack", "gulp", "Storybook", "pixi.js"],
      tools: ["STUDIO", "GitHub", "Discord", "Zoom"],
    },
  },
  {
    slug: "misumi-ec",
    number: "08",
    title: "MISUMI EC 大手ECシステム",
    subtitle: "industrial-parts e-commerce",
    client: "MISUMI",
    url: "https://jp.misumi-ec.com/",
    category: "contract",
    type: "toB",
    period: "2021.01 — 2021.10",
    yearKey: 2021,
    team: "フロント5名",
    role: "フロントエンド",
    phases: ["要件定義", "基本設計", "詳細設計", "製造・構築", "テスト"],
    context:
      "既存ECサイトの画面改修・機能追加・API連携・多言語対応。商品一覧／カート／注文確認の中核画面群を担当。BackstopJS によるビジュアルリグレッションテストを導入。",
    challenges: [
      {
        title: "中核画面で類似UIが多く、コンポーネントが乱立する懸念",
        solution:
          "React Hooks でロジックをカスタムフックに切り出し、UI部分は再利用可能なコンポーネントとして整理。商品カード／フォーム入力／カート行など共通パーツを単一実装にまとめた。",
      },
      {
        title: "スプリントごとの画面外観変更で意図しない崩れに気付きづらい",
        solution:
          "BackstopJS を導入し、画面ごとのスクリーンショットを基準画像と自動比較。PR時にビジュアルリグレッションテストを走らせ、CSS変更による崩れを早期検知。",
      },
      {
        title: "フロント5名のスクラム開発で実装スタイル・レビュー観点を揃える",
        solution:
          "スプリントレビューでデモを担当し、実装内容と「なぜそのアプローチを選んだか」をチームに共有。コードレビュー観点を明文化し属人化を防止。",
      },
    ],
    outcomes: [
      "ECサイトの画面改修でユーザー利便性が向上",
      "コンポーネント再利用性向上で開発効率改善、リリースサイクル短縮",
      "ビジュアルリグレッションテスト導入で画面崩れの不具合を早期発見",
    ],
    stack: {
      languages: ["HTML5", "CSS3", "TypeScript"],
      libs: ["React", "Next.js", "Redux", "webpack", "gulp", "Storybook", "Jest", "BackstopJS"],
      tools: ["GitHub", "Teams"],
    },
  },
  {
    slug: "exteam-freelance-platform",
    number: "09",
    title: "フリーランス管理プラットフォーム",
    subtitle: "freelance management platform",
    client: "exteam.jp",
    url: "https://www.exteam.jp/",
    category: "contract",
    type: "toB",
    period: "2019.12 — 2020.11",
    yearKey: 2019,
    team: "フロント5名 + バックエンド1名 + デザイナー1名",
    role: "フロントエンド",
    phases: ["要件定義", "基本設計", "詳細設計", "製造・構築", "テスト"],
    context:
      "既存画面の改修・機能追加、UIリニューアル、状態管理基盤の整備。Redux Toolkit を導入し、デザイナーとの連携体制を構築。",
    challenges: [
      {
        title: "複数画面にまたがる状態管理の複雑化",
        solution:
          "Redux Toolkit を導入し、reducer・action の責務を明確に分離。createSlice でボイラープレート削減、メンバー間の認識ズレを軽減。",
      },
      {
        title: "API連携の実装が画面ごとにバラついていた",
        solution:
          "axios で REST API通信のパターンを統一し、インターセプター層でトークン付与・エラー処理を一括管理。画面横断で一貫したデータ取得フローを実現。",
      },
      {
        title: "複数メンバー並行開発での認識ズレ",
        solution:
          "デザイナーとの仕様確認を画面設計フェーズで前倒し、開発開始時点で実装方針を確定。Reduxの状態スキーマをTypeScriptで型定義し、5名が同じ前提でコードを書ける状態を担保。",
      },
    ],
    outcomes: [
      "既存画面の改修でサービス利便性向上、ユーザー評価向上に貢献",
      "Redux Toolkit 導入で状態管理の複雑性が解消、バグ発生率が低減",
      "axios によるAPI連携標準化で通信が安定",
      "デザイナーとの密な連携で画面設計の手戻りを抑制",
    ],
    stack: {
      languages: ["HTML5", "CSS3"],
      libs: ["React", "Redux Toolkit", "webpack", "gulp", "Storybook", "axios"],
      tools: ["Docker", "GitLab", "Pivotal Tracker", "Slack"],
    },
  },
];

// ------------------------------------------------------------
// 受託開発（フロント実装中心）
// ------------------------------------------------------------
export const OUTSOURCING_PROJECTS: Project[] = [
  {
    slug: "jishin-hoken",
    number: "10",
    title: "地震保険普及啓発サイト 全面刷新",
    subtitle: "earthquake insurance awareness site",
    client: "日本損害保険協会",
    url: "https://www.jishin-hoken.jp/",
    category: "outsourcing",
    type: "toB",
    period: "2025.07 — 2025.09",
    yearKey: 2025,
    team: "リード+メンバー3名体制",
    role: "リードエンジニア",
    phases: ["要件定義", "基本設計", "詳細設計", "製造・構築", "テスト", "ディレクション"],
    context:
      "47都道府県ページを JSON データ駆動 + EJS テンプレートで自動生成する仕組みを構築。17個の再利用可能コンポーネントを核とした設定駆動アーキテクチャにより、従来22行の記述を7行に短縮。Gulpタスクで開発/本番環境の自動切り替え、画像最適化、SRIセキュリティ強化を1コマンドで完結。",
    challenges: [
      {
        title: "47都道府県分の同形式ページを手動管理すると保守破綻",
        solution:
          "都道府県データを JSON 化し、EJS テンプレートからループ生成。17個の再利用コンポーネントで設定駆動アーキテクチャを構築。",
      },
      {
        title: "開発／本番環境の切り替えと配信最適化の手作業負荷",
        solution:
          "Gulp タスクで環境別ビルド・画像最適化・SRI付与までを1コマンドで完結するパイプラインを構築。",
      },
    ],
    outcomes: [
      "47都道府県ページの自動生成基盤を構築",
      "コンポーネント記述量を 22行 → 7行 に短縮",
      "データ更新時の自動反映でメンテナンスコスト削減",
    ],
    metrics: [
      { label: "prefectures auto-generated", value: "47" },
      { label: "lines reduced", value: "22→7" },
      { label: "reusable components", value: "17" },
    ],
    stack: {
      languages: ["EJS", "SCSS", "JavaScript"],
      libs: ["Gulp"],
      tools: ["Git", "GitHub"],
    },
    featured: true,
  },
  {
    slug: "ooi-ocha-museum",
    number: "11",
    title: "お〜いお茶ミュージアム 俳句作成タブレット",
    subtitle: "haiku creation tablet app",
    client: "伊藤園",
    category: "outsourcing",
    type: "toB",
    period: "2024",
    yearKey: 2024,
    team: "チーム参画",
    role: "フロントエンド",
    phases: ["設計", "実装"],
    context:
      "ユーザーがタブレット上で俳句を作成し、印刷・SNS共有まで行える Webアプリの開発に参画。React Context API で状態管理を一元化し、props バケツリレーを排除。SSG で事前レンダリングを行い初回ロードを高速化。afterprint イベントのハンドリングを useEffect 内で安定化させ、印刷完了後のUI更新タイミング不安定問題を解消。",
    challenges: [
      {
        title: "複数画面で共有する状態の props バケツリレー",
        solution:
          "Context API で状態管理を一元化、UIロジックを純粋に保ったまま深いコンポーネントツリーへ状態を届ける。",
      },
      {
        title: "印刷完了後のUI更新タイミング不安定",
        solution:
          "afterprint イベントのハンドリングを useEffect 内で安定化させ、ライフサイクル整合性を担保。",
      },
    ],
    outcomes: [
      "Context API + SSG で初回ロード高速化",
      "印刷フローの安定動作を担保",
    ],
    stack: {
      languages: ["HTML5", "CSS3", "TypeScript"],
      libs: ["React", "Next.js (SSG)"],
    },
  },
  {
    slug: "large-corp-200pages",
    number: "12",
    title: "200ページ規模 コーポレートサイト",
    subtitle: "200-page corporate site, solo",
    client: "非公開",
    category: "outsourcing",
    type: "toB",
    period: "2024",
    yearKey: 2024,
    team: "1名（個人）",
    role: "リードエンジニア",
    phases: ["要件定義", "基本設計", "詳細設計", "製造・構築", "テスト", "ディレクション"],
    context:
      "フレームワーク選定からコンポーネント設計、再利用性の高い実装までを一人称で完遂した大規模コーポレートサイト案件。共通化により運用フェーズでのページ追加・修正コストを大幅削減。",
    challenges: [
      {
        title: "200ページ規模の一人称対応における設計の重要性",
        solution:
          "フレームワーク選定段階から運用フェーズを想定し、コンポーネント設計と共通レイアウト設計を徹底。FLOCSS でCSSの長期運用性を担保。",
      },
    ],
    outcomes: [
      "1名体制で200ページ規模を完遂",
      "共通化により運用フェーズのページ追加・修正コストを大幅削減",
    ],
    metrics: [{ label: "pages shipped solo", value: "200", suffix: "+" }],
    stack: {
      languages: ["HTML5", "SCSS", "JavaScript"],
      libs: ["Astro", "EJS", "Gulp"],
      tools: ["Git", "GitHub"],
    },
  },
];

// ------------------------------------------------------------
// 自社プロダクト
// ------------------------------------------------------------
export const IN_HOUSE_PROJECTS: Project[] = [
  {
    slug: "yo-tec-corporate",
    number: "13",
    title: "YO.TEC コーポレートサイト",
    subtitle: "yo.tec corporate site",
    client: "株式会社 YO.TEC",
    url: "https://yo-tec.com/",
    category: "in-house",
    type: "toB",
    period: "2026.01 — 現在",
    yearKey: 2026,
    team: "1名（代表）",
    role: "デザイン・実装",
    phases: ["コンセプト設計", "デザイン", "実装", "運用"],
    context:
      "法人化後の自社コーポレートサイト。technology that touches business. のタグラインのもと、Three.js のパーティクルロゴ・反転スクロール・編集的タイポグラフィーで「テクノロジーで、ビジネスの可能性を拡張する」姿勢を表現。",
    challenges: [
      {
        title: "コーポレートとして信頼感を出しつつ、技術力を主張するバランス",
        solution:
          "ミニマルな配色（ベージュ系 #fafaf9 + 黒）と極細フォントで信頼感、Three.js / framer-motion のリッチな演出で技術力を両立。",
      },
    ],
    outcomes: ["法人としての顔となるサイトを自社運用"],
    stack: {
      languages: ["TypeScript"],
      libs: [
        "React",
        "Next.js",
        "Tailwind CSS v4",
        "framer-motion",
        "@react-three/fiber",
        "@react-three/drei",
      ],
      backend: ["Supabase"],
      infra: ["Vercel"],
    },
  },
  {
    slug: "yo-tec-portfolio",
    number: "14",
    title: "YO.TEC ポートフォリオ（本サイト）",
    subtitle: "this portfolio site",
    client: "株式会社 YO.TEC",
    category: "in-house",
    type: "toB",
    period: "2026.05 — 現在",
    yearKey: 2026,
    team: "1名",
    role: "デザイン・実装",
    phases: ["コンセプト設計", "デザイン", "実装"],
    context:
      "the craft behind the system. を掲げ、代表 佐藤陽介個人の制作実績を編集的に展開するポートフォリオ。BootSequence / Custom Cursor / Magnetic Type / Stage Progress などの演出で「クラフトそのもの」を体験として提示。",
    challenges: [
      {
        title: "コーポレートと並列で立つのではなく、コーポレートの裏付けとして機能する設計",
        solution:
          "トンマナを完全継承しつつ、コーポレートが持たない案件深掘り（Stage Progress）・キャリア軌跡・AI開発基盤の3軸を独自スコープに。",
      },
    ],
    outcomes: ["コーポレートサイトとの連続体験を構築"],
    stack: {
      languages: ["TypeScript"],
      libs: ["React", "Next.js 15", "Tailwind CSS", "framer-motion"],
      infra: ["Vercel"],
    },
  },
];

export const ALL_PROJECTS: Project[] = [
  ...CONTRACT_PROJECTS,
  ...OUTSOURCING_PROJECTS,
  ...IN_HOUSE_PROJECTS,
];

export const FEATURED_PROJECTS = ALL_PROJECTS.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}

// ------------------------------------------------------------
// キャリアタイムライン
// ------------------------------------------------------------
export type CareerEra = {
  range: string;
  startYear: number;
  endYear: number | "current";
  company: string;
  role: string;
  highlights: string[];
  summary: string;
};

export const CAREER_TIMELINE: CareerEra[] = [
  {
    range: "2024.11 — 現在",
    startYear: 2024,
    endYear: "current",
    company: "株式会社 YO.TEC",
    role: "代表 / フロントエンドエンジニア",
    summary:
      "フリーランス活動を法人化。業務委託と受託開発の両軸を継続しつつ、Claude を中核としたAI開発基盤（Skills整備・ハーネス設計・実装フロー組み込み）を自社の開発プロセスに組み込み中。",
    highlights: [
      "法人化（2024.11）",
      "コーポレートサイト・ポートフォリオの自社制作",
      "Claude Skills / ハーネス設計の運用化",
    ],
  },
  {
    range: "2019.08 — 2024.10",
    startYear: 2019,
    endYear: 2024,
    company: "Freelance",
    role: "フロントエンドエンジニア / リードエンジニア / ディレクター",
    summary:
      "業務委託（Next.js / React / TypeScript 中心のモダンフロントエンド開発）と受託開発（HTML / CSS / JS ベースのサイト制作50件以上）を並走。リードエンジニア兼ディレクターとして、外部パートナー管理・クライアント直接対応も担当。",
    highlights: [
      "Next.js / React / TypeScript 中心のプロダクト開発に複数参画",
      "200ページ規模のコーポレートサイトを一人で完遂",
      "受託50件以上、外部パートナー管理含む一気通貫対応",
    ],
  },
  {
    range: "2013.05 — 2019.07",
    startYear: 2013,
    endYear: 2019,
    company: "インターリンク株式会社",
    role: "フロントエンドエキスパート（係長級） / クリエイティブ事業部 Web戦略課",
    summary:
      "20名規模のクリエイティブ事業部で、制作ディレクション・フロントエンド実装を担当。金融・ゲーム・ブログ事業など幅広い分野のLP・SPA・アプリ制作に従事。",
    highlights: [
      "2017年上期 社内MVP受賞",
      "新卒教育担当（コーディング・ビジネスマナー）",
      "社内ライトニングトーク会を主催（半年間継続）",
      "webpack / gulp / Stylus / EJS / Atomic Design / FLOCSS / Nuxt.js / React",
    ],
  },
  {
    range: "2008.01 — 2013.02",
    startYear: 2008,
    endYear: 2013,
    company: "株式会社大空出版",
    role: "デザイン・コーディング",
    summary:
      "Web業界キャリアの起点。デザイン（Photoshop / Illustrator）からコーディング（HTML / CSS / JavaScript）まで一貫対応。小規模チームで様々なジャンルのサイト制作に参加。",
    highlights: [
      "デザインからコーディングまで一気通貫",
      "様々なジャンルのサイト制作に参加",
    ],
  },
];

// ------------------------------------------------------------
// Capabilities
// ------------------------------------------------------------
export type Capability = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "Modern Frontend",
    subtitle: "モダンフロントエンド実装",
    description:
      "Next.js / React / TypeScript を中心とした SPA・SSR/SSG/ISR の設計・実装。Tailwind / CSS Modules でのスタイリングと型安全なコンポーネント設計まで。",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    number: "02",
    title: "State & Architecture",
    subtitle: "状態管理・コンポーネント設計",
    description:
      "Redux Toolkit / Zustand / Context API の使い分け、Atomic Design / Storybook を用いた再利用性の高いコンポーネント設計。型定義含めて長期運用に耐える基盤を構築。",
    tags: ["Redux Toolkit", "Zustand", "Storybook", "Atomic Design"],
  },
  {
    number: "03",
    title: "Migration & Replatforming",
    subtitle: "レガシー → モダン移行",
    description:
      "PHP/HTML 基盤から Next.js への安全な置換、1,300ファイル超の自動移行スクリプト構築など、表示崩れゼロでの段階的リプレイス実績。",
    tags: ["Next.js", "Codemod", "CSS Modules", "Vercel"],
  },
  {
    number: "04",
    title: "Lead & Direction",
    subtitle: "リード・ディレクション",
    description:
      "外部パートナーへの作業分配・進捗管理・レビュー、クライアントとの直接やり取りとスケジュール管理。設計・品質担保に集中することで全体生産性を高める体制づくり。",
    tags: ["Code Review", "Team Lead", "Client Direct"],
  },
  {
    number: "05",
    title: "AI-Native Workflow",
    subtitle: "AI開発基盤の設計",
    description:
      "Claude Skills / ハーネス設計 / 実装フローへの組み込みを通じ、「設計 → 実装 → 検証」の一連の流れに AI を組み込んだ開発基盤を運用。",
    tags: ["Claude Skills", "Harness", "Cursor", "MCP"],
  },
];

// ------------------------------------------------------------
// AI Approach
// ------------------------------------------------------------
export const AI_APPROACH = {
  tagline: "claude, as part of the toolchain.",
  taglineJp: "Claude を、開発基盤の一部として運用する。",
  intro:
    "私は Claude を「単発の補完」ではなく、「設計 → 実装 → 検証」を貫通する一連の開発基盤として運用しています。",
  pillars: [
    {
      key: "skills",
      label: "Claude Skills の整備",
      summary:
        "プロジェクトごとに使用するライブラリの慣習、状態管理の方針、コンポーネント分割ルール、レビュー観点などを Skills として切り出し、Claude が案件文脈に沿った提案を行えるよう設計。",
      detail:
        "属人化しがちな暗黙知をスキル化することで、同じ品質の判断を繰り返し得られる状態を作っています。",
    },
    {
      key: "harness",
      label: "ハーネス（エージェント実行環境）の設計",
      summary:
        "Claude をエージェントとして動かす際の足場づくり。ツール呼び出しの粒度、コンテキスト保持の方針、検証ステップの挿入、リトライ条件などを設計。",
      detail:
        "コーディング支援が「単発の補完」ではなく「設計→実装→検証」の一連の流れとして機能するよう調整しています。",
    },
    {
      key: "workflow",
      label: "実装フローへの組み込み",
      summary:
        "複雑な状態管理（Redux Toolkit / Zustand など）における非同期処理の設計の壁打ち、既存コードの意図整理、Figma 仕様に基づくコンポーネント雛形の生成、テストコードの下書き作成。",
      detail:
        "AIに振る作業と人が設計検討・レビューに使う時間の配分を最適化しています。",
    },
  ],
} as const;
