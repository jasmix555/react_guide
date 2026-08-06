import { Link, useLocation } from 'react-router-dom'

import { LangToggle } from '@/components/LangToggle'
import { Search } from '@/components/Search'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useLocale, useSite, useStrings } from '@/hooks/useLocale'
import { getTabs } from '@/lib/nav'

import styles from './style.module.scss'

/**
 * Sticky, thin top bar: site name, top-level tabs, Ctrl+K search, theme toggle, and
 * (on mobile) the sidebar drawer trigger. Tabs are derived from built nav, so we
 * never link to a section that has no pages yet.
 */
export function TopBar({
  onOpenMenu,
  onNavigate,
}: {
  onOpenMenu?: () => void
  onNavigate?: () => void
}) {
  const { pathname } = useLocation()
  const locale = useLocale()
  const site = useSite()
  const strings = useStrings()

  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        {onOpenMenu && (
          <button
            type="button"
            className={styles.menu}
            onClick={onOpenMenu}
            aria-label={strings.nav.openMenu}
          >
            ☰
          </button>
        )}
        <Link to={`/${locale}`} className={styles.brand} onClick={onNavigate}>
          {site.name}
        </Link>
        <nav className={styles.tabs} aria-label={strings.nav.tabsAria}>
          {getTabs(locale).map((tab) => {
            const target = tab.pages[0]?.href ?? tab.basePath
            const activeTab = pathname.startsWith(tab.basePath)
            return (
              <Link
                key={tab.id}
                to={target}
                onClick={onNavigate}
                className={`${styles.tab} ${activeTab ? styles.tabActive : ''}`}
              >
                {tab.title}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className={styles.right}>
        <Search />
        <LangToggle onNavigate={onNavigate} />
        <ThemeToggle />
      </div>
    </header>
  )
}
