import type { ReactNode } from 'react'

import { useStrings } from '@/hooks/useLocale'

import styles from './style.module.scss'

type Variant = 'note' | 'warn' | 'mistake' | 'analogy'

// Icon + class per variant; the label comes from the active locale's strings.
const META: Record<Variant, { icon: string; cls: string }> = {
  note: { icon: '📝', cls: styles.note },
  warn: { icon: '⚠️', cls: styles.warn },
  mistake: { icon: '✋', cls: styles.mistake },
  analogy: { icon: '💡', cls: styles.analogy },
}

/** メモ / 落とし穴 / やりがちなミス / 例え話. */
export function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: Variant
  title?: string
  children: ReactNode
}) {
  const strings = useStrings()
  const meta = META[type]
  return (
    <aside className={`${styles.callout} ${meta.cls}`}>
      <span className={styles.icon} aria-hidden>
        {meta.icon}
      </span>
      <div className={styles.body}>
        <p className={styles.title}>{title ?? strings.callout[type]}</p>
        <div className={styles.content}>{children}</div>
      </div>
    </aside>
  )
}
