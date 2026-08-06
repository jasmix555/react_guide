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
 * A thin wrapper around the native <input type="range">. The value is held by
 * the parent as state (controlled component); the color comes from CSS via accent-color.
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
