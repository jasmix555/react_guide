import { useRef, useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import styles from './Carousel.module.scss'

interface Slide {
  title: string
  tint: string
}

interface CarouselProps {
  slides: Slide[]
  /** Prev / next arrows. */
  controls?: boolean
  /** Pagination dots, one per slide. */
  dots?: boolean
  /** Click-and-drag with a mouse (touch already scrolls natively). */
  draggable?: boolean
  /** Disable the arrows at the first and last slide. */
  clampArrows?: boolean
}

/**
 * A horizontal carousel built in layers, so each recipe section can show exactly
 * the stage it teaches: CSS scroll-snap alone, then arrows, then dots, then drag.
 * Scrolling itself is always the browser's job — touch swipe, keyboard and
 * momentum come from `overflow-x` and cost nothing.
 */
export function Carousel({
  slides,
  controls = false,
  dots = false,
  draggable = false,
  clampArrows = false,
}: CarouselProps) {
  const en = useLocale() === 'en'
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startLeft: 0 })
  const [index, setIndex] = useState(0)

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /** Width of one slide including its gap — every slide is the same size. */
  const stepSize = (track: HTMLDivElement) => track.scrollWidth / slides.length

  function onScroll() {
    const track = trackRef.current
    if (!track) return
    // Same value on most scroll events, and React bails out of identical state,
    // so this is far cheaper than it looks.
    setIndex(Math.round(track.scrollLeft / stepSize(track)))
  }

  function step(dir: number) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * stepSize(track), behavior: reduced() ? 'auto' : 'smooth' })
  }

  function goTo(i: number) {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: i * stepSize(track), behavior: reduced() ? 'auto' : 'smooth' })
  }

  function onPointerDown(e: React.PointerEvent) {
    if (!draggable || e.pointerType !== 'mouse') return // leave touch to native scrolling
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
        className={draggable ? `${styles.track} ${styles.grab}` : styles.track}
        onScroll={onScroll}
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

      {(controls || dots) && (
        <div className={styles.controls}>
          {dots && (
            <div className={styles.dots}>
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  className={styles.dot}
                  aria-current={i === index ? 'true' : undefined}
                  aria-label={en ? `Go to slide ${i + 1}` : `${i + 1} 枚目へ`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}

          {controls && (
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                aria-label={en ? 'Previous' : '前へ'}
                disabled={clampArrows && index === 0}
                onClick={() => step(-1)}
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.arrow}
                aria-label={en ? 'Next' : '次へ'}
                disabled={clampArrows && index === slides.length - 1}
                onClick={() => step(1)}
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
