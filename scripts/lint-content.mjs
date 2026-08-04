// Fails the build if any h2 lacks an explicit English `{#slug}`, or if two h2s
// in one page collide. Japanese headings auto-slugged produce percent-encoded
// URLs that rot on rewording — explicit slugs are mandatory.
//
// Usage:
//   node scripts/lint-content.mjs            # scan all of src/content
//   node scripts/lint-content.mjs a.mdx b... # scan given files (lint-staged)
//
// ponytail: the ~15-line fence-aware scanner is duplicated from content-plugin.mjs
// rather than shared across the .mjs/config boundary. Two tiny copies beat one
// awkward shared module; keep them in sync if the heading syntax changes.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, relative } from 'node:path'

const CONTENT_DIR = fileURLToPath(new URL('../src/content', import.meta.url))
const H2 = /^##\s+(.+?)\s*$/
const H2_WITH_ID = /\{#([A-Za-z0-9][A-Za-z0-9-]*)\}\s*$/
const FENCE = /^\s*(```|~~~)/

function* walkMdx(dir) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry)
    if (statSync(abs).isDirectory()) yield* walkMdx(abs)
    else if (entry.endsWith('.mdx')) yield abs
  }
}

function lintFile(abs) {
  const errors = []
  const seen = new Set()
  const raw = readFileSync(abs, 'utf8')

  // `minutes` (reading-time estimate) is mandatory — no page ships without one.
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const minutes = fm?.[1].match(/^minutes:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '')
  if (minutes === undefined) {
    errors.push('  frontmatter に minutes がありません（読了目安・分）')
  } else if (!/^\d+$/.test(minutes)) {
    errors.push(`  frontmatter minutes は数値にしてください → minutes: ${minutes}`)
  }

  let inFence = false
  let lineNo = 0
  for (const line of raw.split(/\r?\n/)) {
    lineNo++
    if (FENCE.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence || !H2.test(line)) continue
    const idMatch = line.match(H2_WITH_ID)
    if (!idMatch) {
      errors.push(`  L${lineNo}: h2 に {#slug} がありません → ${line.trim()}`)
      continue
    }
    const slug = idMatch[1]
    if (seen.has(slug)) errors.push(`  L${lineNo}: slug "#${slug}" が重複しています`)
    seen.add(slug)
  }
  return errors
}

const args = process.argv.slice(2).filter((a) => a.endsWith('.mdx'))
const files = args.length ? args : [...walkMdx(CONTENT_DIR)]

let failed = false
for (const file of files) {
  const errors = lintFile(file)
  if (errors.length) {
    failed = true
    const rel = relative(process.cwd(), file).replace(/\\/g, '/')
    console.error(`\n✗ ${rel}`)
    for (const e of errors) console.error(e)
  }
}

if (failed) {
  console.error('\nlint:content 失敗 — 上記の h2 に {#slug} を付けてください。\n')
  process.exit(1)
}
console.log(`lint:content OK (${files.length} ファイル)`)
