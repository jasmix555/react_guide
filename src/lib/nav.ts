import { contentIndex } from 'virtual:content-index'

import { navigation } from '@/config/navigation'
import type {
  AuthoredPage,
  BuiltItem,
  BuiltPage,
  BuiltPart,
  BuiltTab,
} from '@/types/nav'
import { isAuthoredGroup } from '@/types/nav'

// Tabs with their own top-level path. Everything else lives under /guide/*.
const NON_GUIDE_PREFIXES = ['recipes/', 'standards/', 'project/', 'libraries/']

/** Learn pages live under /guide/*; the other tabs' routes already carry their prefix. */
export function hrefForRoute(route: string): string {
  return NON_GUIDE_PREFIXES.some((p) => route.startsWith(p)) ? `/${route}` : `/guide/${route}`
}

/** Inverse of hrefForRoute: a pathname back to a content route id. */
export function routeIdFromPath(pathname: string): string {
  if (pathname.startsWith('/guide/')) return pathname.slice('/guide/'.length)
  return pathname.replace(/^\//, '')
}

function resolvePage(authored: AuthoredPage): BuiltPage | null {
  const entry = contentIndex[authored.route]
  if (!entry) {
    // A sidebar link with no .mdx would 404 — drop it and warn instead.
    console.warn(`[nav] no content for "${authored.route}" — skipped`)
    return null
  }
  const fm = entry.frontmatter
  return {
    route: authored.route,
    title: authored.title || fm.title || authored.route,
    href: hrefForRoute(authored.route),
    headings: entry.headings,
    description: fm.description,
    level: fm.level,
    prerequisites: fm.prerequisites ?? [],
    minutes: fm.minutes ? Number(fm.minutes) : undefined,
  }
}

export const tabsNav: BuiltTab[] = navigation
  .map((tab) => {
  const parts: BuiltPart[] = tab.parts
    .map((part): BuiltPart => {
      const items: BuiltItem[] = []
      const pages: BuiltPage[] = []
      for (const item of part.items) {
        if (isAuthoredGroup(item)) {
          const groupPages = item.pages
            .map(resolvePage)
            .filter((p): p is BuiltPage => p !== null)
          if (groupPages.length) {
            items.push({ group: item.group, pages: groupPages })
            pages.push(...groupPages)
          }
        } else {
          const page = resolvePage(item)
          if (page) {
            items.push(page)
            pages.push(page)
          }
        }
      }
      return { id: part.id, no: part.no, title: part.title, items, pages }
    })
    .filter((p) => p.pages.length > 0)

  return {
    id: tab.id,
    title: tab.title,
    basePath: tab.basePath,
    parts,
    pages: parts.flatMap((p) => p.pages),
  }
  })
  // Hide tabs that have no written pages yet (通し課題 / 社内標準).
  .filter((t) => t.pages.length > 0)

const allPages = tabsNav.flatMap((t) => t.pages)
const byRoute = new Map(allPages.map((p) => [p.route, p]))

export function getPage(route: string): BuiltPage | undefined {
  return byRoute.get(route)
}

export function tabForRoute(route: string): BuiltTab | undefined {
  return tabsNav.find((t) => t.pages.some((p) => p.route === route))
}

/** Prev/next within the same tab's flattened order. */
export function prevNext(route: string): { prev?: BuiltPage; next?: BuiltPage } {
  const tab = tabForRoute(route)
  if (!tab) return {}
  const i = tab.pages.findIndex((p) => p.route === route)
  return { prev: tab.pages[i - 1], next: tab.pages[i + 1] }
}

// ── Search: one row per page AND per heading, so Ctrl+K works as a lookup tool ──
export interface SearchRow {
  id: string
  kind: 'page' | 'heading'
  partTitle: string
  pageTitle: string
  headingTitle?: string
  href: string
}

export const searchIndex: SearchRow[] = tabsNav.flatMap((tab) =>
  tab.parts.flatMap((part) =>
    part.pages.flatMap((page): SearchRow[] => [
      {
        id: page.route,
        kind: 'page',
        partTitle: part.title,
        pageTitle: page.title,
        href: page.href,
      },
      ...page.headings.map(
        (h): SearchRow => ({
          id: `${page.route}#${h.id}`,
          kind: 'heading',
          partTitle: part.title,
          pageTitle: page.title,
          headingTitle: h.title,
          href: `${page.href}#${h.id}`,
        }),
      ),
    ]),
  ),
)
