import { motion, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

import styles from './MotionReveal.module.scss'

const items = ['軽い（約 300g）', '大きい（A4 対応）', '洗える', '長持ち', 'IH 対応', '食洗機 OK']

/**
 * whileInView の実演。枠の中をスクロールすると、見えた項目が順に出る。viewport.root に
 * 枠の ref を渡して「この枠の中で見えたか」を判定する。
 */
export function MotionRevealDemo() {
  const reduce = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)

  return (
    <div ref={root} className={styles.scroller}>
      <p className={styles.hint}>↓ スクロールしてみてください</p>
      {items.map((text) => (
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
