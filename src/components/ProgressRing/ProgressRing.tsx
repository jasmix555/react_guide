import clsx from 'clsx'

import styles from './style.module.scss'

/** A small SVG progress ring: filled arc = done/total, turns green when complete. */
export function ProgressRing({
  done,
  total,
  size = 18,
  stroke = 2.5,
}: {
  done: number
  total: number
  size?: number
  stroke?: number
}) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const pct = total > 0 ? Math.min(done / total, 1) : 0
  const complete = total > 0 && done >= total
  const mid = size / 2
  return (
    <svg
      className={styles.ring}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`${done} / ${total}`}
    >
      <circle className={styles.track} cx={mid} cy={mid} r={r} strokeWidth={stroke} fill="none" />
      <circle
        className={clsx(styles.fill, complete && styles.complete)}
        cx={mid}
        cy={mid}
        r={r}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        transform={`rotate(-90 ${mid} ${mid})`}
      />
    </svg>
  )
}
