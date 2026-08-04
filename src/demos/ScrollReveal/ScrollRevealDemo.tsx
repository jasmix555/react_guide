import { Reveal } from './Reveal'
import styles from './ScrollReveal.module.scss'

const cards = [
  { title: '軽い', body: '約 300g。長時間持っても疲れません。' },
  { title: '大きい', body: 'A4 の書類がそのまま入ります。' },
  { title: '洗える', body: '自宅の洗濯機で丸洗いできます。' },
]

export function ScrollRevealDemo() {
  return (
    <div className={styles.grid}>
      {cards.map((card, i) => (
        <Reveal key={card.title} delay={i * 90}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>{card.title}</p>
            <p className={styles.cardBody}>{card.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
