import { useRef } from 'react'

import styles from './Drawer.module.scss'

interface DrawerLink {
  label: string
  href: string
}

/**
 * ハンバーガーで開く横からのメニュー。<dialog> を使うと、フォーカスの閉じ込め・
 * Esc で閉じる・背景クリックで閉じる（暗幕）がブラウザ標準で付いてくる。
 */
export function Drawer({ items }: { items: DrawerLink[] }) {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        className={styles.hamburger}
        aria-label="メニューを開く"
        onClick={() => ref.current?.showModal()}
      >
        <span className={styles.bars} aria-hidden />
        メニュー
      </button>

      <dialog ref={ref} className={styles.drawer} aria-label="メニュー">
        <div className={styles.head}>
          <span className={styles.title}>メニュー</span>
          <button
            type="button"
            className={styles.close}
            aria-label="閉じる"
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
