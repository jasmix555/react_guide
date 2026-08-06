import clsx from 'clsx'
import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './ProductCard.module.scss'

interface Product {
  name: string
  nameEn: string
  price: number
  category: string
  imageUrl: string
  inStock: boolean
}

/**
 * The product card we build out in this part. SCSS Modules (`styles.className`) give it
 * its look: out-of-stock shows a translucent banner, and favorites use a heart toggle.
 */
export function ProductCard({ product }: { product: Product }) {
  const en = useLocale() === 'en'
  const [fav, setFav] = useState(false)

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img
          className={styles.img}
          src={product.imageUrl}
          alt={en ? product.nameEn : product.name}
          loading="lazy"
        />
        {!product.inStock && <span className={styles.sold}>{en ? 'Sold out' : '売り切れ'}</span>}
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>{en ? product.nameEn : product.name}</h3>
        <div className={styles.row}>
          <span className={styles.price}>
            {product.price.toLocaleString()}
            {!en && <span className={styles.yen}>円</span>}
          </span>
          <button
            type="button"
            className={clsx(styles.fav, fav && styles.active)}
            aria-pressed={fav}
            aria-label={en ? 'Favorite' : 'お気に入り'}
            onClick={() => setFav((f) => !f)}
          >
            {fav ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  )
}
