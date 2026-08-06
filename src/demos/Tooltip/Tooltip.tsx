import type { ReactNode } from 'react'

import styles from './Tooltip.module.scss'

/**
 * A tooltip shown on hover and focus. It uses no state and no JavaScript, showing
 * and hiding purely with CSS :hover / :focus-within. It just wraps its children.
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
