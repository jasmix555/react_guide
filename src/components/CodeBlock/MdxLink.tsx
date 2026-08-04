import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * Anchors inside MDX: in-app routes use react-router <Link> (no full reload),
 * hash links stay plain (CSS smooth-scroll handles them), external links open
 * in a new tab.
 */
export function MdxLink({ href = '', children, ...rest }: ComponentPropsWithoutRef<'a'>) {
  if (href.startsWith('#')) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }
  if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  )
}
