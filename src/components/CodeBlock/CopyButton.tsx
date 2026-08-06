import { useState } from 'react'

import { useStrings } from '@/hooks/useLocale'

import styles from './style.module.scss'

export function CopyButton({ getText }: { getText: () => string }) {
  const strings = useStrings()
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(getText())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard blocked (insecure context / permissions) — no-op.
    }
  }

  return (
    <button type="button" className={styles.copy} onClick={copy}>
      {copied ? strings.mdx.copied : strings.mdx.copy}
    </button>
  )
}
