// Render smoke-test. Loads EVERY content route in headless Chrome and fails if a
// page throws while rendering.
//
// WHY: MDX like a raw `{expr}` or `<Tag />` in prose/headings COMPILES fine, so
// `vite build` never catches it — but it crashes the page at runtime (missing
// component / ReferenceError). `vite build` proves it bundles; this proves it
// actually renders. Complements check-contrast (which only loads one page).
//
// Needs a Chrome/Edge binary; if none is found (or SKIP_RENDER_CHECK=1) it warns
// and skips, so CI without a browser still passes the rest of the gate.

/* global document */
// (document is used inside page.evaluate callbacks, serialized and run in the
// browser by puppeteer — not in Node.)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDir, '..')
const contentRoot = path.join(projectRoot, 'src', 'content')

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

function listMdx(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...listMdx(p))
    else if (e.name.endsWith('.mdx')) out.push(p)
  }
  return out
}

// Content path → URL. recipes live under /recipes; everything else is a /guide page.
function routeFor(file) {
  const rel = path.relative(contentRoot, file).replace(/\\/g, '/').replace(/\.mdx$/, '')
  return rel.startsWith('recipes/') ? `/${rel}` : `/guide/${rel}`
}

async function main() {
  if (process.env.SKIP_RENDER_CHECK === '1') {
    console.log('— render smoke-test — skipped (SKIP_RENDER_CHECK=1)')
    return
  }
  const chrome = findChrome()
  if (!chrome) {
    console.warn('\n⚠ render smoke-test skipped — no Chrome/Edge found. Set CHROME_PATH to enable.')
    return
  }
  let puppeteer, createServer
  try {
    ;({ default: puppeteer } = await import('puppeteer-core'))
    ;({ createServer } = await import('vite'))
  } catch {
    console.warn('\n⚠ render smoke-test skipped — puppeteer-core / vite not importable.')
    return
  }

  const routes = ['/', ...listMdx(contentRoot).map(routeFor)]
  const server = await createServer({ root: projectRoot, logLevel: 'error', server: { port: 0 } })
  await server.listen()
  const base = server.resolvedUrls.local[0].replace(/\/$/, '')
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: 'new',
    args: ['--no-sandbox'],
  })

  const fails = []
  try {
    for (const route of routes) {
      // Fresh page per route: reusing one page across 100+ navigations gets flaky
      // (stale DOM / listener buildup) and yields false "empty body" failures.
      const page = await browser.newPage()
      const pageErrors = []
      const consoleErrors = []
      const onErr = (e) => pageErrors.push(e.message)
      const onConsole = (m) => {
        if (m.type() === 'error') consoleErrors.push(m.text())
      }
      page.on('pageerror', onErr)
      page.on('console', onConsole)
      try {
        await page.goto(`${base}${route}`, { waitUntil: 'networkidle0', timeout: 20000 })
        // networkidle 直後は React の描画・エラーバウンダリ確定に間に合わないことが
        // あるので、少し待ってから判定する（これが無いと throw を取りこぼす）。
        await new Promise((r) => setTimeout(r, 400))
        const res = await page.evaluate(() => {
          const txt = document.body.textContent || ''
          return {
            routerError:
              txt.includes('Unexpected Application Error') ||
              txt.includes('cannot render a <Router>'),
            overlay: !!document.querySelector('vite-error-overlay'),
            hasH1: !!document.querySelector('h1'),
            body: txt.replace(/\s+/g, ' ').trim().slice(0, 180),
          }
        })
        // fatal な console.error（クラッシュ由来）だけを拾う。React の警告は除外。
        const fatalConsole = consoleErrors.find((t) =>
          /cannot render a <Router>|Minified React error|is not defined|Cannot read propert|Objects are not valid as a React child/i.test(
            t,
          ),
        )
        const reason = pageErrors.length
          ? `uncaught: ${pageErrors[0]}`
          : res.overlay
            ? 'vite error overlay'
            : res.routerError
              ? 'react error boundary (Unexpected Application Error)'
              : fatalConsole
                ? `console error: ${fatalConsole.slice(0, 120)}`
                : !res.hasH1
                  ? 'no <h1> rendered'
                  : null
        if (reason) fails.push({ route, reason, detail: res.body })
      } catch (e) {
        fails.push({ route, reason: 'navigation/timeout', detail: e.message })
      } finally {
        page.off('pageerror', onErr)
        page.off('console', onConsole)
        await page.close()
      }
    }
  } finally {
    await browser.close()
    await server.close()
  }

  console.log(`— render smoke-test — ${routes.length} routes（headless Chrome）`)
  if (fails.length) {
    for (const f of fails) console.log(`NG  ${f.route}\n     ${f.reason}\n     「${f.detail}」`)
    console.error(`\ncheck-render 失敗 — ${fails.length} ページが描画時にエラー。\n`)
    process.exit(1)
  }
  console.log('check-render OK — 全ページ描画成功')
}

await main()
