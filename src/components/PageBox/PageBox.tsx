import type { ReactNode } from 'react'

import { strings } from '@/config/strings.ja'

import styles from './style.module.scss'

/** Top-of-page "このページで学ぶこと" box (react.dev's "You will learn"). */
export function LearnBox({ children }: { children: ReactNode }) {
  return (
    <aside className={`${styles.box} ${styles.learn}`}>
      <p className={styles.head}>{strings.page.learnHeading}</p>
      <div className={styles.body}>{children}</div>
    </aside>
  )
}

/** Bottom-of-page "まとめ" recap box. */
export function SummaryBox({ children }: { children: ReactNode }) {
  return (
    <aside className={`${styles.box} ${styles.summary}`}>
      <p className={styles.head}>{strings.page.summaryHeading}</p>
      <div className={styles.body}>{children}</div>
    </aside>
  )
}
