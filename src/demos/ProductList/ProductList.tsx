import products from '@/data/products.json'

import styles from './ProductList.module.scss'

// A minimal product grid: array.map → JSX, with a stable `key` per item.
export function ProductListDemo() {
  const items = products.slice(0, 6)

  return (
    <div className={styles.grid}>
      {items.map((product) => (
        <article className={styles.card} key={product.id}>
          <img className={styles.image} src={product.imageUrl} alt={product.name} />
          <div className={styles.body}>
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.price}>{product.price.toLocaleString()}円</p>
          </div>
        </article>
      ))}
    </div>
  )
}
