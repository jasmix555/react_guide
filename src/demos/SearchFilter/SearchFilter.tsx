import { useEffect, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './SearchFilter.module.scss'

/**
 * Type-to-filter with a debounce: the input updates instantly, but the value the
 * list actually filters on only catches up 300ms after typing stops. That gap is
 * what stops a real app firing a request per keystroke.
 */
export function SearchFilter({ items }: { items: string[] }) {
  const en = useLocale() === 'en'
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 300)
    // Cleanup runs before the next effect: every new keystroke cancels the timer
    // the previous one set, so only the last pause in typing survives.
    return () => clearTimeout(timer)
  }, [query])

  const results = items.filter((item) => item.toLowerCase().includes(debounced.toLowerCase()))
  const settling = query !== debounced

  return (
    <div className={styles.root}>
      <label className={styles.label} htmlFor="filter-input">
        {en ? 'Filter items' : '絞り込み'}
      </label>
      <input
        id="filter-input"
        type="search"
        className={styles.input}
        value={query}
        placeholder={en ? 'Try "mug"' : '「マグ」など'}
        onChange={(e) => setQuery(e.target.value)}
      />

      <p className={styles.status} aria-live="polite">
        {settling
          ? en
            ? 'Typing…'
            : '入力中…'
          : en
            ? `${results.length} of ${items.length} shown`
            : `${items.length} 件中 ${results.length} 件`}
      </p>

      <ul className={styles.list}>
        {results.map((item) => (
          <li key={item} className={styles.row}>
            {item}
          </li>
        ))}
        {results.length === 0 && (
          <li className={styles.empty}>{en ? 'Nothing matched.' : '一致するものがありません。'}</li>
        )}
      </ul>
    </div>
  )
}
