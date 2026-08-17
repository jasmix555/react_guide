import { useEffect, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import { Skeleton } from './Skeleton'
import styles from './Skeleton.module.scss'

const products = [
  { id: 'a', name: 'セラミックマグ', nameEn: 'Ceramic mug', price: 1800 },
  { id: 'b', name: 'ホーローマグ', nameEn: 'Enamel mug', price: 2400 },
  { id: 'c', name: 'リネンエプロン', nameEn: 'Linen apron', price: 5200 },
  { id: 'd', name: 'ガラスカラフェ', nameEn: 'Glass carafe', price: 3600 },
  { id: 'e', name: '木製トレー', nameEn: 'Wooden tray', price: 4200 },
  { id: 'f', name: 'コットンふきん', nameEn: 'Cotton cloth', price: 900 },
  { id: 'g', name: '真鍮スプーン', nameEn: 'Brass spoon', price: 1500 },
  { id: 'h', name: '陶器の花瓶', nameEn: 'Stoneware vase', price: 6800 },
]

export function SkeletonDemo() {
  const en = useLocale() === 'en'
  const [loading, setLoading] = useState(true)
  const [round, setRound] = useState(0)

  // Stands in for a fetch. Real code would set loading false in the `finally`.
  // Turning loading ON belongs to the click that starts the reload, not here —
  // setState in an effect body just causes a second render for no reason.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [round])

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.reload}
        disabled={loading}
        onClick={() => {
          setLoading(true)
          setRound((n) => n + 1)
        }}
      >
        {loading ? (en ? 'Loading…' : '読み込み中…') : en ? 'Load again' : 'もう一度読み込む'}
      </button>

      {/* One live region carries the state; the grey boxes themselves are hidden. */}
      <p className={styles.srOnly} role="status">
        {loading ? (en ? 'Loading products' : '商品を読み込み中') : ''}
      </p>

      <div className={styles.grid}>
        {loading
          ? products.map((p) => (
              <div key={p.id} className={styles.card}>
                <Skeleton height="72px" />
                <Skeleton width="70%" />
                <Skeleton width="40%" height="0.8em" />
              </div>
            ))
          : products.map((p) => (
              <div key={p.id} className={styles.card}>
                <div style={{ height: '72px', background: 'var(--c-sunk)', borderRadius: '6px' }} />
                <span className={styles.name}>{en ? p.nameEn : p.name}</span>
                <span className={styles.price}>¥{p.price.toLocaleString()}</span>
              </div>
            ))}
      </div>
    </div>
  )
}
