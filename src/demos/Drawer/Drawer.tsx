import { useRef } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './Drawer.module.scss'

interface DrawerLink {
  label: string
  href: string
}

/**
 * A side menu opened by a hamburger button. <dialog> + showModal() gives you focus
 * trapping, close-on-Esc and the dimmed backdrop for free — but NOT close-on-
 * backdrop-click, which is the one people assume is included. See onClick below.
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

      <dialog
        ref={ref}
        className={styles.drawer}
        aria-label={en ? 'Menu' : 'メニュー'}
        // A click on the backdrop lands on the <dialog> element itself, while a
        // click inside lands on .panel or its children — so comparing the target
        // is what separates "outside" from "inside". Needs .panel to fill the
        // dialog, or the empty strip below the links would count as outside.
        onClick={(e) => {
          if (e.target === ref.current) ref.current.close()
        }}
      >
        <div className={styles.panel}>
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
        </div>
      </dialog>
    </>
  )
}
