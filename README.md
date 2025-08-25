# 調達先管理システム

企業向けの洗練された調達先管理システムです。React + TypeScript + Material-UIで開発されています。

## 🚀 機能概要

### 主要機能
- **📋 メニュー画面**: システムの各機能へのアクセスポイント
- **🔍 調達先検索**: キーワードや国による調達先の検索
- **📊 調達先一覧**: 検索結果や全調達先のリスト表示
- **✏️ 調達先更新**: 既存調達先情報の編集・更新
- **📝 調達先申請**: 新規調達先の申請登録

### 画面構成

| 画面 | パス | 説明 |
|------|------|------|
| メニュー | `/` | ダッシュボード形式のメニュー |
| 検索 | `/suppliers` | キーワード・国による検索 |
| 一覧 | `/suppliers/list` | DataGridによるリスト表示 |
| 更新 | `/suppliers/update` | タブ形式の編集画面 |
| 申請 | `/suppliers/apply` | ステップ形式の申請フロー |

## 🛠 技術スタック

- **Frontend**: React 18.x
- **Language**: TypeScript
- **UI Library**: Material-UI v7
- **Routing**: React Router v6
- **State Management**: React Hooks
- **Data Grid**: MUI X Data Grid
- **Build Tool**: Create React App

## 🚦 クイックスタート

### 前提条件
- Node.js 18.x以上
- npm 8.x以上

### インストール & 起動

```bash
# リポジトリのクローン
git clone https://github.com/nezumasa0203/test-app-supplier.git
cd test-app-supplier

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start
```

アプリケーションは http://localhost:3000 でアクセスできます。

## 📦 ビルド & デプロイ

### ローカルビルド
```bash
npm run build
npm install -g serve
serve -s build
```

### デプロイオプション

#### Vercel (推奨)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --dir=build --prod
```

#### AWS Amplify
```bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

## 🎨 UI/UX特徴

- **🎯 企業向けデザイン**: 洗練されたビジネスライクなUI
- **📱 レスポンシブ**: モバイル・タブレット・デスクトップ対応
- **♿ アクセシビリティ**: ARIA属性とキーボードナビゲーション
- **🚀 パフォーマンス**: 最適化されたバンドルサイズ

## 📁 プロジェクト構成

```
src/
├── components/
│   └── layout/
│       ├── Navbar.tsx       # ナビゲーションバー
│       └── Sidebar.tsx      # サイドバーメニュー
├── pages/
│   ├── SupplierMenu.tsx     # メニュー画面
│   ├── SupplierSearch.tsx   # 検索画面
│   ├── SupplierList.tsx     # 一覧画面
│   ├── SupplierUpdate.tsx   # 更新画面
│   └── SupplierApply.tsx    # 申請画面
├── App.tsx                  # メインアプリケーション
└── index.tsx               # エントリーポイント
```

## 🔧 開発

### 利用可能なスクリプト

```bash
npm start          # 開発サーバー起動
npm run build      # プロダクションビルド
npm test           # テスト実行
npm run eject      # CRA設定の展開
```

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

開発者: GitHub Copilot  
作成日: 2025年8月25日  
バージョン: 1.0.0
