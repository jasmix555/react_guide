import { useRef } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './Drawer.module.scss'

interface DrawerLink {
  label: string
  href: string
}

/**
 * A side menu opened by a hamburger button. Using <dialog> gives you focus trapping,
 * close-on-Esc, and close-on-backdrop-click (the overlay) for free from the browser.
 */
export function Drawer({ items }: { items: DrawerLink[] }) {
  const en = useLocale() === 'en'
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        className={styles.hamburger}
        aria-label={en ? 'Open menu' : 'メニューを開く'}
        onClick={() => ref.current?.showModal()}
      >
        <span className={styles.bars} aria-hidden />
        {en ? 'Menu' : 'メニュー'}
      </button>

      <dialog ref={ref} className={styles.drawer} aria-label={en ? 'Menu' : 'メニュー'}>
        <div className={styles.head}>
          <span className={styles.title}>{en ? 'Menu' : 'メニュー'}</span>
          <button
            type="button"
            className={styles.close}
            aria-label={en ? 'Close' : '閉じる'}
            onClick={() => ref.current?.close()}
          >
            ✕
          </button>
        </div>
        <nav className={styles.nav}>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.link}
              onClick={() => ref.current?.close()}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </dialog>
    </>
  )
}
