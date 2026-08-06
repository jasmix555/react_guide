import { useEffect, useRef, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './BackToTop.module.scss'

/**
 * A "back to top" button. Instead of recomputing the scroll position each time, it watches
 * a sentinel placed at the very top with an IntersectionObserver and shows the button once
 * the sentinel leaves the screen. Since this is a demo, the observed range (root) is the
 * inner scroll box below.
 */
export function BackToTopDemo() {
  const en = useLocale() === 'en'
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
            {en ? `Try scrolling down (${i + 1} / 12)` : `下にスクロールしてみてください（${i + 1} / 12）`}
          </p>
        ))}
      </div>
      {show && (
        <button type="button" className={styles.top} onClick={toTop}>
          {en ? '↑ Top' : '↑ トップへ'}
        </button>
      )}
    </div>
  )
}
