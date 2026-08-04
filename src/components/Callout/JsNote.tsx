import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import styles from './style.module.scss'

/**
 * Inline JavaScript refresher. The first time a JS feature shows up in an
 * example, a collapsed JsNote sits under the code so a reader who's shaky on JS
 * never has to leave the page to keep going.
 */
export function JsNote({
  feature,
  to,
  children,
}: {
  feature: string
  /** Link to the Part 1 page that explains this feature in full. */
  to?: string
  children: ReactNode
}) {
  return (
    <details className={styles.jsnote}>
      <summary>
        <span className={styles.jsTag}>JS のおさらい</span>
        <span>{feature}</span>
      </summary>
      <div className={styles.jsBody}>
        {children}
        {to && (
          <>
            {' '}
            <Link to={to}>詳しく →</Link>
          </>
        )}
      </div>
    </details>
  )
}
