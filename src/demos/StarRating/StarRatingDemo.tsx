import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import { StarRating } from './StarRating'
import styles from './StarRating.module.scss'

export function StarRatingDemo() {
  const en = useLocale() === 'en'
  const [rating, setRating] = useState(0)

  return (
    <div className={styles.demo}>
      <StarRating value={rating} onChange={setRating} />
      <p className={styles.readout}>
        {rating === 0
          ? en
            ? 'No rating yet'
            : 'まだ評価していません'
          : en
            ? `Your rating: ${rating} / 5`
            : `あなたの評価：${rating} / 5`}
      </p>
    </div>
  )
}
