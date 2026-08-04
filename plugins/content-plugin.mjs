// Guide content pipeline (build-time).
//
// Two jobs:
//  1) Bridge `## 見出し {#slug}` — MDX would try to parse `{#slug}` as a JS
//     expression and throw, so we rewrite it to the MDX-safe comment
//     `{/* #slug */}` before MDX compiles. remark-heading-id then reads that
//     comment back into the heading's id.
//  2) Expose `virtual:content-index` — every page's frontmatter + h2 tree,
//     extracted from the .mdx source at build time (NOT the runtime DOM), so the
//     sidebar can show every page's sections without visiting the page first.
//
// ponytail: headings are pulled with a fence-aware line scan + regex rather than a
// full mdast parse. It's reliable because explicit `{#slug}` ids are mandatory
// (lint:content enforces it); upgrade to an AST walk only if headings ever need
// computed slugs.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const VIRTUAL_ID = 'virtual:content-index'
const RESOLVED_ID = '\0' + VIRTUAL_ID

const HEADING_WITH_ID = /^##\s+(.+?)\s*\{#([A-Za-z0-9][A-Za-z0-9-]*)\}\s*$/
const FENCE = /^\s*(```|~~~)/

/** Rewrite `{#slug}` on any ATX heading line into an MDX comment. */
function bridgeSlugs(code) {
  return code.replace(
    /^(#{1,6}\s+.+?)\s*\{#([A-Za-z0-9][A-Za-z0-9-]*)\}\s*$/gm,
    (_, heading, slug) => `${heading} {/* #${slug} */}`,
  )
}

function* walkMdx(dir) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry)
    if (statSync(abs).isDirectory()) yield* walkMdx(abs)
    else if (entry.endsWith('.mdx')) yield abs
  }
}

/** Minimal front-matter reader: `key: value` and `key: [a, b]`. */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const fm = {}
  if (!match) return fm
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (!m) continue
    const key = m[1]
    let value = m[2].trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      fm[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    } else {
      fm[key] = value.replace(/^['"]|['"]$/g, '')
    }
  }
  return fm
}

/** Fence-aware h2 extraction. Only headings that carry an explicit `{#slug}`. */
function extractHeadings(raw) {
  const headings = []
  let inFence = false
  for (const line of raw.split(/\r?\n/)) {
    if (FENCE.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = line.match(HEADING_WITH_ID)
    if (m) headings.push({ id: m[2], title: m[1].replace(/[`*]/g, '').trim() })
  }
  return headings
}

function scanContent(contentDir) {
  const index = {}
  for (const abs of walkMdx(contentDir)) {
    const routeId = relative(contentDir, abs).replace(/\\/g, '/').replace(/\.mdx$/, '')
    const raw = readFileSync(abs, 'utf8')
    index[routeId] = {
      routeId,
      frontmatter: parseFrontmatter(raw),
      headings: extractHeadings(raw),
    }
  }
  return index
}

/** @param {{ contentDir: string }} opts */
export function contentPlugin({ contentDir }) {
  return {
    name: 'guide-content',
    enforce: 'pre',

    transform(code, id) {
      if (id.endsWith('.mdx')) return { code: bridgeSlugs(code), map: null }
      return null
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      return null
    },

    load(id) {
      if (id === RESOLVED_ID) {
        return `export const contentIndex = ${JSON.stringify(scanContent(contentDir))}`
      }
      return null
    },

    configureServer(server) {
      server.watcher.add(contentDir)
      const refresh = (file) => {
        if (!file.endsWith('.mdx')) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
      server.watcher.on('change', refresh)
    },
  }
}
