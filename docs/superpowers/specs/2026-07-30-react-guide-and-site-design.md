# React 総合ガイド（PDF）＋ react-touch サイト改修 — 設計書

_日付: 2026-07-30 · ブランチ: `add-react-touch`_

> **更新 2026-07-30:** 方針転換。サイト改修を一旦中止し PDF ガイドに一本化。実体は独立リポジトリ `react-guide/`（納品済み PDF あり）。
>
> **更新 2026-08-03（現行方針）:** 再転換。**`react-touch` を react.dev 型のドキュメントサイトへ全面書き換え**し、これを唯一の成果物とする（PDF ではなくインタラクティブなガイドサイト）。詳細仕様はユーザーの Phase プロンプト群が正（このファイルの以下の記述より優先）。要点:
> - スタック: React 19 + TS + Vite 8 + **react-router 7（createBrowserRouter）** + **MDX**（`@mdx-js/rollup`）+ **SCSS Modules**（Tailwind は不採用）+ **Shiki**（rehype-pretty-code, ビルド時）+ **Fuse.js**（見出し単位検索）+ **motion**。ESLint/Prettier/husky/lint-staged/commitlint（husky は親リポジトリを触らないため設定のみ・自動有効化なし）。
> - デザイン: Phase 1 承認済みトークン（アクセント=インディゴ #4F46E5、Zen Kaku Gothic New + Noto Sans JP + JetBrains Mono、ライト/ダーク対等、コードブロックが主役、「うちの標準」決定カードがシグネチャー）。
> - ナビ 3 階層（Part → ページ → h2）。h2 は明示的 `{#英字slug}` 必須（`lint:content` で強制、`content-plugin.mjs` が抽出）。ページ追加は `.mdx` 作成 + `config/navigation.ts` に 1 行。
> - 読者は「JS も不慣れ」前提に再設定。新 Part 1「React の前に必要な JavaScript」、`<JsNote>`、進行的開示 `<Deeper>`、練習問題。
> - Phase 0（監査）・Phase 1（トークン）承認済み。Phase 2（シェル + クローム一式 + 例示 4 ページ）完了、lint/lint:content/tsc/build すべてグリーン。次は声（voice）チェックポイント。
>
> 以下の旧記述（成果物1=PDF / 成果物2=旧サイト案）は履歴として残す。

二つの独立した成果物を扱う。**(1) 日本語の in-depth React PDF ガイド**、**(2) `react-touch` 学習サイトの「より対話的に」改修（多言語対応）**。互いに内容をミラーする必要はない（ユーザー確定事項）。

推奨シーケンス: **PDF を先に完成 → その後サイト改修**（ユーザーが PDF をレビューしている間にサイトへ移る）。両者は独立なので並行も可能だが、片方ずつの方が中途半端を避けられる。

---

## 成果物 1: PDF ガイド（日本語）

### 目的・読者
JavaScript を少し触った程度の初学者。最終目標は「AI 頼みでなく自分でコンポーネントを書ける」こと。**公式 react.dev が既にうまく説明している内容は重複させず**、公式が手取り足取り教えてくれない「実務のつなぎ目」を深く扱う。

### 方針
- 言語: **本文は日本語**。コードは英語のまま、コメントは日本語可。
- **TypeScript で統一**。ただし各型注釈について「なぜ・どう効くか」を都度深く説明する（型を丸暗記させない）。
- 走る例（背骨）: **クライアント完結の EC ストアフロント＋カート**（商品グリッド → 詳細 → 検索/絞り込み → カート add/remove/数量/合計）。バックエンド・決済なし。
- SCSS 自体の文法は説明しない（読者は既知）。**React への組み込み方**と **`.module.scss` をページ/コンポーネント単位で置く構成**に絞る。
- 各 React 関数/フックは「構文」だけでなく「使う場面・複数の書き方・落とし穴」まで。

