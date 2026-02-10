# SOW: Claude Loadout - Claude Code 編成共有プラットフォーム

## 概要

Claude Code の設定（モデル、プラグイン、スキル、CLAUDE.md ルール、MCP サーバー、Hook など）を、グランブルーファンタジーの武器編成画面のようなゲームチック UI で視覚的に構成し、URL だけで共有できるプラットフォーム。DB・認証なしの MVP。

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun |
| Server | Hono（API エンドポイントのみ） |
| Client | React 19（SPA） |
| Styling | Tailwind CSS v4（`@tailwindcss/vite`） |
| Build | Vite + `@hono/vite-dev-server` |
| OG Image | SVG 動的生成（Hono API） |
| URL 圧縮 | `lz-string`（`compressToEncodedURIComponent`） |
| Deploy | Vercel（静的 SPA + リライト） |

## データフロー

```
[Editor UI] → JSON → lz-string 圧縮 → base64url → URL パラメータ (/s/:encoded)
URL パラメータ → base64url decode → lz-string 展開 → JSON → [View UI]
```

- 編成データは URL に圧縮エンコードして埋め込む
- ローカルストレージに下書き自動保存
- OG 画像は SVG で動的生成

## データモデル

```typescript
type SlotCategory = "model" | "plugin" | "skill" | "claude-md" | "mcp-server" | "hook" | "custom";
type Rarity = "common" | "rare" | "epic" | "legendary";

type Slot = {
  id: string;
  name: string;
  category: SlotCategory;
  description: string;
  rarity: Rarity;
};

type Formation = {
  title: string;
  description: string;
  author: string;
  scenario: string;  // e.g., "Next.js小規模サービス", "TypeScript CLI"
  slots: Slot[];     // 最大10枠
  v: 1;              // スキーマバージョン（URL互換性のため）
};
```

### カテゴリ定義

| カテゴリ | アイコン | 用途 |
|---------|---------|------|
| model | 🤖 | Claude モデル選択 |
| plugin | 🔌 | プラグイン |
| skill | ⚡ | スキル（スラッシュコマンド） |
| claude-md | 📋 | CLAUDE.md ルール |
| mcp-server | 🌐 | MCP サーバー |
| hook | 🪝 | Hook 設定 |
| custom | ✨ | カスタム項目 |

### レアリティ定義

| レアリティ | 星数 | 枠色 | エフェクト |
|-----------|------|------|-----------|
| Common | ★☆☆☆ | グレー | なし |
| Rare | ★★☆☆ | 青 | 微光（静的シャドウ） |
| Epic | ★★★☆ | 紫 | グロウアニメーション |
| Legendary | ★★★★ | 金 | グロウ + パルスアニメーション |

## Routes

| Route | 種別 | 用途 |
|-------|------|------|
| `GET /` | Client (SPA) | エディタ画面（新規作成） |
| `GET /s/:encoded` | Client (SPA) | 共有ビュー（閲覧専用） |
| `GET /api/og/:encoded` | Server (Hono) | OG 画像生成（SVG） |

## プロジェクト構造

