import { type ComponentPropsWithoutRef, useRef } from 'react'

import { CopyButton } from './CopyButton'
import styles from './style.module.scss'

/**
 * Maps the `figure` element that rehype-pretty-code emits for a code block.
 * Adds a copy button that reads the rendered `<pre>` text. Non-code figures
 * pass straight through.
 */
export function CodeFigure(props: ComponentPropsWithoutRef<'figure'>) {
  const ref = useRef<HTMLElement>(null)
  const isCodeBlock = 'data-rehype-pretty-code-figure' in props

  if (!isCodeBlock) return <figure {...props} />

  const { children, ...rest } = props
  return (
    <figure {...rest} ref={ref} className={styles.figure}>
      <CopyButton getText={() => ref.current?.querySelector('pre')?.textContent ?? ''} />
      {children}
    </figure>
  )
}
