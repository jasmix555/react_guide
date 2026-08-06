import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import products from '@/data/products.json'
import { useLocale } from '@/hooks/useLocale'

import styles from './GsapStagger.module.scss'

/**
 * useGSAP basics. On mount the cards fade in one after another (stagger).
 * scope limits the selectors to inside the box, and useGSAP handles cleanup for you.
 * When "reduce motion" is set, matchMedia keeps it from moving.
 */
export function GsapStagger() {
  const en = useLocale() === 'en'
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
            <span className={styles.name}>{en ? p.nameEn : p.name}</span>
            <span className={styles.price}>
              {en ? `${p.price.toLocaleString()}` : `${p.price.toLocaleString()}円`}
            </span>
          </li>
        ))}
      </ul>
      <button type="button" className={styles.replay} onClick={() => anim.current?.restart()}>
        {en ? 'Play again' : 'もう一度'}
      </button>
    </div>
  )
}
