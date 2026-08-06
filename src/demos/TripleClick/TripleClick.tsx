import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './TripleClick.module.scss'

// Same button called 3 times: `count + 1` (stale) gives +1, `(c) => c + 1` gives +3.
export function TripleClickDemo() {
  const en = useLocale() === 'en'
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
        <p className={styles.label}>{en ? 'setStale(stale + 1) 3 times' : 'setStale(stale + 1) を 3 回'}</p>
        <p className={styles.num}>{stale}</p>
        <button type="button" onClick={addThreeStale}>{en ? 'Meant to be +3' : '＋3 のつもり'}</button>
      </div>

      <div className={styles.col}>
        <p className={styles.label}>{en ? 'setFresh(fn) 3 times' : 'setFresh(関数) を 3 回'}</p>
        <p className={styles.num}>{fresh}</p>
        <button type="button" onClick={addThreeFresh}>{en ? '+3' : '＋3'}</button>
      </div>
    </div>
  )
}
