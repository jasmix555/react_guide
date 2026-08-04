# React PDF ガイド（日本語）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** JavaScript 初学者向けの in-depth な日本語 React ガイドを、TypeScript ベース・EC ストアフロントを走る例として、印刷して PDF 化できる 1 枚の自己完結 HTML として作る。

**Architecture:** 章ごとに Markdown で執筆 → 最終的に 1 枚のスタイル付き HTML（印刷用 CSS 込み）へ結合。ブラウザの「PDF として保存」で確実に PDF 化できることを一次経路とし、自動レンダリング（`pdf` スキル）が使えれば併用。コード例（特に capstone の EC）は実際にビルドが通る本物のコードを検証してから本文へ載せる。

**Tech Stack:** Markdown 執筆 / 自己完結 HTML + print CSS / 検証用の Vite+React+TS 一時プロジェクト（capstone のみ）/ 任意で anthropic-skills:pdf。

## Global Constraints

- 本文は**日本語**。コードは英語、コメントは日本語可。
- コードは**すべて TypeScript (.tsx/.ts)**。各型注釈は「なぜ・どう効くか」を必ず説明。
- 公式 react.dev が十分説明している事柄は重複させない。深掘りは公式へリンク。
- 走る例は**クライアント完結の EC ストアフロント＋カート**（バックエンド・決済なし）。
- SCSS は**文法を教えない**。React への組み込み方と `.module.scss` 単位配置の規約に限定。
- 最終成果物は**自己完結 HTML 1 枚**（外部 CDN 依存なしで印刷可能）。
- 制作物の配置: **独立リポジトリ `C:/xampp/htdocs/github/learning/react-guide/`**（site とは分離）。以下のパスは全てこのリポジトリ root からの相対（`chapters/*.md`、`react-guide.html`、検証用 `ec-verify/`）。納品コピーは `Downloads/` へ。

---

## File Structure

- `guide/chapters/00-intro.md` 〜 `12-next.md` — 章ごとの原稿（Markdown）。
- `guide/assets/style.css` — 印刷用スタイル（作業用。最終 HTML には inline 化）。
- `guide/build.mjs` — Markdown 群 + style を結合し `react-guide.html` を吐く zero-dep Node スクリプト（Node 組み込みのみ、外部依存なし）。
- `guide/react-guide.html` — 最終成果物（自己完結）。
- `guide/ec-verify/` — capstone EC の実コード検証用 Vite+React+TS プロジェクト（本文へ載せる前にビルド確認）。

> `// ponytail: 章は素の Markdown、変換は Node 標準 API だけの小スクリプト。marked 等の依存は入れない。崩れるほど凝った Markdown は書かない。`

---

## Task 1: HTML/ビルド土台と印刷 CSS

**Files:**
- Create: `guide/build.mjs`, `guide/assets/style.css`, `guide/chapters/00-intro.md`

**Interfaces:**
- Produces: `node guide/build.mjs` が `guide/chapters/*.md`（ファイル名昇順）を結合し、`assets/style.css` を `<style>` として inline した `guide/react-guide.html` を生成する。見出し `#`〜`###`、段落、箇条書き、コードフェンス ```` ```tsx ````、`> NOTE` 引用、表を、依存ライブラリなしの最小変換でカバーする。

- [ ] **Step 1: 最小 Markdown→HTML 変換を build.mjs に実装**（見出し/段落/リスト/コードフェンス/引用/表 + HTML エスケープ、Node 標準のみ）
- [ ] **Step 2: 印刷 CSS を書く** — A4 `@page` 余白、`pre code` の等幅・折返し・淡い枠、`h1`/`h2` の改ページ制御（`break-before`/`break-inside: avoid`）、目次、`> NOTE`/`> TIP` の囲み、本文は日本語可読フォント（`system-ui, "Hiragino Kaku Gothic ProN", "Noto Sans JP", Meiryo, sans-serif`）。
- [ ] **Step 3: 00-intro.md を執筆**（表紙・本ガイドの使い方・対象読者・「UI = f(state)」・目次）。
- [ ] **Step 4: ビルドして目視確認** — `node guide/build.mjs` 実行 → `guide/react-guide.html` をブラウザで開く（Claude Browser で `file://` を開いて読める）→ 印刷プレビューでページ分割とコード表示が崩れないこと。
- [ ] **Step 5: Commit** — `git add guide/build.mjs guide/assets/style.css guide/chapters/00-intro.md guide/react-guide.html && git commit -m "guide: build scaffold + print CSS + intro"`

