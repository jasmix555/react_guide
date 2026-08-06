import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/react'

import { useLocale } from '@/hooks/useLocale'

import styles from './SwiperBasic.module.scss'

const slides = [1, 2, 3, 4, 5, 6]

/**
 * The smallest possible Swiper. No modules, no extra CSS imports.
 * slidesPerView is set to 1.15 so "the next slide peeks in" = it's clearly a slider.
 */
export function SwiperBasic() {
  const en = useLocale() === 'en'

  return (
    <Swiper className={styles.swiper} spaceBetween={12} slidesPerView={1.15}>
      {slides.map((n) => (
        <SwiperSlide key={n} className={styles.slide}>
          {en ? `Slide ${n}` : `スライド ${n}`}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
