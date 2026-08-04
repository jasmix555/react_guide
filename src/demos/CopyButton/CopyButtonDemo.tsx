import { CopyButton } from './CopyButton'
import styles from './CopyButton.module.scss'

export function CopyButtonDemo() {
  return (
    <div className={styles.demo}>
      <code className={styles.code}>npm create vite@latest</code>
      <CopyButton text="npm create vite@latest" />
    </div>
  )
}
