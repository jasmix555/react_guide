/* eslint-disable react-hooks/set-state-in-effect --
   The essence of data fetching is "after the async work completes, put the result into
   state." Calling setState inside an effect is exactly the correct pattern this part
   teaches (in a real app this is often delegated to react-query / TanStack Query etc.). */
import { useEffect, useState } from 'react'

import products from '@/data/products.json'
import { useLocale } from '@/hooks/useLocale'

import styles from './FetchDemo.module.scss'

type Status = 'loading' | 'error' | 'success'

/**
 * A demo that shows the 3 states of data fetching (loading, failed, success). It uses no
 * real network calls; setTimeout simulates a "time-consuming process" (stable, with no
 * external dependencies).
 */
export function FetchDemo() {
  const en = useLocale() === 'en'
  const [mode, setMode] = useState<'ok' | 'fail'>('ok')
  const [nonce, setNonce] = useState(0)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    setStatus('loading')
    const timer = setTimeout(() => setStatus(mode === 'fail' ? 'error' : 'success'), 800)
    return () => clearTimeout(timer)
  }, [mode, nonce])

  function reload(next: 'ok' | 'fail') {
    setMode(next)
    setNonce((n) => n + 1)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <button type="button" className={styles.btn} onClick={() => reload('ok')}>
          {en ? 'Load successfully' : '成功で読み込む'}
        </button>
        <button type="button" className={styles.btn} onClick={() => reload('fail')}>
          {en ? 'Make it fail' : '失敗させる'}
        </button>
      </div>

      <div className={styles.pane}>
        {status === 'loading' && <p className={styles.msg}>{en ? 'Loading…' : '読み込み中…'}</p>}
        {status === 'error' && <p className={styles.err}>{en ? 'Failed to load' : '読み込みに失敗しました'}</p>}
        {status === 'success' && (
          <ul className={styles.list}>
            {products.slice(0, 3).map((p) => (
              <li key={p.id}>{en ? p.nameEn : p.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
