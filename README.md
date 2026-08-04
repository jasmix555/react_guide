# React 実践ガイド (`react_guide`)

A self-hosted, **react.dev-style Japanese documentation site** that teaches
React + TypeScript to beginners — written for LP-production teammates who are
new to JavaScript/React and want to apply it in our real coding setup.

Content is authored in **MDX**; every interactive idea ships as a real,
runnable **demo** embedded in the prose (not a fill-in-the-blank TODO). Each
page reads: what it is → full copy-pasteable code → a live `<Demo>` →
"syntax breakdown" → **うちの標準** (our-standard) decision card → practice.

> Repo: <https://github.com/jasmix555/react_guide>

---

## 🛠️ Tech stack

- **React 19** + **TypeScript** (strict, no `any`)
- **Vite 8** (dev + build)
- **react-router v7** — `createBrowserRouter` (`src/routes/router.tsx`)
- **MDX** (`@mdx-js/rollup`) for content · **SCSS Modules** (Sass) for styling
  — Tailwind is intentionally *not* used
- **Shiki** via `rehype-pretty-code` — build-time syntax highlighting
- **Fuse.js** — client-side search across page headings
- Library demos: **motion** (Framer Motion), **gsap** + `@gsap/react`, **swiper**
- `clsx`; fonts via `@fontsource` (Zen Kaku Gothic New / Noto Sans JP / JetBrains Mono)
- ESLint (flat) + Prettier + husky + lint-staged + commitlint

---

## 🚀 Quick start

```bash
npm install
npm run dev        # dev server (hot reload) — open the URL Vite prints (default http://localhost:5173)
```

### Scripts

| command             | what it does                                              |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Vite dev server with hot reload                          |
| `npm run build`     | `tsc -b` + `vite build` → outputs `dist/`                |
| `npm run preview`   | serve the production build locally                       |
| `npm run lint`      | ESLint                                                   |
| `npm run lint:content` | validate MDX frontmatter + `## heading {#slug}` rules |
| `npm run check:links`  | validate internal links + `prerequisites` resolve     |
| `npm run check:contrast` | token + rendered color-contrast check               |
| `npm run check:render`   | headless-Chrome render smoke-test across **every** route |
| `npm run check`     | **the full gate** — all of the above + `tsc` + build     |
| `npm run format`    | Prettier                                                 |

Run `npm run check` before committing or deploying — it's the single command
that proves the whole site still lints, links, renders, type-checks, and builds.

---

## 📁 Project structure

```
react_guide/
├─ index.html               # single page; loads src/main.tsx
├─ vite.config.ts           # MDX + React plugins, "@" alias, SCSS loadPaths
├─ tsconfig.*.json          # "@/*" -> "src/*"
├─ plugins/                 # content pipeline (run before MDX)
│  ├─ content-plugin.mjs    #   {#slug} bridge + virtual:content-index (build-time frontmatter/heading index)
│  └─ remark-heading-id.mjs
├─ scripts/                 # gate scripts (lint-content, check-links, check-contrast, check-render)
├─ docs/                    # internal authoring standards (e.g. page-standard.md)
├─ public/                  # static assets served as-is (e.g. downloads/_mixin.scss)
└─ src/
   ├─ main.tsx              # mounts <RouterProvider>
   ├─ routes/router.tsx     # createBrowserRouter route table
   ├─ config/navigation.ts  # ⭐ nav source of truth: tabs → parts → pages
   ├─ content/              # ALL lessons as .mdx, one folder per part
   ├─ demos/                # interactive examples embedded via <Demo> (35+)
   ├─ components/           # MDX components (Callout, Std, Diff, Demo, Exercise, …) + UI (TopBar, Sidebar, Search, Toc)
   ├─ layouts/DocsLayout/   # 3-column docs shell (sidebar · content · TOC)
   ├─ pages/                # Home, GuidePage, NotFound
   ├─ hooks/  lib/          # read-progress, last-read, scroll-spy, nav helpers
   ├─ styles/               # design tokens, global.scss, mixins, house _mixin.scss (getVw/mq)
   └─ data/products.json    # sample data used by demos + the running example
```

**Path alias:** import as `@/components/Button` (`@` → `src/`), wired in both
`vite.config.ts` (`resolve.alias`) and `tsconfig.app.json` (`paths`).

---

## ✍️ Content model

- Every page is an `.mdx` file under `src/content/<part>/` with frontmatter
  (`title`, `minutes`, `slug`, `section`, `description`, `level`,
  `prerequisites`) and `## Heading {#english-slug}`.
- **To add a page:** create the `.mdx` and add one line to
  `src/config/navigation.ts`. URLs are non-numbered and derive from the file
  path (e.g. `src/content/state/use-state/basics.mdx` → `/guide/state/use-state/basics`).
- **Interactive demos** live in `src/demos/<Name>/` (`<Name>.tsx` named export
  + `.module.scss` + `index.ts` barrel) and are imported into MDX and shown
  with `<Demo>`.

### Tabs

| Tab | Base | Contents |
| --- | --- | --- |
| **学ぶ** (learn) | `/guide` | setup · JavaScript · はじめての React · state & hooks · styling (SCSS Modules) · TypeScript · routing · data fetching |
| **ライブラリ** (libraries) | `/libraries` | Framer Motion · GSAP · Swiper |
| **レシピ** (recipes) | `/recipes` | copy-paste UI patterns (modal, tabs, carousel, …) |

---

## 🚢 Deploy

Static SPA — `npm run build` outputs `dist/`, which you can serve from any
static host (Apache/XAMPP, Nginx, etc.).

Because routing uses `createBrowserRouter` (HTML5 history), the host **must
serve `index.html` for unknown paths**, or deep links and page refreshes
(e.g. `/libraries/swiper/goal`) will 404. On Apache/XAMPP, drop this into
`dist/.htaccess`:

```apache
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

If you serve it from a **subfolder** (not the document root), also set Vite
`base` and a router `basename` to that path so assets and routes resolve.

---

## 📊 Status

- ✅ **Core (学ぶ):** setup · JavaScript · はじめての React · state & hooks ·
  styling (SCSS Modules) · TypeScript · routing · data fetching
- ✅ **Libraries:** Framer Motion · GSAP · Swiper
- ⏳ **Planned libraries:** Tailwind · React Icons · Lenis
- ⏳ **Capstone** (通し課題: 商品一覧アプリ) + deploy lesson
