import { useLocale } from '@/hooks/useLocale'

import { Carousel } from './Carousel'

export function CarouselDemo() {
  const en = useLocale() === 'en'
  const slides = [
    { title: en ? 'Slide 1' : 'スライド 1', tint: 'var(--c-accent-tint)' },
    { title: en ? 'Slide 2' : 'スライド 2', tint: 'var(--c-teal-tint)' },
    { title: en ? 'Slide 3' : 'スライド 3', tint: 'var(--c-warn-tint)' },
    { title: en ? 'Slide 4' : 'スライド 4', tint: 'var(--c-success-tint)' },
  ]
  return <Carousel slides={slides} />
}
