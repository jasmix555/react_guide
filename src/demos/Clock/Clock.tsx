import { useEffect, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './Clock.module.scss'

// useEffect starts an interval after render and cleans it up when it stops.
export function ClockDemo() {
  const en = useLocale() === 'en'
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id) // cleanup: stop the timer
  }, [running])

  return (
    <div className={styles.wrap}>
      <p className={styles.num}>{en ? `${seconds} sec` : `${seconds} 秒`}</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => setRunning((r) => !r)}>
          {running ? (en ? 'Stop' : '止める') : (en ? 'Start' : '動かす')}
        </button>
        <button type="button" onClick={() => setSeconds(0)}>{en ? 'Reset' : 'リセット'}</button>
      </div>
    </div>
  )
}
