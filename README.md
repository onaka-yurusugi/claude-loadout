# ⚔ Claude Loadout

**Claude Code の設定を、ゲーム風UIで編成して URL で共有しよう。**

Claude Code で使うモデル・MCP サーバー・プラグイン・スキル・CLAUDE.md ルールなどの構成を、ゲームの装備編成画面のように視覚的に組み立て、URL ひとつで誰でもシェアできるプラットフォームです。

<!-- スクリーンショットをここに貼ってください -->
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1bd185f3-68d8-4d19-bec1-5c44b0f6010d" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8a3d815a-9ed2-4a20-a9ed-caa092153ce6" />

## 特徴

- **ゲーム風 UI** — グリッド背景・グロウエフェクト・パーティクルアニメーションなど、武器編成画面のようなタクティカルデザイン
- **7 カテゴリ対応** — Model / MCP Server / Plugin / Skill / CLAUDE.md / Hook / Custom
- **プリセット搭載** — 主要なモデル・MCP サーバー・プラグイン・スキルをワンクリックで追加
- **URL だけで共有** — 編成データを lz-string で圧縮し URL に埋め込み。DB・認証不要
- **OG 画像自動生成** — シェア時に編成内容をプレビューできる SVG 画像を動的生成
- **X（Twitter）シェア** — 編成内容をフォーマットして投稿画面を開く
- **下書き自動保存** — localStorage に自動保存。ブラウザを閉じても安心
- **レスポンシブ** — モバイルからデスクトップまで対応

## 使い方

### 1. 編成を作る

トップページで編成名・シナリオ・著者を入力し、各カテゴリからスロットを選択します。

プリセットから選ぶか、カスタム項目を自由に追加できます。

### 2. URL をシェアする

「COPY URL」ボタンで編成データが埋め込まれた URL をコピー。「SHARE」ボタンで X に直接投稿もできます。

```
https://your-domain.com/s/N4IgDghgTg9gpiAXCAsgQwC4...
```

### 3. 編成を見る

共有 URL を開くと、編成内容が閲覧専用のタクティカル UI で表示されます。

## カテゴリ

| カテゴリ | アイコン | 用途 | プリセット数 |
|---------|---------|------|:----------:|
| Model | 🤖 | Claude モデル選択 | 5 |
| MCP Server | 🌐 | MCP サーバー接続 | 20 |
| Plugin | 🔌 | プラグイン | 20 |
| Skill | ⚡ | スキル（スラッシュコマンド） | 20 |
| CLAUDE.md | 📋 | CLAUDE.md ルール | - |
| Hook | 🪝 | Hook 設定 | - |
| Custom | ✨ | カスタム項目 | - |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | [Bun](https://bun.sh/) |
| Server | [Hono](https://hono.dev/) v4 |
| Client | [React](https://react.dev/) v19 (SPA) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| Build | [Vite](https://vite.dev/) v6 |
| URL 圧縮 | [lz-string](https://github.com/pieroxy/lz-string) |
| Deploy | [Vercel](https://vercel.com/) |

## セットアップ

```bash
# 依存関係のインストール
bun install

# 開発サーバー起動
bun run dev
# → http://localhost:5173

# 本番ビルド
bun run build

# ビルドプレビュー
bun run preview
```

## プロジェクト構成

```
src/
├── index.tsx                  # Hono API（OG 画像エンドポイント）
├── client/
│   ├── main.tsx               # React エントリポイント
│   ├── App.tsx                # クライアントサイドルーティング
│   ├── styles.css             # Tailwind + カスタムアニメーション
│   ├── pages/
│   │   ├── EditorPage.tsx     # 編成エディタ
│   │   └── ViewPage.tsx       # 共有ビュー（閲覧専用）
│   ├── components/
│   │   ├── CategorySection.tsx  # カテゴリ別スロット管理
│   │   ├── FormationHeader.tsx  # 編成メタデータ入力
│   │   ├── ShareBar.tsx         # URL コピー + X シェア
│   │   ├── PresetSelector.tsx   # プリセット選択
│   │   ├── SelectedItems.tsx    # 選択済みスロット表示
│   │   └── CustomItemForm.tsx   # カスタム項目追加
│   ├── hooks/
│   │   └── useFormation.ts    # 状態管理 + localStorage
│   └── lib/
│       ├── types.ts           # 型定義
│       ├── constants.ts       # カテゴリ定数
│       ├── encoding.ts        # lz-string エンコード/デコード
│       └── presets.ts         # プリセットデータ
└── server/
    └── og.tsx                 # OG 画像 SVG 生成
```

## デプロイ

Vercel にデプロイする場合:

```bash
# Vercel CLI でデプロイ
vercel
```

`vercel.json` で SPA リライトが設定済みです。

## データフロー

```
[Editor UI]
    ↓ JSON
    ↓ lz-string 圧縮
    ↓ Base64URL エンコード
    ↓
  URL パラメータ (/s/:encoded)
    ↓
    ↓ Base64URL デコード
    ↓ lz-string 展開
    ↓ JSON パース
    ↓
[View UI]
```

全データが URL に含まれるため、バックエンド DB は不要です。

## License

MIT
