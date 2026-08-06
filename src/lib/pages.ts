import { type ComponentType, lazy, type LazyExoticComponent } from 'react'

import type { Locale } from '@/lib/i18n'

// Auto-discovery: every .mdx under src/content becomes a lazy-loadable page,
// keyed by "{locale}/{route}" (path without extension). No per-page route
// registration. The locale is the first folder (ja/… or en/…).
type MdxModule = { default: ComponentType }

const modules = import.meta.glob<MdxModule>('/src/content/**/*.mdx')

// Create the lazy components once, at module load — not during render (which
// would reset their state and trip react-hooks/no-create-components-in-render).
const lazyByKey: Record<string, LazyExoticComponent<ComponentType>> = {}
for (const [key, loader] of Object.entries(modules)) {
  const id = key.replace('/src/content/', '').replace(/\.mdx$/, '')
  lazyByKey[id] = lazy(loader)
}

export function lazyForRoute(
  locale: Locale,
  route: string,
): LazyExoticComponent<ComponentType> | undefined {
  return lazyByKey[`${locale}/${route}`]
}

export const knownRoutes = Object.keys(lazyByKey)
