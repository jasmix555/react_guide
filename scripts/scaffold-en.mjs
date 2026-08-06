// One-shot: mirror the Japanese content tree into an English one.
//
// Copies src/content/ja/**.mdx -> src/content/en/**.mdx, inserting a TODO marker
// right after the frontmatter so untranslated pages are greppable:
//   node scripts/scaffold-en.mjs            # create missing en/ pages only
//   node scripts/scaffold-en.mjs --force    # overwrite existing en/ pages too
//
// ponytail: skips files that already exist in en/ unless --force, so re-running
// after some pages are translated won't clobber the translations.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const JA = join(root, 'src/content/ja')
const EN = join(root, 'src/content/en')
const force = process.argv.includes('--force')

const MARKER = '{/* TODO: translate to English — this page still mirrors the Japanese source. */}'

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry)
    if (statSync(abs).isDirectory()) yield* walk(abs)
    else if (entry.endsWith('.mdx')) yield abs
  }
}

/** Insert MARKER after the closing `---` of frontmatter (or at the top if none). */
function withMarker(src) {
  const m = src.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/)
  if (!m) return `${MARKER}\n\n${src}`
  const end = m[0].length
  return `${src.slice(0, end)}\n${MARKER}\n${src.slice(end)}`
}

let created = 0
let skipped = 0
for (const abs of walk(JA)) {
  const rel = relative(JA, abs)
  const dest = join(EN, rel)
  if (existsSync(dest) && !force) {
    skipped++
    continue
  }
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, withMarker(readFileSync(abs, 'utf8')))
  created++
}

// Copy over any non-mdx assets colocated with content (images, etc.), untouched.
for (const abs of (function* w(dir) {
  for (const entry of readdirSync(dir)) {
    const a = join(dir, entry)
    if (statSync(a).isDirectory()) yield* w(a)
    else if (!entry.endsWith('.mdx')) yield a
  }
})(JA)) {
  const dest = join(EN, relative(JA, abs))
  if (existsSync(dest) && !force) continue
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(abs, dest)
}

console.log(`en/ scaffold: ${created} written, ${skipped} skipped (already translated).`)
