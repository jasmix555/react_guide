import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './TagInput.module.scss'

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  max?: number
}

/**
 * Free-text tags: Enter adds one, ✕ or Backspace-on-empty removes one. The list
 * lives in the parent, so this component only decides what a keystroke means.
 */
export function TagInput({ tags, onChange, max = 6 }: TagInputProps) {
  const en = useLocale() === 'en'
  const [draft, setDraft] = useState('')

  function add() {
    const value = draft.trim()
    if (!value) return
    // Reject duplicates rather than silently allowing two identical chips —
    // otherwise `key={tag}` collides and React renders them unpredictably.
    if (tags.includes(value) || tags.length >= max) {
      setDraft('')
      return
    }
    onChange([...tags, value])
    setDraft('')
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      // Inside a real <form>, Enter would submit. Stop that first.
      e.preventDefault()
      add()
    }
    // Backspace on an empty box removes the last chip — the behaviour people
    // expect from every tag field they've used, and nobody thinks to add.
    if (e.key === 'Backspace' && draft === '' && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  return (
    <div className={styles.root}>
      <label className={styles.label} htmlFor="tag-input">
        {en ? 'Tags' : 'タグ'}
      </label>

      <ul className={styles.chips}>
        {tags.map((tag) => (
          <li key={tag} className={styles.chip}>
            {tag}
            <button
              type="button"
              className={styles.remove}
              aria-label={en ? `Remove ${tag}` : `${tag} を削除`}
              onClick={() => onChange(tags.filter((t) => t !== tag))}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <input
        id="tag-input"
        className={styles.input}
        value={draft}
        placeholder={en ? 'Type and press Enter' : '入力して Enter'}
        disabled={tags.length >= max}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={add} // don't lose what they typed just because they clicked away
      />

      <p className={styles.hint} aria-live="polite">
        {tags.length} / {max}
        {tags.length >= max && (en ? ' — limit reached' : ' — 上限です')}
      </p>
    </div>
  )
}
