import { useLocale } from '@/hooks/useLocale'

import { Reveal } from './Reveal'
import styles from './ScrollReveal.module.scss'

const cards = [
  {
    title: '軽い',
    titleEn: 'Light',
    body: '約 300g。長時間持っても疲れません。',
    bodyEn: 'About 300g. Comfortable to carry all day.',
  },
  {
    title: '大きい',
    titleEn: 'Roomy',
    body: 'A4 の書類がそのまま入ります。',
    bodyEn: 'Fits A4 documents without folding.',
  },
  {
    title: '洗える',
    titleEn: 'Washable',
    body: '自宅の洗濯機で丸洗いできます。',
    bodyEn: 'Machine-washable at home.',
  },
]

export function ScrollRevealDemo() {
  const en = useLocale() === 'en'
  return (
    <div className={styles.grid}>
      {cards.map((card, i) => (
        <Reveal key={card.title} delay={i * 90}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>{en ? card.titleEn : card.title}</p>
            <p className={styles.cardBody}>{en ? card.bodyEn : card.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
