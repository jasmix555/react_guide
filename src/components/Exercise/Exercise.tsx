import type { ReactNode } from 'react'

import { useStrings } from '@/hooks/useLocale'

import styles from './style.module.scss'

/**
 * 練習問題 block. The task is always visible; the answer is collapsed. Modelled
 * on react.dev's Challenges — the main reason their Learn section sticks.
 */
export function Exercise({
  title,
  children,
  answer,
}: {
  title?: string
  children: ReactNode
  answer?: ReactNode
}) {
  const strings = useStrings()
  return (
    <section className={styles.exercise}>
      <p className={styles.head}>
        {strings.page.exerciseHeading}
        {title ? `：${title}` : ''}
      </p>
      <div className={styles.task}>{children}</div>
      {answer && (
        <details className={styles.answer}>
          <summary>{strings.page.showAnswer}</summary>
          <div className={styles.answerBody}>{answer}</div>
        </details>
      )}
    </section>
  )
}
