import { contentIndex } from 'virtual:content-index'

import { navigation as navEn } from '@/config/navigation.en'
import { navigation as navJa } from '@/config/navigation.ja'
import { type Locale, LOCALES, stripLocale, withLocale } from '@/lib/i18n'
import type {
  AuthoredPage,
  AuthoredTab,
  BuiltItem,
  BuiltPage,
  BuiltPart,
  BuiltTab,
} from '@/types/nav'
import { isAuthoredGroup } from '@/types/nav'

// Tabs with their own top-level path. Everything else lives under /guide/*.
const NON_GUIDE_PREFIXES = ['recipes/', 'standards/', 'project/', 'libraries/']

const navigationByLocale: Record<Locale, AuthoredTab[]> = { ja: navJa, en: navEn }

/** Learn pages live under /{locale}/guide/*; the other tabs carry their own prefix. */
export function hrefForRoute(route: string, locale: Locale): string {
  const neutral = NON_GUIDE_PREFIXES.some((p) => route.startsWith(p))
    ? `/${route}`
    : `/guide/${route}`
  return withLocale(neutral, locale)
}

/** Inverse of hrefForRoute: a pathname (locale-prefixed) back to a content route id. */
export function routeIdFromPath(pathname: string): string {
  const neutral = stripLocale(pathname)
  if (neutral.startsWith('/guide/')) return neutral.slice('/guide/'.length)
  return neutral.replace(/^\//, '')
}

function resolvePage(authored: AuthoredPage, locale: Locale): BuiltPage | null {
  const entry = contentIndex[`${locale}/${authored.route}`]
  if (!entry) {
    // A sidebar link with no .mdx would 404 — drop it and warn instead.
    console.warn(`[nav] no ${locale} content for "${authored.route}" — skipped`)
    return null
  }
  const fm = entry.frontmatter
  return {
    route: authored.route,
    title: authored.title || fm.title || authored.route,
    href: hrefForRoute(authored.route, locale),
    headings: entry.headings,
    description: fm.description,
    level: fm.level,
    prerequisites: fm.prerequisites ?? [],
    minutes: fm.minutes ? Number(fm.minutes) : undefined,
  }
}

function buildTabs(locale: Locale): BuiltTab[] {
  return navigationByLocale[locale]
    .map((tab) => {
      const parts: BuiltPart[] = tab.parts
        .map((part): BuiltPart => {
          const items: BuiltItem[] = []
          const pages: BuiltPage[] = []
          for (const item of part.items) {
            if (isAuthoredGroup(item)) {
              const groupPages = item.pages
                .map((p) => resolvePage(p, locale))
                .filter((p): p is BuiltPage => p !== null)
              if (groupPages.length) {
                items.push({ group: item.group, pages: groupPages })
                pages.push(...groupPages)
              }
            } else {
              const page = resolvePage(item, locale)
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
        basePath: withLocale(tab.basePath, locale),
        parts,
        pages: parts.flatMap((p) => p.pages),
      }
    })
    // Hide tabs that have no written pages yet (通し課題 / 社内標準).
    .filter((t) => t.pages.length > 0)
}

const tabsByLocale = Object.fromEntries(
  LOCALES.map((l) => [l, buildTabs(l)]),
) as Record<Locale, BuiltTab[]>

const byRouteByLocale = Object.fromEntries(
  LOCALES.map((l) => [
    l,
    new Map(tabsByLocale[l].flatMap((t) => t.pages).map((p) => [p.route, p])),
  ]),
) as Record<Locale, Map<string, BuiltPage>>

export function getTabs(locale: Locale): BuiltTab[] {
  return tabsByLocale[locale]
}

export function getPage(locale: Locale, route: string): BuiltPage | undefined {
  return byRouteByLocale[locale].get(route)
}

export function tabForRoute(locale: Locale, route: string): BuiltTab | undefined {
  return tabsByLocale[locale].find((t) => t.pages.some((p) => p.route === route))
}

/** Prev/next within the same tab's flattened order. */
export function prevNext(
  locale: Locale,
  route: string,
): { prev?: BuiltPage; next?: BuiltPage } {
  const tab = tabForRoute(locale, route)
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

function buildSearchIndex(locale: Locale): SearchRow[] {
  return tabsByLocale[locale].flatMap((tab) =>
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
}

const searchByLocale = Object.fromEntries(
  LOCALES.map((l) => [l, buildSearchIndex(l)]),
) as Record<Locale, SearchRow[]>

export function getSearchIndex(locale: Locale): SearchRow[] {
  return searchByLocale[locale]
}
