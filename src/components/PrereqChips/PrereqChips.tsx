import { Link } from 'react-router-dom'

import { strings } from '@/config/strings.ja'
import { getPage } from '@/lib/nav'

import styles from './style.module.scss'

/**
 * 前提 chips from the page's frontmatter `prerequisites`. Each links to the page
 * that teaches it — so a reader who's lost knows exactly what to read first.
 * Only links when the target actually exists (no dead chips).
 */
export function PrereqChips({ prerequisites }: { prerequisites: string[] }) {
  if (!prerequisites.length) return null

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>{strings.nav.prerequisites}</span>
      <ul className={styles.list}>
        {prerequisites.map((route) => {
          const page = getPage(route)
          return (
            <li key={route}>
              {page ? (
                <Link to={page.href} className={styles.chip}>
                  {page.title}
                </Link>
              ) : (
                <span className={`${styles.chip} ${styles.static}`}>{route}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
