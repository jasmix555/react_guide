import { motion, useReducedMotion } from 'motion/react'

import { useLocale } from '@/hooks/useLocale'

import styles from './HoverTap.module.scss'

/**
 * A demonstration of whileHover / whileTap. Hovering makes it a little bigger, pressing makes
 * it a little smaller. When the reduce-motion setting is on, it does not react.
 */
export function HoverTapDemo() {
  const en = useLocale() === 'en'
  const reduce = useReducedMotion()

  return (
    <motion.button
      type="button"
      className={styles.btn}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {en ? 'Hover / press' : '乗せる・押す'}
    </motion.button>
  )
}
