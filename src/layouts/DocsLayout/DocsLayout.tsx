import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Sidebar } from '@/components/Sidebar'
import { Toc } from '@/components/Toc'
import { TopBar } from '@/components/TopBar'
import { useLocale, useStrings } from '@/hooks/useLocale'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { getPage, getTabs, routeIdFromPath, tabForRoute } from '@/lib/nav'

import styles from './style.module.scss'

/**
 * Three-column docs shell: sticky top bar, sticky sidebar (drawer < 900px),
 * content, and on-page TOC (< 1200px hidden). Sidebar and TOC share one
 * scroll-spy so the active section highlights in both.
 */
export function DocsLayout() {
  const location = useLocation()
  const locale = useLocale()
  const strings = useStrings()
  const route = routeIdFromPath(location.pathname)
  const page = getPage(locale, route)
  const tab = tabForRoute(locale, route) ?? getTabs(locale)[0]

  const headingIds = useMemo(() => page?.headings.map((h) => h.id) ?? [], [page])
  const activeHeading = useScrollSpy(headingIds)

  const [menuOpen, setMenuOpen] = useState(false)

  // Below the sidebar breakpoint the sidebar is an off-canvas drawer. When it's
  // closed, mark it inert so focus/screen readers can't reach the off-screen
  // links. Desktop keeps the sidebar visible, so it's never inert there.
  const [isDrawer, setIsDrawer] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 899.98px)')
    const sync = () => setIsDrawer(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

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
    window.scrollTo({ top: 0, behavior: 'auto' })
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
          inert={isDrawer && !menuOpen}
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
            aria-label={strings.nav.closeMenu}
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
