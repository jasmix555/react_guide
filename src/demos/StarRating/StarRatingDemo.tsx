import { useState } from 'react'

import { StarRating } from './StarRating'
import styles from './StarRating.module.scss'

export function StarRatingDemo() {
  const [rating, setRating] = useState(0)

  return (
    <div className={styles.demo}>
      <StarRating value={rating} onChange={setRating} />
      <p className={styles.readout}>
        {rating === 0 ? 'まだ評価していません' : `あなたの評価：${rating} / 5`}
      </p>
    </div>
  )
}
