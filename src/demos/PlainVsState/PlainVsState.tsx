/* eslint-disable react-hooks/immutability -- This demo DELIBERATELY mutates a
   plain local variable to show it does NOT re-render the screen (the whole point
   of what-is-state.mdx). The lint rule is correct in general; here it's on purpose. */
import { useState } from 'react'

import styles from './PlainVsState.module.scss'

// The core lesson: mutating a plain variable does NOT re-render; setState does.
export function PlainVsStateDemo() {
  // ❌ ただの変数：書き換えても画面は変わらない
  let plain = 0
  // ✅ state：更新すると画面が描き直される
  const [count, setCount] = useState(0)

  return (
    <div className={styles.wrap}>
      <div className={styles.col}>
        <p className={styles.label}>ただの変数</p>
        <p className={styles.num}>{plain}</p>
        <button
          type="button"
          onClick={() => {
            plain = plain + 1
            console.log('ただの変数 plain =', plain)
          }}
        >
          ＋1（変わらない）
        </button>
      </div>

      <div className={styles.col}>
        <p className={styles.label}>state</p>
        <p className={styles.num}>{count}</p>
        <button type="button" onClick={() => setCount(count + 1)}>＋1（変わる）</button>
      </div>
    </div>
  )
}
