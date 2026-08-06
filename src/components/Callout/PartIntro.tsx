import type { ReactNode } from 'react'

import { useStrings } from '@/hooks/useLocale'

import styles from './style.module.scss'

/**
 * 「前提の再確認」 — the box at the top of each part: what state the reader's project
 * should be in, plus a copy-paste file tree so anyone who fell behind can catch up
 * in a minute. The author writes the note + a ```text file tree as children.
 */
export function PartIntro({ title, children }: { title?: string; children: ReactNode }) {
  const strings = useStrings()
  return (
    <aside className={styles.partIntro}>
      <p className={styles.partIntroHead}>
        <span aria-hidden>🧭</span> {title ?? strings.page.partIntroHeading}
      </p>
      <div className={styles.partIntroBody}>{children}</div>
    </aside>
  )
}
