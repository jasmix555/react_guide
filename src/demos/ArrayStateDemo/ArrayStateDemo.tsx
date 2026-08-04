import { useState } from 'react'

import styles from './ArrayStateDemo.module.scss'

// Add / remove / reorder — all without mutating the original array.
export function ArrayStateDemo() {
  const [items, setItems] = useState<string[]>(['トマト', 'たまご', '牛乳'])
  const [text, setText] = useState('')

  function add() {
    const value = text.trim()
    if (!value) return
    setItems((prev) => [...prev, value]) // 追加：新しい配列を作る
    setText('')
  }

  function remove(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index)) // 削除：filter
  }

  function moveUp(index: number) {
    if (index === 0) return
    setItems((prev) => {
      const next = [...prev] // コピーしてから入れ替える
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.form}>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="買うものを入力"
          aria-label="買うもの"
        />
        <button type="button" className={styles.add} onClick={add}>
          追加
        </button>
      </div>

      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={item + i} className={styles.item}>
            <span>{item}</span>
            <span className={styles.actions}>
              <button type="button" onClick={() => moveUp(i)} disabled={i === 0}>
                ↑
              </button>
              <button type="button" onClick={() => remove(i)}>
                削除
              </button>
            </span>
          </li>
        ))}
        {items.length === 0 && <li className={styles.empty}>リストは空です</li>}
      </ul>
    </div>
  )
}
