/* eslint-disable react-refresh/only-export-components -- context provider and its hook belong together */
import { createContext, type ReactNode, useCallback, useContext, useMemo } from 'react'

import { useLocalStorage } from './useLocalStorage'

interface ReadProgress {
  isRead: (route: string) => boolean
  toggle: (route: string) => void
  /** Idempotently mark one page read (used only by the 次のページ button). */
  markRead: (route: string) => void
  /** How many of the given routes are marked 読んだ. */
  countRead: (routes: string[]) => number
  /** Clear the read mark for the given routes (per-part reset). */
  resetRoutes: (routes: string[]) => void
  /** Clear every read mark (home "reset all"). */
  resetAll: () => void
}

const Ctx = createContext<ReadProgress | null>(null)

/** Tracks which pages the reader has marked 読んだ, persisted to localStorage so
 *  the sidebar rings and the home progress bar stay in sync across the app. */
export function ReadProgressProvider({ children }: { children: ReactNode }) {
  const [read, setRead] = useLocalStorage<Record<string, true>>('read-pages', {})

  const isRead = useCallback((route: string) => read[route] === true, [read])
  const toggle = useCallback(
    (route: string) =>
      setRead((prev) => {
        const next = { ...prev }
        if (next[route]) delete next[route]
        else next[route] = true
        return next
      }),
    [setRead],
  )
  const markRead = useCallback(
    (route: string) =>
      setRead((prev) => (prev[route] ? prev : { ...prev, [route]: true })),
    [setRead],
  )
  const countRead = useCallback(
    (routes: string[]) => routes.reduce((n, r) => (read[r] ? n + 1 : n), 0),
    [read],
  )
  const resetRoutes = useCallback(
    (routes: string[]) =>
      setRead((prev) => {
        const next = { ...prev }
        for (const r of routes) delete next[r]
        return next
      }),
    [setRead],
  )
  const resetAll = useCallback(() => setRead({}), [setRead])

  const value = useMemo<ReadProgress>(
    () => ({ isRead, toggle, markRead, countRead, resetRoutes, resetAll }),
    [isRead, toggle, markRead, countRead, resetRoutes, resetAll],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useReadProgress(): ReadProgress {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useReadProgress must be used inside <ReadProgressProvider>')
  return ctx
}
