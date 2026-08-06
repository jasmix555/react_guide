import { useState } from 'react'

import products from '@/data/products.json'
import { useLocale } from '@/hooks/useLocale'

import styles from './MiniRouter.module.scss'

/**
 * A demo that shows the "look" of routing entirely inside a box. Nesting a real react-router
 * here would nest <Router> twice and throw an error (because the whole site is already inside
 * a Router). So this demo switches screens with state instead. You learn the real react-router
 * usage (createBrowserRouter / Link / useParams) in each page's code.
 */
export function MiniRouterDemo() {
  const en = useLocale() === 'en'
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const product = selectedId ? products.find((p) => p.id === selectedId) : null

  if (product) {
    return (
      <div className={styles.pane}>
        <button type="button" className={styles.back} onClick={() => setSelectedId(null)}>
          <span aria-hidden>←</span> {en ? 'Back to list' : '一覧へ'}
        </button>
        <h3 className={styles.name}>{en ? product.nameEn : product.name}</h3>
        <p className={styles.price}>
          {en ? `${product.price.toLocaleString()}` : `${product.price.toLocaleString()}円`}
        </p>
        <p className={styles.cat}>{en ? 'Category: ' : 'カテゴリ：'}{product.category}</p>
      </div>
    )
  }

  return (
    <div className={styles.pane}>
      <p className={styles.crumb}>{en ? 'Products' : '商品一覧'}</p>
      <ul className={styles.list}>
        {products.slice(0, 3).map((p) => (
          <li key={p.id}>
            <button type="button" className={styles.link} onClick={() => setSelectedId(p.id)}>
              {en ? p.nameEn : p.name} <span aria-hidden>→</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
