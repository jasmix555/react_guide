// Guards the colours that sit on the always-dark code surface (dark in BOTH
// themes, so these colours are constant and must stay legible). Two passes:
//
//   1. STATIC  — the --c-code-* token values vs the code backgrounds. Fast, no
//                browser, always runs. Catches a bad token value.
//   2. RENDER  — launches headless Chrome against a throwaway Vite server, walks
//                the ACTUAL text nodes on the code surface in light AND dark, and
//                composites their real backgrounds. Catches what the static pass
//                can't: a cascade override (e.g. the global inline-code chip rule
//                capturing a <code>) that leaves the right token unused.
//
// Run in `npm run check`. The render pass needs a Chrome/Edge binary; if none is
// found (or SKIP_RENDER_CONTRAST=1) it warns and skips — the static pass still
// guards the tokens.

/* global document, getComputedStyle */
// (document/getComputedStyle are used inside walkSource, which is serialized and
// run in the browser via page.evaluate — not in Node.)
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// ── shared contrast math ─────────────────────────────────────────────────────
function channel(c) {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}
function luminance({ r, g, b }) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}
function hex(h) {
  const s = h.replace('#', '')
  return {
    r: parseInt(s.slice(0, 2), 16),
    g: parseInt(s.slice(2, 4), 16),
    b: parseInt(s.slice(4, 6), 16),
  }
}
function ratio(a, b) {
  const hi = Math.max(luminance(a), luminance(b))
  const lo = Math.min(luminance(a), luminance(b))
  return (hi + 0.05) / (lo + 0.05)
}

let failed = false

// ── 1. STATIC token pass ─────────────────────────────────────────────────────
// We test against the LIGHTER of the two code backgrounds (#0f1420, the
// light-theme code bg) — the worst case for light-on-dark contrast.
const CODE_BG = hex('#0f1420')
const TAB_BG = hex('#1a2130')
const CHECKS = [
  ['コード本文 (--c-code-fg)', '#e7ecf5', CODE_BG, 4.5],
  ['ファイル名タブ (--c-code-tab-fg)', '#aeb6c6', TAB_BG, 4.5],
  ['言語バッジ (--c-code-badge-fg)', '#aab3c4', TAB_BG, 4.5],
  ['コピーボタン (--c-code-copy-fg)', '#c3cad8', TAB_BG, 4.5],
  ['diff 注記 (--c-code-note-fg)', '#aab3c4', CODE_BG, 4.5],
  ['diff ❌ ボーダー/記号 (--c-code-danger)', '#ff6b60', CODE_BG, 3],
  ['diff ✅ ボーダー/記号 (--c-code-success)', '#46d8a0', CODE_BG, 3],
  ['行ハイライトのアクセント (--c-code-hl-border)', '#8e88ff', CODE_BG, 3],
]
console.log('— static token pass —')
for (const [label, fg, bg, min] of CHECKS) {
  const r = ratio(hex(fg), bg)
  const ok = r >= min
  if (!ok) failed = true
  console.log(`${ok ? 'OK ' : 'NG '} ${r.toFixed(2)} : 1  (>= ${min})  ${label}  ${fg}`)
}

// ── 2. RENDER pass ───────────────────────────────────────────────────────────
const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDir, '..')

