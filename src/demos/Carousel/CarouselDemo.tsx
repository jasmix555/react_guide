import { useLocale } from '@/hooks/useLocale'

import { Carousel } from './Carousel'

/** Shared slides, so every stage on the recipe page shows the same content. */
function useSlides() {
  const en = useLocale() === 'en'
  return [
    { title: en ? 'Slide 1' : 'スライド 1', tint: 'var(--c-accent-tint)' },
    { title: en ? 'Slide 2' : 'スライド 2', tint: 'var(--c-teal-tint)' },
    { title: en ? 'Slide 3' : 'スライド 3', tint: 'var(--c-warn-tint)' },
    { title: en ? 'Slide 4' : 'スライド 4', tint: 'var(--c-success-tint)' },
  ]
}

/** Stage 1 — CSS scroll-snap only. No JavaScript at all. */
export function CarouselSnapDemo() {
  return <Carousel slides={useSlides()} />
}

/** Stage 2 — plus prev / next arrows. */
export function CarouselArrowsDemo() {
  return <Carousel slides={useSlides()} controls />
}

/** Stage 3 — plus pagination dots that track and set the position. */
export function CarouselDotsDemo() {
  return <Carousel slides={useSlides()} controls dots />
}

/** Stage 4 — plus mouse dragging, and arrows that disable at the ends. */
export function CarouselDemo() {
  return <Carousel slides={useSlides()} controls dots draggable clampArrows />
}
