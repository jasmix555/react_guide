import { useLocale } from '@/hooks/useLocale'

import { Tooltip } from './Tooltip'
import styles from './Tooltip.module.scss'

export function TooltipDemo() {
  const en = useLocale() === 'en'
  return (
    <div className={styles.demo}>
      <Tooltip label={en ? 'Adds this to your cart' : 'カートに追加します'}>
        <button type="button" className={styles.btn}>
          {en ? 'Cart' : 'カート'}
        </button>
      </Tooltip>
      <Tooltip label={en ? 'Save to your watch-later list' : 'あとで見るリストに保存'}>
        <button type="button" className={styles.btn}>
          {en ? '♡ Save' : '♡ 保存'}
        </button>
      </Tooltip>
    </div>
  )
}
