import type { ReactNode } from 'react'

import styles from './style.module.scss'

/**
 * ファイルのダウンロードボタン。MdxLink（内部リンクを react-router で処理する）を
 * 通さず、本物の <a download> を描くために専用にする。href は public/ のパス。
 */
export function Download({
  href,
  filename,
  children,
}: {
  href: string
  filename: string
  children: ReactNode
}) {
  return (
    <a className={styles.button} href={href} download={filename}>
      <span className={styles.icon} aria-hidden>
        ⬇
      </span>
      {children}
    </a>
  )
}
