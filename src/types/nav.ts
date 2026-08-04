// Navigation model.
//
// I hand-author part/page ORDER in config/navigation.ts. The `headings` (L3) and
// frontmatter are filled in at build time from virtual:content-index, so adding a
// page stays: create the .mdx, add one line here.

export interface NavHeading {
  id: string
  title: string
}

/** A single page entry (L2). `route` = path under src/content without extension. */
export interface AuthoredPage {
  route: string
  title: string
}

/** A cluster of pages shown under one label (e.g. "useState"). */
export interface AuthoredGroup {
  group: string
  pages: AuthoredPage[]
}

export type AuthoredItem = AuthoredPage | AuthoredGroup

export interface AuthoredPart {
  id: string
  /** Curriculum number shown as "N." in the sidebar. Omit for non-numbered tabs. */
  no?: number
  title: string
  items: AuthoredItem[]
}

export interface AuthoredTab {
  id: string
  title: string
  basePath: string
  parts: AuthoredPart[]
}

export function isAuthoredGroup(item: AuthoredItem): item is AuthoredGroup {
  return 'group' in item
}

// ── Resolved (built) shapes used by the UI ──

export interface BuiltPage {
  route: string
  title: string
  href: string
  headings: NavHeading[]
  description?: string
  level?: string
  prerequisites: string[]
  /** Reading-time estimate in minutes (frontmatter `minutes`, lint-enforced). */
  minutes?: number
}

export interface BuiltGroup {
  group: string
  pages: BuiltPage[]
}

export type BuiltItem = BuiltPage | BuiltGroup

export interface BuiltPart {
  id: string
  no?: number
  title: string
  items: BuiltItem[]
  /** Flattened pages in order (for prev/next). */
  pages: BuiltPage[]
}

export interface BuiltTab {
  id: string
  title: string
  basePath: string
  parts: BuiltPart[]
  /** Flattened pages across the whole tab, in order. */
  pages: BuiltPage[]
}

export function isBuiltGroup(item: BuiltItem): item is BuiltGroup {
  return 'group' in item
}
