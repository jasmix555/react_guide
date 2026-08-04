import { motion, useReducedMotion } from 'motion/react'

import products from '@/data/products.json'

import styles from './MotionCards.module.scss'

/**
 * Part 9 の完成イメージ。カードが少しずつ（stagger）フワッと出て、ホバーで持ち上がる。
 * 「動きを減らす」設定のときは、動かさず最初から出す（useReducedMotion）。
 */
export function MotionCards() {
  const reduce = useReducedMotion()
  const items = products.slice(0, 4)

  return (
    <motion.ul
      className={styles.grid}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
      }}
    >
      {items.map((p) => (
        <motion.li
          key={p.id}
          className={styles.card}
          variants={{
            hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0 },
          }}
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          <span className={styles.name}>{p.name}</span>
          <span className={styles.price}>{p.price.toLocaleString()}円</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
