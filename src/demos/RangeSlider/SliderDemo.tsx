import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import { RangeSlider } from './RangeSlider'
import styles from './RangeSlider.module.scss'

export function SliderDemo() {
  const en = useLocale() === 'en'
  const [max, setMax] = useState(5000)

  return (
    <div className={styles.demo}>
      <RangeSlider
        label={en ? 'Maximum price' : '価格の上限'}
        min={0}
        max={10000}
        step={500}
        value={max}
        onChange={setMax}
        format={(v) => (en ? `Up to ${v.toLocaleString()}` : `${v.toLocaleString()} 円以下`)}
      />
      <p className={styles.readout}>
        {en ? 'Selected: ' : '選択中：'}
        <strong>
          {en ? `Up to ${max.toLocaleString()}` : `${max.toLocaleString()} 円以下`}
        </strong>
      </p>
    </div>
  )
}
