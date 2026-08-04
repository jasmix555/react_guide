import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Sidebar } from '@/components/Sidebar'
import { Toc } from '@/components/Toc'
import { TopBar } from '@/components/TopBar'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { getPage, routeIdFromPath, tabForRoute, tabsNav } from '@/lib/nav'

import styles from './style.module.scss'

/**
 * Three-column docs shell: sticky top bar, sticky sidebar (drawer < 900px),
 * content, and on-page TOC (< 1200px hidden). Sidebar and TOC share one
 * scroll-spy so the active section highlights in both.
 */
export function DocsLayout() {
  const location = useLocation()
  const route = routeIdFromPath(location.pathname)
  const page = getPage(route)
  const tab = tabForRoute(route) ?? tabsNav[0]

  const headingIds = useMemo(() => page?.headings.map((h) => h.id) ?? [], [page])
  const activeHeading = useScrollSpy(headingIds)

  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll to the anchor (or top) whenever the route changes. Drawer close is
  // handled by the navigation handlers (sidebar links, scrim, top-bar links).
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id)
        if (!el) return
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
      }, 60)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'auto' })
  }, [location.pathname, location.hash])

  return (
    <div className={styles.shell}>
      <TopBar
        onOpenMenu={() => setMenuOpen(true)}
        onNavigate={() => setMenuOpen(false)}
      />

      <div className={styles.body}>
        <aside
          className={clsx(styles.sidebarCol, menuOpen && styles.drawerOpen)}
          aria-hidden={undefined}
        >
          <Sidebar
            tab={tab}
            currentRoute={route}
            activeHeading={activeHeading}
            onNavigate={() => setMenuOpen(false)}
          />
        </aside>

        {menuOpen && (
          <button
            type="button"
            className={styles.scrim}
            aria-label="ナビゲーションを閉じる"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <main className={styles.main}>
          <Outlet />
        </main>

        <aside className={styles.tocCol}>
          {page && page.headings.length > 0 && (
            <Toc headings={page.headings} activeId={activeHeading} />
          )}
        </aside>
      </div>
    </div>
  )
}
