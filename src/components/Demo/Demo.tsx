import { type ReactNode, useState } from 'react'

import styles from './style.module.scss'

/**
 * The single most important feature of the site: a real, working component
 * rendered directly above its source, so a coworker can click the actual button
 * and then read the code that made it.
 *
 * `<Demo>` is the bordered preview + reset. The source lives in an adjacent
 * `<DemoSource>` (a collapsible, Shiki-highlighted code block).
 */
export function Demo({ title, children }: { title?: string; children: ReactNode }) {
  const [nonce, setNonce] = useState(0)

  return (
    <section className={styles.demo}>
      <header className={styles.head}>
        <span className={styles.label}>
          ライブデモ{title ? `：${title}` : ''}
        </span>
        <button
          type="button"
          className={styles.reset}
          onClick={() => setNonce((n) => n + 1)}
        >
          リセット
        </button>
      </header>
      {/* Changing the key remounts children, resetting their state. */}
      <div className={styles.stage} key={nonce}>
        {children}
      </div>
    </section>
  )
}
