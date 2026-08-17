import styles from './Skeleton.module.scss'

/**
 * A grey block standing in for content that hasn't arrived. Sized in the caller's
 * units so each placeholder matches the shape of the real thing it replaces.
 */
export function Skeleton({ width = '100%', height = '1em' }: { width?: string; height?: string }) {
  // aria-hidden: this is decoration. The live region announcing "loading" is the
  // caller's job — a screen reader shouldn't hear a description of grey boxes.
  return <span className={styles.skeleton} style={{ width, height }} aria-hidden />
}
