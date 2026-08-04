import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { ProgressRing } from '@/components/ProgressRing'
import { strings } from '@/config/strings.ja'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useReadProgress } from '@/hooks/useReadProgress'
import { tabsNav } from '@/lib/nav'
import type { BuiltGroup, BuiltPage, BuiltPart, BuiltTab } from '@/types/nav'
import { isBuiltGroup } from '@/types/nav'

import styles from './style.module.scss'

// Generic landmark section slugs that repeat on almost every page. A page whose
// headings are ALL landmarks has nothing page-specific to navigate to, so we
// don't render its L3 (avoids "seven identical children" under every page).
const LANDMARK = new Set(['goal', 'mistakes', 'summary', 'standard', 'trouble'])

interface SidebarProps {
  tab: BuiltTab
  currentRoute: string
  activeHeading: string | null
  /** Called after a link is followed (closes the mobile drawer). */
  onNavigate?: () => void
}

/**
 * Three-level nav: Part (L1, collapsible + persisted) › page (L2) › h2 (L3).
 * The current page's sections are always shown; other pages can be peeked open.
 * Scroll-spy highlights the active section in both the sidebar and the TOC.
 */
export function Sidebar({ tab, currentRoute, activeHeading, onNavigate }: SidebarProps) {
  const [openState, setOpenState] = useLocalStorage<Record<string, boolean>>(
    'sidebar-open',
    {},
  )
  const [peeked, setPeeked] = useState<Set<string>>(new Set())
  const activeRef = useRef<HTMLAnchorElement>(null)
  const { countRead, resetRoutes } = useReadProgress()

  const currentPartId = tab.parts.find((p) =>
    p.pages.some((page) => page.route === currentRoute),
  )?.id

  // Keep the active L3 item visible as you scroll the page.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [activeHeading])

  const isPartOpen = (part: BuiltPart) =>
    part.id === currentPartId ? true : openState[part.id] !== false

  const togglePart = (part: BuiltPart) =>
    setOpenState((prev) => ({ ...prev, [part.id]: !isPartOpen(part) }))

  const togglePeek = (route: string) =>
    setPeeked((prev) => {
      const next = new Set(prev)
      if (next.has(route)) next.delete(route)
      else next.add(route)
      return next
    })

  // Page groups (e.g. "useState") are their own collapsible level, persisted like
  // parts and force-open when the current page lives inside them.
  const groupKey = (part: BuiltPart, group: BuiltGroup) => `grp:${part.id}:${group.group}`
  const isGroupOpen = (part: BuiltPart, group: BuiltGroup) =>
    group.pages.some((p) => p.route === currentRoute)
      ? true
      : openState[groupKey(part, group)] !== false
  const toggleGroup = (part: BuiltPart, group: BuiltGroup) =>
    setOpenState((prev) => ({ ...prev, [groupKey(part, group)]: !isGroupOpen(part, group) }))

  function onHeadingClick(e: React.MouseEvent, page: BuiltPage, id: string) {
    if (page.route !== currentRoute) return // cross-page: let <Link> navigate
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    // Land keyboard + screen-reader focus on the heading, like sighted users.
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
    history.replaceState(null, '', `${page.href}#${id}`)
    onNavigate?.()
  }

  const renderPage = (page: BuiltPage) => {
    const isCurrent = page.route === currentRoute
    const hasHeadings = page.headings.some((h) => !LANDMARK.has(h.id))
    const showHeadings = (isCurrent || peeked.has(page.route)) && hasHeadings

    return (
      <div className={styles.pageRow} key={page.route}>
        <div className={styles.pageLine}>
          <Link
            to={page.href}
            className={clsx(styles.pageLink, isCurrent && styles.pageActive)}
            title={page.minutes != null ? `約 ${page.minutes} 分` : undefined}
            onClick={onNavigate}
          >
            {page.title}
          </Link>
          {hasHeadings && !isCurrent && (
            <button
              type="button"
              className={styles.peek}
              aria-label={`${page.title} のセクション`}
              aria-expanded={peeked.has(page.route)}
              onClick={() => togglePeek(page.route)}
            >
              {peeked.has(page.route) ? '▾' : '▸'}
            </button>
          )}
        </div>

        {showHeadings && hasHeadings && (
          <ul className={styles.headings}>
            {page.headings.map((h) => {
              const isActive = isCurrent && h.id === activeHeading
              return (
                <li key={h.id}>
                  <Link
                    ref={isActive ? activeRef : undefined}
                    to={`${page.href}#${h.id}`}
                    className={clsx(styles.heading, isActive && styles.headingActive)}
                    onClick={(e) => onHeadingClick(e, page, h.id)}
                  >
                    {h.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }

  return (
    <nav className={styles.sidebar} aria-label="ガイドの目次">
      {/* Drawer-only: the top-bar tabs are hidden on mobile, so surface the
          section switcher here or there's no way off the current tab. */}
      <div className={styles.tabSwitch}>
        {tabsNav.map((t) => (
          <Link
            key={t.id}
            to={t.pages[0]?.href ?? t.basePath}
            className={clsx(styles.tabSwitchItem, t.id === tab.id && styles.tabSwitchActive)}
            onClick={onNavigate}
          >
            {t.title}
          </Link>
        ))}
      </div>

      {tab.parts.map((part) => {
        const open = isPartOpen(part)
        const partRoutes = part.pages.map((p) => p.route)
        const partDone = countRead(partRoutes)
        return (
          <section className={styles.part} key={part.id}>
            <div className={styles.partHeadRow}>
              <button
                type="button"
                className={styles.partHead}
                aria-expanded={open}
                onClick={() => togglePart(part)}
              >
                <span className={styles.caret} aria-hidden>
                  {open ? '▾' : '▸'}
                </span>
                <span>
                  {part.no != null && <span className={styles.partNo}>{part.no}. </span>}
                  {part.title}
                </span>
                <span className={styles.partRing}>
                  <ProgressRing done={partDone} total={part.pages.length} size={15} />
                </span>
              </button>
              {partDone > 0 && (
                <button
                  type="button"
                  className={styles.partReset}
                  title={strings.reset.part}
                  aria-label={`${part.title}：${strings.reset.part}`}
                  onClick={() => resetRoutes(partRoutes)}
                >
                  ↺
                </button>
              )}
            </div>

            {open && (
              <div className={styles.partBody}>
                {part.items.map((item, i) => {
                  if (!isBuiltGroup(item)) return renderPage(item)
                  const gOpen = isGroupOpen(part, item)
                  return (
                    <div className={styles.group} key={`g-${i}`}>
                      <button
                        type="button"
                        className={styles.groupHead}
                        aria-expanded={gOpen}
                        onClick={() => toggleGroup(part, item)}
                      >
                        <span className={styles.groupCaret} aria-hidden>
                          {gOpen ? '▾' : '▸'}
                        </span>
                        <span className={styles.groupLabel}>{item.group}</span>
                      </button>
                      {gOpen && (
                        <div className={styles.groupBody}>{item.pages.map(renderPage)}</div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        )
      })}
    </nav>
  )
}
