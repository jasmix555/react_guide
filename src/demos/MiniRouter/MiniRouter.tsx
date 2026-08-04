import { useState } from 'react'

import products from '@/data/products.json'

import styles from './MiniRouter.module.scss'

/**
 * ルーティングの「見た目」を、箱の中だけで実演するデモ。本物の react-router を
 * ここに入れ子にすると <Router> が二重になってエラーになる（サイト全体が既に
 * Router の中だから）。そこでこのデモは state で画面を切り替えている。react-router
 * の実際の書き方（createBrowserRouter / Link / useParams）は各ページのコードで学ぶ。
 */
export function MiniRouterDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const product = selectedId ? products.find((p) => p.id === selectedId) : null

  if (product) {
    return (
      <div className={styles.pane}>
        <button type="button" className={styles.back} onClick={() => setSelectedId(null)}>
          <span aria-hidden>←</span> 一覧へ
        </button>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{product.price.toLocaleString()}円</p>
        <p className={styles.cat}>カテゴリ：{product.category}</p>
      </div>
    )
  }

  return (
    <div className={styles.pane}>
      <p className={styles.crumb}>商品一覧</p>
      <ul className={styles.list}>
        {products.slice(0, 3).map((p) => (
          <li key={p.id}>
            <button type="button" className={styles.link} onClick={() => setSelectedId(p.id)}>
              {p.name} <span aria-hidden>→</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
