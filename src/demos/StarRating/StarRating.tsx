import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './StarRating.module.scss'

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

/**
 * Click a star to set the rating. It keeps two values: the confirmed value (value)
 * and a temporary hover preview (hover), showing "hover first, else the confirmed value".
 */
export function StarRating({ value, onChange, max = 5 }: StarRatingProps) {
  const en = useLocale() === 'en'
  const [hover, setHover] = useState(0)
  const shown = hover || value

  return (
    <div className={styles.stars} role="radiogroup" aria-label={en ? 'Rating' : '評価'}>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={n === value}
          aria-label={en ? `${n} stars` : `星 ${n} つ`}
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
