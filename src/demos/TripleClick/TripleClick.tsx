import { useState } from 'react'

import styles from './TripleClick.module.scss'

// Same button called 3 times: `count + 1` (stale) gives +1, `(c) => c + 1` gives +3.
export function TripleClickDemo() {
  const [stale, setStale] = useState(0)
  const [fresh, setFresh] = useState(0)

  function addThreeStale() {
    setStale(stale + 1)
    setStale(stale + 1)
    setStale(stale + 1)
  }

  function addThreeFresh() {
    setFresh((c) => c + 1)
    setFresh((c) => c + 1)
    setFresh((c) => c + 1)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.col}>
        <p className={styles.label}>setStale(stale + 1) を 3 回</p>
        <p className={styles.num}>{stale}</p>
        <button type="button" onClick={addThreeStale}>＋3 のつもり</button>
      </div>

      <div className={styles.col}>
        <p className={styles.label}>setFresh(関数) を 3 回</p>
        <p className={styles.num}>{fresh}</p>
        <button type="button" onClick={addThreeFresh}>＋3</button>
      </div>
    </div>
  )
}
