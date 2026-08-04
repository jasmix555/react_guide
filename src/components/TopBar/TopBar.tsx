import { Link, useLocation } from 'react-router-dom'

import { Search } from '@/components/Search'
import { ThemeToggle } from '@/components/ThemeToggle'
import { site } from '@/config/site'
import { tabsNav } from '@/lib/nav'

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

  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        {onOpenMenu && (
          <button
            type="button"
            className={styles.menu}
            onClick={onOpenMenu}
            aria-label="ナビゲーションを開く"
          >
            ☰
          </button>
        )}
        <Link to="/" className={styles.brand} onClick={onNavigate}>
          {site.name}
        </Link>
        <nav className={styles.tabs} aria-label="セクション">
          {tabsNav.map((tab) => {
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
        <ThemeToggle />
      </div>
    </header>
  )
}
