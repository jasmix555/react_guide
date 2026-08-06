import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

import { stringsByLocale } from '@/config/strings'
import { localeFromPath, LOCALES, swapLocalePath } from '@/lib/i18n'

import styles from './style.module.scss'

/**
 * JA / EN segmented switch. Each entry keeps the reader on the same page in the
 * other language (swapLocalePath preserves the path after the locale segment),
 * so you can toggle mid-article without losing your place.
 */
export function LangToggle({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  const current = localeFromPath(pathname)

  return (
    <div className={styles.wrap} role="group" aria-label="Language">
      {LOCALES.map((loc) => (
        <Link
          key={loc}
          to={swapLocalePath(pathname, loc)}
          onClick={onNavigate}
          className={clsx(styles.item, loc === current && styles.active)}
          aria-current={loc === current ? 'true' : undefined}
        >
          {stringsByLocale[loc].langName}
        </Link>
      ))}
    </div>
  )
}
