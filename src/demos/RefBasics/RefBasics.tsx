import { useRef, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './RefBasics.module.scss'

// Two jobs in one demo: a ref pointing at a DOM node (focus), and a ref holding a
// value. Reading refCount.current during render is normally a mistake — here it
// IS the lesson: the number on screen only catches up when state re-renders.
export function RefBasicsDemo() {
  const en = useLocale() === 'en'
  const inputRef = useRef<HTMLInputElement>(null)
  const refCount = useRef(0)
  const [stateCount, setStateCount] = useState(0)

  return (
    <div className={styles.wrap}>
      <div className={styles.col}>
        <p className={styles.label}>{en ? 'A ref pointing at the DOM' : 'DOM を指す ref'}</p>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder={en ? 'the input' : '入力欄'}
        />
        <button type="button" onClick={() => inputRef.current?.focus()}>
          {en ? 'Focus the input' : '入力欄にフォーカス'}
        </button>
      </div>

      <div className={styles.col}>
        <p className={styles.label}>{en ? 'A ref holding a value' : '値を持つ ref'}</p>
        <p className={styles.num}>
          {/* eslint-disable-next-line react-hooks/refs -- deliberate: the stale number is the lesson */}
          ref: {refCount.current} / state: {stateCount}
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => {
              refCount.current += 1
            }}
          >
            ref +1
          </button>
          <button type="button" onClick={() => setStateCount((c) => c + 1)}>
            state +1
          </button>
        </div>
        <p className={styles.hint}>
          {en
            ? 'Press ref +1 a few times: nothing moves. Then press state +1 and the ref number catches up.'
            : 'ref +1 を何回か押しても画面は動きません。そのあと state +1 を押すと、ref の数字が追いつきます。'}
        </p>
      </div>
    </div>
  )
}
