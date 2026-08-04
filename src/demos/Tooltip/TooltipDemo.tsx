import { Tooltip } from './Tooltip'
import styles from './Tooltip.module.scss'

export function TooltipDemo() {
  return (
    <div className={styles.demo}>
      <Tooltip label="カートに追加します">
        <button type="button" className={styles.btn}>
          カート
        </button>
      </Tooltip>
      <Tooltip label="あとで見るリストに保存">
        <button type="button" className={styles.btn}>
          ♡ 保存
        </button>
      </Tooltip>
    </div>
  )
}
