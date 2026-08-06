// Verifies every internal link and every `prerequisites` route in the content
// points at a page that actually exists.
//
// WHY: cross-links are easy to get subtly wrong — recipe pages live at
// `/recipes/*` (NOT `/guide/recipes/*`), and a renamed page leaves stale
// `[text](/guide/...)` links and `prerequisites` behind. lint:content checks
// heading slugs and check-render checks rendering; neither follows links. This
// does, with no browser, so broken internal navigation fails the gate.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentRoot = path.join(root, 'src', 'content')

function listMdx(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...listMdx(p))
    else if (e.name.endsWith('.mdx')) out.push(p)
  }
  return out
}

// Tabs with their own top-level path (mirror of lib/nav.ts NON_GUIDE_PREFIXES).
const NON_GUIDE_PREFIXES = ['recipes/', 'standards/', 'project/', 'libraries/']

// Content lives under a per-locale folder (ja/…, en/…) but links/prerequisites
// are authored locale-neutral (MdxLink adds the locale at render). Strip the
// leading locale segment so a neutral link resolves against either locale.
const LOCALES = ['ja', 'en']
function stripLocale(rel) {
  const i = rel.indexOf('/')
  const seg = i === -1 ? rel : rel.slice(0, i)
  return LOCALES.includes(seg) ? rel.slice(i + 1) : rel
}

// content/<locale>/foo/bar.mdx → neutral route. Top-level tabs keep their prefix,
// everything else /guide.
function routeFor(rel) {
  return NON_GUIDE_PREFIXES.some((p) => rel.startsWith(p)) ? `/${rel}` : `/guide/${rel}`
}

const files = listMdx(contentRoot)
const validRoutes = new Set(
  files.map((f) =>
    routeFor(stripLocale(path.relative(contentRoot, f).replace(/\\/g, '/').replace(/\.mdx$/, ''))),
  ),
)
validRoutes.add('/')

const problems = []

for (const file of files) {
  const rel = path.relative(contentRoot, file).replace(/\\/g, '/')
  const src = fs.readFileSync(file, 'utf8')

  // internal markdown links: `](/...)` — ignore external, hash-only, mailto.
  const linkRe = /\]\((\/[^)\s#]*)(?:#[^)]*)?\)/g
  let m
  while ((m = linkRe.exec(src))) {
    const url = m[1]
    const internal =
      url === '/' ||
      url.startsWith('/guide/') ||
      NON_GUIDE_PREFIXES.some((p) => url.startsWith(`/${p}`))
    if (!internal) continue
    if (!validRoutes.has(url)) problems.push(`${rel}: broken link → ${url}`)
  }

  // frontmatter `prerequisites: ['state/summary', ...]`
  const fm = src.match(/^---\n([\s\S]*?)\n---/)
  const pm = fm && fm[1].match(/prerequisites:\s*\[([^\]]*)\]/)
  if (pm && pm[1].trim()) {
    for (const pr of pm[1].split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)) {
      if (!validRoutes.has(routeFor(pr))) problems.push(`${rel}: broken prerequisite → ${pr}`)
    }
  }
}

if (problems.length) {
  console.log(`— link check — ${problems.length} 件`)
  for (const p of problems) console.log(`NG  ${p}`)
  console.error('\ncheck-links 失敗 — 内部リンク／前提の参照先が存在しません。\n')
  process.exit(1)
}
console.log(`check-links OK — ${files.length} ファイルの内部リンク・前提はすべて解決`)
