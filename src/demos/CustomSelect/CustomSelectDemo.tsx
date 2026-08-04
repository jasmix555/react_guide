import { useState } from 'react'

import { CustomSelect } from './CustomSelect'
import styles from './CustomSelect.module.scss'

const options = [
  { value: 'newest', label: '新着順' },
  { value: 'price-asc', label: '価格が安い順' },
  { value: 'price-desc', label: '価格が高い順' },
  { value: 'popular', label: '人気順' },
]

export function CustomSelectDemo() {
  const [sort, setSort] = useState('newest')

  return (
    <div className={styles.demo}>
      <label className={styles.nativeWrap}>
        <span className={styles.label}>標準の select（おすすめ）</span>
        <select className={styles.native} value={sort} onChange={(e) => setSort(e.target.value)}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <CustomSelect label="自作のセレクト" options={options} value={sort} onChange={setSort} />
    </div>
  )
}
