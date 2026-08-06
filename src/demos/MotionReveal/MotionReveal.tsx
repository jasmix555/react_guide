import { motion, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './MotionReveal.module.scss'

const items = ['軽い（約 300g）', '大きい（A4 対応）', '洗える', '長持ち', 'IH 対応', '食洗機 OK']
const itemsEn = [
  'Light (about 300g)',
  'Large (fits A4)',
  'Washable',
  'Long-lasting',
  'IH compatible',
  'Dishwasher OK',
]

/**
 * whileInView demo. Scroll inside the box and each item appears in turn as it comes
 * into view. viewport.root gets the box ref so it judges "did it become visible inside
 * this box".
 */
export function MotionRevealDemo() {
  const en = useLocale() === 'en'
  const reduce = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const list = en ? itemsEn : items

  return (
    <div ref={root} className={styles.scroller}>
      <p className={styles.hint}>{en ? '↓ Try scrolling' : '↓ スクロールしてみてください'}</p>
      {list.map((text) => (
        <motion.div
          key={text}
          className={styles.item}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ root, once: true, amount: 0.8 }}
          transition={{ duration: 0.4 }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  )
}
