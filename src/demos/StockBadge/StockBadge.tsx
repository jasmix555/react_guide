import products from '@/data/products.json'

import styles from './StockBadge.module.scss'

// Conditional rendering: `? :` picks one of two badges per item.
export function StockBadgeDemo() {
  const items = products.slice(0, 4)

  return (
    <ul className={styles.list}>
      {items.map((product) => (
        <li className={styles.row} key={product.id}>
          <span className={styles.name}>{product.name}</span>
          {product.inStock ? (
            <span className={styles.in}>在庫あり</span>
          ) : (
            <span className={styles.out}>売り切れ</span>
          )}
        </li>
      ))}
    </ul>
  )
}
