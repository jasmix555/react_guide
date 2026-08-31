import { useMemo, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './Memoize.module.scss'

// ponytail: a fixed 20M-iteration loop stands in for a real expensive calculation
// (sorting or filtering thousands of rows) so the cost is visible on any machine.
function heavySum() {
  let total = 0
  for (let i = 0; i < 20_000_000; i++) total += i % 7
  return total
}

export function MemoizeDemo() {
  const en = useLocale() === 'en'
  const [clicks, setClicks] = useState(0)
  const [memoOn, setMemoOn] = useState(true)

  // Timing the render from inside the render is impure, and normally a bug. Here the
  // measurement IS the lesson — the page asks the reader to compare the two numbers.
  // eslint-disable-next-line react-hooks/purity -- deliberate: showing the render cost
  const start = performance.now()
  const cached = useMemo(() => heavySum(), [])
  const total = memoOn ? cached : heavySum()
  // eslint-disable-next-line react-hooks/purity -- deliberate: showing the render cost
  const ms = Math.round(performance.now() - start)

  return (
    <div className={styles.wrap}>
      <label className={styles.toggle}>
        <input type="checkbox" checked={memoOn} onChange={() => setMemoOn((v) => !v)} />
        {en ? 'useMemo on' : 'useMemo あり'}
      </label>

      <p className={styles.result}>
        {en ? 'total' : '合計'}: <strong>{total.toLocaleString()}</strong>
      </p>
      <p className={styles.ms}>
        {en ? 'this render took' : '今回の描画にかかった時間'}: <strong>{ms} ms</strong>
      </p>

      <div className={styles.actions}>
        <button type="button" onClick={() => setClicks((c) => c + 1)}>
          {en ? `Unrelated count: ${clicks}` : `無関係なカウント: ${clicks}`}
        </button>
      </div>

      <p className={styles.hint}>
        {en
          ? 'Press the unrelated count with useMemo on, then off. Only the second one pays the full cost every click.'
          : 'useMemo あり／なしで「無関係なカウント」を押し比べてください。なしのときだけ、毎回フルコストを払います。'}
      </p>
    </div>
  )
}
