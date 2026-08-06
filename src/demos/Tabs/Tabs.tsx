import { useState } from 'react'

import styles from './Tabs.module.scss'

interface Tab {
  label: string
  content: string
}

/**
 * Keep which tab is selected as a single index. Buttons use role="tab" and the
 * content uses role="tabpanel", with aria tying "which tab goes with which panel".
 */
export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className={styles.tabs}>
      <div className={styles.tablist} role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            id={`tab-${i}`}
            aria-selected={i === active}
            aria-controls={`panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className={i === active ? `${styles.tab} ${styles.active}` : styles.tab}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className={styles.panel}
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
      >
        {tabs[active].content}
      </div>
    </div>
  )
}
