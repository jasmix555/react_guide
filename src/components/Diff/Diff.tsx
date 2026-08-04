import styles from './style.module.scss'

interface DiffProps {
  /** The wrong way — a line a beginner will actually write. */
  bad: string
  /** The right way. */
  good: string
  /** One sentence on what breaks. */
  note?: string
}

/**
 * The ❌ / ✅ pair. Red/green edge treatment, unmistakable at a glance — every
 * page carries at least one.
 */
export function Diff({ bad, good, note }: DiffProps) {
  return (
    <div className={styles.diff}>
      <div className={`${styles.row} ${styles.bad}`}>
        <span className={styles.gutter} aria-hidden>
          ❌
        </span>
        <code>{bad}</code>
      </div>
      <div className={`${styles.row} ${styles.good}`}>
        <span className={styles.gutter} aria-hidden>
          ✅
        </span>
        <code>{good}</code>
      </div>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
