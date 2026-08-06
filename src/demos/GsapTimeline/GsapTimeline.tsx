import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './GsapTimeline.module.scss'

/**
 * gsap.timeline() demo. ① → ② → ③ enter in order, then "Done" pops in with a bounce.
 * Just chaining onto the timeline gives you "order" and "overlap".
 */
export function GsapTimeline() {
  const en = useLocale() === 'en'
  const container = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        tl.current = gsap
          .timeline()
          .from(`.${styles.step}`, {
            opacity: 0,
            x: -24,
            duration: 0.4,
            stagger: 0.25,
            ease: 'power2.out',
          })
          .from(
            `.${styles.done}`,
            { opacity: 0, scale: 0.6, duration: 0.4, ease: 'back.out(2)' },
            '+=0.1',
          )
      })
    },
    { scope: container },
  )

  return (
    <div className={styles.wrap} ref={container}>
      <div className={styles.row}>
        <span className={styles.step}>{en ? '① Prepare' : '① 準備'}</span>
        <span className={styles.step}>{en ? '② Run' : '② 実行'}</span>
        <span className={styles.step}>{en ? '③ Check' : '③ 確認'}</span>
        <span className={styles.done}>{en ? '✓ Done' : '✓ 完了'}</span>
      </div>
      <button type="button" className={styles.replay} onClick={() => tl.current?.restart()}>
        {en ? 'Play again' : 'もう一度'}
      </button>
    </div>
  )
}
