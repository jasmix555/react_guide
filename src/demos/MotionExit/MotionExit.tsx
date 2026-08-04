import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

import styles from './MotionExit.module.scss'

/**
 * AnimatePresence の実演。追加はスッと開き、削除はスッと閉じる。消える要素の
 * アニメ（exit）は、DOM から消える前に AnimatePresence が待ってくれる。
 */
export function MotionExitDemo() {
  const reduce = useReducedMotion()
  const [items, setItems] = useState([
    { id: 1, name: 'トマト' },
    { id: 2, name: 'たまご' },
    { id: 3, name: '牛乳' },
  ])
  const [next, setNext] = useState(4)

  function add() {
    setItems((xs) => [...xs, { id: next, name: `商品 ${next}` }])
    setNext((n) => n + 1)
  }
  function remove(id: number) {
    setItems((xs) => xs.filter((x) => x.id !== id))
  }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.add} onClick={add}>
        ＋ 追加
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
                削除
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
