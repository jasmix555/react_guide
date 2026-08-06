import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './CopyButton.module.scss'

/**
 * Copies with navigator.clipboard.writeText and switches to "Copied" for just 1.5 seconds.
 * A single boolean state named copied is enough to toggle the label.
 */
export function CopyButton({ text }: { text: string }) {
  const en = useLocale() === 'en'
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button type="button" className={styles.button} onClick={copy}>
      {copied ? (en ? 'Copied ✓' : 'コピーしました ✓') : en ? 'Copy' : 'コピー'}
    </button>
  )
}
