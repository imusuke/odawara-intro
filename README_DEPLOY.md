# 諸白小路・南町周辺サイトのデプロイ

このリポジトリ（`odawara-intro`）は静的HTMLサイトです。**単独の Git リポジトリ**として管理しており、このリポジトリのみを公開して Vercel などにデプロイできます。

## Git 連携で Vercel にデプロイしている場合

**このリポジトリを Vercel に接続していれば、push するだけで自動デプロイされます。**  
リポジトリのルートがそのままサイトのルートなので、**Root Directory の指定は不要**です。

- 解説ページ: `https://＜プロジェクト名＞.vercel.app/`
- 全画面地図: `https://＜プロジェクト名＞.vercel.app/map.html`

---

## 初めて Vercel に設定する場合

1. [vercel.com](https://vercel.com) で **Add New** → **Project**
2. **Import Git Repository** で **この odawara-intro リポジトリ**を選択
3. Root Directory はそのまま（未指定）で **Deploy**

---

## その他の方法（Netlify / GitHub Pages）

- **Netlify**: Import from Git でこのリポジトリを選択。Base directory は未指定でよい。
- **GitHub Pages**: このリポジトリの Settings → Pages でブランチを指定し有効化。