```
claude-loadout/
├── docs/
│   └── feat/
│       └── 20260210_claude-loadout.md  # 本ファイル
├── src/
│   ├── index.tsx                  # Hono API（OG 画像エンドポイント）
│   ├── vite-env.d.ts              # Vite 型定義
│   ├── client/
│   │   ├── main.tsx               # React エントリポイント
│   │   ├── App.tsx                # クライアントサイドルーティング
│   │   ├── styles.css             # Tailwind + カスタムアニメーション
│   │   ├── pages/
│   │   │   ├── EditorPage.tsx     # 編成エディタ
│   │   │   └── ViewPage.tsx       # 共有ビュー（閲覧専用）
│   │   ├── components/
│   │   │   ├── SlotGrid.tsx       # 10 スロットグリッド（5×2）
│   │   │   ├── SlotCard.tsx       # 個別スロットカード（レアリティグロウ付き）
│   │   │   ├── SlotModal.tsx      # スロット編集モーダル
│   │   │   ├── FormationHeader.tsx # タイトル・シナリオ・著者入力
│   │   │   ├── ShareBar.tsx       # URL コピー + X シェアボタン
│   │   │   └── EmptySlot.tsx      # 空スロット（+ パルスアニメーション）
│   │   ├── hooks/
│   │   │   └── useFormation.ts    # useReducer 状態管理 + localStorage 下書き
│   │   └── lib/
│   │       ├── types.ts           # 型定義（Formation, Slot, etc.）
│   │       ├── encoding.ts        # lz-string エンコード/デコード + URL 生成
│   │       └── constants.ts       # カテゴリ・レアリティ定数
│   └── server/
│       └── og.tsx                 # OG 画像 SVG 生成
├── public/                        # 静的アセット
├── index.html                     # Vite SPA エントリ HTML
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

## 機能詳細

### エディタ画面 (`/`)

- **FormationHeader**: 編成名・シナリオ・著者・説明を入力
- **SlotGrid**: 5×2 のグリッドで最大 10 スロットを配置
  - 登録済みスロット → `SlotCard` で表示（クリックで編集モーダル）
  - 空きスロット → `EmptySlot`（クリックで追加モーダル）
- **SlotModal**: カテゴリ選択（7 種）、名前、説明、レアリティ選択（4 段階）、プレビュー付き
- **ShareBar**: 編成を lz-string 圧縮して URL 生成
  - 「URL をコピー」: クリップボードにコピー
  - 「X でシェア」: Twitter Intent URL で投稿画面を開く
- **自動下書き保存**: `useEffect` で `localStorage` に保存

### 共有ビュー (`/s/:encoded`)

- URL の `:encoded` パラメータを lz-string でデコード
- 編成データを閲覧専用で表示（編集不可）
- 「自分の編成を作成する」リンク、「URL をコピー」ボタン
- デコード失敗時はエラー画面を表示

### OG 画像 (`/api/og/:encoded`)

- Hono API エンドポイント
- `:encoded` から編成データをデコードし、SVG を動的生成
- 1200×630px のカード風レイアウト
  - 編成名、シナリオ、スロット数
  - 各スロットのアイコン・名前・レアリティ星を表示
- `Cache-Control: public, max-age=86400` でキャッシュ

### UI デザイン

- **ダークテーマ**: 黒/濃紺ベース（`#0a0e1a` / `#111827`）
- **ゲーム風フォント**: Orbitron（見出し用）
- **レアリティ別グロウエフェクト**: CSS アニメーション
- **スロットカードホバー**: `translateY(-2px)` + シャドウ
- **空スロットパルス**: 2s ease-in-out infinite

### 状態管理

`useReducer` による一方向データフロー:

| Action | 用途 |
|--------|------|
| `SET_TITLE` | 編成名変更 |
| `SET_DESCRIPTION` | 説明変更 |
| `SET_AUTHOR` | 著者変更 |
| `SET_SCENARIO` | シナリオ変更 |
| `ADD_SLOT` | スロット追加（最大 10） |
| `UPDATE_SLOT` | スロット編集 |
| `REMOVE_SLOT` | スロット削除 |
| `REORDER_SLOTS` | スロット並べ替え |
| `LOAD` | 編成データ一括ロード |

## Twitter シェア形式

```
⚔ {編成名}
🎯 {シナリオ}
・{スロット1}
・{スロット2}
...

#ClaudeLoadout
```

## Verification

1. `bun run dev` → `http://localhost:5173` でエディタ画面表示
2. スロットをクリック → モーダルでカテゴリ・名前・説明・レアリティを入力
3. 編成名・シナリオ・著者を入力
4. 「URL をコピー」→ 別タブで開く → 同じ編成が閲覧モードで表示される
5. 「X でシェア」→ Twitter の投稿画面が正しいテキスト + URL で開く
6. `/api/og/:encoded` → 編成のプレビュー SVG 画像が生成される
7. `bun run build` → ビルド成功
8. `bunx tsc --noEmit` → 型エラーゼロ
