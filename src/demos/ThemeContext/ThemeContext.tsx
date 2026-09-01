import { createContext, useContext, useMemo, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './ThemeContext.module.scss'

type Theme = 'light' | 'dark'

interface ThemeValue {
  theme: Theme
  toggle: () => void
}

// null as the default is deliberate: it lets useTheme() below detect a
// consumer rendered outside the provider instead of silently using a fallback.
const ThemeContext = createContext<ThemeValue | null>(null)

function useTheme(): ThemeValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside ThemeContext')
  return value
}

// Level 3 — the only component in the tree that reads the context.
function ThemedButton() {
  const en = useLocale() === 'en'
  const { theme, toggle } = useTheme()

  return (
    <button type="button" className={styles.themed} data-theme={theme} onClick={toggle}>
      {en ? `theme: ${theme} — click to flip` : `テーマ: ${theme} — クリックで切替`}
    </button>
  )
}

// Level 2 — receives nothing, passes nothing.
function Toolbar() {
  const en = useLocale() === 'en'

  return (
    <div className={styles.level}>
      <span className={styles.tag}>{en ? 'Level 2 — no props' : 'レベル 2 — props なし'}</span>
      <ThemedButton />
    </div>
  )
}

// Level 1 — receives nothing, passes nothing.
function Layout() {
  const en = useLocale() === 'en'

  return (
    <div className={styles.level}>
      <span className={styles.tag}>{en ? 'Level 1 — no props' : 'レベル 1 — props なし'}</span>
      <Toolbar />
    </div>
  )
}

export function ThemeContextDemo() {
  const en = useLocale() === 'en'
  const [theme, setTheme] = useState<Theme>('light')

  // Memoised so the object identity only changes when `theme` does — see the
  // "a fresh object every render" mistake on the page.
  const value = useMemo<ThemeValue>(
    () => ({ theme, toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) }),
    [theme],
  )

  return (
    <div className={styles.wrap}>
      <ThemeContext value={value}>
        <div className={styles.level}>
          <span className={styles.tag}>
            {en ? 'Provider — owns the value' : 'Provider — 値を持つ'}
          </span>
          <Layout />
        </div>
      </ThemeContext>

      <p className={styles.hint}>
        {en
          ? 'The button is three levels down. Levels 1 and 2 never mention the theme — no props were threaded through them.'
          : 'ボタンは 3 階層下にあります。レベル 1 と 2 はテーマに一切触れていません——props は通っていません。'}
      </p>
    </div>
  )
}
