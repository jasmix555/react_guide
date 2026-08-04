import Fuse from 'fuse.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import { strings } from '@/config/strings.ja'
import { searchIndex, type SearchRow } from '@/lib/nav'

import styles from './style.module.scss'

/**
 * Ctrl+K / Ctrl+K command palette. Searches the heading-level index, so result rows
 * are パート > ページ > 見出し and link straight to the anchor — the site works
 * as a lookup tool, not just a book.
 *
 * The palette (input + results) is a separate component mounted only while open,
 * so its query/selection reset naturally on close — no reset-in-effect.
 */
export function Search() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label={strings.search.open}
      >
        <span className={styles.triggerIcon} aria-hidden>
          ⌕
        </span>
        <span className={styles.triggerText}>{strings.search.open}</span>
        <kbd className={styles.kbd}>Ctrl+K</kbd>
      </button>

      {open && <SearchPalette onClose={() => setOpen(false)} />}
    </>
  )
}

function SearchPalette({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: 'headingTitle', weight: 2 },
          { name: 'pageTitle', weight: 1.5 },
          { name: 'partTitle', weight: 0.5 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [],
  )

  const results = useMemo<SearchRow[]>(() => {
    const q = query.trim()
    if (!q) return []
    return fuse.search(q, { limit: 20 }).map((r) => r.item)
  }, [fuse, query])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const optionId = (i: number) => `search-opt-${i}`

  // Keep the highlighted option in view as ↑/↓/Home/End move it. Instant (not
  // smooth): a command-palette list must track keystrokes without lag, and
  // instant scroll is inherently reduced-motion-safe.
  useEffect(() => {
    if (results.length === 0) return
    document.getElementById(`search-opt-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, results])

  function go(row: SearchRow | undefined) {
    if (!row) return
    onClose()
    navigate(row.href)
  }

  function onQueryChange(value: string) {
    setQuery(value)
    setActive(0)
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(Math.max(results.length - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(results[active])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  // Portal to <body> so the fixed overlay isn't trapped by the top bar's
  // backdrop-filter (which would otherwise become its containing block).
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={strings.search.open}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          className={styles.input}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={onInputKey}
          placeholder={strings.search.placeholder}
          type="search"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-listbox"
          aria-autocomplete="list"
          aria-activedescendant={results.length > 0 ? optionId(active) : undefined}
        />

        {query.trim() && results.length === 0 && (
          <p className={styles.empty}>{strings.search.empty}</p>
        )}

        {results.length > 0 && (
          <ul className={styles.results} id="search-listbox" role="listbox">
            {results.map((row, i) => (
              <li key={row.id}>
                <button
                  type="button"
                  id={optionId(i)}
                  role="option"
                  aria-selected={i === active}
                  tabIndex={-1}
                  className={`${styles.row} ${i === active ? styles.activeRow : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(row)}
                >
                  <span className={styles.crumb}>
                    {row.partTitle} <span aria-hidden>›</span> {row.pageTitle}
                    {row.kind === 'heading' && (
                      <>
                        {' '}
                        <span aria-hidden>›</span>
                      </>
                    )}
                  </span>
                  <span className={styles.rowTitle}>
                    {row.kind === 'heading' ? row.headingTitle : row.pageTitle}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className={styles.hint}>{strings.search.hint}</p>
      </div>
    </div>,
    document.body,
  )
}
