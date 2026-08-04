import { useState } from 'react'

import styles from './Counter.module.scss'

// The smallest possible useState: read `count`, update with `setCount`.
export function CounterDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.wrap}>
      <button type="button" onClick={() => setCount(count - 1)} aria-label="1 減らす">
        −
      </button>
      <span className={styles.num}>{count}</span>
      <button type="button" onClick={() => setCount(count + 1)} aria-label="1 増やす">
        ＋
      </button>
    </div>
  )
}
