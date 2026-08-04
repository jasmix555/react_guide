import { useRef, useState } from 'react'

import styles from './Toast.module.scss'

interface Toast {
  id: number
  msg: string
}

/**
 * 出したメッセージを一覧（配列）で持ち、2.5 秒後に自分を消す。id はマウントごとに
 * 増えるカウンター（useRef）で作るので、重複しない。
 */
export function ToastDemo() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const idRef = useRef(0)

  function notify(msg: string) {
    const id = idRef.current++
    setToasts((list) => [...list, { id, msg }])
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id))
    }, 2500)
  }

  return (
    <div className={styles.demo}>
      <div className={styles.buttons}>
        <button type="button" className={styles.btn} onClick={() => notify('保存しました')}>
          保存
        </button>
        <button type="button" className={styles.btn} onClick={() => notify('リンクをコピーしました')}>
          コピー
        </button>
      </div>

      <div className={styles.toaster} role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={styles.toast}>
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  )
}
