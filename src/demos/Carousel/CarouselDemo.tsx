import { Carousel } from './Carousel'

const slides = [
  { title: 'スライド 1', tint: 'var(--c-accent-tint)' },
  { title: 'スライド 2', tint: 'var(--c-teal-tint)' },
  { title: 'スライド 3', tint: 'var(--c-warn-tint)' },
  { title: 'スライド 4', tint: 'var(--c-success-tint)' },
]

export function CarouselDemo() {
  return <Carousel slides={slides} />
}