Verify: `node guide/build.mjs` が非ゼロ終了しない／`react-guide.html` が生成され、コードフェンスが等幅ブロックとして表示される。

---

## Task 2: 基礎章（セットアップ・構成・SCSS・コンポーネント/props）

**Files:**
- Create: `guide/chapters/01-setup.md`, `02-structure.md`, `03-scss.md`, `04-components-props.md`

- [ ] **Step 1: 01-setup.md** — React の考え方（短く、深掘りは react.dev へリンク）／`npm create vite@latest my-shop -- --template react-ts`／生成物の各ファイル役割／`npm run dev|build|preview`。
- [ ] **Step 2: 02-structure.md** — `components/ pages/ types/ data/ hooks/` の役割と理由／バレルファイル／`@/` エイリアス（`vite.config.ts` と `tsconfig` 両方）。
- [ ] **Step 3: 03-scss.md** — `npm i -D sass`／グローバル vs モジュール／**`.module.scss` をコンポーネント/ページ単位に置く規約**（`Button.tsx` + `Button.module.scss` の対）／`import styles from './Button.module.scss'` と `className={styles.root}`／変数・mixin の `@use` 共有／Tailwind を選ぶ場面（数行）。
- [ ] **Step 4: 04-components-props.md** — 関数コンポーネント／JSX の要点／props を `type Props = {...}` で型付け（**なぜ interface でなく type か等の判断も一言**）／`children: React.ReactNode`／任意 props `?`／分割代入。EC の `ProductCard` を題材に。
- [ ] **Step 5: ビルド＆目視確認**（Task 1 の verify と同じ）。
- [ ] **Step 6: Commit** — `git commit -am "guide: setup, structure, scss, components chapters"`

---

## Task 3: 状態・イベント・リスト章（useState / forms / lists）

**Files:**
- Create: `guide/chapters/05-usestate.md`, `06-events-forms.md`, `07-lists-conditional.md`

- [ ] **Step 1: 05-usestate.md** — `const [n, setN] = useState<number>(0)`／**更新関数形式** `setN(prev => prev+1)` と直接値の違い／**遅延初期化** `useState(() => heavy())`／配列・オブジェクトの**不変更新**（スプレッド、`map`/`filter`）／状態の型付け／「状態を分割 vs まとめる」判断／落とし穴（古い値・直接変更）。EC の「カート個数」を例に。
- [ ] **Step 2: 06-events-forms.md** — `onClick={(e: React.MouseEvent<HTMLButtonElement>) => …}`／`onChange` と `React.ChangeEvent<HTMLInputElement>`／controlled input（value+onChange）／`onSubmit` と `preventDefault`。EC の検索ボックスを例に。
- [ ] **Step 3: 07-lists-conditional.md** — `array.map` で JSX 配列／**key の意味と index を避ける理由**／`&&`・三項・早期 return による条件付き表示。EC の商品グリッドを例に。
- [ ] **Step 4: ビルド＆目視確認。**
- [ ] **Step 5: Commit** — `git commit -am "guide: usestate, events/forms, lists chapters"`

---

## Task 4: useEffect と他のコアフック章

**Files:**
- Create: `guide/chapters/08-useeffect.md`, `09-other-hooks.md`

- [ ] **Step 1: 08-useeffect.md** — 役割（外界との同期）／**依存配列**（なし/空/依存あり の 3 挙動）／**クリーンアップ**（購読・タイマー・fetch 中断）／fetch パターン（loading/error/data）と `AbortController`／よくある罠（依存漏れ、無限ループ、`useEffect` でやるべきでない事）。
- [ ] **Step 2: 09-other-hooks.md** — `useRef`（DOM 参照 & 再レンダーしない値）／`useContext`（prop バケツリレー回避、EC カートの下地）／`useReducer`（複雑な状態遷移、`useState` との使い分け）／`useMemo`・`useCallback`（**まず計測、乱用しない**）／**カスタムフック**（`useLocalStorage` を実装例に、ロジック再利用）。各々「いつ・なぜ」。
- [ ] **Step 3: ビルド＆目視確認。**
- [ ] **Step 4: Commit** — `git commit -am "guide: useEffect + other hooks chapters"`

---

