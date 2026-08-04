import { motion, useReducedMotion } from 'motion/react'

import styles from './HoverTap.module.scss'

/**
 * whileHover / whileTap の実演。乗せると少し大きく、押すと少し小さく。動きを減らす
 * 設定のときは反応させない。
 */
export function HoverTapDemo() {
  const reduce = useReducedMotion()

  return (
    <motion.button
      type="button"
      className={styles.btn}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      乗せる・押す
    </motion.button>
  )
}
