import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { useLocale, useStrings } from '@/hooks/useLocale'
import { withLocale } from '@/lib/i18n'

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
  const locale = useLocale()
  const strings = useStrings()
  return (
    <details className={styles.jsnote}>
      <summary>
        <span className={styles.jsTag}>{strings.callout.jsNoteTag}</span>
        <span>{feature}</span>
      </summary>
      <div className={styles.jsBody}>
        {children}
        {to && (
          <>
            {' '}
            <Link to={to.startsWith('/') ? withLocale(to, locale) : to}>
              {strings.callout.jsNoteMore}
            </Link>
          </>
        )}
      </div>
    </details>
  )
}
