import { type ComponentType, lazy, type LazyExoticComponent } from 'react'

// Auto-discovery: every .mdx under src/content becomes a lazy-loadable page,
// keyed by its route id (path without extension). No per-page route registration.
type MdxModule = { default: ComponentType }

const modules = import.meta.glob<MdxModule>('/src/content/**/*.mdx')

// Create the lazy components once, at module load — not during render (which
// would reset their state and trip react-hooks/no-create-components-in-render).
const lazyByRoute: Record<string, LazyExoticComponent<ComponentType>> = {}
for (const [key, loader] of Object.entries(modules)) {
  const route = key.replace('/src/content/', '').replace(/\.mdx$/, '')
  lazyByRoute[route] = lazy(loader)
}

export function lazyForRoute(route: string): LazyExoticComponent<ComponentType> | undefined {
  return lazyByRoute[route]
}

export const knownRoutes = Object.keys(lazyByRoute)
