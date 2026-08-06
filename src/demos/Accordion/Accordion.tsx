import { useState } from 'react'

import styles from './Accordion.module.scss'

export interface AccordionItem {
  q: string
  a: string
}

/**
 * An accordion that opens only one item at a time. It keeps a single index of the
 * open item in state, and pressing the same heading again closes it (null).
 * Good for FAQs and other "read one, then the next" cases.
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
