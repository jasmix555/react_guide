import clsx from 'clsx'
import { createElement, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { PrereqChips } from '@/components/PrereqChips'
import { PrevNext } from '@/components/PrevNext'
import { site } from '@/config/site'
import { strings } from '@/config/strings.ja'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useReadProgress } from '@/hooks/useReadProgress'
import { setLastRead } from '@/lib/lastRead'
import { getPage, routeIdFromPath } from '@/lib/nav'
import { lazyForRoute } from '@/lib/pages'
import { NotFound } from '@/pages/NotFound'

import styles from './style.module.scss'

/**
 * Renders one MDX page for the matched route. Chrome (title, reading time,
 * prerequisites, read-toggle, prev/next) is added here so authors only write
 * the body.
 */
export function GuidePage() {
  const { pathname } = useLocation()
  const route = routeIdFromPath(pathname)
  // Stable lazy component from a module-scope registry (see lib/pages.ts).
  const content = lazyForRoute(route)
  const page = getPage(route)
  const { isRead, toggle } = useReadProgress()

  useDocumentMeta(page ? `${page.title} — ${site.name}` : site.name, page?.description)

  // Remember where the reader is, so Home can offer 「続きから」.
  useEffect(() => {
    if (page) setLastRead({ route: page.route, title: page.title, href: page.href })
  }, [page])

  if (!content) return <NotFound />

  const read = isRead(route)

  return (
    <article className={styles.article}>
      <header className={styles.head}>
        <h1 className={styles.title}>{page?.title ?? route}</h1>
        {page?.description && <p className={styles.desc}>{page.description}</p>}
        {(page?.minutes != null || (page && page.prerequisites.length > 0)) && (
          <div className={styles.meta}>
            {page?.minutes != null && (
              <span className={styles.minutes}>
                {strings.page.minutesLabel} 約 {page.minutes} 分
              </span>
            )}
            {page && page.prerequisites.length > 0 && (
              <PrereqChips prerequisites={page.prerequisites} />
            )}
          </div>
        )}
      </header>

      <div className="prose">
        <Suspense fallback={<p className={styles.loading}>読み込み中…</p>}>
          {createElement(content)}
        </Suspense>
      </div>

      <footer className={styles.footer}>
        <button
          type="button"
          className={clsx(styles.readBtn, read && styles.readOn)}
          aria-pressed={read}
          onClick={() => toggle(route)}
        >
          {read ? strings.page.markedRead : strings.page.markRead}
        </button>
        <a
          className={styles.feedback}
          href={site.feedbackUrl}
          target="_blank"
          rel="noreferrer"
        >
          {strings.page.feedbackLead} {strings.page.feedbackLink} →
        </a>
      </footer>

      <PrevNext route={route} />
    </article>
  )
}
