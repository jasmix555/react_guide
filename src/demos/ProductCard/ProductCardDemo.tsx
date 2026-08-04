import products from '@/data/products.json'

import { ProductCard } from './ProductCard'
import styles from './ProductCard.module.scss'

export function ProductCardDemo() {
  return (
    <div className={styles.grid}>
      {products.slice(0, 4).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
