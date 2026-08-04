import { useEffect, useRef, useState } from 'react'

import styles from './BackToTop.module.scss'

/**
 * 「上に戻る」ボタン。スクロール位置を毎回計算せず、いちばん上に置いた見張り役
 * （sentinel）を IntersectionObserver で監視し、それが画面から外れたら出す。
 * デモなので監視の範囲（root）は下の枠内スクロールにしている。
 */
export function BackToTopDemo() {
  const scroller = useRef<HTMLDivElement>(null)
  const sentinel = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const root = scroller.current
    const el = sentinel.current
    if (!root || !el) return
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), { root })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function toTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scroller.current?.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className={styles.frame}>
      <div ref={scroller} className={styles.scroller}>
        <div ref={sentinel} />
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className={styles.line}>
            下にスクロールしてみてください（{i + 1} / 12）
          </p>
        ))}
      </div>
      {show && (
        <button type="button" className={styles.top} onClick={toTop}>
          ↑ トップへ
        </button>
      )}
    </div>
  )
}
