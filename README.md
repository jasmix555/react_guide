# React Relearning (`react-touch`)

A hands-on playground for relearning core React. Each lesson page explains one
idea, shows the syntax, then leaves the real code as guided `// 👉 TODO` tasks
to fill in. A capstone shopping page ties the concepts together.

> This README documents **what the project is** (structure, lessons, setup).
> The [**Progress**](#-progress) section at the bottom is the running journal —
> what's been built so far.

---

## 📁 Folder structure

```
react-touch/
├─ index.html              # single HTML page; loads src/main.tsx
├─ vite.config.ts          # Vite + Tailwind plugin + "@" path alias
├─ tsconfig.app.json       # TS rules; defines "@/*" -> "src/*"
├─ README.md               # this file (project docs + progress)
├─ src/
│  ├─ main.tsx             # entry — mounts React, wraps app in <BrowserRouter>
│  ├─ App.tsx              # route table (which URL shows which page)
│  ├─ index.css            # Tailwind import + brand color tokens (@theme)
│  ├─ types/               # SHAPES of data (TS types only) — product.ts
│  ├─ data/                # ACTUAL values, typed with src/types — products.ts
│  ├─ components/          # reusable PARTS (no page-specific logic)
│  │  ├─ ui/               #   Button, Card, CodeBlock, Modal
│  │  ├─ layout/           #   RootLayout (+<Outlet/>), Navbar
│  │  └─ lesson/           #   LessonShell, Tabs, Sandbox, ProjectHelp
│  └─ pages/
│     ├─ Home.tsx          # lessons index + capstone link
│     ├─ Project.tsx       # 🛒 capstone shopping page (build it phase by phase)
│     └─ lessons/          # one folder per concept: index.tsx (page) + content.tsx (explainer)
│        ├─ index.ts       #   barrel re-exporting the four lessons
│        ├─ useState/
│        ├─ props/
│        ├─ map/
│        ├─ useEffect/
│        ├─ useRef/
│        ├─ liftingState/
│        ├─ fetching/
│        └─ forms/
```

**The pattern:** build small parts in `components/` → compose them into screens
in `pages/` → connect screens to URLs in `App.tsx`.

Each lesson lives in its own folder: `index.tsx` is the interactive page and
`content.tsx` holds the static explanation, kept apart so the prose doesn't
clutter the code you edit.

---

## 🎓 Lessons

Routes are wired in `App.tsx`. Each lesson page reads top to bottom:

1. **What it is** — plain-English explanation.
2. **How to create it** — the syntax.
3. **🛠️ Your turn** — guided TODO task.
4. **🌍 Real-world practice** — concrete things real apps build (instructions only).
5. **🏗️ Build zone** — a free area to experiment, no instructions.

| Lesson            | Route                  | Build                                          |
| ----------------- | ---------------------- | ---------------------------------------------- |
| useState          | `/learn/usestate`      | a counter, then a to-do list                   |
| props             | `/learn/props`         | a reusable `Greeting`, then a `ProductCard`    |
| map               | `/learn/map`           | render a `<ul>`, then the product grid         |
| useEffect         | `/learn/useeffect`     | change the browser tab title + cleanup         |
| useRef            | `/learn/useref`        | focus an input; hold a value without re-render |
| lifting state up  | `/learn/lifting-state` | share one state between two children           |
| data fetching     | `/learn/fetching`      | loading / error / data from an API             |
| controlled forms  | `/learn/forms`         | inputs driven by state, with submit handling   |

The **🛠️ Your turn** practice in each Tutorial tab is left blank on purpose —
it's a guided `// 👉` scaffold for you to fill in, not a finished answer.

### 🛒 Connected mini-project (props + map + types/data)

The props and map lessons build one thing together — a product list — so the
folders' roles become concrete:

1. `src/types/product.ts` — define the `Product` **type** (the shape).
2. `src/components/ui/ProductCard.tsx` — a component that takes a `product` **prop**.
3. `src/data/products.ts` — an array of products typed as `Product[]`.
4. A page that imports `products` and **maps** them into `ProductCard`s.

> Type = shape · Data = values · Component = how one item looks · Page = the list.

---

## 🏁 Capstone — `/project`

After the lessons, build the **shopping page** in `src/pages/Project.tsx`, one
phase at a time (instructions are in the file):

1. Phase 1 — show the products (map)
2. Phase 2 — search box (useState + controlled input + filter)
3. Phase 3 — filter by category (derived data)
4. Phase 4 — open a product in a `Modal` (state + props + events)
5. Phase 5 — bonus: a cart (arrays in state)

`Modal` guide lives in `src/components/ui/Modal.tsx`.

---

## 🛠️ Tech & setup

- **Tailwind CSS v4** via `@tailwindcss/vite` — no config file, no PostCSS.
  Brand color tokens live in `src/index.css` `@theme` (currently **blue**;
  change `--color-brand-*` to recolor the whole app at once).
- **React Router v7** — routes in `App.tsx`, shared shell in `RootLayout.tsx`.
- **Path alias `@/`** — import as `@/components/ui/Button`. Wired in BOTH
  `vite.config.ts` (`resolve.alias`) and `tsconfig.app.json` (`paths`).
- Reusable parts ready to use: `Button`, `Card`, `CodeBlock`, `Modal`,
  `Sandbox`, `LessonShell`.

```bash
npm run dev      # start dev server (hot reload) — use this while learning
npm run build    # type-check + production build
npm run lint     # eslint
```

### 📌 Notes / gotchas

- Editor may warn **"Unknown at rule @theme"** in `index.css` — that's just
  VS Code's CSS linter not knowing Tailwind v4. It builds fine.
- Remember to **import** a hook before using it (`import { useState } from 'react'`).
  A missing import is a great error to learn to read.
- `verbatimModuleSyntax` is on: import types with `import type { X } from '...'`.

---

## 📊 Progress

A running journal of what's built so far.

### Lessons

- [x] **useState** — counter done; to-do list built in the build zone (add,
  delete by `id`, keyboard focus + Delete/Backspace to remove).
- [ ] **props** — reusable `Greeting`, then `ProductCard`.
- [ ] **map** — render a `<ul>`, then the product grid.
- [ ] **useEffect** — change the browser tab title + cleanup.
- [ ] **useRef** — focus an input; hold a value without re-rendering.
- [ ] **lifting state up** — share one state between two children.
- [ ] **data fetching** — loading / error / data from an API.
- [ ] **controlled forms** — inputs driven by state.

### Mini-project (props + map)

- [x] `src/types/product.ts` — `Product` type defined.
- [ ] `src/components/ui/ProductCard.tsx`
- [ ] `src/data/products.ts`
- [ ] page that maps products into cards

### Capstone — `/project`

- [ ] Phase 1 — show the products (map)
- [ ] Phase 2 — search box
- [ ] Phase 3 — filter by category
- [ ] Phase 4 — open a product in a `Modal`
- [ ] Phase 5 — bonus: cart

### Setup (done)

- [x] Tailwind v4, React Router v7, `@/` path alias, base UI + lesson components.

### Next ideas (future lessons)

- [ ] `useReducer` — manage more complex state transitions.
- [ ] `useContext` — share state app-wide without prop-drilling.
- [ ] Custom hooks — extract reusable stateful logic.
- [ ] `useMemo` / `useCallback` — skip unnecessary recomputation.

---

_Last updated: 2026-06-04_
