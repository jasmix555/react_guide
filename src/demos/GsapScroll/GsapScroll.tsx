import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './GsapScroll.module.scss'

// ScrollTrigger is a separate plugin. Register it once before use.
gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollTrigger scrub demo. As this box passes across the screen, the bar grows and the
 * square rotates in step with the progress (stop scrolling and the motion stops too).
 * When "reduce motion" is set, nothing moves.
 */
export function GsapScroll() {
  const en = useLocale() === 'en'
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const scrollTrigger = {
          trigger: container.current,
          start: 'top 85%',
          end: 'bottom 45%',
          scrub: true,
        }
        gsap.to(`.${styles.fill}`, { width: '100%', ease: 'none', scrollTrigger })
        gsap.to(`.${styles.square}`, { rotate: 360, ease: 'none', scrollTrigger })
      })
    },
    { scope: container },
  )

  return (
    <div className={styles.wrap} ref={container}>
      <p className={styles.hint}>
        {en
          ? '↓ Scroll the page and it moves in step with the progress'
          : '↓ ページをスクロールすると、進み具合に合わせて動きます'}
      </p>
      <div className={styles.track}>
        <div className={styles.fill} />
      </div>
      <div className={styles.squareRow}>
        <div className={styles.square} />
      </div>
    </div>
  )
}
