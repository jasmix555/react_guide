import { type ReactNode, useEffect, useRef, useState } from 'react'

import styles from './ScrollReveal.module.scss'

/**
 * 画面に入ったら 1 度だけフワッと出す。スクロール位置は自分で計算せず、
 * IntersectionObserver（要素が見えたら教えてくれるブラウザの機能）に任せる。
 */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect() // 一度出したら監視をやめる
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={shown ? `${styles.reveal} ${styles.shown}` : styles.reveal}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
