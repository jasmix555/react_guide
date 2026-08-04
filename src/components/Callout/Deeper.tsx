import type { ReactNode } from 'react'

import styles from './style.module.scss'

/**
 * 深掘り — progressive disclosure. Closed by default. Everything the official
 * docs put inline (internals, edge cases, "why React does it this way") goes
 * here so it never blocks the main read.
 */
export function Deeper({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className={styles.deeper}>
      <summary>
        <span className={styles.deeperTag}>深掘り</span>
        <span>{title}</span>
      </summary>
      <div className={styles.deeperBody}>{children}</div>
    </details>
  )
}
