# odawara-intro をリモートに push して Vercel で公開する手順

## 1. GitHub でリポジトリを作成

1. [GitHub](https://github.com/new) で **New repository** を開く
2. **Repository name**: `odawara-intro`（任意の名前でも可）
3. **Public** を選択
4. **Add a README file** は**不要**（ローカルに既にあるため）
5. **Create repository** をクリック
6. 作成後に表示される **リポジトリの URL** を控える  
   例: `https://github.com/あなたのユーザー名/odawara-intro.git`

---

## 2. ローカルでリモートを追加して push

**odawara-intro フォルダ**で、以下を実行してください。

```powershell
cd "c:\Users\ImuraHiroyuki\OneDrive - Globe-ing\odawara-intro"

# リモート追加（以下の URL を 1. で控えた URL に置き換えてください）
git remote add origin https://github.com/あなたのユーザー名/odawara-intro.git

# プッシュ（初回は -u で upstream を設定）
git push -u origin master
```

- ユーザー名・パスワードやトークンの入力を求められた場合は、GitHub の認証情報を入力してください。
- ブランチ名が `main` の場合は: `git push -u origin main`

---

## 3. Vercel で Web 公開

1. [Vercel](https://vercel.com) にログイン
2. **Add New** → **Project**
3. **Import Git Repository** で、今 push した **odawara-intro** リポジトリを選択
4. **Root Directory** はそのまま（未指定）で **Deploy** をクリック
5. デプロイ完了後、表示される URL（例: `https://odawara-intro-xxx.vercel.app`）でサイトが公開されます。

以降は、`odawara-intro` で `git push` するたびに Vercel が自動で再デプロイします。
