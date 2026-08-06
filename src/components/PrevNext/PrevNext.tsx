import { Link } from 'react-router-dom'

import { useLocale, useStrings } from '@/hooks/useLocale'
import { useReadProgress } from '@/hooks/useReadProgress'
import { prevNext } from '@/lib/nav'

import styles from './style.module.scss'

/** Prev / Next derived from the flattened navigation order of the current tab. */
export function PrevNext({ route }: { route: string }) {
  const locale = useLocale()
  const strings = useStrings()
  const { prev, next } = prevNext(locale, route)
  const { markRead } = useReadProgress()
  if (!prev && !next) return null

  return (
    <nav className={styles.wrap} aria-label={strings.nav.prevNextAria}>
      {prev ? (
        <Link to={prev.href} className={`${styles.link} ${styles.prev}`}>
          <span className={styles.dir}>← {strings.nav.prev}</span>
          <span className={styles.title}>{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={next.href}
          className={`${styles.link} ${styles.next}`}
          onClick={() => markRead(route)}
        >
          <span className={styles.dir}>{strings.nav.next} →</span>
          <span className={styles.title}>{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
