/// <reference types="vite/client" />

// MDX pages compile to React components. Frontmatter is exported by
// remark-mdx-frontmatter.
declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export const frontmatter: Record<string, unknown>
  const MDXComponent: ComponentType<Record<string, unknown>>
  export default MDXComponent
}

// Built by plugins/content-plugin.mjs — every page's frontmatter + h2 tree,
// extracted from source at build time.
declare module 'virtual:content-index' {
  export interface RawHeading {
    id: string
    title: string
  }
  export interface RawFrontmatter {
    title?: string
    description?: string
    section?: string
    level?: 'beginner' | 'intermediate' | 'advanced'
    prerequisites?: string[]
    /** Reading-time estimate in minutes (lint-enforced; a string in raw frontmatter). */
    minutes?: string
  }
  export interface RawPage {
    routeId: string
    frontmatter: RawFrontmatter
    headings: RawHeading[]
  }
  export const contentIndex: Record<string, RawPage>
}
