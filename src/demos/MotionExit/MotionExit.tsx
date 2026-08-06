import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './MotionExit.module.scss'

/**
 * AnimatePresence demo. Adding slides open, removing slides closed. For a disappearing
 * element, AnimatePresence waits for the exit animation before it leaves the DOM.
 */
export function MotionExitDemo() {
  const en = useLocale() === 'en'
  const reduce = useReducedMotion()
  const [items, setItems] = useState([
    { id: 1, name: en ? 'Tomato' : 'トマト' },
    { id: 2, name: en ? 'Egg' : 'たまご' },
    { id: 3, name: en ? 'Milk' : '牛乳' },
  ])
  const [next, setNext] = useState(4)

  function add() {
    setItems((xs) => [...xs, { id: next, name: en ? `Item ${next}` : `商品 ${next}` }])
    setNext((n) => n + 1)
  }
  function remove(id: number) {
    setItems((xs) => xs.filter((x) => x.id !== id))
  }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.add} onClick={add}>
        {en ? '＋ Add' : '＋ 追加'}
      </button>
      <ul className={styles.list}>
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              className={styles.item}
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span>{item.name}</span>
              <button type="button" className={styles.del} onClick={() => remove(item.id)}>
                {en ? 'Delete' : '削除'}
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
