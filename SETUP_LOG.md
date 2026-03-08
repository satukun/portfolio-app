# セットアップ作業ログ

## 概要

`/Users/mac/portfolio` を `/Users/YOT/portfolio-app` に移動し、GitHubへ初回プッシュするまでの作業記録。

## 作業手順

### 1. ディレクトリの移動

- 移動元: `/Users/mac/portfolio`
- 移動先候補: `/Users/YOT/portfolio`
- `/Users/YOT/portfolio` がすでに存在していたため、**リネームして移動**することに変更
- 移動先: `/Users/YOT/portfolio-app`（App Router構成を示す名前）

```bash
mv /Users/mac/portfolio /Users/YOT/portfolio-app
```

### 2. .gitignore の作成

Next.js プロジェクト用の `.gitignore` を作成。

除外対象:
- `node_modules/`
- `.next/`
- `.env` 系ファイル
- `.DS_Store`
- `next-env.d.ts`
- `.vercel`

### 3. GitHubリポジトリへのプッシュ

GitHub上に空のリポジトリ `portfolio-app` を作成後、以下を実行：

```bash
git remote add origin https://github.com/satukun/portfolio-app.git
git add .
git commit -m "Initial commit: Next.js portfolio app with App Router"
git push -u origin master
```

## プロジェクト構成

```
portfolio-app/
├── app/           # Next.js App Router
├── components/    # UIコンポーネント
├── lib/           # ユーティリティ
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## リポジトリ

https://github.com/satukun/portfolio-app
