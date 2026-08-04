import styles from './RangeSlider.module.scss'

interface RangeSliderProps {
  label: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  format?: (value: number) => string
}

/**
 * ネイティブの <input type="range"> を薄く包んだだけのスライダー。値は親が state
 * で持ち（制御コンポーネント）、色は accent-color で CSS から着ける。
 */
export function RangeSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  format,
}: RangeSliderProps) {
  return (
    <label className={styles.wrap}>
      <span className={styles.label}>
        {label}
        <span className={styles.value}>{format ? format(value) : value}</span>
      </span>
      <input
        type="range"
        className={styles.range}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}
