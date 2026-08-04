import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import styles from './GsapTimeline.module.scss'

/**
 * gsap.timeline() の実演。① → ② → ③ が順番に入り、最後に「完了」が弾んで出る。
 * タイムラインに繋げるだけで「順番」と「重なり」を作れる。
 */
export function GsapTimeline() {
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
        <span className={styles.step}>① 準備</span>
        <span className={styles.step}>② 実行</span>
        <span className={styles.step}>③ 確認</span>
        <span className={styles.done}>✓ 完了</span>
      </div>
      <button type="button" className={styles.replay} onClick={() => tl.current?.restart()}>
        もう一度
      </button>
    </div>
  )
}
