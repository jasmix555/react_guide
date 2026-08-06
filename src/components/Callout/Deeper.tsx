import type { ReactNode } from 'react'

import { useStrings } from '@/hooks/useLocale'

import styles from './style.module.scss'

/**
 * 深掘り — progressive disclosure. Closed by default. Everything the official
 * docs put inline (internals, edge cases, "why React does it this way") goes
 * here so it never blocks the main read.
 */
export function Deeper({ title, children }: { title: string; children: ReactNode }) {
  const strings = useStrings()
  return (
    <details className={styles.deeper}>
      <summary>
        <span className={styles.deeperTag}>{strings.callout.deeperTag}</span>
        <span>{title}</span>
      </summary>
      <div className={styles.deeperBody}>{children}</div>
    </details>
  )
}
