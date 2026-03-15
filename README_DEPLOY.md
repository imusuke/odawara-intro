# 諸白小路・南町周辺サイトのデプロイ

このフォルダ（`odawara-intro`）は静的HTMLサイトです。親リポジトリ（例: markdown_v2）の一部として管理されています。

## Git 連携で Vercel にデプロイしている場合

**接続リポジトリが「odawara-intro をフォルダとして含むリポジトリ」であれば、push するだけで自動デプロイされます。**  
Vercel の **Root Directory** に `odawara-intro` を指定していれば追加の操作は不要です。

- 解説ページ: `https://＜プロジェクト名＞.vercel.app/`
- 全画面地図: `https://＜プロジェクト名＞.vercel.app/map.html`

### 以前「odawara-intro 単体のリポジトリ」で Vercel に接続していた場合（要・変更）

odawara-intro を親リポジトリの通常フォルダに統合したため、**Vercel 側の設定変更が必要**です。

1. [Vercel ダッシュボード](https://vercel.com/dashboard)で該当プロジェクトを開く
2. **Settings** → **Git** で、接続リポジトリを **odawara-intro をフォルダとして含むリポジトリ**（例: markdown_v2）に変更する  
   - または、**Add New** → **Project** でそのリポジトリを新規インポート
3. **Root Directory** を `odawara-intro` のまま（または設定して）保存
4. 必要なら **Redeploy** で再デプロイ

これ以降は、親リポジトリへ push すると Vercel が自動でデプロイします。

---

## 初めて Vercel に設定する場合

1. [vercel.com](https://vercel.com) で **Add New** → **Project**
2. **Import Git Repository** で **odawara-intro をフォルダとして含むリポジトリ**を選択
3. **Root Directory** で **Edit** し、`odawara-intro` を指定して **Continue** → **Deploy**

---

## その他の方法（Netlify / GitHub Pages）

- **Netlify**: Add new site → Deploy manually で `odawara-intro` フォルダをドラッグ＆ドロップ、または Import from Git で **Base directory** を `odawara-intro` に設定
- **GitHub Pages**: リポジトリの Settings → Pages でブランチを指定。`odawara-intro` だけを公開したい場合は、公開用ブランチにこのフォルダの内容を配置するか、このフォルダをルートにした専用リポジトリで Pages を有効化
