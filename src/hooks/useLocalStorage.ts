import { useCallback, useState } from 'react'

/** useState backed by localStorage. Used for sidebar open-state persistence. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const value = next instanceof Function ? next(prev) : next
        try {
          localStorage.setItem(key, JSON.stringify(value))
        } catch {
          // storage disabled / full — keep the in-memory value.
        }
        return value
      })
    },
    [key],
  )

  return [value, set] as const
}
