import { useSite } from '@/hooks/useLocale'

import styles from './style.module.scss'

/** Site-wide copyright line. Rendered by the docs shell and the home page. */
export function Footer() {
  const site = useSite()
  return (
    <footer className={styles.footer}>
      <p className={styles.line}>
        © {new Date().getFullYear()} {site.author}
      </p>
    </footer>
  )
}
