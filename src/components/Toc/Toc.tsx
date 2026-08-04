import clsx from 'clsx'

import { strings } from '@/config/strings.ja'
import type { NavHeading } from '@/types/nav'

import styles from './style.module.scss'

/** On-page table of contents (h2), scroll-spy highlighted. Hidden < 1200px. */
export function Toc({
  headings,
  activeId,
}: {
  headings: NavHeading[]
  activeId: string | null
}) {
  function onClick(e: React.MouseEvent, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <nav className={styles.toc} aria-label={strings.nav.onThisPage}>
      <p className={styles.title}>{strings.nav.onThisPage}</p>
      <ul className={styles.list}>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={clsx(styles.link, h.id === activeId && styles.active)}
              onClick={(e) => onClick(e, h.id)}
            >
              {h.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
