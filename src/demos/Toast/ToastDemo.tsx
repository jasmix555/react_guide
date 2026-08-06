import { useRef, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './Toast.module.scss'

interface Toast {
  id: number
  msg: string
}

/**
 * Keep the shown messages in a list (array) and let each remove itself after 2.5 seconds.
 * The id is made from a counter that increments per mount (useRef), so ids never collide.
 */
export function ToastDemo() {
  const en = useLocale() === 'en'
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
        <button
          type="button"
          className={styles.btn}
          onClick={() => notify(en ? 'Saved' : '保存しました')}
        >
          {en ? 'Save' : '保存'}
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={() => notify(en ? 'Link copied' : 'リンクをコピーしました')}
        >
          {en ? 'Copy' : 'コピー'}
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
