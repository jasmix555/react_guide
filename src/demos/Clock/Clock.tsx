import { useEffect, useState } from 'react'

import styles from './Clock.module.scss'

// useEffect starts an interval after render and cleans it up when it stops.
export function ClockDemo() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id) // 後片付け：タイマーを止める
  }, [running])

  return (
    <div className={styles.wrap}>
      <p className={styles.num}>{seconds} 秒</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => setRunning((r) => !r)}>
          {running ? '止める' : '動かす'}
        </button>
        <button type="button" onClick={() => setSeconds(0)}>リセット</button>
      </div>
    </div>
  )
}
