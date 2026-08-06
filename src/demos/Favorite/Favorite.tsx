import clsx from 'clsx'
import { useState } from 'react'

import products from '@/data/products.json'
import { useLocale } from '@/hooks/useLocale'

import styles from './Favorite.module.scss'

// Click toggles a boolean state; the heart and label follow it.
export function FavoriteDemo() {
  const en = useLocale() === 'en'
  const product = products[0]
  const [favorite, setFavorite] = useState(false)

  return (
    <div className={styles.card}>
      <img className={styles.image} src={product.imageUrl} alt={en ? product.nameEn : product.name} />
      <div className={styles.body}>
        <span className={styles.name}>{en ? product.nameEn : product.name}</span>
        <button
          type="button"
          className={clsx(styles.heart, favorite && styles.on)}
          onClick={() => setFavorite((prev) => !prev)}
          aria-pressed={favorite}
        >
          {favorite ? (en ? '♥ Favorited' : '♥ お気に入り済み') : (en ? '♡ Favorite' : '♡ お気に入り')}
        </button>
      </div>
    </div>
  )
}
