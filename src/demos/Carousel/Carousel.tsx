import { useRef } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './Carousel.module.scss'

interface Slide {
  title: string
  tint: string
}

/**
 * A horizontal carousel. Scrolling itself is left to CSS scroll-snap (touch
 * swipe and keyboard work automatically); prev/next buttons and mouse drag are
 * added for the desktop experience.
 */
export function Carousel({ slides }: { slides: Slide[] }) {
  const en = useLocale() === 'en'
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startLeft: 0 })

  function step(dir: number) {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })
  }

  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType !== 'mouse') return // leave touch to native scrolling
    const track = trackRef.current
    if (!track) return
    drag.current = { down: true, startX: e.clientX, startLeft: track.scrollLeft }
    track.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    const track = trackRef.current
    if (!drag.current.down || !track) return
    track.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX)
  }

  function endDrag() {
    drag.current.down = false
  }

  return (
    <div className={styles.carousel}>
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {slides.map((s) => (
          <div key={s.title} className={styles.slide} style={{ background: s.tint }}>
            {s.title}
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          aria-label={en ? 'Previous' : '前へ'}
          onClick={() => step(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          className={styles.arrow}
          aria-label={en ? 'Next' : '次へ'}
          onClick={() => step(1)}
        >
          ›
        </button>
      </div>
    </div>
  )
}
