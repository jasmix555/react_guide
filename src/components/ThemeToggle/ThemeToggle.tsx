import { useCallback, useState } from 'react'

import { useStrings } from '@/hooks/useLocale'

import styles from './style.module.scss'

type Theme = 'light' | 'dark'

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/**
 * Flips :root[data-theme] and persists the choice. The pre-paint script in
 * index.html sets the initial value, so there's no flash on load.
 */
export function ThemeToggle() {
  const strings = useStrings()
  const [theme, setTheme] = useState<Theme>(readTheme)

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = next
      try {
        localStorage.setItem('theme', next)
      } catch {
        // ignore storage errors
      }
      return next
    })
  }, [])

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={theme === 'dark' ? strings.theme.toLight : strings.theme.toDark}
      title={theme === 'dark' ? strings.theme.toLight : strings.theme.toDark}
    >
      {theme === 'dark' ? '☾' : '☀'}
    </button>
  )
}
