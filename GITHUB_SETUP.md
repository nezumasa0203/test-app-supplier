# GitHubへのプッシュ手順

## 1. GitHubでリポジトリを作成
1. GitHub (https://github.com) にログイン
2. 右上の「+」ボタンから「New repository」を選択
3. Repository name: `supplier-management-system`
4. Description: `企業向け調達先管理システム - React + TypeScript + Material-UI`
5. Public または Private を選択
6. 「Add a README file」「Add .gitignore」「Choose a license」は **チェックしない**
7. 「Create repository」をクリック

## 2. ローカルリポジトリにリモートを追加
作成されたGitHubリポジトリのURLを使用して以下のコマンドを実行：

```bash
# GitHubリポジトリのURLを追加（URLは実際のものに置き換えてください）
git remote add origin https://github.com/your-username/supplier-management-system.git

# mainブランチに変更（現在はmaster）
git branch -M main

# 初回プッシュ
git push -u origin main
```

## 3. 確認
GitHubのリポジトリページで以下が確認できます：
- ソースコード
- コミット履歴
- README.md（自動生成される）

## プロジェクト構成

```
supplier-management-system/
├── public/                    # 静的ファイル
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.tsx     # ナビゲーションバー
│   │       └── Sidebar.tsx    # サイドバーメニュー
│   ├── pages/
│   │   ├── SupplierMenu.tsx   # メニュー画面
│   │   ├── SupplierSearch.tsx # 検索画面
│   │   ├── SupplierList.tsx   # 一覧画面
│   │   ├── SupplierUpdate.tsx # 更新画面
│   │   └── SupplierApply.tsx  # 申請画面
│   ├── App.tsx               # メインアプリケーション
│   └── index.tsx            # エントリーポイント
├── package.json             # 依存関係
└── README.md               # プロジェクト説明
```

## コミット履歴
1. `Initialize project using Create React App` - CRA初期セットアップ
2. `feat: 調達先管理システムの実装` - 全機能の実装

## 次のステップ
1. GitHub Actions でのCI/CD設定
2. Vercel/Netlify での自動デプロイ
3. 追加機能の開発
