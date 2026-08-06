import products from '@/data/products.json'
import { useLocale } from '@/hooks/useLocale'

import styles from './ProductList.module.scss'

// A minimal product grid: array.map → JSX, with a stable `key` per item.
export function ProductListDemo() {
  const en = useLocale() === 'en'
  const items = products.slice(0, 6)

  return (
    <div className={styles.grid}>
      {items.map((product) => (
        <article className={styles.card} key={product.id}>
          <img className={styles.image} src={product.imageUrl} alt={en ? product.nameEn : product.name} />
          <div className={styles.body}>
            <h3 className={styles.name}>{en ? product.nameEn : product.name}</h3>
            <p className={styles.price}>
              {en ? `${product.price.toLocaleString()}` : `${product.price.toLocaleString()}円`}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
