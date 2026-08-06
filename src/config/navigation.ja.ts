import type { AuthoredTab } from '@/types/nav'

// ─────────────────────────────────────────────────────────────
// Single source of truth for sidebar ORDER + labels.
//
// Routes are de-numbered (`javascript/destructuring`, not `1-javascript/...`) so
// renumbering a part never breaks a URL or an internal link — ordering lives
// ONLY here, via array position + the `no` shown in the sidebar.
//
// Add a page = create src/content/<route>.mdx, then add one line below. h2
// sections (L3) and frontmatter fill in automatically at build time.
//
// ORDER = learn React first, recommend tooling/libraries last. Core parts are
// numbered (`no`) in reading order; the end "おすすめ・発展" recommendation
// sections OMIT `no` so they read as named recommendations, not curriculum steps.
// Only parts with written pages appear. Empty tabs are hidden until they have content.
// ─────────────────────────────────────────────────────────────
export const navigation: AuthoredTab[] = [
  {
    id: 'learn',
    title: '学ぶ',
    basePath: '/guide',
    parts: [
      {
        id: 'setup',
        no: 1,
        title: '環境構築とプロジェクトを作る',
        items: [
          { route: 'setup/goal', title: 'このパートのゴール' },
          { route: 'setup/node-npm-npx', title: 'Node.js / npm / npx とは' },
          { route: 'setup/terminal', title: 'ターミナルの開き方' },
          { route: 'setup/check-node', title: '入っているか確認する' },
          { route: 'setup/install-node', title: '入っていない場合（インストール）' },
          { route: 'setup/why-vite', title: 'なぜ Vite なのか' },
          { route: 'setup/create-vite', title: 'npm create vite を実行する' },
          { route: 'setup/project-name', title: '選択肢①：プロジェクト名とフレームワーク' },
          { route: 'setup/variants', title: '選択肢②：バリアントを全部説明する' },
          { route: 'setup/react-compiler', title: 'React Compiler とは' },
          { route: 'setup/typescript-intro', title: 'TypeScript とは（ここでは軽く）' },
          { route: 'setup/vite-vs-next', title: 'create-next-app の選択肢との違い' },
          { route: 'setup/open-vscode', title: 'VS Code で開く' },
          { route: 'setup/npm-install', title: 'npm install は何をしているのか' },
          { route: 'setup/npm-run-dev', title: 'npm run dev で起動する' },
          { route: 'setup/generated-files', title: '生成ファイルを1つずつ読む' },
          { route: 'setup/first-edit', title: '初めての編集（HMR）' },
          { route: 'setup/blank-slate', title: 'デフォルトを全部消して白紙にする' },
          { route: 'setup/path-alias', title: 'パスエイリアス @/ で相対パスを短くする' },
          { route: 'setup/vscode-settings', title: 'VS Code の設定' },
          { route: 'setup/troubleshooting', title: 'うまくいかないとき' },
          { route: 'setup/summary', title: 'まとめと練習問題' },
        ],
      },
      {
        id: 'javascript',
        no: 2,
        title: 'React の前に必要な JavaScript',
        items: [
          { route: 'javascript/const-let', title: 'const と let' },
          { route: 'javascript/values-and-types', title: '値と型' },
          { route: 'javascript/objects-arrays', title: 'オブジェクトと配列の基本' },
          { route: 'javascript/arrow-functions', title: 'アロー関数' },
          { route: 'javascript/template-literals', title: 'テンプレートリテラル' },
          { route: 'javascript/strings', title: '文字列の操作' },
          { route: 'javascript/destructuring', title: '分割代入' },
          { route: 'javascript/spread-rest', title: 'スプレッドと rest' },
          { route: 'javascript/array-methods', title: 'map / filter / find' },
          { route: 'javascript/loops', title: '繰り返し' },
          { route: 'javascript/truthy-falsy', title: 'truthy と falsy' },
          { route: 'javascript/equality', title: '等価（=== と ==）' },
          { route: 'javascript/ternary-short-circuit', title: '三項演算子と短絡評価' },
          { route: 'javascript/optional-chaining', title: '?. と ??' },
          { route: 'javascript/symbols', title: '記号の読み方（! !! % ===）' },
          { route: 'javascript/functions-as-values', title: '関数を値として渡す' },
          { route: 'javascript/reference-vs-copy', title: '参照とコピー' },
          { route: 'javascript/import-export', title: 'import と export' },
          { route: 'javascript/json', title: 'JSON' },
          { route: 'javascript/promise-async-await', title: 'Promise と async / await' },
          { route: 'javascript/not-yet', title: '今は知らなくていいもの' },
        ],
      },
      {
        id: 'components',
        no: 3,
        title: 'はじめての React',
        items: [
          { route: 'components/goal', title: 'このパートのゴール' },
          { route: 'components/jsx', title: 'JSX：HTML に見える JavaScript' },
          { route: 'components/first-component', title: '初めてのコンポーネントを作る' },
          { route: 'components/props', title: 'props で値を受け取る' },
          { route: 'components/rendering-lists', title: '一覧を map で表示する' },
          { route: 'components/conditional', title: '条件で表示を出し分ける' },
          { route: 'components/events', title: 'クリックに反応する（イベント）' },
          { route: 'components/button-variants', title: 'variant で再利用する' },
          { route: 'components/summary', title: 'まとめと練習' },
        ],
      },
      {
        id: 'state',
        no: 4,
        title: 'state と hooks',
        items: [
          { route: 'state/goal', title: 'このパートのゴール' },
          {
            group: 'useState',
            pages: [
              { route: 'state/use-state/what-is-state', title: 'state とは何か' },
              { route: 'state/use-state/basics', title: 'useState の基本' },
              { route: 'state/use-state/events', title: 'イベントで state を変える' },
              {
                route: 'state/use-state/updating-objects',
                title: 'オブジェクトの state を更新する',
              },
              {
                route: 'state/use-state/updating-array-state',
                title: '配列の state を更新する',
              },
              {
                route: 'state/use-state/functional-updates',
                title: '前の値をもとに更新する',
              },
            ],
          },
          {
            group: 'useEffect',
            pages: [{ route: 'state/use-effect/basics', title: 'useEffect とは（副作用）' }],
          },
          { route: 'state/summary', title: 'まとめと練習' },
        ],
      },
      {
        id: 'styling',
        no: 5,
        title: 'スタイリング（SCSS Modules）',
        items: [
          { route: 'styling/goal', title: 'このパートのゴール' },
          { route: 'styling/why-scss-modules', title: 'なぜ SCSS Modules か' },
          { route: 'styling/first-module', title: '最初の .module.scss' },
          { route: 'styling/scss-features', title: 'SCSS の機能（入れ子・変数・mixin）' },
          { route: 'styling/design-tokens-theming', title: 'デザイントークンとテーマ' },
          { route: 'styling/responsive', title: 'レスポンシブ' },
          { route: 'styling/shared-mixin', title: 'うちの共通 mixin（getVw・mq）を使う' },
          { route: 'styling/conditional-classes', title: '条件付きクラス（clsx）' },
          { route: 'styling/project', title: '通し課題：一覧を仕上げる' },
          { route: 'styling/summary', title: 'まとめと練習' },
        ],
      },
      {
        id: 'typescript',
        no: 6,
        title: 'React 用の TypeScript',
        items: [
          { route: 'typescript/goal', title: 'このパートのゴール' },
          { route: 'typescript/basic-types', title: '基本の型' },
          { route: 'typescript/interface', title: 'interface でオブジェクトの形を表す' },
          { route: 'typescript/typing-props', title: 'props に型を付ける' },
          { route: 'typescript/union-literal', title: 'union とリテラル型' },
          { route: 'typescript/product-type', title: 'Product 型とデータ' },
          { route: 'typescript/typing-state-events', title: 'state とイベントの型' },
          { route: 'typescript/project', title: '通し課題：ProductCard を型で守る' },
          { route: 'typescript/summary', title: 'まとめと練習' },
        ],
      },
      {
        id: 'routing',
        no: 7,
        title: 'ルーティング',
        items: [
          { route: 'routing/goal', title: 'このパートのゴール' },
          { route: 'routing/setup-router', title: 'ルーターを設定する' },
          { route: 'routing/link', title: 'Link で移動する' },
          { route: 'routing/route-params', title: 'URL パラメータ（商品詳細）' },
          { route: 'routing/layout-outlet', title: '共通レイアウトと Outlet' },
          { route: 'routing/navigate', title: 'プログラムで移動する（useNavigate）' },
          { route: 'routing/project', title: '通し課題：複数ページのアプリにする' },
          { route: 'routing/summary', title: 'まとめと練習' },
        ],
      },
      {
        id: 'data',
        no: 8,
        title: 'データ取得',
        items: [
          { route: 'data/goal', title: 'このパートのゴール' },
          { route: 'data/from-json-to-fetch', title: '直 import から fetch へ' },
          { route: 'data/fetch-basics', title: 'fetch の基本' },
          { route: 'data/useeffect-fetch', title: 'useEffect で取得する' },
          { route: 'data/three-states', title: '読み込み中・失敗・成功の3状態' },
          { route: 'data/custom-hook', title: 'useProducts カスタムフックに切り出す' },
          { route: 'data/project', title: '通し課題：一覧を fetch にする' },
          { route: 'data/summary', title: 'まとめと練習' },
        ],
      },
      // The 通し課題 capstone is inserted here when written.
    ],
  },
  // ── ライブラリ（別タブ）── read after the learner can already build React.
  // Each library gets its OWN part with real sections, not a one-line summary.
  {
    id: 'libraries',
    title: 'ライブラリ',
    basePath: '/libraries',
    parts: [
      {
        id: 'library-basics',
        title: 'ライブラリとの付き合い方',
        items: [
          { route: 'libraries/goal', title: 'はじめに — ライブラリとの付き合い方' },
          { route: 'libraries/npm-install-writes', title: 'npm install が書き換えるもの' },
          { route: 'libraries/choosing', title: 'ライブラリの選び方' },
          { route: 'libraries/types-packages', title: '型定義が別パッケージ（@types/*）' },
          { route: 'libraries/sass', title: 'sass を入れる' },
          { route: 'libraries/clsx', title: 'clsx でクラス名を組み立てる' },
          { route: 'libraries/react-router', title: 'react-router を入れる' },
          { route: 'libraries/motion', title: 'motion を入れる' },
          { route: 'libraries/env', title: '環境変数 .env と VITE_' },
          { route: 'libraries/managing', title: '消す・入れ替える・上げる' },
        ],
      },
      {
        id: 'framer-motion',
        title: 'Framer Motion（motion）',
        items: [
          { route: 'libraries/framer-motion/goal', title: 'このパートのゴール' },
          { route: 'libraries/framer-motion/motion-basics', title: 'motion の基本' },
          { route: 'libraries/framer-motion/interaction', title: 'ホバーとタップに反応する' },
          { route: 'libraries/framer-motion/reduced-motion', title: '動きを減らす設定に配慮する' },
          {
            route: 'libraries/framer-motion/scroll-and-stagger',
            title: 'スクロールで出す・少しずつ出す',
          },
          { route: 'libraries/framer-motion/exit', title: '出入りのアニメ（AnimatePresence）' },
          { route: 'libraries/framer-motion/project', title: '通し課題：一覧に動きを付ける' },
          { route: 'libraries/framer-motion/summary', title: 'まとめと練習' },
        ],
      },
      {
        id: 'gsap',
        title: 'GSAP',
        items: [
          { route: 'libraries/gsap/goal', title: 'このパートのゴール' },
          { route: 'libraries/gsap/install', title: 'gsap と @gsap/react を入れる' },
          { route: 'libraries/gsap/usegsap', title: 'useGSAP でアニメーションする' },
          { route: 'libraries/gsap/timeline', title: 'タイムラインで連続再生する' },
          {
            route: 'libraries/gsap/scrolltrigger',
            title: 'ScrollTrigger でスクロールに連動させる',
          },
          { route: 'libraries/gsap/fm-vs-gsap', title: 'Framer Motion と GSAP、どちらを使う？' },
          { route: 'libraries/gsap/summary', title: 'まとめと練習' },
        ],
      },
      {
        id: 'swiper',
        title: 'Swiper（スライダー）',
        items: [
          { route: 'libraries/swiper/goal', title: 'このパートのゴール' },
          { route: 'libraries/swiper/install', title: 'swiper を入れる' },
          { route: 'libraries/swiper/basics', title: 'Swiper と SwiperSlide で作る' },
          { route: 'libraries/swiper/modules', title: 'モジュールで機能を足す' },
          { route: 'libraries/swiper/project', title: 'breakpoints で商品カルーセルにする' },
          { route: 'libraries/swiper/summary', title: 'まとめと練習' },
        ],
      },
    ],
  },
  // 通し課題 — one continuous 商品一覧アプリ advanced by each part. Hidden until
  // its first page ships (Phase 3+).
  { id: 'project', title: '通し課題', basePath: '/project', parts: [] },
  {
    id: 'recipes',
    title: 'レシピ',
    basePath: '/recipes',
    parts: [
      {
        id: 'recipes',
        title: 'レシピ',
        items: [
          { route: 'recipes/modal', title: 'モーダル' },
          { route: 'recipes/accordion', title: 'アコーディオン' },
          { route: 'recipes/tabs', title: 'タブ' },
          { route: 'recipes/range-slider', title: 'レンジスライダー' },
          { route: 'recipes/copy-button', title: 'コピーボタン' },
          { route: 'recipes/scroll-reveal', title: 'スクロールで出現' },
          { route: 'recipes/tooltip', title: 'ツールチップ' },
          { route: 'recipes/drawer', title: 'ドロワー / ハンバーガー' },
          { route: 'recipes/custom-select', title: 'カスタムセレクト' },
          { route: 'recipes/carousel', title: 'カルーセル' },
          { route: 'recipes/star-rating', title: '星評価' },
          { route: 'recipes/toast', title: 'トースト通知' },
          { route: 'recipes/back-to-top', title: 'トップへ戻る' },
        ],
      },
    ],
  },
  // 社内標準 — rules-only condensed view. Hidden until it has pages.
  { id: 'standards', title: '社内標準', basePath: '/standards', parts: [] },
]
