import clsx from 'clsx'
import { useState } from 'react'

import styles from './ProductCard.module.scss'

interface Product {
  name: string
  price: number
  category: string
  imageUrl: string
  inStock: boolean
}

/**
 * このパートで仕上げていく商品カード。SCSS Modules（`styles.クラス名`）で見た目を
 * 付け、在庫切れは半透明の帯、お気に入りはハートのトグルで表す。
 */
export function ProductCard({ product }: { product: Product }) {
  const [fav, setFav] = useState(false)

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img className={styles.img} src={product.imageUrl} alt={product.name} loading="lazy" />
        {!product.inStock && <span className={styles.sold}>売り切れ</span>}
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.row}>
          <span className={styles.price}>
            {product.price.toLocaleString()}
            <span className={styles.yen}>円</span>
          </span>
          <button
            type="button"
            className={clsx(styles.fav, fav && styles.active)}
            aria-pressed={fav}
            aria-label="お気に入り"
            onClick={() => setFav((f) => !f)}
          >
            {fav ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  )
}
