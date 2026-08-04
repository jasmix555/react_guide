import { useState } from 'react'

import styles from './StarRating.module.scss'

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

/**
 * 星をクリックして評価を決める。確定した値（value）と、ホバー中の一時プレビュー
 * （hover）の 2 つを持ち、「ホバー優先、無ければ確定値」を表示する。
 */
export function StarRating({ value, onChange, max = 5 }: StarRatingProps) {
  const [hover, setHover] = useState(0)
  const shown = hover || value

  return (
    <div className={styles.stars} role="radiogroup" aria-label="評価">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={n === value}
          aria-label={`星 ${n} つ`}
          className={styles.star}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
        >
          <span className={n <= shown ? styles.on : styles.off}>{n <= shown ? '★' : '☆'}</span>
        </button>
      ))}
    </div>
  )
}
