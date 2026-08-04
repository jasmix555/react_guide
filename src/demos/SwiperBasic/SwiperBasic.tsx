import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './SwiperBasic.module.scss'

const slides = [1, 2, 3, 4, 5, 6]

/**
 * 一番小さい Swiper。modules も CSS の追加インポートも無し。
 * slidesPerView を 1.15 にして「次のスライドが少し見える」＝スライダーだと分かる形に。
 */
export function SwiperBasic() {
  return (
    <Swiper className={styles.swiper} spaceBetween={12} slidesPerView={1.15}>
      {slides.map((n) => (
        <SwiperSlide key={n} className={styles.slide}>
          スライド {n}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
