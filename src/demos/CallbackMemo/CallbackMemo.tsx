import { memo, useCallback, useRef, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './CallbackMemo.module.scss'

interface ChildProps {
  onAction: () => void
  label: string
  buttonLabel: string
}

// ponytail: the child counts its own renders by incrementing a ref during render.
// That is impure and normally a bug — here the number IS the lesson. StrictMode
// doubles the absolute count in dev; only "does it grow or stay put" matters.
const Child = memo(function Child({ onAction, label, buttonLabel }: ChildProps) {
  const renders = useRef(0)
  // eslint-disable-next-line react-hooks/refs -- deliberate: the render count is the lesson
  renders.current += 1

  return (
    <div className={styles.child}>
      {/* eslint-disable-next-line react-hooks/refs -- deliberate: showing the render count */}
      <p className={styles.count}>{renders.current}</p>
      <p className={styles.label}>{label}</p>
      <button type="button" onClick={onAction}>
        {buttonLabel}
      </button>
    </div>
  )
})

export function CallbackMemoDemo() {
  const en = useLocale() === 'en'
  const [clicks, setClicks] = useState(0)
  const [cbOn, setCbOn] = useState(true)
  const [hits, setHits] = useState(0)

  // Same body, two identities: `stable` is the same function on every render,
  // `unstable` is a brand-new one each time.
  const stable = useCallback(() => setHits((h) => h + 1), [])
  const unstable = () => setHits((h) => h + 1)

  return (
    <div className={styles.wrap}>
      <label className={styles.toggle}>
        <input type="checkbox" checked={cbOn} onChange={() => setCbOn((v) => !v)} />
        {en ? 'useCallback on' : 'useCallback あり'}
      </label>

      <Child
        onAction={cbOn ? stable : unstable}
        label={en ? 'child renders' : '子の描画回数'}
        buttonLabel={en ? 'press me' : '押してみる'}
      />

      <div className={styles.actions}>
        <button type="button" onClick={() => setClicks((c) => c + 1)}>
          {en ? `Unrelated count: ${clicks}` : `無関係なカウント: ${clicks}`}
        </button>
      </div>

      <p className={styles.hint}>
        {en
          ? `Press the unrelated count with useCallback on: the child's number stays put. Turn it off and the number climbs with every press. (child button pressed ${hits}×)`
          : `useCallback ありで「無関係なカウント」を押すと、子の数字は動きません。なしにすると、押すたびに増えます。（子のボタン ${hits} 回）`}
      </p>
    </div>
  )
}
