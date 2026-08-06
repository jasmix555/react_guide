import type { ReactNode } from 'react'

import { useStrings } from '@/hooks/useLocale'

import styles from './style.module.scss'

/**
 * 「一緒にやってみよう」 — the inline mid-page exercise, dropped in right after a
 * concept lands (not saved for the end). `task` and `hint` are short; the answer
 * (children) holds the full file. Distinct from <Exercise>, the end-of-page 練習問題.
 */
export function Together({
  task,
  hint,
  children,
}: {
  task: ReactNode
  hint?: ReactNode
  children: ReactNode
}) {
  const strings = useStrings()
  return (
    <section className={styles.together}>
      <p className={styles.togetherHead}>
        <span aria-hidden>🙌</span> {strings.page.togetherHeading}
      </p>
      <div className={styles.task}>{task}</div>
      {hint && (
        <details className={styles.fold}>
          <summary>{strings.page.showHint}</summary>
          <div className={styles.foldBody}>{hint}</div>
        </details>
      )}
      <details className={styles.fold}>
        <summary>{strings.page.showAnswer}</summary>
        <div className={styles.foldBody}>{children}</div>
      </details>
    </section>
  )
}
