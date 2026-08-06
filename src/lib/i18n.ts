// Locale primitives. The URL's first segment is the single source of truth:
//   /ja/guide/...  -> 'ja'   (default; "/" redirects here)
//   /en/guide/...  -> 'en'
// Everything downstream (content lookup, nav labels, chrome strings) keys off this.

export const LOCALES = ['ja', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'ja'

/** react-router strips the router basename, so pathname starts at "/{locale}". */
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split('/')[1]
  return (LOCALES as readonly string[]).includes(seg) ? (seg as Locale) : DEFAULT_LOCALE
}

/** Prefix a locale-neutral in-app path ("/guide/x", "/recipes/y") with the locale. */
export function withLocale(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${clean === '/' ? '' : clean}`
}

/** Drop the leading "/{locale}" from a pathname, leaving the neutral path. */
export function stripLocale(pathname: string): string {
  const seg = pathname.split('/')[1]
  if ((LOCALES as readonly string[]).includes(seg)) {
    const rest = pathname.slice(seg.length + 1)
    return rest || '/'
  }
  return pathname
}

/** Same page, other language: swaps the locale segment, keeps the rest of the path. */
export function swapLocalePath(pathname: string, target: Locale): string {
  const neutral = stripLocale(pathname)
  return withLocale(neutral, target)
}
