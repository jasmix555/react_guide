import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import { Pagination } from './Pagination'
import styles from './Pagination.module.scss'

const PER_PAGE = 4

const items = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `商品 ${i + 1}`,
  nameEn: `Item ${i + 1}`,
  price: 1200 + i * 350,
}))

export function PaginationDemo() {
  const en = useLocale() === 'en'
  const [page, setPage] = useState(1)

  // Derived, not stored: the slice is recalculated from `page` on every render,
  // so there is no second copy of the list that can drift out of sync.
  const pageCount = Math.ceil(items.length / PER_PAGE)
  const visible = items.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className={styles.root}>
      <p className={styles.count}>
        {en
          ? `${items.length} items · page ${page} of ${pageCount}`
          : `全 ${items.length} 件 · ${page} / ${pageCount} ページ`}
      </p>

      <ul className={styles.list}>
        {visible.map((item) => (
          <li key={item.id} className={styles.row}>
            <span>{en ? item.nameEn : item.name}</span>
            <span className={styles.price}>¥{item.price.toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <Pagination page={page} pageCount={pageCount} onChange={setPage} />
    </div>
  )
}
