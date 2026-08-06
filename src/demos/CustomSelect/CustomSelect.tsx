import { useEffect, useRef, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './CustomSelect.module.scss'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  label: string
  options: Option[]
  value: string
  onChange: (value: string) => void
}

/**
 * A custom select for when you want full control over the appearance. The open/closed
 * state is held with state, and it closes on outside click and Esc. However, its keyboard,
 * mobile, and screen-reader support is not as complete as the native <select>.
 */
export function CustomSelect({ label, options, value, onChange }: CustomSelectProps) {
  const en = useLocale() === 'en'
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return

    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={styles.wrap}>
      <span className={styles.label}>{label}</span>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {selected?.label ?? (en ? 'Select an option' : '選択してください')}
        <span className={styles.caret} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul className={styles.list} role="listbox">
          {options.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={o.value === value ? `${styles.option} ${styles.active}` : styles.option}
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
