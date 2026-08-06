import type { ComponentPropsWithoutRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { localeFromPath, withLocale } from '@/lib/i18n'

/**
 * Anchors inside MDX: in-app routes use react-router <Link> (no full reload),
 * hash links stay plain (CSS smooth-scroll handles them), external links open
 * in a new tab.
 *
 * Content is authored with locale-neutral hrefs ("/guide/…", "/recipes/…"); we
 * prepend the reader's current locale here, so the same .mdx works in every
 * language and authors never write "/ja/…" by hand.
 */
export function MdxLink({ href = '', children, ...rest }: ComponentPropsWithoutRef<'a'>) {
  const { pathname } = useLocation()

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
  // Absolute in-app path → prepend the active locale. Relative paths pass through.
  const to = href.startsWith('/') ? withLocale(href, localeFromPath(pathname)) : href
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  )
}
