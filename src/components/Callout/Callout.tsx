import type { ReactNode } from 'react'

import styles from './style.module.scss'

type Variant = 'note' | 'warn' | 'mistake' | 'analogy'

const META: Record<Variant, { icon: string; label: string; cls: string }> = {
  note: { icon: '📝', label: 'メモ', cls: styles.note },
  warn: { icon: '⚠️', label: '落とし穴', cls: styles.warn },
  mistake: { icon: '✋', label: 'やりがちなミス', cls: styles.mistake },
  analogy: { icon: '💡', label: '例え話', cls: styles.analogy },
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
  const meta = META[type]
  return (
    <aside className={`${styles.callout} ${meta.cls}`}>
      <span className={styles.icon} aria-hidden>
        {meta.icon}
      </span>
      <div className={styles.body}>
        <p className={styles.title}>{title ?? meta.label}</p>
        <div className={styles.content}>{children}</div>
      </div>
    </aside>
  )
}
