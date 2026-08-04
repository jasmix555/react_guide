import { useEffect, useState } from 'react'

/**
 * Returns the id of the heading currently at/above the top of the viewport.
 * Drives both the right-hand TOC and the sidebar L3 highlight.
 */
export function useScrollSpy(ids: string[], offset = 88): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null)
  const key = ids.join('|')

  useEffect(() => {
    if (!ids.length) return

    const update = () => {
      // At the very bottom the last heading may never cross the spy line (nothing
      // below it to scroll), so force it active once we've hit the page end.
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (scrolledToBottom) {
        setActive(ids[ids.length - 1] ?? null)
        return
      }
      let current = ids[0] ?? null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
    // key is the stable derived dep for the ids array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, offset])

  return active
}
