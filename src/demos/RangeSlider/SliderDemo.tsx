import { useState } from 'react'

import { RangeSlider } from './RangeSlider'
import styles from './RangeSlider.module.scss'

export function SliderDemo() {
  const [max, setMax] = useState(5000)

  return (
    <div className={styles.demo}>
      <RangeSlider
        label="価格の上限"
        min={0}
        max={10000}
        step={500}
        value={max}
        onChange={setMax}
        format={(v) => `${v.toLocaleString()} 円以下`}
      />
      <p className={styles.readout}>
        選択中：<strong>{max.toLocaleString()} 円以下</strong>
      </p>
    </div>
  )
}