## Task 5: ルーティング章

**Files:**
- Create: `guide/chapters/10-routing.md`

- [ ] **Step 1: 10-routing.md** — `npm i react-router-dom`／`<BrowserRouter>` で包む／`<Routes>`/`<Route>`／**`Link` vs `<a>`**（全ページ再読込を避ける理由）／`NavLink` と active スタイル／`useParams` でルートパラメータ（`/product/:id`）／ネストルートと `<Outlet>`（共有レイアウト）／`useNavigate`。EC の「一覧→詳細」遷移を例に。
- [ ] **Step 2: ビルド＆目視確認。**
- [ ] **Step 3: Commit** — `git commit -am "guide: routing chapter"`

---

## Task 6: capstone EC の実コードを検証（本文へ載せる前）

**Files:**
- Create: `guide/ec-verify/`（`npm create vite@latest ec-verify -- --template react-ts` 相当）＋ EC 実装一式（types/product, data/products, components/ProductCard・CartProvider(context+reducer), pages/Catalog・ProductDetail・Cart, ルーティング）。

- [ ] **Step 1: EC を実装** — 商品グリッド → 詳細（`useParams`）→ 検索/絞り込み（useState + derived）→ カート（context + reducer で add/remove/数量/合計）。SCSS module でスタイル（ガイドの規約を実演）。
- [ ] **Step 2: ビルド検証（この計画の中核チェック）** — `cd guide/ec-verify && npm install && npm run build`。**Expected: 型チェック + ビルドが成功（exit 0）**。失敗したらコードを直してから本文へ。
- [ ] **Step 3: Commit** — `git add guide/ec-verify && git commit -m "guide: verified runnable EC capstone project"`（`node_modules`/`dist` は `.gitignore`）

Verify: `npm run build` が exit 0。これが「本に載せるコードが実際に動く」ことの唯一の runnable check。

---

## Task 7: capstone 章 + 間違い集 + 次の一歩、最終結合と PDF 化

**Files:**
- Create: `guide/chapters/11-capstone.md`, `12-mistakes-next.md`
- Modify: `guide/react-guide.html`（再ビルド）

- [ ] **Step 1: 11-capstone.md** — Task 6 で**ビルド確認済みの実コードをそのまま**引用し、グリッド→詳細→検索→カートを段階的に解説（各 phase で何を・なぜ）。
- [ ] **Step 2: 12-mistakes-next.md** — よくある間違い（key に index、useEffect 依存漏れ、状態の直接変更、過剰な useMemo 等）と直し方／次に学ぶこと（データ取得ライブラリ、テスト、フォームライブラリ等へリンク）。
- [ ] **Step 3: 最終ビルド** — `node guide/build.mjs` → `guide/react-guide.html` を Claude Browser で開き、全章通し・目次リンク・コード表示・改ページを確認。
- [ ] **Step 4: PDF 化** — まず anthropic-skills:pdf での自動レンダリングを試行。使えなければ、`react-guide.html` を「印刷 → PDF として保存」する手順を明記して自己完結 HTML を一次成果物として納品（`Downloads/react-for-beginners-v2.pdf` もしくは HTML）。
- [ ] **Step 5: Commit** — `git commit -am "guide: capstone + mistakes/next, final build"`

Verify: 最終 HTML が全 13 章を含み、ブラウザ印刷プレビューで崩れなく PDF 化できる。

---

## Self-Review

- **Spec coverage:** セットアップ✓(T2) 構成✓(T2) SCSS/`.module.scss`✓(T2) props/TS✓(T2) useState 深掘り✓(T3) events/forms✓(T3) lists/keys/conditional✓(T3) useEffect 深掘り✓(T4) useRef/useContext/useReducer/useMemo/useCallback/カスタムフック✓(T4) ルーティング/Link✓(T5) EC capstone✓(T6,T7) 間違い/次✓(T7) 日本語✓ TS+理由説明✓ 自己完結HTML✓(T1,T7)。ギャップなし。
- **Placeholder scan:** TODO/TBD なし（各章に具体トピックを明記）。
- **Type consistency:** capstone のコードは T6 で実プロジェクトとしてビルド検証し、その検証済みコードを T7 で引用するため本文とコードの不整合が起きない。

## スコープ外（この計画では扱わない）
- react-touch サイトの改修・多言語対応 → 別計画（PDF 完成後に作成）。
