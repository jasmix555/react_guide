import type { ReactNode } from 'react'

import styles from './Tooltip.module.scss'

/**
 * ホバーとフォーカスで出るツールチップ。state も JavaScript も使わず、CSS の
 * :hover / :focus-within だけで出し入れする。中身の要素をそのまま包むだけ。
 */
export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className={styles.wrap}>
      {children}
      <span role="tooltip" className={styles.tip}>
        {label}
      </span>
    </span>
  )
}
