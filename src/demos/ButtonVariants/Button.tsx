import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

import styles from './Button.module.scss'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

// Extends the native <button> props, so onClick / disabled / type all work.
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant
  size?: Size
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(styles.btn, styles[variant], styles[size], className)}
      {...rest}
    />
  )
}
