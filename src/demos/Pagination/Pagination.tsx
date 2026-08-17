import { useLocale } from '@/hooks/useLocale'

import styles from './Pagination.module.scss'

interface PaginationProps {
  page: number
  pageCount: number
  onChange: (page: number) => void
}

/**
 * Page buttons for a list. Holds no state of its own — the current page lives in
 * the parent, so the same control can drive a list, a URL param, or a fetch.
 */
export function Pagination({ page, pageCount, onChange }: PaginationProps) {
  const en = useLocale() === 'en'
  if (pageCount <= 1) return null

  // A window around the current page, so 100 pages don't become 100 buttons.
  const start = Math.max(1, Math.min(page - 1, pageCount - 2))
  const window = [start, start + 1, start + 2].filter((n) => n >= 1 && n <= pageCount)

  return (
    <nav className={styles.pager} aria-label={en ? 'Pagination' : 'ページ送り'}>
      <button
        type="button"
        className={styles.step}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        ← {en ? 'Prev' : '前へ'}
      </button>

      {!window.includes(1) && (
        <>
          <PageButton n={1} page={page} onChange={onChange} en={en} />
          <span className={styles.gap} aria-hidden>
            …
          </span>
        </>
      )}

      {window.map((n) => (
        <PageButton key={n} n={n} page={page} onChange={onChange} en={en} />
      ))}

      {!window.includes(pageCount) && (
        <>
          <span className={styles.gap} aria-hidden>
            …
          </span>
          <PageButton n={pageCount} page={page} onChange={onChange} en={en} />
        </>
      )}

      <button
        type="button"
        className={styles.step}
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
      >
        {en ? 'Next' : '次へ'} →
      </button>
    </nav>
  )
}

function PageButton({
  n,
  page,
  onChange,
  en,
}: {
  n: number
  page: number
  onChange: (page: number) => void
  en: boolean
}) {
  const current = n === page
  return (
    <button
      type="button"
      className={styles.page}
      // aria-current is how a screen reader hears "you are on this one".
      aria-current={current ? 'page' : undefined}
      aria-label={en ? `Page ${n}` : `${n} ページ目`}
      onClick={() => onChange(n)}
    >
      {n}
    </button>
  )
}
