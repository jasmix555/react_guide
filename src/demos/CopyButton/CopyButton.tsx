import { useState } from 'react'

import styles from './CopyButton.module.scss'

/**
 * navigator.clipboard.writeText でコピーし、1.5 秒だけ「コピーしました」に変える。
 * 表示の切り替えは copied という boolean の state 1 つで足りる。
 */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button type="button" className={styles.button} onClick={copy}>
      {copied ? 'コピーしました ✓' : 'コピー'}
    </button>
  )
}
