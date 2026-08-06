import { motion, useReducedMotion } from 'motion/react'

import products from '@/data/products.json'
import { useLocale } from '@/hooks/useLocale'

import styles from './MotionCards.module.scss'

/**
 * The finished look of Part 9. Cards appear softly one after another (stagger) and lift on hover.
 * When the "reduce motion" setting is on, they appear from the start without moving
 * (useReducedMotion).
 */
export function MotionCards() {
  const en = useLocale() === 'en'
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
          <span className={styles.name}>{en ? p.nameEn : p.name}</span>
          <span className={styles.price}>
            {en ? `${p.price.toLocaleString()}` : `${p.price.toLocaleString()}円`}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
