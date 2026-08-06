import { type ReactNode, useEffect, useRef, useState } from 'react'

import styles from './ScrollReveal.module.scss'

/**
 * Fades in once, the first time the element enters the viewport. It does not
 * compute the scroll position itself; it leaves that to IntersectionObserver
 * (the browser feature that notifies you when an element becomes visible).
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
          io.disconnect() // stop observing once it has been shown
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
