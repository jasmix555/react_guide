import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import styles from './GsapScroll.module.scss'

// ScrollTrigger は別プラグイン。使う前に 1 度だけ登録する。
gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollTrigger の scrub の実演。この箱が画面を通り過ぎる進み具合に合わせて、
 * バーが伸び・四角が回る（スクロールを止めれば動きも止まる）。
 * 「動きを減らす」設定のときは動かさない。
 */
export function GsapScroll() {
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
      <p className={styles.hint}>↓ ページをスクロールすると、進み具合に合わせて動きます</p>
      <div className={styles.track}>
        <div className={styles.fill} />
      </div>
      <div className={styles.squareRow}>
        <div className={styles.square} />
      </div>
    </div>
  )
}
