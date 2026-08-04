import type { ReactNode } from 'react'

import styles from './style.module.scss'

/**
 * Source for a Demo. Wrap a fenced code block in MDX so it stays
 * Shiki-highlighted at build time.
 *
 * On 学ぶ (teaching) pages the code IS the lesson, so this defaults to OPEN —
 * the reader must be able to read the code without clicking. The collapse
 * control stays, so it can be folded away after reading. Pass `open={false}`
 * on recipe pages where someone is grabbing a finished thing.
 *
 * ```mdx
 * <DemoSource>
 * ```tsx title="ButtonVariants.tsx"
 * ...
 * ```
 * </DemoSource>
 * ```
 */
export function DemoSource({
  children,
  open = true,
}: {
  children: ReactNode
  open?: boolean
}) {
  return (
    <details className={styles.source} open={open}>
      <summary>ソースコード（クリックで開閉）</summary>
      <div className={styles.sourceBody}>{children}</div>
    </details>
  )
}
