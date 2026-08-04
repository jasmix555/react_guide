import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import products from '@/data/products.json'

import styles from './GsapStagger.module.scss'

/**
 * useGSAP の基本。マウント時にカードが少しずつ（stagger）フワッと出る。
 * scope でセレクタを箱の中に限定し、後片付けは useGSAP が自動でやる。
 * 「動きを減らす」設定のときは matchMedia で動かさない。
 */
export function GsapStagger() {
  const container = useRef<HTMLUListElement>(null)
  const anim = useRef<gsap.core.Timeline | null>(null)
  const items = products.slice(0, 4)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        anim.current = gsap.timeline().from(`.${styles.card}`, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        })
      })
    },
    { scope: container },
  )

  return (
    <div className={styles.wrap}>
      <ul className={styles.grid} ref={container}>
        {items.map((p) => (
          <li key={p.id} className={styles.card}>
            <span className={styles.name}>{p.name}</span>
            <span className={styles.price}>{p.price.toLocaleString()}円</span>
          </li>
        ))}
      </ul>
      <button type="button" className={styles.replay} onClick={() => anim.current?.restart()}>
        もう一度
      </button>
    </div>
  )
}