### 章立て
1. **セットアップと考え方** — React とは（短く、深掘りは react.dev へ）／`npm create vite@latest`（React-TS）／各ファイルの役割／dev・build・preview。
2. **スケールする構成** — `components/` `pages/` `types/` `data/` `hooks/` の役割と理由／バレルファイル／`@/` パスエイリアス。
3. **React で SCSS** — `sass` 導入／グローバル vs モジュール／**`.module.scss` をコンポーネント/ページ単位に置く規約**／命名／変数・mixin の共有／Tailwind を選ぶ場面（短く）。
4. **コンポーネント・JSX・props** — TS で props を型付け／`children`／任意 props／注釈の意味。
5. **状態: `useState` を深く** — 更新関数形式／遅延初期化／配列・オブジェクトの不変更新／状態の型付け／落とし穴。
6. **イベントと制御フォーム** — イベントの型付け／controlled input。
7. **リスト・key・条件付きレンダリング。**
8. **`useEffect` を深く** — 依存配列／クリーンアップ／fetch パターン／罠。
9. **その他のコアフック** — `useRef` `useContext` `useReducer` `useMemo`/`useCallback`／**カスタムフック**。各々「いつ・なぜ」。
10. **React Router によるルーティング** — `Link` vs `<a>`／`NavLink`／ルートパラメータ／ネスト & `Outlet`。
11. **総仕上げ: EC ストアフロント＋カート** — グリッド → 詳細 → 検索/絞り込み → カート（context 経由で add/remove/数量/合計）を端から端まで。
12. **よくある間違い＋次に学ぶこと。**

目安: 約 30–45 ページ相当。

### 制作方法（実機制約あり）
このマシンには `poppler` が無く Python も不安定。よって: **1 枚のスタイル付き HTML として執筆 → PDF へレンダリング**（`pdf` スキル / ヘッドレス印刷）。レンダリングが不調なら**印刷対応 HTML を渡してブラウザで「PDF として保存」**をフォールバックにする。コードのハイライトが崩れない形式を優先（純 Markdown は不採用）。

---

## 成果物 2: react-touch サイト改修

### 現状
Vite + React 19 + TypeScript + **Tailwind v4** + React Router 7 の対話型レッスン集（useState 〜 forms、買い物 capstone）。README のレッスンは一部未完（props/map/useEffect/useRef/lifting/fetching/forms、capstone 各 phase）。

### 方針（スタック維持）
- **Tailwind と TypeScript を維持**（移行しない）。
- 「**説明過多を減らし、手を動かす量を増やす**」: 長い解説の壁は「1 行要約 ＋ 📖 react.dev へのリンク」に置き換え、`Sandbox` の `// 👉 TODO` 足場を中心に。
- **EC の capstone を主役**に据え、README で未完のレッスンと capstone 各 phase を仕上げる。
- フレームワーク変更・SCSS 移行はしない。

### 多言語対応（新規）
- 既定言語セット: **日本語 + 英語（JA / EN）**、後から追加可能な形。
- 方式（ponytail 判断）: **React Context + JSON 辞書（依存追加なし）**。UI 文字列（ナビ、レッスン見出し、短い要約、操作指示、ボタン等）は小さいので数十行で足りる。プロ仕様の言語検出・複数形・補間が要るほど育ったら **react-i18next へ差し替え**（アップグレード経路）。
  - `// ponytail: 軽量Context辞書。文字列量が増えたら react-i18next へ`
- 言語切替 UI をナビに追加（ThemeToggle の隣）。選択は localStorage に保持。
- 翻訳対象は「トリム後の短い文字列」。長大なレッスン本文は元々削るので翻訳負荷は小さい。

---

## スコープ外（YAGNI）
- バックエンド・決済・実 API。
- サイトの SCSS 移行 / Tailwind 撤去。
- PDF とサイトの内容一致（別物で良い）。
- react-i18next の初期導入（辞書が小さいうちは不要）。
- JA/EN 以外の言語（要望があれば追加）。

## 未確定・既定で進める点
- サイト言語は JA + EN を既定とする（変更希望あれば対応）。
- PDF の最終ファイル名・配置は制作時に決定（既定: `Downloads/` へ納品）。
