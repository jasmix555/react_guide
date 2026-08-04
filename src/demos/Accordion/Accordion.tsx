import { useState } from 'react'

import styles from './Accordion.module.scss'

export interface AccordionItem {
  q: string
  a: string
}

/**
 * 一度に 1 つだけ開くアコーディオン。開いている項目の index を 1 つだけ state に
 * 持ち、同じ見出しをもう一度押すと閉じる（null）。FAQ など「1 つ読んだら次」に向く。
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const isOpen = i === openIndex
        return (
          <div key={item.q} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className={styles.icon} aria-hidden>
                  {isOpen ? '−' : '＋'}
                </span>
              </button>
            </h3>
            {isOpen && <p className={styles.panel}>{item.a}</p>}
          </div>
        )
      })}
    </div>
  )
}
