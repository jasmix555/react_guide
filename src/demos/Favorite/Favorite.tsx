import clsx from 'clsx'
import { useState } from 'react'

import products from '@/data/products.json'

import styles from './Favorite.module.scss'

// Click toggles a boolean state; the heart and label follow it.
export function FavoriteDemo() {
  const product = products[0]
  const [favorite, setFavorite] = useState(false)

  return (
    <div className={styles.card}>
      <img className={styles.image} src={product.imageUrl} alt={product.name} />
      <div className={styles.body}>
        <span className={styles.name}>{product.name}</span>
        <button
          type="button"
          className={clsx(styles.heart, favorite && styles.on)}
          onClick={() => setFavorite((prev) => !prev)}
          aria-pressed={favorite}
        >
          {favorite ? '♥ お気に入り済み' : '♡ お気に入り'}
        </button>
      </div>
    </div>
  )
}