function findChrome() {
  const c = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.LOCALAPPDATA &&
      `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean)
  return c.find((p) => {
    try {
      return fs.existsSync(p)
    } catch {
      return false
    }
  })
}

// The in-page walker. Composites each node's real background up the ancestor
// chain (translucent tints included), then contrasts it with the text colour.
// Returns only the failures. Code-block *tokens* are Shiki-themed (out of our
// control), so we measure the <code> container's own colour, not each token.
function walkSource() {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/)
    if (!m) return null
    const p = m[1].split(',').map((s) => parseFloat(s.trim()))
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] }
  }
  const effBg = (el) => {
    const stack = []
    for (let n = el; n; n = n.parentElement) {
      const bg = parse(getComputedStyle(n).backgroundColor)
      if (bg && bg.a > 0) stack.push(bg)
    }
    const body = parse(getComputedStyle(document.body).backgroundColor) || {
      r: 255,
      g: 255,
      b: 255,
    }
    let out = { r: body.r, g: body.g, b: body.b }
    for (let i = stack.length - 1; i >= 0; i--) {
      const s = stack[i]
      out = {
        r: s.r * s.a + out.r * (1 - s.a),
        g: s.g * s.a + out.g * (1 - s.a),
        b: s.b * s.a + out.b * (1 - s.a),
      }
    }
    return out
  }
  const chan = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  const lum = (c) => 0.2126 * chan(c.r) + 0.7152 * chan(c.g) + 0.0722 * chan(c.b)
  const rat = (a, b) => {
    const hi = Math.max(lum(a), lum(b))
    const lo = Math.min(lum(a), lum(b))
    return (hi + 0.05) / (lo + 0.05)
  }
  const targets = [
    ['diff code', '[class*="diff"] code', 4.5],
    ['diff 注記', 'p[class*="note"]', 4.5],
    ['code 本文', '.prose figure[data-rehype-pretty-code-figure] > pre > code', 4.5],
    ['ファイル名タブ', '[data-rehype-pretty-code-title]', 4.5],
    ['コピーボタン', '.prose figure[data-rehype-pretty-code-figure] button', 4.5],
  ]
  const fails = []
  for (const [label, sel, min] of targets) {
    for (const el of document.querySelectorAll(sel)) {
      const text = (el.textContent || '').trim()
      if (!text) continue
      const cs = getComputedStyle(el)
      const fg = parse(cs.color)
      if (!fg) continue
      const r = rat(fg, effBg(el))
      if (r < min)
        fails.push({ label, min, text: text.slice(0, 30), color: cs.color, ratio: +r.toFixed(2) })
    }
  }
  return fails
}

async function renderPass() {
  if (process.env.SKIP_RENDER_CONTRAST === '1') {
    console.log('\n— render pass — skipped (SKIP_RENDER_CONTRAST=1)')
    return
  }
  const chrome = findChrome()
  if (!chrome) {
    console.warn(
      '\n⚠ render pass skipped — no Chrome/Edge found. Set CHROME_PATH to enable.\n' +
        '  (static token pass still ran; the cascade check did not.)',
    )
    return
  }

  let puppeteer, createServer
  try {
    ;({ default: puppeteer } = await import('puppeteer-core'))
    ;({ createServer } = await import('vite'))
  } catch {
    console.warn('\n⚠ render pass skipped — puppeteer-core / vite not importable.')
    return
  }

  console.log('\n— render pass — (headless Chrome, light + dark)')
  const server = await createServer({
    root: projectRoot,
    logLevel: 'error',
    server: { port: 0 },
  })
  await server.listen()
  const url = server.resolvedUrls.local[0].replace(/\/$/, '')
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: 'new',
    args: ['--no-sandbox'],
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 900 })
    // A page dense with code surfaces: two Diffs, titled code blocks, copy buttons.
    // Content lives under a locale prefix now (/{locale}/guide/…); "/" redirects
    // to the default locale, so the page must be requested with it.
    await page.goto(`${url}/ja/guide/javascript/destructuring`, {
      waitUntil: 'networkidle0',
    })
    await page.waitForSelector('[class*="diff"] code', { timeout: 10000 })

    for (const theme of ['light', 'dark']) {
      await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme)
      const fails = await page.evaluate(walkSource)
      if (fails.length) {
        failed = true
        console.log(`NG  ${theme}: ${fails.length} 件`)
        for (const f of fails)
          console.log(
            `    ${f.ratio} : 1  (>= ${f.min})  ${f.label}  ${f.color}  「${f.text}」`,
          )
      } else {
        console.log(`OK  ${theme}: コード面の文字はすべて基準以上`)
      }
    }
  } finally {
    await browser.close()
    await server.close()
  }
}

await renderPass()

if (failed) {
  console.error('\ncheck-contrast 失敗 — コード面のコントラストが基準を下回っています。\n')
  process.exit(1)
}
console.log('\ncheck-contrast OK')
