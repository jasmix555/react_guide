import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import { CustomSelect } from './CustomSelect'
import styles from './CustomSelect.module.scss'

const options = [
  { value: 'newest', label: '新着順', labelEn: 'Newest' },
  { value: 'price-asc', label: '価格が安い順', labelEn: 'Price: low to high' },
  { value: 'price-desc', label: '価格が高い順', labelEn: 'Price: high to low' },
  { value: 'popular', label: '人気順', labelEn: 'Most popular' },
]

export function CustomSelectDemo() {
  const en = useLocale() === 'en'
  const [sort, setSort] = useState('newest')
  const localizedOptions = options.map((o) => ({
    value: o.value,
    label: en ? o.labelEn : o.label,
  }))

  return (
    <div className={styles.demo}>
      <label className={styles.nativeWrap}>
        <span className={styles.label}>
          {en ? 'Native select (recommended)' : '標準の select（おすすめ）'}
        </span>
        <select className={styles.native} value={sort} onChange={(e) => setSort(e.target.value)}>
          {localizedOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <CustomSelect
        label={en ? 'Custom select' : '自作のセレクト'}
        options={localizedOptions}
        value={sort}
        onChange={setSort}
      />
    </div>
  )
}
