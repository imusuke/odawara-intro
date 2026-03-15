# 諸白小路サイトのファイル構成

メンテナンス性・可読性のため、従来の単一 `index.html` を次のように分割しています。

## ディレクトリ構成

```
odawara-intro/
├── index.html       # メインの解説ページ（HTML のみ・約800行）
├── map.html         # 地図全画面表示用ラッパー
├── css/
│   └── style.css    # サイト全体のスタイル（約980行）
├── js/
│   └── main.js      # 地図・スポット・ツールチップ等のロジック（約540行）
├── README_DEPLOY.md
├── SETUP_REMOTE_AND_VERCEL.md
└── STRUCTURE.md     # 本ファイル
```

## 役割

| ファイル | 役割 |
|----------|------|
| **index.html** | 文書構造・ナビ・本文。インラインは「全画面地図」用の1行スクリプトのみ。 |
| **css/style.css** | テーマ変数・レイアウト・タイムライン・地図まわり・印刷用スタイル。 |
| **js/main.js** | Leaflet 地図の初期化、スポット・道路データ、ツールチップ、レイヤー切替。 |

## 編集の目安

- **見た目を変える** → `css/style.css`
- **地図の挙動・スポット・道路を変える** → `js/main.js`
- **テキスト・セクションを変える** → `index.html`

## 注意

- `index.html` は `css/style.css` と `js/main.js` を相対パスで参照しています。Vercel 等でルートにデプロイする場合はそのままで問題ありません。
- `map.html` は `index.html?fullscreen=1#map-spots` を iframe で表示しているため、今回の分割の影響はありません。
