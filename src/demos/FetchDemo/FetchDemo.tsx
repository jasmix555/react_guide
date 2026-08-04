/* eslint-disable react-hooks/set-state-in-effect --
   データ取得の本質は「非同期の完了後に、結果を state に入れる」こと。effect 内で
   setState するのは、まさにこのパートが教える正しいパターン（本物のアプリでは
   react-query / TanStack Query 等に任せることも多い）。 */
import { useEffect, useState } from 'react'

import products from '@/data/products.json'

import styles from './FetchDemo.module.scss'

type Status = 'loading' | 'error' | 'success'

/**
 * データ取得の 3 状態（読み込み中・失敗・成功）を見せるデモ。本物の通信は使わず、
 * setTimeout で「時間がかかる処理」を疑似的に再現している（外部依存なしで安定）。
 */
export function FetchDemo() {
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
          成功で読み込む
        </button>
        <button type="button" className={styles.btn} onClick={() => reload('fail')}>
          失敗させる
        </button>
      </div>

      <div className={styles.pane}>
        {status === 'loading' && <p className={styles.msg}>読み込み中…</p>}
        {status === 'error' && <p className={styles.err}>読み込みに失敗しました</p>}
        {status === 'success' && (
          <ul className={styles.list}>
            {products.slice(0, 3).map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
