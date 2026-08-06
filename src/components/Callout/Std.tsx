import type { ReactNode } from 'react'

import { useStrings } from '@/hooks/useLocale'

import styles from './style.module.scss'

/**
 * 「うちの標準」 — the signature element. Ends the ambiguity on any topic where
 * more than one approach exists: the decision, the reason, and (collapsed) when
 * to pick something else. This is the thing the official docs structurally can't do.
 */
export function Std({
  decision,
  children,
  alt,
  altLabel,
}: {
  decision: string
  children?: ReactNode
  alt?: ReactNode
  altLabel?: string
}) {
  const strings = useStrings()
  return (
    <aside className={styles.std}>
      <span className={styles.pill}>{strings.callout.stdPill}</span>
      <p className={styles.decision}>{decision}</p>
      {children && <div className={styles.reason}>{children}</div>}
      {alt && (
        <details className={styles.stdAlt}>
          <summary>{altLabel ?? strings.callout.stdAltDefault}</summary>
          <div className={styles.stdAltBody}>{alt}</div>
        </details>
      )}
    </aside>
  )
}
